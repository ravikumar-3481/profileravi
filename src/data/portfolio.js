
import projects from './projects.json';
import media from './media.json';

export { projects, media };

const SITE_URL = 'https://profileravi.vercel.app';
const IMAGEKIT_BASE = 'https://ik.imagekit.io/ravivish3481/img/';
const DEFAULT_OG_IMAGE = `${SITE_URL}/banner.png`;

export const imagekit = name =>
  name ? `${IMAGEKIT_BASE}${name}` : name;

export const profile = {
  name: 'Ravi Kumar Vishwakarma',
  email: 'ravivish968@gmail.com',
  github: 'https://github.com/ravikumar-3481',
  linkedin: 'https://www.linkedin.com/in/ravi-vishwakarma67',
  resume:
    'https://drive.google.com/file/d/1M8tIvQtegWqFx9_DKpJwxOFpfl0DQPfB/view',
};

export const projectName = p => p.title.split(' - ')[0];

export const categoryName = c =>
  c === 'ai' ? 'AI & Machine Learning' : 'Developer Tools';

/**
 * SEO metadata helper for TanStack Start routes.
 *
 * @param {string} title - Page title
 * @param {string} description - Page description
 * @param {string} path - Canonical page path
 * @param {string} image - Absolute image URL or root-relative image path
 */
export const seo = (
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE
) => {
  const fullTitle = `${title} — ${profile.name}`;

  const normalizedPath = path.startsWith('/')
    ? path
    : `/${path}`;

  const pageUrl = `${SITE_URL}${normalizedPath}`;

  const imageUrl = image.startsWith('http')
    ? image
    : `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`;

  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },

      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: profile.name },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: pageUrl },
      { property: 'og:image', content: imageUrl },
      { property: 'og:image:secure_url', content: imageUrl },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
    ],
    links: [
      { rel: 'canonical', href: pageUrl },
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
