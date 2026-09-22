import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [menuActive, setMenuActive] = useState(false);
  const [showBlogToast, setShowBlogToast] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleBlogClick = () => {
    setMenuActive(false);
    setShowBlogToast(true);
    setTimeout(() => {
      setShowBlogToast(false);
    }, 3000);
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleLinkClick = (hash) => {
    setMenuActive(false);
    
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToHash: hash } });
    } else {
      if (hash === '' || hash === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header className="main-header">
      <div className="navlist">
        <nav className="navbar" id="nav">
          <div className="logo" onClick={() => handleLinkClick('#')} style={{ cursor: 'pointer' }}>
            <b>{'{'}</b>Ravi<b>{'}'}</b>
          </div>

          <div className="links">
            <ul className="nav-links">
              <li><span onClick={() => handleLinkClick('#')} style={{ cursor: 'pointer' }}>Home</span></li>
              <li><span onClick={() => handleLinkClick('#about')} style={{ cursor: 'pointer' }}>About</span></li>
              <li><span onClick={() => handleLinkClick('#projects')} style={{ cursor: 'pointer' }}>Projects</span></li>
              <li><span onClick={() => handleLinkClick('#journey')} style={{ cursor: 'pointer' }}>Journey</span></li>
              <li><span onClick={() => handleLinkClick('#toolbox')} style={{ cursor: 'pointer' }}>Skills</span></li>
              <li><span onClick={handleBlogClick} style={{ textDecoration: 'none', cursor: 'pointer' }}>Blog</span></li>
            </ul>
          </div>

          <div className="header-btn" id="contactDropdownContainer">
            <span 
              onClick={() => handleLinkClick('#contact')} 
              className="btn1 nav-cta-btn" 
              style={{ textDecoration: 'none', cursor: 'pointer', display: 'inline-block', textAlign: 'center' }}
            >
              Contact me
            </span>
          </div>

          <div className="menu-icon" onClick={toggleMenu} aria-label="Toggle navigation">
            <div className={`menu-container ${menuActive ? 'change' : ''}`}>
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
          </div>

          {/* Mobile Overlay Menu with Framer Motion animations */}
          <AnimatePresence>
            {menuActive && (
              <>
                <motion.div
                  id="overlay"
                  className="overlay active"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={toggleMenu}
                />
                <motion.div
                  id="menuBox"
                  className="menu-box active"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                >
                  <div className="mobile-menu-header">
                    <div className="mobile-menu-logo" onClick={() => handleLinkClick('#')}>
                      <b>{'{'}</b>Ravi<b>{'}'}</b>
                    </div>
                    <button className="mobile-menu-close" onClick={toggleMenu} aria-label="Close menu">
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>

                  <div className="mobile-menu-links">
                    <span onClick={() => handleLinkClick('#')}>Home</span>
                    <span onClick={() => handleLinkClick('#about')}>About</span>
                    <span onClick={() => handleLinkClick('#projects')}>Projects</span>
                    <span onClick={() => handleLinkClick('#journey')}>Journey</span>
                    <span onClick={() => handleLinkClick('#toolbox')}>Skills</span>
                    <span onClick={() => handleLinkClick('#contact')}>Contact Me</span>
                    <span onClick={handleBlogClick}>Blog</span>
                  </div>

                  <div className="mobile-menu-footer">
                    <button onClick={() => handleLinkClick('#contact')} className="mobile-contact-btn">
                      Contact Me
                    </button>
                    <div className="social-icons">
                      <a href="https://github.com/ravikumar-3481" target="_blank" rel="noreferrer" aria-label="GitHub">
                        <i className="fa-brands fa-github"></i>
                      </a>
                      <a href="https://www.linkedin.com/in/ravi-vishwakarma67" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                        <i className="fa-brands fa-linkedin"></i>
                      </a>
                      <a href="https://www.instagram.com/i_am_ravi.07" target="_blank" rel="noreferrer" aria-label="Instagram">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                      <a href="https://x.com/I_am_ravi09" target="_blank" rel="noreferrer" aria-label="X Twitter">
                        <i className="fa-brands fa-x-twitter"></i>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Blog Toast Notification */}
      <AnimatePresence>
        {showBlogToast && (
          <motion.div
            className="nav-toast"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: '5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(15, 10, 30, 0.95)',
              border: '1px solid rgba(145, 36, 255, 0.6)',
              color: '#fff',
              padding: '10px 22px',
              borderRadius: '30px',
              boxShadow: '0 10px 30px rgba(145, 36, 255, 0.35), 0 0 15px rgba(0, 242, 255, 0.2)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              zIndex: 3000,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.92rem',
              fontWeight: '500',
              pointerEvents: 'none'
            }}
          >
            <i className="fas fa-sparkles" style={{ color: '#00f2ff' }}></i>
            <span>Blog is coming soon! Stay tuned 🚀</span>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
