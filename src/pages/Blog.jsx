import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchDevToArticles } from '../services/devtoService';
import '../styles/blog.css';

// Safe helper to extract tags whether they are arrays or comma-separated strings
const getArticleTags = (article) => {
  if (!article) return [];
  if (Array.isArray(article.tag_list) && article.tag_list.length > 0) return article.tag_list;
  if (Array.isArray(article.tags) && article.tags.length > 0) return article.tags;
  if (typeof article.tags === 'string' && article.tags.trim() !== '') {
    return article.tags.split(',').map(t => t.trim()).filter(Boolean);
  }
  if (typeof article.tag_list === 'string' && article.tag_list.trim() !== '') {
    return article.tag_list.split(',').map(t => t.trim()).filter(Boolean);
  }
  return [];
};

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  useEffect(() => {
    document.title = "Blog & Insights | Ravi Kumar Vishwakarma";
    window.scrollTo({ top: 0, behavior: 'instant' });
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDevToArticles();
      setArticles(data.articles || []);
    } catch (err) {
      console.error("Failed to load articles:", err);
      setError("Failed to fetch articles. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Collect unique tags from articles
  const availableTags = useMemo(() => {
    const tagsSet = new Set(['All']);
    articles.forEach(article => {
      const tags = getArticleTags(article);
      tags.forEach(t => tagsSet.add(t.toLowerCase()));
    });
    return Array.from(tagsSet).slice(0, 10);
  }, [articles]);

  // Filter articles based on search query and selected tag
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesTag = true;
      if (selectedTag !== 'All') {
        const articleTags = getArticleTags(article).map(t => t.toLowerCase());
        matchesTag = articleTags.includes(selectedTag.toLowerCase());
      }

      return matchesSearch && matchesTag;
    });
  }, [articles, searchQuery, selectedTag]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="blog-page">
      <div className="blog-bg-glow"></div>
      <Navbar />

      <main className="blog-container">
        {/* Header Hero */}
        <motion.div 
          className="blog-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="blog-badge">
            <i className="fas fa-terminal"></i>
            <span>Engineering & Insights Journal</span>
          </div>

          <h1 className="blog-title">
            Articles & <span className="blog-title-gradient">Thoughts</span>
          </h1>

          <p className="blog-subtitle">
            Exploring scalable AI systems, machine learning architectures, data engineering pipelines, and modern web development.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="blog-controls">
          <div className="blog-search-box">
            <i className="fas fa-search"></i>
            <input 
              type="text"
              placeholder="Search by topic, keyword, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blog-search-input"
            />
          </div>

          {availableTags.length > 1 && (
            <div className="blog-tag-pills">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  className={`blog-tag-btn ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => setSelectedTag(tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="blog-grid">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="blog-skeleton-card">
                <div className="blog-skeleton-shimmer"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="blog-empty-state">
            <i className="fas fa-exclamation-triangle"></i>
            <h3>Unable to load articles</h3>
            <p>{error}</p>
            <button className="blog-read-btn" onClick={loadArticles} style={{ marginTop: '1.5rem' }}>
              Retry <i className="fas fa-sync-alt"></i>
            </button>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="blog-empty-state">
            <i className="fas fa-book-open"></i>
            <h3>No articles found</h3>
            <p>Try searching for a different keyword or resetting your tag filter.</p>
            <button 
              className="blog-read-btn" 
              onClick={() => { setSearchQuery(''); setSelectedTag('All'); }}
              style={{ marginTop: '1.5rem' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div 
            className="blog-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {filteredArticles.map((article, idx) => {
                const tagsList = getArticleTags(article);

                return (
                  <motion.article 
                    key={article.id} 
                    className="blog-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <a 
                      href={article.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="blog-card-cover"
                      style={{ display: 'block' }}
                      title={`Read "${article.title}" on Dev.to`}
                    >
                      {article.cover_image ? (
                        <img 
                          src={article.cover_image} 
                          alt={article.title}
                          className="blog-card-img" 
                          loading="lazy" 
                        />
                      ) : (
                        <div className="blog-card-fallback-cover">
                          <i className="devicon-devicon-plain"></i>
                        </div>
                      )}

                      {article.reading_time_minutes && (
                        <div className="blog-card-reading-badge">
                          <i className="far fa-clock"></i>
                          <span>{article.reading_time_minutes} min read</span>
                        </div>
                      )}
                    </a>

                    <div className="blog-card-body">
                      <div className="blog-card-meta">
                        <span className="blog-card-date">
                          <i className="far fa-calendar-alt"></i>
                          {formatDate(article.published_at || article.published_timestamp)}
                        </span>
                        {article.public_reactions_count > 0 && (
                          <span>
                            <i className="far fa-heart" style={{ color: '#ff4081', marginRight: '4px' }}></i>
                            {article.public_reactions_count}
                          </span>
                        )}
                      </div>

                      {tagsList.length > 0 && (
                        <div className="blog-card-tags">
                          {tagsList.slice(0, 3).map(tag => (
                            <span key={tag} className="blog-card-tag">#{tag}</span>
                          ))}
                        </div>
                      )}

                      <h2 className="blog-card-title">
                        <a 
                          href={article.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ color: 'inherit', textDecoration: 'none' }}
                          title={`Read "${article.title}" on Dev.to`}
                        >
                          {article.title}
                        </a>
                      </h2>

                      <p className="blog-card-desc">
                        {article.description}
                      </p>

                      <div className="blog-card-footer">
                        <div className="blog-card-author">
                          <img 
                            src={article.user?.profile_image || "/og/img.webp"} 
                            alt={article.user?.name || "Author"} 
                            className="blog-author-avatar"
                          />
                          <span className="blog-author-name">{article.user?.name || "Ravi Kumar"}</span>
                        </div>

                        <a 
                          href={article.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="blog-read-btn"
                          title="Read full article on Dev.to"
                        >
                          Read More <i className="fas fa-arrow-up-right-from-square" style={{ fontSize: '0.8rem' }}></i>
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
