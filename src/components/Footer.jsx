import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-bottom" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', alignItems: 'center' }}>
        <div className="footer-nav-links" style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '0.88rem' }}>Home</Link>
          <Link to="/about" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '0.88rem', fontWeight: '600' }}>About</Link>
          <Link to="/blog" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '0.88rem' }}>Blog</Link>
          <a href="/#projects" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '0.88rem' }}>Projects</a>
          <a href="/#contact" style={{ color: '#a1a1aa', textDecoration: 'none', fontSize: '0.88rem' }}>Contact</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '1200px', flexWrap: 'wrap', gap: '1rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <p style={{ margin: 0 }}>&copy; 2026 | Made With ❤️ By Ravi Kumar Vishwakarma. All rights reserved.</p>
          <button onClick={scrollToTop} className="back-to-top" aria-label="Scroll to top">
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </footer>
  );
}
