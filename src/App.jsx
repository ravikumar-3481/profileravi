import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import Preloader from './components/Preloader';

// Helper component to handle legacy URL obfuscation redirects
function LegacyRedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get('ref');
    if (ref) {
      try {
        const decoded = atob(ref);
        if (decoded.startsWith('proj_')) {
          const id = decoded.split('_')[1];
          navigate(`/project/${id}`, { replace: true });
        }
      } catch (e) {
        console.error("Failed to parse legacy obfuscated ref:", e);
      }
    }
  }, [location, navigate]);

  return null;
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <LegacyRedirectHandler />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        {/* Fallback route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
