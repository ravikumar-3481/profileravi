import projects from './projects.json';

export { projects };

const SITE_URL = 'https://profileravi.vercel.app';
const IMAGEKIT_BASE = 'https://ik.imagekit.io/ravivish3481/img/';
const DEFAULT_OG_IMAGE = `${IMAGEKIT_BASE}banner.webp`;

export const imagekit = name => {
  if (typeof name !== 'string' || !name.trim()) {
    return name;
  }

  // Keep absolute URLs unchanged.
  if (/^https?:\/\//i.test(name)) {
    return name;
  }

  // Avoid accidental double slashes.
  return `${IMAGEKIT_BASE}${name.replace(/^\/+/, '')}`;
};

export const profile = {
  name: 'Ravi Kumar Vishwakarma',
  email: 'ravivish968@gmail.com',
  github: 'https://github.com/ravikumar-3481',
  linkedin: 'https://www.linkedin.com/in/ravi-vishwakarma67',
  resume:
    'https://drive.google.com/file/d/1M8tIvQtegWqFx9_DKpJwxOFpfl0DQPfB/view',
};

export const projectName = p =>
  typeof p?.title === 'string'
    ? p.title.split(' - ')[0]
    : '';

export const categoryName = c =>
  c === 'ai' ? 'AI & Machine Learning' : 'Developer Tools';

/**
 * Generate SEO metadata for TanStack Start routes.
 *
 * @param {string} title - Page title.
 * @param {string} description - Page description.
 * @param {string} path - Canonical page path.
 * @param {string} image - Absolute image URL or root-relative path.
 */
export const DEFAULT_KEYWORDS =
  'Ravi Kumar Vishwakarma, AI Engineer, Data Scientist, Machine Learning Engineer, RAG, LangChain, Python, FastAPI, React, Full-Stack Developer, NLP, Sentiment Analysis, Satna India, AI Portfolio';

/**
 * Generate comprehensive SEO metadata for TanStack Start routes to maximize search ranking.
 *
 * @param {string} title - Page title.
 * @param {string} description - Page description.
 * @param {string} path - Canonical page path.
 * @param {string} image - Absolute image URL or root-relative path.
 * @param {string} customKeywords - Optional custom keywords for this specific route.
 */
export const seo = (
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  customKeywords = DEFAULT_KEYWORDS
) => {
  const siteName = profile.name;
  const safeTitle =
    typeof title === 'string' && title.trim()
      ? title.trim()
      : siteName;

  const safeDescription =
    typeof description === 'string'
      ? description.trim()
      : '';

  // Avoid duplicating the profile name in the title.
  const fullTitle = safeTitle
    .toLowerCase()
    .includes(siteName.toLowerCase())
    ? safeTitle
    : `${safeTitle} | ${siteName}`;

  // Normalize the canonical path and exclude query/hash parameters.
  let normalizedPath =
    typeof path === 'string' && path.trim()
      ? path.trim()
      : '/';

  // If a full URL is passed, safely extract the pathname.
  if (/^https?:\/\//i.test(normalizedPath)) {
    try {
      normalizedPath = new URL(normalizedPath).pathname;
    } catch {
      normalizedPath = normalizedPath.replace(/^https?:\/\/[^/]+/i, '') || '/';
    }
  }

  normalizedPath = normalizedPath.split(/[?#]/)[0];

  if (!normalizedPath.startsWith('/')) {
    normalizedPath = `/${normalizedPath}`;
  }

  // Keep one consistent canonical URL format.
  if (normalizedPath.length > 1) {
    normalizedPath = normalizedPath.replace(/\/+$/, '');
  }

  const pageUrl = `${SITE_URL.replace(/\/+$/, '')}${normalizedPath}`;

  // Accept absolute HTTP(S) URLs or root-relative image paths.
  let imageUrl = DEFAULT_OG_IMAGE;

  if (typeof image === 'string' && image.trim()) {
    const safeImage = image.trim();

    if (/^https?:\/\//i.test(safeImage)) {
      imageUrl = safeImage;
    } else if (safeImage.startsWith('/')) {
      imageUrl = `${SITE_URL.replace(/\/+$/, '')}${safeImage}`;
    } else if (!safeImage.startsWith('//')) {
      imageUrl = `${IMAGEKIT_BASE}${safeImage.replace(/^\/+/, '')}`;
    }
  }

  return {
    meta: [
      { title: fullTitle },
      {
        name: 'description',
        content: safeDescription,
      },
      {
        name: 'keywords',
        content: customKeywords,
      },
      {
        name: 'author',
        content: 'Ravi Kumar Vishwakarma',
      },
      {
        name: 'creator',
        content: 'Ravi Kumar Vishwakarma',
      },
      {
        name: 'publisher',
        content: 'Ravi Kumar Vishwakarma',
      },
      {
        name: 'robots',
        content:
          'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },
      {
        name: 'googlebot',
        content:
          'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
      },

      // Geographic tags for local & global ranking
      { name: 'geo.region', content: 'IN-MP' },
      { name: 'geo.placename', content: 'Satna, Madhya Pradesh, India' },
      { name: 'geo.position', content: '24.5822;80.8299' },
      { name: 'ICBM', content: '24.5822, 80.8299' },

      // Open Graph / Facebook / LinkedIn
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Ravi Kumar Vishwakarma Portfolio' },
      { property: 'og:title', content: fullTitle },
      {
        property: 'og:description',
        content: safeDescription,
      },
      { property: 'og:url', content: pageUrl },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:secure_url', content: imageUrl },
      { property: 'og:image:alt', content: fullTitle },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:type', content: 'image/webp' },
      { property: 'og:locale', content: 'en_US' },

      // Twitter / X
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      { name: 'twitter:title', content: fullTitle },
      {
        name: 'twitter:description',
        content: safeDescription,
      },
      { name: 'twitter:image', content: imageUrl },
      { name: 'twitter:image:alt', content: fullTitle },
      { name: 'twitter:site', content: '@ravikumar3481' },
      { name: 'twitter:creator', content: '@ravikumar3481' },
    ],
    links: [
      {
        rel: 'canonical',
        href: pageUrl,
      },
      {
        rel: 'alternate',
        hrefLang: 'x-default',
        href: pageUrl,
      },
      {
        rel: 'alternate',
        hrefLang: 'en',
        href: pageUrl,
      },
    ],
  };
};

export const faqs = [
  [
    'What kind of work do you focus on?',
    'I build AI applications, machine learning systems, data pipelines, and analytics dashboards. My focus is turning complex data into practical, useful products.',
  ],
  [
    'What technologies do you work with?',
    'My core stack includes Python, React, FastAPI, SQL, LangChain, and machine learning libraries such as TensorFlow and scikit-learn. I also work with Power BI for data storytelling.',
  ],
  [
    'Are you open to new opportunities?',
    'Yes. I am open to internships, collaborations, and opportunities in AI, data science, and software development. Get in touch to discuss the fit.',
  ],
  [
    'Can I see how your projects were built?',
    'Absolutely. Each project has a detailed case study with the problem, solution, architecture, development milestones, screenshots, and source code.',
  ],
  [
    'Where are you based?',
    'I am based in India and comfortable collaborating remotely with teams around the world.',
  ],
  [
    'What is the best way to reach you?',
    'Email me at ravivish968@gmail.com or use the contact form. You can also connect with me on LinkedIn.',
  ],
];