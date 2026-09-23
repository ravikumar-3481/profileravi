export const slugify = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Optional — only if you still want a pretty URL without breaking the route
export const updateProjectUrl = (id, title) => {
  if (!id || !title) return;
  const slug = slugify(title);
  const targetPath = `/project/${slug}`;
  if (window.location.pathname !== targetPath) {
    window.history.replaceState(null, '', targetPath);
  }
};