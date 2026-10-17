import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { projects } from "@/data/portfolio";

describe("Canonical URLs and SEO tags across all pages", () => {
  const router = createRouter({
    routeTree,
    context: { queryClient: new QueryClient() },
  });

  const staticRoutes = [
    { path: "/", expectedCanonical: "https://profileravi.vercel.app/" },
    { path: "/about", expectedCanonical: "https://profileravi.vercel.app/about" },
    { path: "/projects", expectedCanonical: "https://profileravi.vercel.app/projects" },
    { path: "/experience", expectedCanonical: "https://profileravi.vercel.app/experience" },
    { path: "/skills", expectedCanonical: "https://profileravi.vercel.app/skills" },
    { path: "/blog", expectedCanonical: "https://profileravi.vercel.app/blog" },
    { path: "/contact", expectedCanonical: "https://profileravi.vercel.app/contact" },
    { path: "/activities", expectedCanonical: "https://profileravi.vercel.app/activities" },
    { path: "/faq", expectedCanonical: "https://profileravi.vercel.app/faq" },
  ];

  const projectRoutes = projects.map((p) => ({
    path: `/projects/${p.slug}`,
    expectedCanonical: `https://profileravi.vercel.app/projects/${p.slug}`,
  }));

  const allRoutes = [...staticRoutes, ...projectRoutes];

  it("ensures the root route does NOT contain a hardcoded rel=canonical", () => {
    const rootRoute = router.routesById["__root__"];
    const headFn = rootRoute.options.head as
      | ((ctx: unknown) => { links?: Array<{ rel?: string }> })
      | undefined;
    const rootHead = typeof headFn === "function" ? headFn({}) : {};
    const rootLinks = rootHead?.links ?? [];
    const rootCanonical = rootLinks.filter((l) => l.rel === "canonical");
    expect(rootCanonical).toHaveLength(0);
  });

  allRoutes.forEach(({ path, expectedCanonical }) => {
    it(`renders exactly one valid rel=canonical for ${path}`, () => {
      const matches = router.matchRoutes(path);
      expect(matches.length).toBeGreaterThan(0);

      // Collect links in the same order TanStack Router does:
      const allLinks: Array<{ rel?: string; href?: string; hrefLang?: string }> = [];

      for (const match of matches) {
        const route = router.routesById[match.routeId];
        const headFn = route.options.head as
          | ((ctx: unknown) => { links?: Array<{ rel?: string; href?: string; hrefLang?: string }> })
          | undefined;
        if (typeof headFn === "function") {
          const headResult = headFn({
            matches,
            match,
            params: match.params,
            loaderData:
              match.routeId === "/projects/$slug"
                ? { project: projects.find((p) => `/projects/${p.slug}` === path) }
                : undefined,
          });
          if (headResult?.links) {
            allLinks.push(...headResult.links);
          }
        }
      }

      const canonicals = allLinks.filter((l) => l.rel === "canonical");
      expect(canonicals).toHaveLength(1);
      expect(canonicals[0]?.href).toBe(expectedCanonical);

      // Check alternate links
      const alternates = allLinks.filter((l) => l.rel === "alternate");
      expect(alternates.length).toBeGreaterThanOrEqual(2);
      for (const alt of alternates) {
        expect(alt.href).toBe(expectedCanonical);
      }
    });
  });
});
