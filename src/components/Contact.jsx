import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: false })); // clear error on change
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Clear errors first to force CSS animation replay on repeat clicks
    setErrors({ name: false, email: false, subject: false, message: false });

    // Use requestAnimationFrame to ensure the DOM updates before re-setting errors
    const newErrors = {
      name: !formData.name || formData.name.trim() === '',
      email: !formData.email || !emailRegex.test(formData.email),
      subject: !formData.subject || formData.subject === '',
      message: !formData.message || formData.message.trim() === ''
    };

    const hasErrors = Object.values(newErrors).some(val => val === true);

    if (hasErrors) {
      requestAnimationFrame(() => {
        setErrors(newErrors);
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSending(true);

    try {
      const response = await fetch('https://formspree.io/f/xvgqzalg', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Network error. Please check your connection.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <motion.div 
        className="section-tittle"
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Get In Touch</h1>
        <div className="tittle-under"></div>
        <p className="section-description">Have a project in mind or just want to say hi? Feel free to reach out!</p>
      </motion.div>

      <div className="contact-container">
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '10px' }}>Let's Connect</h3>
          <p style={{ color: '#aaa', marginBottom: '30px', fontSize: '1rem', lineHeight: '1.6' }}>
            Feel free to reach out to me via email or connect with me on these platforms!
          </p>
          <div className="social-links-grid">
            <a href="https://github.com/ravikumar-3481" target="_blank" rel="noreferrer" className="social-link-item">
              <i className="fa-brands fa-github"></i><span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/ravi-vishwakarma67" target="_blank" rel="noreferrer" className="social-link-item">
              <i className="fa-brands fa-linkedin"></i><span>LinkedIn</span>
            </a>
            <a href="https://leetcode.com/u/ravivish3481/" target="_blank" rel="noreferrer" className="social-link-item">
              <iconify-icon icon="simple-icons:leetcode"></iconify-icon><span>LeetCode</span>
            </a>
            <a href="https://www.kaggle.com/ravivishwakarma0909" target="_blank" rel="noreferrer" className="social-link-item">
              <iconify-icon icon="simple-icons:kaggle"></iconify-icon><span>Kaggle</span>
            </a>
            <a href="mailto:ravivish968@gmail.com" className="social-link-item">
              <iconify-icon icon="simple-icons:gmail"></iconify-icon><span>Email</span>
            </a>
            <a href="#" className="social-link-item" onClick={(e) => { e.preventDefault(); alert("Discord link coming soon!"); }}>
              <iconify-icon icon="simple-icons:discord"></iconify-icon><span>Discord</span>
            </a>
            <a href="https://topmate.io/ravi_vishwakarma0" target="_blank" rel="noreferrer" className="social-link-item">
              <iconify-icon icon="simple-icons:topmate"></iconify-icon><span>Topmate</span>
            </a>
            <a href="https://x.com/I_am_ravi09" target="_blank" rel="noreferrer" className="social-link-item">
              <iconify-icon icon="simple-icons:x"></iconify-icon><span>X</span>
            </a>
            <a href="https://www.instagram.com/i_am_ravi.07" target="_blank" rel="noreferrer" className="social-link-item">
              <i className="fa-brands fa-instagram"></i><span>Instagram</span>
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="contact-form-wrapper"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          {/* Decorative glowing background SVG */}
          <div className="contact-svg-bg">
            <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#glow)">
                <path d="M-50 350 C 100 200, 200 450, 450 150" stroke="#9124ff" strokeWidth="2" strokeLinecap="round" opacity="0.15" />
                <path d="M-20 330 C 130 230, 170 410, 420 170" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" opacity="0.1" />
              </g>
              <defs>
                <filter id="glow" x="-100" y="-100" width="600" height="600" filterUnits="userSpaceOnUse">
                  <feGaussianBlur stdDeviation="30" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>

          <form id="contact-form" onSubmit={handleSubmit}>
            <div className={`form-group-svg ${errors.name ? 'error' : ''}`}>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder=" " 
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
              <label htmlFor="name">Your Name</label>
              <svg className="input-svg-line" viewBox="0 0 100 2" preserveAspectRatio="none">
                <path className="base-path" d="M 0,1 L 100,1" />
                <path className="active-path" d="M 50,1 L 0,1 M 50,1 L 100,1" />
              </svg>
              <span className="error-message">
                <svg className="error-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                Please enter your name
              </span>
            </div>

            <div className={`form-group-svg ${errors.email ? 'error' : ''}`}>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder=" " 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
              <label htmlFor="email">Email Address</label>
              <svg className="input-svg-line" viewBox="0 0 100 2" preserveAspectRatio="none">
                <path className="base-path" d="M 0,1 L 100,1" />
                <path className="active-path" d="M 50,1 L 0,1 M 50,1 L 100,1" />
              </svg>
              <span className="error-message">
                <svg className="error-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                Please enter a valid email
              </span>
            </div>

            <div className={`form-group-svg ${errors.subject ? 'error' : ''}`}>
              <select 
                id="subject" 
                name="subject" 
                value={formData.subject}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled></option>
                <option value="general Inquiry">General Inquiry</option>
                <option value="work with us">Work With Us</option>
                <option value="for hire me">For Hire me</option>
                <option value="support">Support</option>
                <option value="other">Other</option>
              </select>
              <label htmlFor="subject">Subject</label>
              <svg className="input-svg-line" viewBox="0 0 100 2" preserveAspectRatio="none">
                <path className="base-path" d="M 0,1 L 100,1" />
                <path className="active-path" d="M 50,1 L 0,1 M 50,1 L 100,1" />
              </svg>
              <span className="error-message">
                <svg className="error-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                Please select a subject
              </span>
            </div>

            <div className={`form-group-svg ${errors.message ? 'error' : ''}`}>
              <textarea 
                id="message" 
                name="message" 
                placeholder=" " 
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
              <label htmlFor="message">Your Message</label>
              <svg className="input-svg-line" viewBox="0 0 100 2" preserveAspectRatio="none">
                <path className="base-path" d="M 0,1 L 100,1" />
                <path className="active-path" d="M 50,1 L 0,1 M 50,1 L 100,1" />
              </svg>
              <span className="error-message">
                <svg className="error-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                Please enter your message
              </span>
            </div>

            <button type="submit" className="submit-btn" disabled={isSending}>
              <span>{isSending ? 'Sending...' : 'Send Message'}</span>
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>

          <div className={`success-message ${showSuccess ? 'active' : ''}`} id="successMsg">
            <div className="success-content">
              <div className="success-icon-svg-wrapper">
                <svg className="success-svg-animated" viewBox="0 0 52 52">
                  <circle className="success-circle-path" cx="26" cy="26" r="25" fill="none" />
                  <path className="success-check-path" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
              </div>
              <h2>Message Sent!</h2>
              <p>I've received your message and will get back to you soon.</p>
              <button className="btn1" onClick={() => setShowSuccess(false)}>Close</button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
