import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [menuActive, setMenuActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleLinkClick = (hash) => {
    setMenuActive(false);
    
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToHash: hash } });
      // If we navigate to Home, we let the Home component handle scrolling in useEffect
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
    <header>
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
              <li><span onClick={() => alert('Blog coming soon!')} style={{ textDecoration: 'none', cursor: 'pointer' }}>Blog</span></li>
            </ul>
          </div>

          <div className="header-btn" id="contactDropdownContainer">
            <span 
              onClick={() => handleLinkClick('#contact')} 
              className="btn1" 
              style={{ textDecoration: 'none', cursor: 'pointer', display: 'inline-block', textAlign: 'center' }}
            >
              Contact me
            </span>
          </div>

          <div className="menu-icon" onClick={toggleMenu}>
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
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                >
                  <span onClick={() => handleLinkClick('#')} style={{ cursor: 'pointer' }}>Home</span>
                  <span onClick={() => handleLinkClick('#about')} style={{ cursor: 'pointer' }}>About</span>
                  <span onClick={() => handleLinkClick('#projects')} style={{ cursor: 'pointer' }}>Projects</span>
                  <span onClick={() => handleLinkClick('#journey')} style={{ cursor: 'pointer' }}>Journey</span>
                  <span onClick={() => handleLinkClick('#contact')} style={{ cursor: 'pointer' }}>Contact Me</span>
                  <span onClick={() => { setMenuActive(false); alert('Blog coming soon!'); }} style={{ cursor: 'pointer' }}>Blog</span>
                  <div className="social-icons">
                    <a href="https://github.com/ravikumar-3481" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-github"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/ravi-vishwakarma67" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-linkedin"></i>
                    </a>
                    <a href="https://www.instagram.com/i_am_ravi.07?igsh=MWp0MnQ5b29xZmVmcg==" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="https://x.com/I_am_ravi09" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  );
}
