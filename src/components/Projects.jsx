import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { slugify } from '../utils/urlHelper';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/assets/data/projects.json')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load projects:", err);
        setLoading(false);
      });
  }, []);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section className="projects" id="projects">
      <motion.div 
        className="section-tittle"
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Projects</h1>
        <div className="tittle-under"></div>
      </motion.div>

      <div className="filter-container">
        {['all', 'ai', 'web', 'data'].map((cat) => (
          <button 
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
            style={{ textTransform: 'capitalize' }}
          >
            {cat === 'all' ? 'All' : cat === 'ai' ? 'AI/ML' : cat === 'web' ? 'Web Dev' : 'Data Analysis'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <motion.div 
          className="projects-grid" 
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, index) => (
              <motion.div 
                key={p.id}
                className="project-card"
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 20,
                  delay: (index % 3) * 0.05
                }}
              >
                <div className="project-img">
                  <img src={`/assets/img/${p.thumbnail}`} loading="lazy" alt={p.title} />
                  <div className="project-tag">{p.result}</div>
                </div>
                <div className="project-info">
                  <h3>{p.title}</h3>
                  <div className="project-tech">
                    {p.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                  <div className="project-btns-group">
                    <div className="project-links">
                      <a href={p.liveLink} target="_blank" rel="noreferrer" className="p-btn">
                        <i className="fas fa-external-link-alt"></i> Live View
                      </a>
                      <a href={p.codeLink} target="_blank" rel="noreferrer" className="p-btn outline">
                        <i className="fab fa-github"></i> Source
                      </a>
                    </div>
                    <Link to={`/project/${p.id}-${slugify(p.title)}`} className="view-more-modern" style={{ textDecoration: 'none' }}>
                      Explore Case Study <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
