import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/assets/data/activities.json')
      .then(res => res.json())
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load activities:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="extra-curricular" className="activities-section">
      <motion.div 
        className="section-tittle"
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Activities</h1>
        <div className="tittle-under"></div>
        <p className="section-description">Beyond the code: My contributions and engagements.</p>
      </motion.div>

      <div id="activities-container" className="activities-grid">
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : activities.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>Information temporarily unavailable.</p>
        ) : (
          activities.map((item, index) => (
            <motion.div 
              key={index} 
              className="activity-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.05 }}
            >
              <div className="activity-icon">
                <i className={item.icon}></i>
              </div>
              <span className="activity-inst">{item.institute}</span>
              <h3>{item.title}</h3>
              <p className="activity-desc">{item.description}</p>
              <div className="activity-duration">
                <i className="far fa-clock"></i> {item.duration}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}
