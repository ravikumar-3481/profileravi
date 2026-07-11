import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const STAGES = [
  "Initializing Ecosystem...",
  "Loading Assets...",
  "Establishing Connection...",
  "System Ready"
];

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(STAGES[0]);

  useEffect(() => {
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress > 100) currentProgress = 100;

      setProgress(currentProgress);

      // Update Stages
      if (currentProgress < 40) {
        setStage(STAGES[0]);
      } else if (currentProgress < 70) {
        setStage(STAGES[1]);
      } else if (currentProgress < 99) {
        setStage(STAGES[2]);
      } else {
        setStage(STAGES[3]);
      }

      if (currentProgress === 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          onComplete();
        }, 800); // Slight delay for final slide reveal
      }
    }, 180);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  // Dashoffset formula: 2 * PI * r = 2 * 3.14159 * 50 = 314
  // When progress is 0, dashoffset is 314. When progress is 100, dashoffset is 0.
  const dashoffset = 314 - (314 * progress) / 100;

  return (
    <motion.div
      id="loader-screen"
      className="premium-preloader"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        transition: { duration: 0.6, ease: "easeInOut" }
      }}
    >
      <div className="preloader-bg-grid"></div>
      <div className="premium-preloader-content">
        <svg className="pl-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pl-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9124ff" />
              <stop offset="100%" stopColor="#d1a3ff" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(145, 36, 255, 0.15)" strokeWidth="2" />
          <circle 
            cx="60" 
            cy="60" 
            r="50" 
            fill="none" 
            stroke="url(#pl-grad)" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeDasharray="314" 
            strokeDashoffset={dashoffset}
            filter="url(#glow)"
            style={{ 
              transition: 'stroke-dashoffset 0.2s ease', 
              transform: 'rotate(-90deg)', 
              transformOrigin: '50% 50%' 
            }}
          />
          <g className="inner-logo">
            <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Orbitron', sans-serif" fontSize="28" fill="#fff" fontWeight="700">
              <tspan fill="#9124ff">{'{'}</tspan> R <tspan fill="#9124ff">{'}'}</tspan>
            </text>
          </g>
        </svg>

        <div className="pl-greeting-box">
          <h2 className="pl-greeting">Hello, <span className="pl-highlight">Welcome</span></h2>
          <div className="pl-progress-container">
            <div className="pl-progress-bar" style={{ width: `${progress}%`, transition: 'width 0.2s ease' }}></div>
          </div>
          <div className="pl-status-row">
            <p className="pl-sub" id="pl-typing-text">{stage}</p>
            <span className="pl-percentage" id="pl-percent">{progress}%</span>
          </div>
        </div>
      </div>
      <div className="pl-footer">
        <span className="pl-version">v2.0 // AI & DATA SCIENCE</span>
        <span className="pl-copyright">© 2026 RAVI VISHWAKARMA</span>
      </div>
    </motion.div>
  );
}
