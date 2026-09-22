import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ResumePopup({ onClose }) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <motion.div 
      className="resume-popup" 
      id="resumePopup"
      style={{ display: 'flex' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="resume-popup-content"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <i className="fas fa-times close-popup" onClick={onClose}></i>
        <div className="resume-container">
          <img 
            src="/assets/img/resume.jpg" 
            alt="Ravi's Resume" 
            className={`resume-image ${zoomed ? 'zoomed' : ''}`}
            onClick={() => setZoomed(!zoomed)}
            style={{ cursor: 'zoom-in' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
          <a 
            href="https://drive.google.com/uc?export=download&id=1nYjnLfC79FwOmjDHmhM7n-ptuaWbhGVG" 
            target="_blank" 
            rel="noreferrer"
            className="download-icon" 
            download 
            aria-label="Download Resume"
            title="Download PDF Resume"
          >
            <i className="fas fa-download"></i>
          </a>
          <a
            href="/assets/img/resume.jpg"
            target="_blank"
            rel="noreferrer"
            className="download-icon"
            aria-label="Open High-Res Resume"
            title="Open Full Resolution"
          >
            <i className="fas fa-expand"></i>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
