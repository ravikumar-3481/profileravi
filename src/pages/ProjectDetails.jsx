import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { slugify, updateProjectUrl } from '../utils/urlHelper';

const sections = [
  { id: 'brief', label: 'Brief' },
  { id: 'artifact', label: 'Artifact' },
  { id: 'metrics', label: 'Metrics' },
  { id: 'log', label: 'Field Log' },
  { id: 'stack', label: 'Stack' },
  { id: 'next', label: 'Next' },
];

const titleWords = {
  hidden: { opacity: 0, y: '0.8em' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
  },
};

const heroSequence = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.1,
    },
  },
};

const getCategoryLabel = (category) => {
  if (category === 'ai') return 'AI / NLP SYSTEM';
  if (category === 'web') return 'DATA APPLICATION';
  return 'ANALYTICS ENGINEERING';
};

const getMetricValues = (project) => {
  const metricMatch = project.result?.match(/\d+(\.\d+)?/);
  const primaryValue = metricMatch ? Number(metricMatch[0]) : 100;
  const primarySuffix = project.result?.includes('%') ? '%' : '';

  return [
    {
      label: 'Primary lift',
      value: primaryValue,
      suffix: primarySuffix,
      note: project.result,
      spark: [18, 24, 21, 34, 37, 48, 52],
    },
    {
      label: 'Artifacts fused',
      value: (project.images?.length || 1) + (project.diagrams?.length || 1),
      suffix: '',
      note: 'screens + diagrams',
      spark: [2, 3, 4, 4, 5, 6, 6],
    },
    {
      label: 'Stack breadth',
      value: project.technologies?.length || 0,
      suffix: '',
      note: 'production tools',
      spark: [1, 2, 3, 4, 4, 5, project.technologies?.length || 0],
    },
  ];
};

const getToolRole = (tool) => {
  const name = tool.toLowerCase();
  if (name.includes('python')) return 'pipeline runtime';
  if (name.includes('nlp') || name.includes('textblob')) return 'language signal extraction';
  if (name.includes('beautiful')) return 'source acquisition';
  if (name.includes('streamlit')) return 'analyst interface';
  if (name.includes('plotly') || name.includes('power')) return 'metric visualization';
  if (name.includes('pandas')) return 'data shaping layer';
  if (name.includes('flask')) return 'service boundary';
  if (name.includes('sql')) return 'persistence model';
  if (name.includes('javascript') || name.includes('html')) return 'interaction surface';
  if (name.includes('ai')) return 'decision support';
  return 'delivery component';
};

const parseLogEntry = (entry, index) => {
  const normalized = entry.replaceAll('â€”', '-').replaceAll('—', '-');
  const [head, ...rest] = normalized.split(' - ');
  return {
    time: `T+${String((index + 1) * 14).padStart(2, '0')}d`,
    title: rest.length ? head : `Phase ${String(index + 1).padStart(2, '0')}`,
    body: rest.length ? rest.join(' - ') : normalized,
  };
};

const Sparkline = ({ values }) => {
  const max = Math.max(...values, 1);
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * 100;
      const y = 34 - (value / max) * 28;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg className="pd-report-spark" viewBox="0 0 100 40" aria-hidden="true">
      <polyline points={points} />
    </svg>
  );
};

const MetricNumber = ({ value, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(reduceMotion ? value : 0);
  const springValue = useSpring(motionValue, { stiffness: 70, damping: 18 });
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (isInView || reduceMotion) motionValue.set(value);
  }, [isInView, motionValue, reduceMotion, value]);

  useMotionValueEvent(springValue, 'change', (latest) => {
    setDisplay(Math.round(latest * 10) / 10);
  });

  return (
    <span ref={ref}>
      {Number.isInteger(value) ? Math.round(display) : display.toFixed(1)}
      {suffix}
    </span>
  );
};

