import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { slugify } from '../utils/urlHelper';

/* ── animation presets ── */
const ease = [0.22, 1, 0.36, 1];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease } },
};

/* ── helpers ── */
const categoryLabel = (cat) => {
  if (cat === 'ai') return 'AI / NLP';
  if (cat === 'web') return 'Web Application';
  return 'Data Analytics';
};

/** Build GitHub README URL from repo link */
const getReadmeUrl = (project) => {
  const base = project.reportLink || project.codeLink;
  if (!base || base === '#') return null;
  // already a github repo root → append README
  const cleaned = base.replace(/\/$/, '');
  if (cleaned.includes('github.com') && !cleaned.includes('/blob/')) {
    return `${cleaned}/blob/main/README.md`;
  }
  return cleaned;
};

const Section = ({ children, className = '', id, delay = 0 }) => {
  const reduce = useReducedMotion();
  return (
    <motion.section
      id={id}
      className={`pd-section ${className}`}
      variants={reduce ? undefined : reveal}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
      transition={reduce ? undefined : { delay }}
    >
      {children}
    </motion.section>
  );
};

export default function ProjectDetails() {
  const { id } = useParams();
  const location = useLocation();

  const parseId = (val) => {
    if (!val) return null;
    const clean = String(val).replace(/^proj_/, '');
    const num = parseInt(clean.split('-')[0], 10);
    return isNaN(num) ? null : num;
  };

  const targetId = parseId(id);
  const initialProject = location.state?.project && location.state.project.id === targetId
    ? location.state.project
    : null;

  const [project, setProject] = useState(initialProject);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(!initialProject);
  const [error, setError] = useState(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    fetch('/assets/data/projects.json')
      .then((res) => {
        if (!res.ok) throw new Error('Could not load projects');
        return res.json();
      })
      .then((data) => {
        const found = data.find((item) => item.id === targetId);
        if (!found) throw new Error('Project not found');
        setProjects(data);
        setProject(found);
        document.title = found.title;
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || 'Failed to load project');
      })
      .finally(() => setLoading(false));
  }, [id, targetId]);

  useEffect(() => {
    if (project?.title) {
      document.title = project.title;
    }
  }, [project?.title]);

  useEffect(() => {
    return () => {
      document.title = "Ravi Kumar Vishwakarma | AI & Data Science | Portfolio";
    };
  }, []);

  const nextProject = useMemo(() => {
    if (!project || !projects.length) return null;
    const idx = projects.findIndex((p) => p.id === project.id);
    return projects[(idx + 1) % projects.length];
  }, [project, projects]);

  const media = useMemo(() => {
    if (!project) return [];
    const imgs = project.images?.length ? project.images : [project.thumbnail];
    const diags = project.diagrams?.length ? project.diagrams : [];
    const seen = new Set();
    return [...imgs, ...diags].filter((src) => {
      if (seen.has(src)) return false;
      seen.add(src);
      return true;
    });
  }, [project]);

  const readmeUrl = project ? getReadmeUrl(project) : null;
  const hasLive = project?.liveLink && project.liveLink !== '#';



  return (
    <div className="pd-page">
      <Navbar />

      <main className="pd-main">
        {loading && (
          <div className="pd-state" role="status">
            <div className="pd-loader" />
            <span className="pd-state-label">Loading project</span>
          </div>
        )}

        {error && (
          <div className="pd-state">
            <h1>Project unavailable</h1>
            <p>{error}</p>
            <Link to="/#projects" className="pd-btn pd-btn-solid">
              Back to projects
            </Link>
          </div>
        )}

        {project && (
          <div className="pd-content">
            {/* ════════ TOP BAR ════════ */}
            <motion.div
              className="pd-topbar"
              variants={reduce ? undefined : fade}
              initial={reduce ? false : 'hidden'}
              animate={reduce ? false : 'visible'}
            >
              <Link to="/#projects" className="pd-back">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Projects
              </Link>
              <span className="pd-badge">{categoryLabel(project.category)}</span>
            </motion.div>

            {/* ════════ HERO ════════ */}
            <motion.header
              className="pd-hero"
              variants={reduce ? undefined : stagger}
              initial={reduce ? false : 'hidden'}
              animate={reduce ? false : 'visible'}
            >
              <motion.p className="pd-kicker" variants={reveal}>
                Case study · {String(project.id).padStart(2, '0')}
              </motion.p>
              <motion.h1 className="pd-title" variants={reveal}>
                {project.title}
              </motion.h1>
              <motion.p className="pd-impact" variants={reveal}>
                {project.result}
              </motion.p>

              <motion.div className="pd-actions" variants={reveal}>
                {hasLive && (
                  <a href={project.liveLink} target="_blank" rel="noreferrer" className="pd-btn pd-btn-solid">
                    Live demo
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
                {project.codeLink && (
                  <a href={project.codeLink} target="_blank" rel="noreferrer" className="pd-btn">
                    Source
                  </a>
                )}
                {readmeUrl && (
                  <a href={readmeUrl} target="_blank" rel="noreferrer" className="pd-btn pd-btn-report">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 2.5h7.5L14 6v7.5H3V2.5z" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M10.5 2.5V6H14" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M5.5 9h5M5.5 11.5h3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    Report
                  </a>
                )}
              </motion.div>
            </motion.header>

         

            {/* ════════ COVER ════════ */}
            <Section className="pd-cover-wrap">
              <figure className="pd-cover">
                <img
                  src={`/assets/img/${project.thumbnail}`}
                  alt={`${project.title} overview`}
                  style={{ viewTransitionName: `project-artifact-${project.id}` }}
                />
              </figure>
            </Section>

            {/* ════════ PROBLEM / SOLUTION ════════ */}
            <Section id="brief" className="pd-split">
              <div className="pd-split-col">
                <h2 className="pd-label">Problem</h2>
                <p className="pd-text">{project.problem}</p>
              </div>
              <div className="pd-split-col">
                <h2 className="pd-label">Solution</h2>
                <p className="pd-text">{project.solution}</p>
              </div>
            </Section>

            {/* ════════ OUTCOME ════════ */}
            {(project.result1 || project.caseStudy) && (
              <Section id="outcome" className="pd-outcome">
                <h2 className="pd-label">Outcome</h2>
                {project.result1 && <p className="pd-lede">{project.result1}</p>}
                {project.caseStudy && <p className="pd-text pd-text-spaced">{project.caseStudy}</p>}
              </Section>
            )}

            {/* ════════ TECH ════════ */}
            {project.technologies?.length > 0 && (
              <Section id="stack" className="pd-stack">
                <h2 className="pd-label">Tech stack</h2>
                <ul className="pd-tech">
                  {project.technologies.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Section>
            )}

            {/* ════════ TIMELINE ════════ */}
            {project.milestones?.length > 0 && (
              <Section id="timeline" className="pd-timeline-section">
                <h2 className="pd-label">Build timeline</h2>
                <ol className="pd-timeline">
                  {project.milestones.map((item, i) => (
                    <li key={i}>
                      <span className="pd-tl-num">{String(i + 1).padStart(2, '0')}</span>
                      <div className="pd-tl-body">
                        <span className="pd-tl-text">{item}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </Section>
            )}

            {/* ════════ CHALLENGES ════════ */}
            {project.challenges?.length > 0 && (
              <Section id="challenges" className="pd-challenges-section">
                <h2 className="pd-label">Challenges</h2>
                <ul className="pd-challenges">
                  {project.challenges.map((c, i) => (
                    <li key={i}>
                      <span className="pd-ch-idx">{String(i + 1).padStart(2, '0')}</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* ════════ GALLERY ════════ */}
            {media.length > 0 && (
              <Section id="gallery" className="pd-gallery-section">
                <h2 className="pd-label">Screens & diagrams</h2>
                <div className="pd-gallery">
                  {media.map((src, i) => (
                    <figure key={`${src}-${i}`} className="pd-gallery-item">
                      <img
                        src={`/assets/img/${src}`}
                        alt={`${project.title} — media ${i + 1}`}
                        loading="lazy"
                      />
                    </figure>
                  ))}
                </div>
              </Section>
            )}

            {/* ════════ RESOURCE LINKS ════════ */}
            <Section id="resources" className="pd-resources">
              <h2 className="pd-label">Resources</h2>
              <div className="pd-resource-grid">
                {hasLive && (
                  <a href={project.liveLink} target="_blank" rel="noreferrer" className="pd-resource-card">
                    <span className="pd-resource-title">Live demo</span>
                    <span className="pd-resource-desc">Open the deployed application</span>
                    <span className="pd-resource-arrow">→</span>
                  </a>
                )}
                {project.codeLink && (
                  <a href={project.codeLink} target="_blank" rel="noreferrer" className="pd-resource-card">
                    <span className="pd-resource-title">Source code</span>
                    <span className="pd-resource-desc">View repository on GitHub</span>
                    <span className="pd-resource-arrow">→</span>
                  </a>
                )}
                {readmeUrl && (
                  <a href={readmeUrl} target="_blank" rel="noreferrer" className="pd-resource-card pd-resource-report">
                    <span className="pd-resource-title">Full report</span>
                    <span className="pd-resource-desc">Open README.md on GitHub</span>
                    <span className="pd-resource-arrow">→</span>
                  </a>
                )}
              </div>
            </Section>

            {/* ════════ NEXT ════════ */}
            {nextProject && (
              <Section className="pd-next">
                <Link
                  to={`/project/${nextProject.id}-${slugify(nextProject.title)}`}
                  className="pd-next-link"
                >
                  <div className="pd-next-copy">
                    <span className="pd-next-label">Next project</span>
                    <span className="pd-next-title">{nextProject.title}</span>
                  </div>
                  <span className="pd-next-arrow" aria-hidden="true">→</span>
                </Link>
              </Section>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}