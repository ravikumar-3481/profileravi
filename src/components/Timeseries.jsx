import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

export default function Timeseries() {
  const [journeyData, setJourneyData] = useState([]);
  const [activeFilter, setActiveFilter] = useState('work'); // 'all' | 'work' | 'education'
  const [loading, setLoading] = useState(true);
  const [activeYear, setActiveYear] = useState('');

  const containerRef = useRef(null);

  // Scroll tracking for vertical progress line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });

  // Fetch education and experience details
  useEffect(() => {
    Promise.all([
      fetch('/assets/data/education.json').then(res => res.json()),
      fetch('/assets/data/experience.json').then(res => res.json())
    ])
      .then(([eduData, expData]) => {
        const formattedEdu = eduData.map(item => ({
          ...item,
          category: 'education',
          title: item.degree,
          subtitle: item.institute,
          typeBadge: 'Education'
        }));

        const formattedExp = expData.map(item => ({
          ...item,
          category: 'work',
          title: item.role,
          subtitle: item.company,
          typeBadge: item.type
        }));

        const combined = [...formattedEdu, ...formattedExp];

        const getSortScore = (item) => {
          const duration = item.duration || '';
          if (duration.includes('2029')) return 2029;
          if (duration.includes('2026')) return 2026; 
          if (duration.includes('2025')) return 2025;
          if (duration.includes('2023')) return 2023;
          return 0;
        };

        combined.sort((a, b) => getSortScore(b) - getSortScore(a));

        setJourneyData(combined);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load journey data:", err);
        setLoading(false);
      });
  }, []);

  const filteredData = journeyData.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  // Extract years to display in the right column
  const getYearLabel = (duration) => {
    if (!duration) return '';
    const match = duration.match(/\b(20\d{2})\b/g);
    // Returns the latest year mentioned in the duration string
    if (match && match.length > 0) {
      return match[match.length - 1];
    }
    return '';
  };

  // Extract distinct years for the year list on the right side
  const distinctYears = [...new Set(filteredData.map(item => getYearLabel(item.duration)).filter(Boolean))].sort((a, b) => b - a);

  // Monitor which card is in view to highlight active year
  useEffect(() => {
    if (filteredData.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const yearAttr = entry.target.getAttribute('data-year');
            if (yearAttr) {
              setActiveYear(yearAttr);
            }
          }
        });
      },
      { threshold: 0.4, rootMargin: "-15% 0px -45% 0px" }
    );

    const cardElements = document.querySelectorAll('.timeseries-card');
    cardElements.forEach((el) => observer.observe(el));

    // Set first year as default if none is active or active is invalid
    if ((!activeYear || !distinctYears.includes(activeYear)) && distinctYears.length > 0) {
      setActiveYear(distinctYears[0]); // eslint-disable-line react-hooks/set-state-in-effect
    }

    return () => observer.disconnect();
  }, [filteredData, activeYear, distinctYears]);

  // Reset active year when filter changes
  useEffect(() => {
    setActiveYear(''); // eslint-disable-line react-hooks/set-state-in-effect
  }, [activeFilter]);

  return (
    <section className="timeseries-section" id="journey" ref={containerRef}>
      <div className="timeseries-bg-glow"></div>

      <motion.div 
        className="timeseries-header"
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <h1>My Journey</h1>
        <p>A left-aligned timeseries layout of my professional history and academic records.</p>
      </motion.div>

      <div className="timeseries-filters">
        <button
          className={`timeseries-filter-btn ${activeFilter === 'work' ? 'active' : ''}`}
          onClick={() => setActiveFilter('work')}
        >
          Work Experience
        </button>
        <button
          className={`timeseries-filter-btn ${activeFilter === 'education' ? 'active' : ''}`}
          onClick={() => setActiveFilter('education')}
        >
          Education
        </button>
        <button
          className={`timeseries-filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All Journey
        </button>
      </div>

      {loading ? (
        <div className="timeseries-loader-box">
          <div className="timeseries-spinner"></div>
        </div>
      ) : (
        <div className="timeseries-container">
          {/* Left Column: List of cards */}
          <div className="timeseries-cards-col">
            <AnimatePresence mode="popLayout">
              {filteredData.map((item, index) => {
                const year = getYearLabel(item.duration);
                return (
                  <motion.div
                    key={`${item.category}-${item.id}`}
                    className="timeseries-card-wrapper"
                    layout
                    initial={{ opacity: 0, x: -35 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 100, 
                      damping: 20,
                      delay: index * 0.05
                    }}
                  >
                    <motion.div
                      className="timeseries-card"
                      data-year={year}
                      whileHover={{ y: -5, scale: 1.01 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                      <span className={`timeseries-badge ${item.category === 'education' ? 'edu' : ''}`}>
                        {item.typeBadge}
                      </span>

                      <div className="timeseries-card-header">
                        <div className="timeseries-logo-wrapper">
                          <img
                            src={`/${item.logo}`}
                            alt={item.subtitle}
                            className="timeseries-logo"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              const fallbackSpan = e.target.nextElementSibling;
                              if (fallbackSpan) {
                                fallbackSpan.style.display = 'flex';
                              }
                            }}
                          />
                          <span
                            className="logo-fallback"
                            style={{
                              display: 'none',
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: '1.1rem',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '100%',
                              height: '100%',
                              borderRadius: 'inherit',
                              background: item.category === 'work' ? 'linear-gradient(135deg, #9124ff, #6366f1)' : 'linear-gradient(135deg, #a78bfa, #8b5cf6)'
                            }}
                          >
                            {item.subtitle ? item.subtitle.charAt(0) : '?'}
                          </span>
                        </div>

                        <div className="timeseries-title-area">
                          <h3>{item.title}</h3>
                          <span>{item.subtitle}</span>
                        </div>
                      </div>

                      <div className="timeseries-meta">
                        <span>
                          <i className="far fa-calendar-alt"></i> {item.duration}
                        </span>
                        {item.location && (
                          <span>
                            <i className="fas fa-map-marker-alt"></i> {item.location}
                          </span>
                        )}
                        {item.cgpa && (
                          <span>
                            <i className="fas fa-award"></i> CGPA: {item.cgpa}
                          </span>
                        )}
                      </div>

                      <p className="timeseries-desc">{item.description}</p>

                      {item.skills && item.skills.length > 0 && (
                        <div className="timeseries-skills">
                          {item.skills.map((skill, index) => (
                            <span key={index} className="timeseries-skill-tag">
                              #{skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Custom Timeseries Connectors */}
                      <div className="timeseries-node-connector">
                        <div className="timeseries-node-dot" />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Middle Column: Vertical Track line */}
          <div className="timeseries-line-track">
            <motion.div
              className="timeseries-line-progress"
              style={{ scaleY }}
            />
          </div>

          {/* Right Column: Sticky Floating Year list (Variance: 8 Asymmetry) */}
          <div className="timeseries-indicator-col">
            {distinctYears.map((year) => (
              <span
                key={year}
                className={`timeseries-year-active ${activeYear === year ? 'highlighted' : ''}`}
              >
                {year}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