function CaseStudyHero({ project }) {
  const words = project.title.split(' ');
  const reduceMotion = useReducedMotion();

  return (
    <header className="pd-report-hero">
      <motion.div
        className="pd-report-hero-copy"
        variants={reduceMotion ? undefined : heroSequence}
        initial={reduceMotion ? false : 'hidden'}
        animate={reduceMotion ? false : 'visible'}
      >
        <motion.p className="pd-report-kicker" variants={titleWords}>
          {getCategoryLabel(project.category)} / FIELD REPORT {String(project.id).padStart(2, '0')}
        </motion.p>
        <h1 className="pd-report-title" aria-label={project.title}>
          {words.map((word, index) => (
            <motion.span
              aria-hidden="true"
              className="pd-report-title-word"
              variants={reduceMotion ? undefined : titleWords}
              key={`${word}-${index}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p className="pd-report-lede" variants={titleWords}>
          {project.problem}
        </motion.p>
        <motion.div className="pd-report-actions" variants={titleWords}>
          {project.liveLink && project.liveLink !== '#' && (
            <a className="pd-report-action is-live" href={project.liveLink} target="_blank" rel="noreferrer">
              Live System
            </a>
          )}
          {project.codeLink && (
            <a className="pd-report-action" href={project.codeLink} target="_blank" rel="noreferrer">
              Source Log
            </a>
          )}
          <a className="pd-report-action" href="#artifact">
            Inspect Artifact
          </a>
        </motion.div>
      </motion.div>

      <motion.figure
        className="pd-report-hero-media"
        variants={reduceMotion ? undefined : titleWords}
        initial={reduceMotion ? false : 'hidden'}
        animate={reduceMotion ? false : 'visible'}
      >
        <img
          src={`/assets/img/${project.thumbnail}`}
          alt={`${project.title} primary interface`}
          style={{ viewTransitionName: `project-artifact-${project.id}` }}
        />
        <figcaption>
          <span>Primary artifact</span>
          <span>{project.result}</span>
        </figcaption>
      </motion.figure>
    </header>
  );
}

function ScrollProgressRail({ sectionIds }) {
  const [active, setActive] = useState(sectionIds[0].id);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.001 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.35, 0.65] },
    );

    sectionIds.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <nav className="pd-report-rail" aria-label="Case study sections">
      <motion.span className="pd-report-rail-progress" style={{ scaleY }} />
      {sectionIds.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={active === section.id ? 'active' : ''}
          aria-current={active === section.id ? 'true' : undefined}
        >
          <span className="pd-report-rail-dot" />
          <span>{section.label}</span>
        </a>
      ))}
    </nav>
  );
}

function AnnotatedArtifact({ project }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.78', 'end 0.32'],
  });
  const firstLine = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);
  const secondLine = useTransform(scrollYProgress, [0.22, 0.58], [0, 1]);
  const thirdLine = useTransform(scrollYProgress, [0.45, 0.82], [0, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [24, -18]);
  const diagrams = project.diagrams?.length ? project.diagrams : [project.thumbnail];
  const images = project.images?.length ? project.images : [project.thumbnail];

  return (
    <section className="pd-report-section pd-report-artifact" id="artifact" ref={ref}>
      <div className="pd-report-section-label">Annotated artifact</div>
      <div className="pd-report-artifact-grid">
        <div>
          <h2>System evidence, interface state, and architecture in one inspection frame.</h2>
          <p>{project.solution}</p>
        </div>
        <motion.div className="pd-report-artifact-stage" style={{ y: imageY }}>
          <img src={`/assets/img/${images[0]}`} alt={`${project.title} interface evidence`} />
          <img className="pd-report-artifact-inset" src={`/assets/img/${diagrams[0]}`} alt={`${project.title} architecture diagram`} />
          <svg className="pd-report-leaders" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <motion.path d="M18 24 C38 18, 50 18, 68 27" style={{ pathLength: reduceMotion ? 1 : firstLine }} />
            <motion.path d="M72 36 C58 44, 50 54, 33 68" style={{ pathLength: reduceMotion ? 1 : secondLine }} />
            <motion.path d="M82 72 C70 78, 56 82, 42 83" style={{ pathLength: reduceMotion ? 1 : thirdLine }} />
          </svg>
          <motion.p className="pd-report-callout callout-a" style={{ opacity: reduceMotion ? 1 : firstLine }}>
            acquisition and cleaning boundary
          </motion.p>
          <motion.p className="pd-report-callout callout-b" style={{ opacity: reduceMotion ? 1 : secondLine }}>
            model / metric transform layer
          </motion.p>
          <motion.p className="pd-report-callout callout-c" style={{ opacity: reduceMotion ? 1 : thirdLine }}>
            analyst-facing decision surface
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function FieldLog({ milestones }) {
  const entries = milestones?.length ? milestones : ['Build core pipeline', 'Validate outputs', 'Deploy reporting surface'];

  return (
    <section className="pd-report-section pd-report-log" id="log">
      <div className="pd-report-section-label">Field log</div>
      <h2>Build chronology</h2>
      <ol>
        {entries.map((entry, index) => {
          const parsed = parseLogEntry(entry, index);
          return (
            <li key={`${parsed.time}-${parsed.title}`}>
              <time>{parsed.time}</time>
              <div>
                <h3>{parsed.title}</h3>
                <p>{parsed.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function MetricReadout({ project }) {
  const metrics = getMetricValues(project);

  return (
    <section className="pd-report-section pd-report-metrics" id="metrics">
      <div className="pd-report-section-label">Metric readout</div>
      <div className="pd-report-metric-table" role="table" aria-label={`${project.title} metrics`}>
        {metrics.map((metric) => (
          <div className="pd-report-metric-row" role="row" key={metric.label}>
            <span role="cell">{metric.label}</span>
            <strong role="cell">
              <MetricNumber value={metric.value} suffix={metric.suffix} />
            </strong>
            <span role="cell">{metric.note}</span>
            <Sparkline values={metric.spark} />
          </div>
        ))}
      </div>
    </section>
  );
}

function StackManifest({ technologies }) {
  return (
    <section className="pd-report-section pd-report-stack" id="stack">
      <div className="pd-report-section-label">Stack manifest</div>
      <h2>Tooling mapped to engineering responsibility.</h2>
      <dl>
        {technologies.map((tool) => (
          <div key={tool}>
            <dt>{tool}</dt>
            <dd>{getToolRole(tool)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function NextCaseStudy({ currentProject, projects }) {
  const nextProject = useMemo(() => {
    if (!projects.length) return null;
    const currentIndex = projects.findIndex((item) => item.id === currentProject.id);
    return projects[(currentIndex + 1) % projects.length] || projects[0];
  }, [currentProject.id, projects]);

  if (!nextProject) return null;

  return (
    <section className="pd-report-section pd-report-next" id="next">
      <Link to={`/project/${nextProject.id}-${slugify(nextProject.title)}`} className="pd-report-next-link">
        <span>Next field report</span>
        <strong>{nextProject.title}</strong>
        <img src={`/assets/img/${nextProject.thumbnail}`} alt="" loading="lazy" />
      </Link>
    </section>
  );
}

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    fetch('/assets/data/projects.json')
      .then((res) => {
        if (!res.ok) throw new Error('Could not fetch project data');
        return res.json();
      })
      .then((data) => {
        const numericId = parseInt(id, 10);
        const found = data.find((item) => item.id === numericId);
        if (!found) throw new Error('Project not found');
        setProjects(data);
        setProject(found);
        updateProjectUrl(found.id, found.title);
      })
      .catch((err) => {
        console.error('Error loading project:', err);
        setError(err.message || 'Error loading project details');
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="project-detail-page-wrapper pd-report-page">
      <Navbar />
      <main className="project-detail-page">
        {loading && (
          <div className="pd-report-state" role="status">
            <span>LOADING FIELD REPORT</span>
          </div>
        )}

        {error && (
          <div className="pd-report-state">
            <h1>Report unavailable</h1>
            <p>{error}</p>
            <Link className="pd-report-action is-live" to="/#projects">
              Return to project index
            </Link>
          </div>
        )}

        {project && (
          <>
            <ScrollProgressRail sectionIds={sections} />
            <CaseStudyHero project={project} />

            <section className="pd-report-section pd-report-brief" id="brief">
              <div className="pd-report-section-label">Case brief</div>
              <div className="pd-report-brief-grid">
                <p>{project.caseStudy || project.solution}</p>
                <aside>
                  <span>RESULT</span>
                  <strong>{project.result}</strong>
                  <span>CLASS</span>
                  <strong>{getCategoryLabel(project.category)}</strong>
                </aside>
              </div>
            </section>

            <AnnotatedArtifact project={project} />
            <MetricReadout project={project} />
            <FieldLog milestones={project.milestones} />
            <StackManifest technologies={project.technologies} />
            <NextCaseStudy currentProject={project} projects={projects} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
