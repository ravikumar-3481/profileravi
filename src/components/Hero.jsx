import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TYPING_WORDS = ["AI Engineer", "Data Scientist", "Machine Learning Engineer", "Data Analyst"];
const TYPE_SPEED = 90;
const ERASE_SPEED = 50;
const DELAY_BETWEEN = 2000;

export default function Hero({ onResumeClick }) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = TYPING_WORDS[wordIndex];

    if (isDeleting) {
      if (displayText === '') {
        // Erasing complete, move to next word after a brief pause
        timer = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex(prev => (prev + 1) % TYPING_WORDS.length);
        }, 500);
      } else {
        // Erasing
        timer = setTimeout(() => {
          setDisplayText(prev => prev.substring(0, prev.length - 1));
        }, ERASE_SPEED);
      }
    } else {
      if (displayText === currentWord) {
        // Word complete, start deleting after delay
        timer = setTimeout(() => setIsDeleting(true), DELAY_BETWEEN);
      } else {
        // Typing
        timer = setTimeout(() => {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        }, TYPE_SPEED);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  // Floating animation configuration for dev icons
  const getFloatAnimation = (yOffset = 12, duration = 3.5, delay = 0) => ({
    animate: {
      y: [0, -yOffset, 0],
    },
    transition: {
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }
  });

  return (
    <section className="hero" id="home">
      <div className="grid-pattern-container">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(145, 36, 255, 0.15)" strokeWidth="0.5"/>
            </pattern>
            <pattern id="grid" width="160" height="160" patternUnits="userSpaceOnUse">
              <rect width="160" height="160" fill="url(#smallGrid)"/>
              <path d="M 160 0 L 0 0 0 160" fill="none" stroke="rgba(145, 36, 255, 0.3)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="transparent">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="6s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>
      
      <div className="hero-glow-bg"></div>

      <motion.div 
        className="container hero-container"
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, scale: 0.92, x: -30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <div className="status-badge">
            <span className="status-dot"></span>
            <span className="status-text">Available for New Opportunities</span>
          </div>
          
          <h1 className="hero-title">
            Hi, I'm <br className="mobile-break" />
            <span className="gradient-text">Ravi</span> <br className="desktop-break" />
            <span className="lastname">Vishwakarma</span>
          </h1>
          
          <h2 className="hero-subtitle">
            <span id="typing-text" className="highlight">{displayText}</span>
            <span className="typing-cursor">|</span>
          </h2>
          
          <p className="hero-description">
            Bridging the gap between raw data and 92% predictive accuracy. I engineer scalable data ecosystems that drive a 40% acceleration in business intelligence.
          </p>
          
          <div className="hero-cta-group">
            <button className="cta-primary" onClick={() => window.open('mailto:ravivish517+portfolio@gmail.com')}>
              Let's Connect <i className="fas fa-paper-plane"></i>
            </button>
            <button className="cta-secondary" onClick={onResumeClick}>
              View Resume <i className="fas fa-file-alt"></i>
            </button>
          </div>
          
          <div className="hero-socials">
            <a href="https://github.com/ravikumar-3481" target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></a>
            <a href="https://www.linkedin.com/in/ravi-vishwakarma67" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a>
            <a href="https://www.instagram.com/i_am_ravi.07" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://x.com/I_am_ravi09" target="_blank" rel="noreferrer"><i className="fa-brands fa-x-twitter"></i></a>
          </div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.72 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <div className="image-wrapper">
            <div className="img-glow"></div>
            <img src="/og/img.webp" alt="Ravi kumar Vishwakarma | Profile" className="profile-img" />
            
            <motion.div className="floating-icon icon-1" {...getFloatAnimation(12, 3.2, 0)}><i className="devicon-python-plain"></i></motion.div>
            <motion.div className="floating-icon icon-4" {...getFloatAnimation(16, 4.2, 0.2)}><i className="devicon-java-plain"></i></motion.div>
            <motion.div className="floating-icon icon-6" {...getFloatAnimation(13, 3.6, 1.0)}><i className="devicon-numpy-plain"></i></motion.div>
            <motion.div className="floating-icon icon-7" {...getFloatAnimation(15, 4.0, 0.5)}><i className="devicon-pandas-plain"></i></motion.div>
            <motion.div className="floating-icon icon-8" {...getFloatAnimation(9, 2.8, 0.7)}><i className="devicon-scikitlearn-plain"></i></motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
