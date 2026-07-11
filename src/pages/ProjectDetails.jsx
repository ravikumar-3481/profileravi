import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { updateProjectUrl } from '../utils/urlHelper';

// Helper function to resolve dynamic Devicon or FontAwesome classes based on technology names
const getTechIconClass = (techName) => {
  const name = techName.toLowerCase();
  if (name.includes('python')) return 'devicon-python-plain';
  if (name.includes('react')) return 'devicon-react-original';
  if (name.includes('javascript') || name.includes('js')) return 'devicon-javascript-plain';
  if (name.includes('html')) return 'devicon-html5-plain';
  if (name.includes('css')) return 'devicon-css3-plain';
  if (name.includes('flask')) return 'devicon-flask-original';
  if (name.includes('sql') || name.includes('mysql')) return 'devicon-mysql-plain';
  if (name.includes('streamlit')) return 'fas fa-chart-line';
  if (name.includes('power bi') || name.includes('powerbi')) return 'fas fa-chart-bar';
  if (name.includes('plotly')) return 'fas fa-chart-pie';
  if (name.includes('pandas')) return 'devicon-pandas-plain';
  if (name.includes('ai') || name.includes('nlp') || name.includes('learning')) return 'fas fa-brain';
  if (name.includes('beautifulsoup') || name.includes('scrape') || name.includes('soup')) return 'fas fa-spider';
  if (name.includes('notebook') || name.includes('jupyter')) return 'devicon-jupyter-plain';
  return 'fas fa-terminal';
};

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  // Screenshot Carousel States
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [screenshotHovered, setScreenshotHovered] = useState(false);

  // Diagram Carousel States
  const [currentDiagram, setCurrentDiagram] = useState(0);
  const [diagramDirection, setDiagramDirection] = useState(0);
  const [diagramHovered, setDiagramHovered] = useState(false);

  useEffect(() => {
    // Scroll to top on navigation load
    window.scrollTo({ top: 0, behavior: 'smooth' });

    fetch('/assets/data/projects.json')
      .then((res) => {
        if (!res.ok) throw new Error("Could not fetch project data");
        return res.json();
      })
      .then((data) => {
        const numericId = parseInt(id, 10);
        const found = data.find((p) => p.id === numericId);
        if (found) {
          setProject(found);
          updateProjectUrl(found.id, found.title);
        } else {
          setError("Project Not Found");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading project:", err);
        setError("Error loading project details");
        setLoading(false);
      });
  }, [id]);

  // Image Lists derived from fetched JSON data
  const slideImages = project?.images && project.images.length > 0 ? project.images : (project ? [project.thumbnail] : []);
  const slideDiagrams = project?.diagrams && project.diagrams.length > 0 ? project.diagrams : (project ? [project.thumbnail] : []);

  // Screenshot Carousel Autoplay Hook
  useEffect(() => {
    if (screenshotHovered || slideImages.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [screenshotHovered, slideImages.length]);

  // Diagram Carousel Autoplay Hook
  useEffect(() => {
    if (diagramHovered || slideDiagrams.length <= 1) return;
    const timer = setInterval(() => {
      setDiagramDirection(1);
      setCurrentDiagram((prev) => (prev + 1) % slideDiagrams.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [diagramHovered, slideDiagrams.length]);

  // Framer Motion Animation Settings
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const slideLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const slideRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const slideshowVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } },
    },
    exit: (dir) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: { x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } },
    }),
  };

  // Carousel Navigation Helpers
  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slideImages.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
  };

  const nextDiagram = () => {
    setDiagramDirection(1);
    setCurrentDiagram((prev) => (prev + 1) % slideDiagrams.length);
  };

  const prevDiagram = () => {
    setDiagramDirection(-1);
    setCurrentDiagram((prev) => (prev - 1 + slideDiagrams.length) % slideDiagrams.length);
  };

  // Smooth anchor scrolling helper
  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="project-detail-page-wrapper">
      <Navbar />

      {/* Ambient background decoration */}
      <div className="pd-bg-decorations">
        <div className="pd-glow-orb pd-glow-orb-1"></div>
        <div className="pd-glow-orb pd-glow-orb-2"></div>
        <div className="pd-glow-orb pd-glow-orb-3"></div>
        <div className="pd-grid-pattern"></div>
      </div>

      <main className="project-detail-page">
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '50vh' }}>
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {error}
            </motion.h2>
            <Link to="/#projects" className="pd-btn-glow primary" style={{ marginTop: '20px', display: 'inline-flex' }}>
              <i className="fas fa-arrow-left"></i> Back to Projects
            </Link>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Navigation back */}
            <motion.div className="pd-nav-back" variants={slideUp}>
              <Link to="/#projects" className="pd-back-link">
                <i className="fas fa-arrow-left"></i> Back to Projects
              </Link>
            </motion.div>

            {/* Editorial Hero Area */}
            <header className="pd-hero">
              <motion.div className="pd-category-tag" variants={slideUp}>
                <i className="fas fa-bookmark"></i> {project.category === 'ai' ? 'AI & Machine Learning' : (project.category === 'web' ? 'Full Stack Engineering' : 'Data Analytics Case Study')}
              </motion.div>

              <motion.h1 className="pd-title" variants={slideUp}>
                {project.title}
              </motion.h1>

              {/* Action Buttons Row */}
              <motion.div className="pd-hero-actions" variants={slideUp}>
                <a href={project.liveLink} target="_blank" rel="noreferrer" className="pd-btn-glow primary">
                  <i className="fas fa-external-link-alt"></i> Live Demo
                </a>
                <a href={project.codeLink} target="_blank" rel="noreferrer" className="pd-btn-glow secondary">
                  <i className="fab fa-github"></i> GitHub Source
                </a>
                {project.codeLink && (
                  <a href={project.codeLink + "/blob/main/README.md"} target="_blank" rel="noreferrer" className="pd-btn-glow secondary">
                    <i className="fas fa-file-alt"></i> Full Report
                  </a>
                )}
              </motion.div>
            </header>

            {/* Editorial Thin Info Bar */}
            <motion.section className="pd-meta-bar" variants={slideUp}>
              <div className="pd-meta-item">
                <span className="pd-meta-item-label">Focus Area</span>
                <span className="pd-meta-item-value">{project.category === 'ai' ? 'Deep Learning & NLP' : (project.category === 'web' ? 'Web Architecture' : 'Business Intelligence')}</span>
              </div>
              <div className="pd-meta-item">
                <span className="pd-meta-item-label">Primary Metric</span>
                <span className="pd-meta-item-value highlight">{project.result}</span>
              </div>
              <div className="pd-meta-item">
                <span className="pd-meta-item-label">Stack Size</span>
                <span className="pd-meta-item-value">{project.technologies.length} Technologies</span>
              </div>
            </motion.section>

            {/* Table of Contents Index Section */}
            <motion.section className="pd-toc-section" variants={slideUp}>
              <h4 className="pd-toc-title"><i className="fas fa-list-ul"></i> Table of Contents</h4>
              <ul className="pd-toc-list">
                <li className="pd-toc-item">
                  <a href="#challenge" className="pd-toc-link" onClick={(e) => handleAnchorClick(e, 'challenge')}>Problem Statement</a>
                </li>
                <li className="pd-toc-item">
                  <a href="#solution" className="pd-toc-link" onClick={(e) => handleAnchorClick(e, 'solution')}>Solution</a>
                </li>
                <li className="pd-toc-item">
                  <a href="#gallery" className="pd-toc-link" onClick={(e) => handleAnchorClick(e, 'gallery')}>Gallery</a>
                </li>
                {project.caseStudy && (
                  <li className="pd-toc-item">
                    <a href="#casestudy" className="pd-toc-link" onClick={(e) => handleAnchorClick(e, 'casestudy')}>Case Study & Process</a>
                  </li>
                )}
                {slideDiagrams.length > 0 && (
                  <li className="pd-toc-item">
                    <a href="#architecture" className="pd-toc-link" onClick={(e) => handleAnchorClick(e, 'architecture')}>System Architecture Diagrams</a>
                  </li>
                )}
                {project.milestones && project.milestones.length > 0 && (
                  <li className="pd-toc-item">
                    <a href="#milestones" className="pd-toc-link" onClick={(e) => handleAnchorClick(e, 'milestones')}>Project Milestones</a>
                  </li>
                )}
                <li className="pd-toc-item">
                  <a href="#techstack" className="pd-toc-link" onClick={(e) => handleAnchorClick(e, 'techstack')}>Used Tech</a>
                </li>
                <li className="pd-toc-item">
                  <a href="#impact" className="pd-toc-link" onClick={(e) => handleAnchorClick(e, 'impact')}>Result</a>
                </li>
              </ul>
            </motion.section>

            {/* Problem Statement (No Box Card, Blog Editorial Layout) */}
            <motion.section
              id="challenge"
              className="pd-blog-section"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={slideUp}
            >
              <h3 className="pd-blog-section-title">
                <i className="fas fa-fire-alt" style={{ color: '#ff4a4a' }}></i> Problem Statement
              </h3>
              <div className="pd-blog-text pd-problem-statement">
                <p>{project.problem}</p>
              </div>
            </motion.section>

            {/* Solution Statement (No Box Card, Blog Editorial Layout) */}
            <motion.section
              id="solution"
              className="pd-blog-section"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={slideUp}
            >
              <h3 className="pd-blog-section-title">
                <i className="fas fa-lightbulb" style={{ color: '#00f0ff' }}></i> Solution
              </h3>
              <div className="pd-blog-text pd-solution-statement">
                <p>{project.solution}</p>
              </div>
            </motion.section>

            {/* Project Gallery - Slideshow Layout */}
            <motion.section
              id="gallery"
              className="pd-slideshow-section"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={slideUp}
            >
              <h3 className="pd-blog-section-title">
                <i className="fas fa-images" style={{ color: '#9124ff' }}></i> Gallery
              </h3>
              <div 
                className="pd-slideshow-container"
                onMouseEnter={() => setScreenshotHovered(true)}
                onMouseLeave={() => setScreenshotHovered(false)}
              >
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideshowVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="pd-slideshow-slide"
                    onClick={() => setActiveImage(`/assets/img/${slideImages[currentSlide]}`)}
                  >
                    {/* Ambient Blurred Background reflection */}
                    <div
                      className="pd-slide-bg-blur"
                      style={{ backgroundImage: `url(/assets/img/${slideImages[currentSlide]})` }}
                    ></div>
                    {/* Main image focused in container */}
                    <img
                      src={`/assets/img/${slideImages[currentSlide]}`}
                      alt={`${project.title} Showcase ${currentSlide + 1}`}
                      className="pd-slide-foreground-img"
                      loading="lazy"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Slideshow Arrows */}
                {slideImages.length > 1 && (
                  <>
                    <button
                      className="pd-slideshow-arrow prev"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevSlide();
                      }}
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button
                      className="pd-slideshow-arrow next"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextSlide();
                      }}
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>

                    {/* Slideshow Dot Indicators */}
                    <div className="pd-slideshow-dots">
                      {slideImages.map((_, idx) => (
                        <span
                          key={idx}
                          className={`pd-slideshow-dot ${idx === currentSlide ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDirection(idx > currentSlide ? 1 : -1);
                            setCurrentSlide(idx);
                          }}
                        ></span>
                      ))}
                    </div>
                  </>
                )}

                <div className="pd-slideshow-caption">
                  <span>Screenshot {currentSlide + 1} of {slideImages.length} (Click to zoom)</span>
                </div>
              </div>
            </motion.section>

            {/* Case Study Details */}
            {project.caseStudy && (
              <motion.section
                id="casestudy"
                className="pd-blog-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={slideUp}
              >
                <h3 className="pd-blog-section-title">
                  <i className="fas fa-book-open" style={{ color: '#a854ff' }}></i> Case Study & Approach
                </h3>
                <div className="pd-blog-text">
                  <p>{project.caseStudy}</p>
                </div>
              </motion.section>
            )}

            {/* System Architecture Diagram Slideshow (Positioned after Case Study) */}
            {slideDiagrams.length > 0 && (
              <motion.section
                id="architecture"
                className="pd-slideshow-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={slideUp}
              >
                <h3 className="pd-blog-section-title">
                  <i className="fas fa-sitemap" style={{ color: '#00f0ff' }}></i> System Architecture Diagrams
                </h3>
                <div 
                  className="pd-slideshow-container"
                  onMouseEnter={() => setDiagramHovered(true)}
                  onMouseLeave={() => setDiagramHovered(false)}
                >
                  <AnimatePresence initial={false} custom={diagramDirection}>
                    <motion.div
                      key={currentDiagram}
                      custom={diagramDirection}
                      variants={slideshowVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="pd-slideshow-slide"
                      onClick={() => setActiveImage(`/assets/img/${slideDiagrams[currentDiagram]}`)}
                    >
                      {/* Ambient Blurred Background reflection */}
                      <div
                        className="pd-slide-bg-blur"
                        style={{ backgroundImage: `url(/assets/img/${slideDiagrams[currentDiagram]})` }}
                      ></div>
                      {/* Main image focused in container */}
                      <img
                        src={`/assets/img/${slideDiagrams[currentDiagram]}`}
                        alt={`${project.title} Diagram ${currentDiagram + 1}`}
                        className="pd-slide-foreground-img"
                        loading="lazy"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Diagram Navigation Controls */}
                  {slideDiagrams.length > 1 && (
                    <>
                      <button
                        className="pd-slideshow-arrow prev"
                        onClick={(e) => {
                          e.stopPropagation();
                          prevDiagram();
                        }}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>
                      <button
                        className="pd-slideshow-arrow next"
                        onClick={(e) => {
                          e.stopPropagation();
                          nextDiagram();
                        }}
                      >
                        <i className="fas fa-chevron-right"></i>
                      </button>

                      {/* Diagram Slideshow Dots */}
                      <div className="pd-slideshow-dots">
                        {slideDiagrams.map((_, idx) => (
                          <span
                            key={idx}
                            className={`pd-slideshow-dot ${idx === currentDiagram ? 'active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setDiagramDirection(idx > currentDiagram ? 1 : -1);
                              setCurrentDiagram(idx);
                            }}
                          ></span>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="pd-slideshow-caption">
                    <span>Architecture Diagram {currentDiagram + 1} of {slideDiagrams.length} (Click to zoom)</span>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Milestones Timeline (Milestone Data loaded from JSON) */}
            {project.milestones && project.milestones.length > 0 && (
              <motion.section
                id="milestones"
                className="pd-blog-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={slideUp}
              >
                <h3 className="pd-blog-section-title">
                  <i className="fas fa-tasks" style={{ color: '#00f0ff' }}></i> Engineering Milestones & Project Phases
                </h3>
                <div className="pd-editorial-timeline">
                  {project.milestones.map((m, idx) => (
                    <motion.div
                      key={idx}
                      className="pd-timeline-step"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={idx % 2 === 0 ? slideLeft : slideRight}
                    >
                      <div className="pd-timeline-step-dot"></div>
                      <div className="pd-timeline-step-content">
                        {/* Splitting title and description if mapped as "Phase XX - Description" */}
                        {m.includes(' — ') ? (
                          <>
                            <h4>{m.split(' — ')[0]}</h4>
                            <p>{m.split(' — ')[1]}</p>
                          </>
                        ) : m.includes(': ') ? (
                          <>
                            <h4>{m.split(': ')[0]}</h4>
                            <p>{m.split(': ')[1]}</p>
                          </>
                        ) : (
                          <>
                            <h4>Phase 0{idx + 1}</h4>
                            <p>{m}</p>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Technology Integration */}
            <motion.section
              id="techstack"
              className="pd-blog-section"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={slideUp}
            >
              <h3 className="pd-blog-section-title">
                <i className="fas fa-laptop-code" style={{ color: '#ff007a' }}></i> Used Tech
              </h3>
              <div className="pd-tech-tags-flow">
                {project.technologies.map((tech, idx) => (
                  <motion.span
                    key={idx}
                    className="pd-tech-tag-badge"
                    whileHover={{ y: -2 }}
                    variants={slideUp}
                  >
                    <i className={getTechIconClass(tech)}></i>
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.section>

            {/* Final outcome banner */}
            <motion.section
              id="impact"
              className="pd-blog-section"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={slideUp}
            >
              <div className="pd-impact-editorial">
                <span className="pd-impact-editorial-metric">{project.result}</span>
                <h4>Result</h4>
                <p>{project.result1}</p>
              </div>
            </motion.section>

            {/* CTA panel back link */}
            <motion.div className="pd-footer-back" variants={slideUp}>
              <Link to="/#projects" className="pd-btn-glow secondary">
                <i className="fas fa-arrow-left"></i> Return to Projects Showroom
              </Link>
            </motion.div>
          </motion.div>
        )}
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="pd-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <button className="pd-lightbox-close" onClick={() => setActiveImage(null)}>
              <i className="fas fa-times"></i>
            </button>
            <motion.div
              className="pd-lightbox-img-wrapper"
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={activeImage} alt="Fullscreen expanded display" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
