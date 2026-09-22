/**
 * Dev.to Service
 * Fetches publicly published articles from Dev.to.
 * No credentials or private API keys required or stored.
 */

const BASE_URL = 'https://dev.to/api';
const DEVTO_USERNAME = 'ravi_kumar3481';

/**
 * Fetch published articles by username from Dev.to
 */
export const fetchDevToArticles = async () => {
  try {
    const url = `${BASE_URL}/articles?username=${encodeURIComponent(DEVTO_USERNAME)}&per_page=30`;
    const response = await fetch(url);
    if (response.ok) {
      const articles = await response.json();
      if (Array.isArray(articles) && articles.length > 0) {
        return { articles };
      }
    }
  } catch (err) {
    console.warn('Unable to reach Dev.to:', err);
  }

  // Fallback: curated articles in AI & development if author has no articles yet
  try {
    const response = await fetch(`${BASE_URL}/articles?tag=ai,machinelearning,python&per_page=12`);
    if (response.ok) {
      const articles = await response.json();
      return { articles: Array.isArray(articles) ? articles : [] };
    }
  } catch (err) {
    console.warn('Unable to load fallback articles:', err);
  }

  return { articles: [] };
};

