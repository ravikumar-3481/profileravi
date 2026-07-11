import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SHEET_ID = '1Y3ZMgMpme1xolYpka_2EwayrpUkpr7Qic2AzfspGwTA';
const URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(null);
  const pauseTimeoutRef = useRef(null);

  useEffect(() => {
    fetch(URL)
      .then(res => res.text())
      .then(text => {
        const startIdx = text.indexOf('{');
        const endIdx = text.lastIndexOf('}') + 1;
        const jsonStr = text.substring(startIdx, endIdx);
        const jsonData = JSON.parse(jsonStr);
        const rows = jsonData.table.rows;

        const nameSeen = new Set();
        const parsed = [];
        const reversedRows = [...rows].reverse();
        
        for (const row of reversedRows) {
          const name = row.c[1] ? row.c[1].v.toString().trim() : '';
          const role = row.c[2] ? row.c[2].v.toString().trim() : 'Professional';
          const institute = row.c[3] ? row.c[3].v.toString().trim() : '';
          const rating = row.c[4] ? parseInt(row.c[4].v) : 5;
          const feedback = row.c[5] ? row.c[5].v.toString().trim() : '';

          if (!name || !feedback) continue;

          const lowerFeedback = feedback.toLowerCase();
          if (feedback.length < 12 || lowerFeedback === 'gurukul senior secondary' || lowerFeedback === 'gurukul senior secondary school') {
            continue;
          }

          if (!nameSeen.has(name)) {
            nameSeen.add(name);
            parsed.push({
              name,
              role,
              institute,
              rating,
              feedback
            });
          }

          if (parsed.length >= 10) break;
        }

        let marqueeList = parsed;
        if (parsed.length > 0) {
          while (marqueeList.length < 8) {
            marqueeList = [...marqueeList, ...parsed];
          }
        }

        setTestimonials(marqueeList);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading sheet testimonials:", err);
        setLoading(false);
      });
  }, []);

  const handleInterrupt = () => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    setIsPaused(true);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  const handleResume = () => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    setIsPaused(false);
  };

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  const doubleList = [...testimonials, ...testimonials];

  return (
    <section id="testimonials">
      <motion.div 
        className="section-tittle"
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <h1>What People Say</h1>
        <div className="tittle-under"></div>
        <p className="section-description">Feedback from collaborators and clients regarding my work in AI, Data Science, and Development.</p>
      </motion.div>

      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="testimonials-marquee-container">
          <div 
            className={`testimonials-marquee-track ${isPaused ? 'paused' : ''}`}
            onMouseEnter={handleInterrupt}
            onMouseLeave={handleResume}
            onTouchStart={handleInterrupt}
            onTouchEnd={handleResume}
          >
            {doubleList.map((t, index) => {
              const isLong = t.feedback.length > 130;
              const displayFeedback = isLong ? `${t.feedback.substring(0, 130)}...` : t.feedback;

              return (
                <div 
                  key={index} 
                  className="t-card"
                >
                  <i className="fas fa-quote-right quote-mark"></i>
                  <div className="content-top">
                    <div className="rating-stars">
                      {Array(5).fill(0).map((_, i) => (
                        <i key={i} className={`${i < t.rating ? 'fas' : 'far'} fa-star`}></i>
                      ))}
                    </div>
                    <div className="feedback-text-container">
                      <p className="feedback-text" style={{ 
                        marginBottom: 0, 
                        whiteSpace: 'pre-line'
                      }}>
                        "{displayFeedback}"
                      </p>
                      {isLong && (
                        <span 
                          className="t-read-more-btn" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTestimonial(t);
                          }}
                        >
                          Read More <i className="fas fa-chevron-right" style={{ fontSize: '0.75rem', marginLeft: '3px' }}></i>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="meta-container">
                    <div className="meta-info">
                      <div className="meta-name">{t.name}</div>
                      <div className="meta-role">
                        {t.role} {t.institute && <>at <b>{t.institute}</b></>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <motion.div 
        className="test-btn"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <button onClick={() => window.open('https://forms.gle/wyR1g39bA79EYu8X8', '_blank')} className="btn1">
          Endorse
        </button>
      </motion.div>

      {/* Testimonial Detailed Modal Popup */}
      <AnimatePresence>
        {activeTestimonial && (
          <div className="testimonial-modal-overlay" onClick={() => setActiveTestimonial(null)}>
            <motion.div 
              className="testimonial-modal-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <button className="modal-close-btn" onClick={() => setActiveTestimonial(null)}>
                <i className="fas fa-times"></i>
              </button>
              
              <i className="fas fa-quote-right modal-quote-mark"></i>
              
              <div className="modal-rating">
                {Array(5).fill(0).map((_, i) => (
                  <i key={i} className={`${i < activeTestimonial.rating ? 'fas' : 'far'} fa-star`}></i>
                ))}
              </div>
              
              <div className="modal-feedback-content">
                <p>"{activeTestimonial.feedback}"</p>
              </div>
              
              <div className="modal-meta">
                <div className="modal-name">{activeTestimonial.name}</div>
                <div className="modal-role">
                  {activeTestimonial.role} {activeTestimonial.institute && <>at <b>{activeTestimonial.institute}</b></>}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}


