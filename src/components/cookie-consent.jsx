import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    // Check if consent has already been given or declined
    try {
      const consent = localStorage.getItem('portfolio_cookie_consent');
      if (!consent) {
        // Show after a short delay for smooth arrival
        const timer = setTimeout(() => setOpen(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Storage might be restricted
    }
  }, []);

  useEffect(() => {
    // Allow user to re-open cookie settings anytime from footer or anywhere
    const handleOpenSettings = () => {
      setOpen(true);
      setPreferencesOpen(true);
    };
    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
  }, []);

  const saveConsent = (type) => {
    try {
      localStorage.setItem('portfolio_cookie_consent', type);
      localStorage.setItem('portfolio_cookie_consent_date', new Date().toISOString());
    } catch {}
    setOpen(false);
    setPreferencesOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          role="region"
          aria-label="Cookie and Privacy Preferences"
          className="cookie-banner"
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 260, damping: 25 }}
        >
          <div className="cookie-banner-inner">
            <div className="cookie-header">
              <div className="cookie-icon-wrapper">
                <Cookie size={19} className="text-primary" />
              </div>
              <div className="cookie-title-group">
                <h3>Cookie & Privacy Notice</h3>
                <span className="cookie-badge">Privacy First</span>
              </div>
              <button
                type="button"
                className="cookie-close-btn"
                aria-label="Close cookie banner"
                onClick={() => setOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <p className="cookie-text">
              We use necessary local storage and cookies to remember your theme preference,
              protect our public contact form with rate-limiting, and analyze anonymous site performance.
              No advertising or third-party tracking cookies are used.
            </p>

            {preferencesOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="cookie-details"
              >
                <div className="cookie-item">
                  <div className="cookie-item-info">
                    <ShieldCheck size={16} className="text-primary" />
                    <div>
                      <strong>Essential & Security (Required)</strong>
                      <span>Theme preference, form spam prevention, session tokens.</span>
                    </div>
                  </div>
                  <span className="cookie-status-badge">Always Active</span>
                </div>
                <div className="cookie-item">
                  <div className="cookie-item-info">
                    <Cookie size={16} className="text-muted-foreground" />
                    <div>
                      <strong>Analytics (Anonymous)</strong>
                      <span>Google Analytics (G-M60Q87NFF8) to track page visits anonymously.</span>
                    </div>
                  </div>
                  <span className="cookie-status-badge optional">Optional</span>
                </div>
              </motion.div>
            )}

            <div className="cookie-actions">
              <Button
                size="sm"
                className="cookie-accept-btn"
                onClick={() => saveConsent('accepted')}
              >
                <Check size={14} className="mr-1.5" /> Accept All
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="cookie-decline-btn"
                onClick={() => saveConsent('necessary-only')}
              >
                Essential Only
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="cookie-pref-btn"
                onClick={() => setPreferencesOpen(!preferencesOpen)}
              >
                {preferencesOpen ? 'Less info' : 'Customize'}
              </Button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
