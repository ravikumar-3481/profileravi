const rawBaseUrl = process.env.BASE_URL;

if (!rawBaseUrl) {
  console.error("BASE_URL is required. Set it to the deployment URL to test.");
  process.exit(1);
}

let baseUrl;
try {
  baseUrl = new URL(rawBaseUrl);
} catch {
  console.error(`BASE_URL is not a valid URL: ${rawBaseUrl}`);
  process.exit(1);
}

if (!["http:", "https:"].includes(baseUrl.protocol)) {
  console.error("BASE_URL must use HTTP or HTTPS.");
  process.exit(1);
}

if (baseUrl.username || baseUrl.password) {
  console.error("BASE_URL must not contain embedded credentials.");
  process.exit(1);
}

baseUrl.pathname = baseUrl.pathname.replace(/\/$/, "");
baseUrl.search = "";
baseUrl.hash = "";

const paths = ["/", "/about", "/projects", "/experience", "/skills", "/blog", "/contact"];
const maxAttempts = 6;
const retryDelayMs = 3_000;
const requestTimeoutMs = 10_000;

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function checkRoute(path) {
  const target = new URL(path.replace(/^\//, ""), `${baseUrl.href.replace(/\/$/, "")}/`);
  let lastError = "No response received";

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    let shouldRetry = true;

    try {
      const response = await fetch(target, {
        method: "GET",
        redirect: "follow",
        headers: { "user-agent": "profileravi-production-smoke-test/1.0" },
        signal: AbortSignal.timeout(requestTimeoutMs),
      });

      const contentType = response.headers.get("content-type") ?? "";
      const body = await response.text();
      const isHtml = contentType.toLowerCase().includes("text/html");
      const hasHtmlDocument = /<!doctype html|<html[\s>]/i.test(body);
      const passes = response.status >= 200 && response.status < 400 && isHtml && hasHtmlDocument;

      if (passes) {
        console.log(`PASS ${response.status} ${path} (${contentType}; ${body.length} chars)`);
        return;
      }

      lastError = `HTTP ${response.status}; content-type=${contentType || "(missing)"}; html=${hasHtmlDocument}`;
      shouldRetry = response.status >= 500 || response.status === 429;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }

    if (!shouldRetry || attempt === maxAttempts) {
      throw new Error(`FAIL ${path} after ${attempt} attempt(s): ${lastError}`);
    }

    console.warn(`RETRY ${path} (${attempt}/${maxAttempts}): ${lastError}`);
    await sleep(retryDelayMs);
  }
}

const results = await Promise.allSettled(paths.map(checkRoute));
const failures = results.filter((result) => result.status === "rejected");

for (const failure of failures) {
  console.error(failure.reason instanceof Error ? failure.reason.message : failure.reason);
}

if (failures.length > 0) {
  console.error(`Smoke test failed: ${failures.length}/${paths.length} route(s) did not pass.`);
  process.exit(1);
}

console.log(`Smoke test passed: all ${paths.length} critical routes returned an HTML document.`);
