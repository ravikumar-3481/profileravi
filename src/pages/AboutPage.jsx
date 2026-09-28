import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import ResumePopup from '../components/ResumePopup';
import '../styles/aboutpage.css';

// Framer motion animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
      delay: custom * 0.08
    }
  })
};

const popSlide = {
  hidden: { opacity: 0, scale: 0.95, y: 18 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      delay: custom * 0.1
    }
  })
};

export default function AboutPage() {
  const [copiedItem, setCopiedItem] = useState(null);
  const [showResume, setShowResume] = useState(false);
  const [ledgerOpen, setLedgerOpen] = useState(true);

  useEffect(() => {
    // SEO Page Title
    document.title = "About Me | Ravi Kumar Vishwakarma | Broadsheet Edition";
    window.scrollTo({ top: 0, behavior: 'instant' });

    // SEO Meta description dynamic tag
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Official About page for Ravi Kumar Vishwakarma. B.Tech Computer Science student specializing in Artificial Intelligence and Data Science at AKS University. Contact, biography, and academic journey.'
      );
    }

    // AIO / AEO: Inject Structured Schema.org JSON-LD
    const scriptId = 'about-schema-jsonld';
    let existingScript = document.getElementById(scriptId);
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "ProfilePage",
            "@id": "https://profileravi.vercel.app/about",
            "url": "https://profileravi.vercel.app/about",
            "name": "About Ravi Kumar Vishwakarma - Broadsheet Edition",
            "isPartOf": {
              "@type": "WebSite",
              "@id": "https://profileravi.vercel.app/#website",
              "name": "Ravi Kumar Vishwakarma Portfolio",
              "url": "https://profileravi.vercel.app/"
            },
            "about": {
              "@id": "https://profileravi.vercel.app/#person"
            }
          },
          {
            "@type": "Person",
            "@id": "https://profileravi.vercel.app/#person",
            "name": "Ravi Kumar Vishwakarma",
            "givenName": "Ravi",
            "familyName": "Vishwakarma",
            "jobTitle": "Artificial Intelligence & Data Science Engineer / Scholar",
            "email": "ravivish968@gmail.com",
            "telephone": "+916260013481",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Satna",
              "addressRegion": "Madhya Pradesh",
              "addressCountry": "India"
            },
            "alumniOf": [
              {
                "@type": "EducationalOrganization",
                "name": "AKS University Satna",
                "url": "https://www.aksuniversity.ac.in",
                "department": "Department of Computer Science & Engineering"
              },
              {
                "@type": "EducationalOrganization",
                "name": "PMS GHSS Karhi"
              }
            ],
            "hasCredential": [
              {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "degree",
                "educationalLevel": "Bachelor of Technology",
                "name": "B.Tech in Computer Science & Engineering (Specialization: AI & Data Science)",
                "recognizedBy": {
                  "@type": "EducationalOrganization",
                  "name": "AKS University Satna"
                }
              }
            ],
            "knowsAbout": [
              "Artificial Intelligence",
              "Machine Learning",
              "Data Science",
              "Applied Mathematics",
              "Deep Learning",
              "Python Architecture",
              "Data Analysis"
            ],
            "sameAs": [
              "https://github.com/ravikumar-3481",
              "https://www.linkedin.com/in/ravi-vishwakarma67",
              "https://leetcode.com/u/ravivish3481/",
              "https://www.kaggle.com/ravivishwakarma0909",
              "https://x.com/ravikumar3481",
              "https://www.instagram.com/i_am_ravi.07",
              "https://topmate.io/ravi_vishwakarma0"
            ]
          }
        ]
      });
      document.head.appendChild(script);
    }

    return () => {
      const injected = document.getElementById(scriptId);
      if (injected) injected.remove();
    };
  }, []);

  // Copy to clipboard helper with toast
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => {
      setCopiedItem(null);
    }, 2400);
  };

  return (
    <div className="editorial-about-page">
      {/* Exact Home Page Background: Animated Perspective Purple Grid */}
      <div className="grid-pattern-container">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(145, 36, 255, 0.35)" strokeWidth="0.5"/>
            </pattern>
            <pattern id="grid" width="160" height="160" patternUnits="userSpaceOnUse">
              <rect width="160" height="160" fill="url(#smallGrid)"/>
              <path d="M 160 0 L 0 0 0 160" fill="none" stroke="rgba(145, 36, 255, 0.5)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="transparent">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="6s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>

      {/* Exact Home Page Background: Signature Purple Radial Glows */}
      <div className="hero-glow-bg"></div>
      <div className="hero-glow-bg-secondary"></div>

      {/* Standard Site Navbar Component */}
      <Navbar />

      {/* Broadsheet Newspaper Card Container */}
      <main className="broadsheet-wrapper">
        <motion.article 
          className="broadsheet-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ========================================================
              1. MASTHEAD TOP BANNER (Special Edition | hello | 2026)
              Matches Reference Image Layout
              ======================================================== */}
          <header className="broadsheet-header">
            <div className="broadsheet-top-line">
              <motion.div 
                className="top-edition-tag"
                custom={1}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                Special Edition
              </motion.div>

              <motion.div 
                className="top-hello-wrap"
                custom={2}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <div className="hello-rule"></div>
                <span className="top-hello-script">hello</span>
                <div className="hello-rule"></div>
              </motion.div>

              <motion.div 
                className="top-edition-year"
                custom={3}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                2026
              </motion.div>
            </div>

            {/* Classic double horizontal rule: thick over thin */}
            <div className="broadsheet-double-rule" aria-hidden="true">
              <div className="rule-thick"></div>
              <div className="rule-thin"></div>
            </div>

            {/* Giant Center Title: "about me" in stylized Blackletter */}
            <div className="broadsheet-main-title">
              <motion.h1 
                className="blackletter-title"
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                about me
              </motion.h1>
            </div>

            {/* Heavy dividing rule below "about me" */}
            <div className="broadsheet-divider-solid" aria-hidden="true"></div>
          </header>

          {/* ========================================================
              2. MAIN BODY THREE-ZONE GRID (Left / Center / Far-Right)
              Exact layout as shown in reference image
              ======================================================== */}
          <div className="broadsheet-main-grid">

            {/* ------------------------------------------------------
                LEFT COLUMN: Monochrome Portrait + Framed "contact me"
                ------------------------------------------------------ */}
            <aside className="broadsheet-col-left">
              {/* Portrait Photo Frame */}
              <motion.div 
                className="broadsheet-portrait-frame"
                custom={1}
                variants={popSlide}
                initial="hidden"
                animate="visible"
              >
                <img 
                  src="/og/img1.webp" 
                  alt="Ravi Kumar Vishwakarma - AI Engineer & Data Science Scholar" 
                  className="portrait-photo-img"
                  loading="eager"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/img/pm.webp";
                  }}
                />
                <div className="portrait-status-overlay">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <span className="status-dot-active"></span>
                    <span className="status-label-text">Available For Work</span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#a1a1aa', fontFamily: 'Space Grotesk' }}>
                    SATNA, IN
                  </span>
                </div>
              </motion.div>

              {/* Contact Me Box (Matches the ornate bracketed box in image) */}
              <motion.div 
                className="broadsheet-contact-card"
                custom={2}
                variants={popSlide}
                initial="hidden"
                animate="visible"
              >
                <h3 className="contact-card-title">contact me</h3>
                <div className="contact-dashed-divider"></div>

                <address className="contact-items-list" style={{ fontStyle: 'normal' }}>
                  {/* GitHub Handle */}
                  <a 
                    href="https://github.com/ravikumar-3481" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-interactive-pill"
                    title="Open GitHub profile"
                  >
                    <span className="contact-pill-left">
                      <i className="fa-brands fa-github"></i>
                      <span>@ravikumar-3481</span>
                    </span>
                    <span className="contact-copy-indicator">visit</span>
                  </a>

                  {/* Email with direct click-to-copy */}
                  <button 
                    onClick={() => handleCopy("ravivish968@gmail.com", "Email Address")}
                    className="contact-interactive-pill"
                    title="Click to copy email address"
                  >
                    <span className="contact-pill-left">
                      <i className="fa-regular fa-envelope"></i>
                      <span>ravivish968@gmail.com</span>
                    </span>
                    <span className="contact-copy-indicator">copy</span>
                  </button>

                  {/* Phone number */}
                  <button 
                    onClick={() => handleCopy("+91 6260013481", "Phone Number")}
                    className="contact-interactive-pill"
                    title="Click to copy phone number"
                  >
                    <span className="contact-pill-left">
                      <i className="fa-solid fa-phone"></i>
                      <span>+91 6260013481</span>
                    </span>
                    <span className="contact-copy-indicator">call</span>
                  </button>

                  {/* Location */}
                  <div className="contact-interactive-pill" style={{ cursor: 'default' }}>
                    <span className="contact-pill-left">
                      <i className="fa-solid fa-location-dot"></i>
                      <span>India</span>
                    </span>
                    <span className="contact-copy-indicator" style={{ background: 'rgba(255,255,255,0.06)', color: '#a1a1aa' }}>remote</span>
                  </div>
                </address>

                {/* Social media connections */}
                <div className="contact-social-row">
                  <a 
                    href="https://www.linkedin.com/in/ravi-vishwakarma67" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-social-btn"
                    title="LinkedIn"
                  >
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a 
                    href="https://github.com/ravikumar-3481" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-social-btn"
                    title="GitHub"
                  >
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a 
                    href="https://leetcode.com/u/ravivish3481/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-social-btn"
                    title="LeetCode Profile"
                  >
                    <i className="fa-solid fa-code"></i>
                  </a>
                  <a 
                    href="https://www.kaggle.com/ravivishwakarma0909" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-social-btn"
                    title="Kaggle Profile"
                  >
                    <i className="fa-brands fa-kaggle"></i>
                  </a>
                  <a 
                    href="https://x.com/ravikumar3481" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-social-btn"
                    title="X / Twitter"
                  >
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                  <a 
                    href="https://topmate.io/ravi_vishwakarma0" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-social-btn"
                    title="Book Topmate Session"
                  >
                    <i className="fa-solid fa-calendar-check"></i>
                  </a>
                </div>
              </motion.div>

              {/* Action Buttons: Resume & Share below Contact Box */}
              <motion.div 
                className="broadsheet-actions-row"
                custom={3}
                variants={popSlide}
                initial="hidden"
                animate="visible"
              >
                <button 
                  onClick={() => setShowResume(true)}
                  className="btn-editorial-primary left-col-action"
                  title="Inspect official Resume"
                >
                  <i className="fa-solid fa-file-lines"></i>
                  <span>Resume</span>
                </button>
                <button 
                  onClick={() => handleCopy(window.location.href, 'Broadsheet Link')}
                  className="btn-editorial-secondary left-col-share"
                  title="Share this editorial edition"
                >
                  <i className="fa-solid fa-share-nodes"></i>
                  <span>Share</span>
                </button>
              </motion.div>
            </aside>

            {/* ------------------------------------------------------
                CENTER COLUMN: "Who am I?" + Biography + Academic Journey
                (Strictly personal & educational details - NO projects)
                ------------------------------------------------------ */}
            <section className="broadsheet-col-center">
              {/* Editorial Headline: "Who am I?" */}
              <motion.h2 
                className="editorial-headline"
                custom={1}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                Who am I?
              </motion.h2>

              {/* Editorial Paragraphs (Text justified in newspaper style) */}
              <div className="editorial-paragraphs">
                <motion.p 
                  className="editorial-body-p has-drop-cap"
                  custom={2}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                >
                  I am a computer science scholar and engineering thinker specializing in Artificial Intelligence and Data Science. Driven by a deep curiosity for how computational models interpret the world, I approach technology not as mere code, but as a medium for structured reasoning and human empowerment. My daily practice centers on mathematical modeling, algorithmic integrity, and designing systems where every decision feels natural, intentional, and robust.
                </motion.p>

                <motion.p 
                  className="editorial-body-p"
                  custom={3}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                >
                  Over the course of my academic journey, I have developed an obsession with the subtle boundary where raw data transforms into actionable intelligence. Whether dissecting high-dimensional matrices, training neural models, or architecting scalable data processing pipelines, I believe in rigorous fundamentals: clean mathematics, reproducible science, and deliberate architecture that respects user trust and ethical boundaries.
                </motion.p>

                {/* Editorial Pull Quote */}
                <motion.blockquote 
                  className="editorial-pull-quote"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <p>
                    "Designing with intention, engineering with mathematical rigor, and transforming complex data into intuitive, human-centered systems."
                  </p>
                  <cite>— Ravi Kumar Vishwakarma · Personal Creed</cite>
                </motion.blockquote>

                <motion.p 
                  className="editorial-body-p"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Beyond the terminal, I invest my time exploring advancements in agentic intelligence, participating in competitive algorithmic problem-solving on LeetCode, publishing data investigations on Kaggle, and mentoring peers on foundational data structures. I approach every challenge with humility, persistent focus, and the conviction that continuous craftsmanship produces lasting impact.
                </motion.p>
              </div>

              {/* ====================================================
                  ACADEMIC MILESTONES & CREDENTIALS
                  (Description removed - only Institute, Grades, Duration, Skills, Courses)
                  ==================================================== */}
              <motion.section 
                className="academic-editorial-section"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65 }}
              >
                <div className="academic-editorial-title">
                  <h3 className="academic-title-text">Educational Background</h3>
                  <span className="academic-title-badge">Curriculum Vitae</span>
                </div>

                <div className="education-cards-stack">
                  {/* Card 1: AKS University */}
                  <div className="edu-editorial-card">
                    <div className="edu-card-top-row">
                      <div>
                        <h4 className="edu-degree-name">B.Tech in Computer Science & Engineering</h4>
                        <div className="edu-institute-row">
                          <i className="fa-solid fa-graduation-cap"></i>
                          <span>AKS University Satna</span>
                        </div>
                      </div>

                      <div className="edu-meta-badges">
                        <span className="edu-duration-badge">2025 – 2029 (Ongoing)</span>
                        <span className="edu-score-badge">CGPA: 6.7</span>
                      </div>
                    </div>

                    {/* Courses */}
                    <div className="edu-attribute-group">
                      <div className="edu-attribute-header">
                        <i className="fa-solid fa-book-open"></i>
                        <span>Courses & Specialization:</span>
                      </div>
                      <div className="edu-chips-wrap">
                        <span className="edu-chip-course">AI & Data Science</span>
                        <span className="edu-chip-course">AI & Machine Learning</span>
                        <span className="edu-chip-course">Neural Networks</span>
                        <span className="edu-chip-course">Data Structures & Algorithms</span>
                        <span className="edu-chip-course">Applied Statistics</span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="edu-attribute-group">
                      <div className="edu-attribute-header">
                        <i className="fa-solid fa-code"></i>
                        <span>Skills & Technologies:</span>
                      </div>
                      <div className="edu-chips-wrap">
                        <span className="edu-chip-skill">Python</span>
                        <span className="edu-chip-skill">React</span>
                        <span className="edu-chip-skill">Java</span>
                        <span className="edu-chip-skill">Data Analytics</span>
                        <span className="edu-chip-skill">System Architecture</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: PMS GHSS Karhi */}
                  <div className="edu-editorial-card">
                    <div className="edu-card-top-row">
                      <div>
                        <h4 className="edu-degree-name">Higher Secondary Certificate (Class XII)</h4>
                        <div className="edu-institute-row">
                          <i className="fa-solid fa-school"></i>
                          <span>PMS GHSS Karhi</span>
                        </div>
                      </div>

                      <div className="edu-meta-badges">
                        <span className="edu-duration-badge">2023 – 2025</span>
                        <span className="edu-score-badge">Score: 7.9 / 10</span>
                      </div>
                    </div>

                    {/* Courses */}
                    <div className="edu-attribute-group">
                      <div className="edu-attribute-header">
                        <i className="fa-solid fa-book-open"></i>
                        <span>Courses & Subjects:</span>
                      </div>
                      <div className="edu-chips-wrap">
                        <span className="edu-chip-course">Mathematics</span>
                        <span className="edu-chip-course">Physics</span>
                        <span className="edu-chip-course">Computer Science</span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="edu-attribute-group">
                      <div className="edu-attribute-header">
                        <i className="fa-solid fa-code"></i>
                        <span>Skills & Competencies:</span>
                      </div>
                      <div className="edu-chips-wrap">
                        <span className="edu-chip-skill">AI Fundamentals</span>
                        <span className="edu-chip-skill">Calculus</span>
                        <span className="edu-chip-skill">Critical Thinking</span>
                        <span className="edu-chip-skill">Analytical Problem Solving</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Extra Unique Component 1: Interactive Broadsheet Seal & Philosophy */}
              <motion.div 
                className="editorial-extras-container"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
              >
                <div className="extras-philosophy-box">
                  <span className="extras-philosophy-title">Guiding Principles</span>
                  <p className="extras-philosophy-p">
                    "Precision in logic, empathy in design, and relentless dedication to truth in data."
                  </p>
                </div>

                {/* 3D Wax Seal with interactive tilt */}
                <motion.div 
                  className="editorial-wax-seal"
                  whileHover={{ scale: 1.1, rotate: 12 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowResume(true)}
                  title="Click to view full credential document"
                >
                  <span className="seal-icon">✦</span>
                  <span className="seal-text-top">Verified</span>
                  <span className="seal-text-bottom">SCHOLAR</span>
                </motion.div>
              </motion.div>

              {/* Extra Unique Component 2: Recruiter & AI Search Factsheet (AEO / AIO optimization) */}
              <motion.section 
                className="recruiter-aeo-ledger"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
              >
                <div 
                  className="aeo-ledger-header"
                  onClick={() => setLedgerOpen(!ledgerOpen)}
                  role="button"
                  tabIndex={0}
                >
                  <span className="aeo-ledger-title">
                    <i className="fa-solid fa-bolt" style={{ color: '#a855f7' }}></i>
                    Quick Facts & Recruiter Ledger (AIO / AEO)
                  </span>
                  <i className={`fa-solid ${ledgerOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ color: '#71717a', fontSize: '0.8rem' }}></i>
                </div>

                <AnimatePresence>
                  {ledgerOpen && (
                    <motion.div 
                      className="aeo-ledger-grid"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                    >
                      <div className="aeo-fact-item">
                        <span className="aeo-fact-label">Full Name</span>
                        <span className="aeo-fact-value">Ravi Kumar Vishwakarma</span>
                      </div>
                      <div className="aeo-fact-item">
                        <span className="aeo-fact-label">Current Role / Status</span>
                        <span className="aeo-fact-value">B.Tech CSE (AI & Data Science) Student</span>
                      </div>
                      <div className="aeo-fact-item">
                        <span className="aeo-fact-label">Academic Institution</span>
                        <span className="aeo-fact-value">AKS University Satna (2025-2029)</span>
                      </div>
                      <div className="aeo-fact-item">
                        <span className="aeo-fact-label">Core Competencies</span>
                        <span className="aeo-fact-value">Machine Learning, Python, Data Analytics, Applied Mathematics</span>
                      </div>
                      <div className="aeo-fact-item">
                        <span className="aeo-fact-label">Primary Location</span>
                        <span className="aeo-fact-value">Satna, Madhya Pradesh, India (Open to Remote Worldwide)</span>
                      </div>
                      <div className="aeo-fact-item">
                        <span className="aeo-fact-label">Direct Communication</span>
                        <span className="aeo-fact-value">ravivish968@gmail.com · +91 6260013481</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>

            </section>

            {/* ------------------------------------------------------
                FAR-RIGHT COLUMN: Giant Vertical Typography
                Matches "OLIVIA WILSON" in the reference image
                ------------------------------------------------------ */}
            <aside className="broadsheet-col-right">
              {/* Fine vertical hairline rule dividing the right zone */}
              <div className="broadsheet-vertical-rule" aria-hidden="true"></div>

              <div className="vertical-name-container">
                <motion.h2 
                  className="vertical-name-text"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.35 }}
                >
                  RAVI VISHWAKARMA
                </motion.h2>
              </div>
            </aside>

          </div>

          {/* ========================================================
              3. BOTTOM FOLIO / FOOTER (Matches www.reallygreatsite.com - 01)
              ======================================================== */}
          <footer className="broadsheet-footer">
            <div className="broadsheet-footer-rule" aria-hidden="true"></div>
            <div className="broadsheet-footer-line">
              <Link to="/" className="footer-site-link">
                <i className="fa-solid fa-arrow-left" style={{ fontSize: '0.8rem' }}></i>
                <span>www.profileravi.vercel.app</span>
              </Link>
              
              <span className="footer-edition-badge">
                SPECIAL BROADSHEET EDITION · VOLUME I · CURRICULUM VITAE
              </span>

              <span className="footer-page-num">
                01
              </span>
            </div>
          </footer>

        </motion.article>
      </main>

      {/* Toast popup feedback when copying info */}
      <AnimatePresence>
        {copiedItem && (
          <motion.div 
            className="editorial-toast"
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            transition={{ duration: 0.25 }}
          >
            <i className="fa-solid fa-circle-check" style={{ color: '#a855f7' }}></i>
            <span>{copiedItem} copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Curriculum Vitae Modal */}
      <AnimatePresence>
        {showResume && (
          <ResumePopup onClose={() => setShowResume(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
