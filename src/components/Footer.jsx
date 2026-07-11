export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-bottom">
        <p>&copy; 2026 | Made With ❤️ By Ravi Kumar Vishwakarma. All rights reserved.</p>
        <button onClick={scrollToTop} className="back-to-top">
          <i className="fas fa-arrow-up"></i>
        </button>
      </div>
    </footer>
  );
}
