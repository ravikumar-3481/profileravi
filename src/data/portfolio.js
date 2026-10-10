import projects from './projects.json';
import media from './media.json';
export { projects, media };
const IMAGEKIT_BASE = 'https://ik.imagekit.io/ravivish3481/img/';
// Build a full image URL from a file name listed in projects.json:
// imagePath = "https://ik.imagekit.io/ravivish3481/img/" + fileName
export const imagekit = name => name ? `${IMAGEKIT_BASE}${name}` : name;
export const profile = { name: 'Ravi Kumar Vishwakarma', email: 'ravivish968@gmail.com', github: 'https://github.com/ravikumar-3481', linkedin: 'https://www.linkedin.com/in/ravi-vishwakarma67', resume: 'https://drive.google.com/file/d/1M8tIvQtegWqFx9_DKpJwxOFpfl0DQPfB/view' };
export const projectName = p => p.title.split(' - ')[0];
export const categoryName = c => c === 'ai' ? 'AI & Machine Learning' : 'Developer Tools';
export const seo = (title, description, path = '/') => ({ meta: [{ title: `${title} — Ravi Kumar Vishwakarma` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} — Ravi Kumar Vishwakarma` }, { property: 'og:description', content: description }, { property: 'og:url', content: path }], links: [{ rel: 'canonical', href: path }] });
export const faqs = [
 ['What kind of work do you focus on?', 'I build AI applications, machine learning systems, data pipelines, and analytics dashboards. My focus is turning complex data into practical, useful products.'],
 ['What technologies do you work with?', 'My core stack includes Python, React, FastAPI, SQL, LangChain, and machine learning libraries such as TensorFlow and scikit-learn. I also work with Power BI for data storytelling.'],
 ['Are you open to new opportunities?', 'Yes. I am open to internships, collaborations, and opportunities in AI, data science, and software development. Get in touch to discuss the fit.'],
 ['Can I see how your projects were built?', 'Absolutely. Each project has a detailed case study with the problem, solution, architecture, development milestones, screenshots, and source code.'],
 ['Where are you based?', 'I am based in India and comfortable collaborating remotely with teams around the world.'],
 ['What is the best way to reach you?', 'Email me at ravivish968@gmail.com or use the contact form. You can also connect with me on LinkedIn.']
];
