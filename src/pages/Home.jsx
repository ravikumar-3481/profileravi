import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Timeseries from '../components/Timeseries';
import Toolbox from '../components/Toolbox';
import GitHubStats from '../components/GitHubStats';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ResumePopup from '../components/ResumePopup';

export default function Home() {
  const [showResume, setShowResume] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if redirect scroll state exists
    if (location.state?.scrollToHash) {
      const hash = location.state.scrollToHash;
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
      // Reset router state to prevent scrolling again on subsequent renders
      window.history.replaceState(null, '');
    }
  }, [location]);

  // Disable body scrolling when modal is open
  useEffect(() => {
    if (showResume) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showResume]);

  return (
    <div className="home-page">
      <Navbar />
      
      <main>
        <Hero onResumeClick={() => setShowResume(true)} />
        <About />
        <Projects />
        <Timeseries />
        <Toolbox />
        <GitHubStats />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      {/* Popups and Modals with AnimatePresence */}
      <AnimatePresence>
        {showResume && (
          <ResumePopup onClose={() => setShowResume(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
