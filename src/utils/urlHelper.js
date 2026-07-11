/**
 * Converts a project title into a URL-friendly slug.
 * @param {string} title - The title of the project.
 * @returns {string} The slugified title.
 */
export const slugify = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') 
/**
 * @param {string|number} id 
 * @param {string} title 
 */
    .replace(/[\s_-]+/g, '-')  
    .replace(/^-+|-+$/g, '');   
};

export const updateProjectUrl = (id, title) => {
  if (!id || !title) return;
  const slug = slugify(title);
  const targetPath = `/project/${slug}`;

  // Only update if the pathname is different to avoid redundant history states
  if (window.location.pathname !== targetPath) {
    window.history.replaceState(null, '', targetPath);
  }
};
