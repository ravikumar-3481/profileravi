import { PortraitHero } from "@/components/portrait-hero";
import { useState, useEffect } from "react";
import {
  Preloader,
  ThemeToggle,
  Typewriter,
  SkillMarquee,
  QuoteSection,
  TestimonialSlider,
  GithubActivity,
  ExperienceSection,
  EducationSection,
  ResumeModal,
  BackToTop,
} from "@/components/extras";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ViewportReveal } from "@/components/viewport-reveal";
import { AnimatedCounter } from "@/components/animated-counter";
import { CookieConsent } from "@/components/cookie-consent";
import { useKeyboardNavigation, KeyboardShortcutsModal } from "@/components/keyboard-shortcuts";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Download,
  Menu,
  X,
  Code2,
  Database,
  BrainCircuit,
  Terminal,
  Layers,
  Star,
  Plus,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  GitBranch,
  ExternalLink,
  Instagram,
  Globe,
  Check,
  ShieldAlert,
  Clock,
  Keyboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { projects, profile, projectName, categoryName, faqs, imagekit } from "@/data/portfolio";
import education from "@/data/education.json";
import experience from "@/data/experience.json";
import skills from "@/data/skills.json";
import tools from "@/data/tools.json";
import soft from "@/data/soft.json";
import other from "@/data/other.json";
import activities from "@/data/activities.json";
import testimonials from "@/data/testimonials.json";
import articles from "@/data/blog_articles.json";

export const Reveal = ViewportReveal;

export function SiteShell({ children }) {
  const [menu, setMenu] = useState(false);
  const [resume, setResume] = useState(false);
  const [shortcutsHelp, setShortcutsHelp] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useKeyboardNavigation({
    onOpenResume: () => setResume(true),
    onToggleHelp: () => setShortcutsHelp((v) => !v),
    onToggleTheme: () => {
      const btn = document.querySelector(".theme-toggle");
      if (btn) btn.click();
    },
  });

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    setMenu(false);
  }, [path]);

  useEffect(() => {
    const o = () => setResume(true);
    window.addEventListener("open-resume", o);
    return () => window.removeEventListener("open-resume", o);
  }, []);

  useEffect(() => {
    const h = () => setShortcutsHelp(true);
    window.addEventListener("open-shortcuts-help", h);
    return () => window.removeEventListener("open-shortcuts-help", h);
  }, []);

  const links = [
    ["/", "Home"],
    ["/about", "About"],
    ["/projects", "Projects"],
    ["/experience", "Journey"],
    ["/skills", "Skills"],
    ["/blog", "Writing"],
  ];
  const all = [...links, ["/activities", "Activities"], ["/faq", "FAQ"], ["/contact", "Contact"]];

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Preloader />
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          <Link to="/" className="wordmark" aria-label="Ravi home">
            ravi<span className="text-primary">.</span>
          </Link>
          <nav
            className="desktop-nav pill-nav"
            aria-label="Main navigation"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                const navLinks = Array.from(e.currentTarget.querySelectorAll(".nav-link"));
                const curIndex = navLinks.indexOf(document.activeElement);
                if (curIndex !== -1) {
                  e.preventDefault();
                  const nextIndex =
                    e.key === "ArrowRight"
                      ? (curIndex + 1) % navLinks.length
                      : (curIndex - 1 + navLinks.length) % navLinks.length;
                  navLinks[nextIndex]?.focus();
                }
              }
            }}
          >
            {links.map(([url, label]) => (
              <Link key={url} to={url} className={path === url ? "nav-link active" : "nav-link"}>
                {path === url && (
                  <motion.span
                    layoutId="nav-pill"
                    className="nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="nav-label">{label}</span>
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Button
              variant="ghost"
              size="icon"
              className="shortcuts-nav-btn"
              aria-label="Keyboard shortcuts (? or Ctrl+K)"
              title="Keyboard shortcuts (? or Ctrl+K)"
              onClick={() => setShortcutsHelp(true)}
            >
              <Keyboard size={17} />
            </Button>
            <ThemeToggle />
            <Button asChild className="contact-nav">
              <Link to="/contact">
                Let’s talk <ArrowUpRight />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="mobile-menu"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <>
            <motion.div
              className="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenu(false)}
            />
            <motion.nav
              className="mobile-drawer"
              aria-label="Mobile navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              onKeyDown={(e) => {
                if (e.key === "Escape") setMenu(false);
              }}
            >
              <div className="drawer-head">
                <span className="wordmark">
                  ravi<span className="text-primary">.</span>
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close menu"
                  onClick={() => setMenu(false)}
                >
                  <X />
                </Button>
              </div>
              {all.map(([url, label], i) => (
                <motion.div
                  key={url}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <Link to={url} className={path === url ? "active" : ""}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {label}
                    <ArrowUpRight size={16} />
                  </Link>
                </motion.div>
              ))}
              <Button
                className="drawer-resume"
                variant="outline"
                onClick={() => {
                  setMenu(false);
                  setResume(true);
                }}
              >
                View resume <Download />
              </Button>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.main
          id="main-content"
          tabIndex={-1}
          key={path}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ outline: "none" }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="wordmark">
              ravi<span className="text-primary">.</span>
            </Link>
            <p>
              AI Engineer & Data Scientist building thoughtful, human-centered intelligent systems.
            </p>
            <span className="footer-status">
              <i className="status-dot" /> Available for new opportunities
            </span>
          </div>
          <div>
            <h4>Explore</h4>
            {links.map(([u, l]) => (
              <Link key={u} to={u}>
                {l}
              </Link>
            ))}
          </div>
          <div>
            <h4>More</h4>
            <Link to="/activities">Activities</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contact</Link>
            <button type="button" onClick={() => setResume(true)}>
              Resume
            </button>
          </div>
          <div>
            <h4>Connect</h4>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <div className="footer-social">
              <a href={profile.github} aria-label="GitHub" target="_blank" rel="noreferrer">
                <Github size={17} />
              </a>
              <a href={profile.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
                <Linkedin size={17} />
              </a>
              <a
                href="https://www.instagram.com/i_am_ravi.07"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={17} />
              </a>
              <a href="https://x.com/ravikumar3481" aria-label="X" target="_blank" rel="noreferrer">
                <ExternalLink size={17} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <Mail size={17} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Ravi Vishwakarma. All rights reserved.</span>
          <div className="footer-bottom-links">
            <button
              type="button"
              onClick={() => setShortcutsHelp(true)}
              className="shortcuts-link-btn"
              aria-label="View keyboard shortcuts"
            >
              <Keyboard size={12} />
              Shortcuts
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
              className="cookie-pref-link"
            >
              Cookie Preferences
            </button>
            <span>·</span>
            <span>Built with intention, in India.</span>
          </div>
        </div>
      </footer>
      <BackToTop />
      <ResumeModal open={resume} onClose={() => setResume(false)} />
      <KeyboardShortcutsModal open={shortcutsHelp} onClose={() => setShortcutsHelp(false)} />
      <CookieConsent />
    </>
  );
}

export function SectionHeading({ number, eyebrow, title, link, label = "Explore more" }) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow">
          <span>{number}</span>
          <motion.span
            className="tiny-line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
          {eyebrow}
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h2>
      </div>
      {link && (
        <Button variant="link" asChild>
          <Link to={link}>
            {label} <ArrowUpRight />
          </Link>
        </Button>
      )}
    </div>
  );
}

export function PageIntro({ eyebrow, title, description }) {
  return (
    <Reveal className="page-intro container">
      <Link to="/" className="back-link">
        <ArrowLeft size={15} /> Back to home
      </Link>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="intro-description">{description}</p>
    </Reveal>
  );
}

export function Hero() {
  return <PortraitHero />;
}

export function AboutSection({ full = false }) {
  return (
    <section className="section container">
      <SectionHeading
        number="01"
        eyebrow="A LITTLE ABOUT ME"
        title={
          <>
            Curious by nature.
            <br />
            <span className="serif-italic">An engineer by choice.</span>
          </>
        }
        link={full ? undefined : "/about"}
        label="The full story"
      />
      <div className="about-grid">
        <div className="about-location">
          <MapPin size={18} />
          <span>India, with a worldwide mindset.</span>
        </div>
        <Reveal>
          <p className="large-copy">
            I’m a B.Tech Computer Science student specializing in AI & Data Science. I build at the
            intersection of <span>intelligent systems and everyday problems.</span>
          </p>
          <p className="body-copy">
            From training machine learning models to designing full-stack interfaces, I care about
            the small decisions that make software clear, reliable, and genuinely helpful. I’ve
            developed analytics dashboards that accelerate decision-making by 40% and data pipelines
            supporting 50,000+ records.
          </p>
          <div className="stats-row">
            {[
              ["1.5+", "Years of experience"],
              ["63+", "Projects completed"],
              ["124+", "LeetCode problems"],
              ["50K+", "Data records managed"],
            ].map(([value, label], idx) => (
              <motion.div
                key={label}
                className="stat-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <strong>
                  <AnimatedCounter value={value} />
                </strong>
                <span>{label}</span>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
      {full && (
        <div className="about-extra">
          <h3>Building with intention.</h3>
          <p className="body-copy">
            I’m currently pursuing my B.Tech at AKS University. My interests span ethical AI,
            agentic systems, data storytelling, and software that prioritizes people alongside
            technical performance. Away from project work, I contribute to open source, create
            technical content, and take part in hackathons.
          </p>
        </div>
      )}
    </section>
  );
}

export function ProjectCard({ project, index }) {
  return (
    <Reveal pop delay={(index % 3) * 0.07} className="project-card">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 280, damping: 20 }}
        className="project-card-inner"
      >
        <Link
          to="/projects/$slug"
          params={{ slug: project.slug }}
          className={`project-image project-tone-${index % 3}`}
        >
          <div className="project-image-top">
            <span>{String(index + 1).padStart(2, "0")} / PROJECT</span>
            <ArrowUpRight size={20} />
          </div>
          <img
            src={imagekit(project.thumbnail)}
            alt={`${projectName(project)} application screenshot`}
            loading="lazy"
          />
          <span className="project-image-bottom">{project.result}</span>
        </Link>
        <div className="project-meta">
          <span className="eyebrow">{categoryName(project.category)}</span>
          <Link to="/projects/$slug" params={{ slug: project.slug }}>
            <h3>
              {projectName(project)} <ArrowUpRight size={21} />
            </h3>
          </Link>
          <p>{project.title.split(" - ").slice(1).join(" - ")}</p>
          <div className="tech-tags">
            {project.technologies.slice(0, 3).map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function FeaturedProjects() {
  return (
    <section className="section projects-section">
      <div className="container">
        <SectionHeading
          number="02"
          eyebrow="SELECTED WORK"
          title={
            <>
              Ideas, made <span className="serif-italic">real.</span>
            </>
          }
          link="/projects"
          label="All projects"
        />
        <div className="project-grid">
          {projects.slice(0, 3).map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsPage() {
  const [filter, setFilter] = useState("all");
  const filtered = projects.filter((p) => filter === "all" || p.category === filter);
  return (
    <>
      <PageIntro
        eyebrow="PROJECT ARCHIVE"
        title={
          <>
            Built to solve.
            <br />
            <span className="serif-italic">Made to matter.</span>
          </>
        }
        description="A collection of experiments, intelligent applications, and tools — from the first idea to the final deployment."
      />
      <section className="container section compact-top">
        <div
          className="filter-row"
          role="tablist"
          aria-label="Filter projects by category"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
              const buttons = Array.from(e.currentTarget.querySelectorAll('button[role="tab"]'));
              const curIndex = buttons.indexOf(document.activeElement);
              if (curIndex !== -1) {
                e.preventDefault();
                const nextIndex =
                  e.key === "ArrowRight"
                    ? (curIndex + 1) % buttons.length
                    : (curIndex - 1 + buttons.length) % buttons.length;
                buttons[nextIndex]?.focus();
                buttons[nextIndex]?.click();
              }
            }
          }}
        >
          {[
            ["all", "All projects"],
            ["ai", "AI & Machine Learning"],
            ["developer-tools", "Developer Tools"],
          ].map(([value, label]) => (
            <Button
              key={value}
              role="tab"
              variant={filter === value ? "default" : "ghost"}
              onClick={() => setFilter(value)}
              aria-selected={filter === value}
              tabIndex={filter === value ? 0 : -1}
            >
              {label}
              <span className="filter-count">
                {projects.filter((p) => value === "all" || p.category === value).length}
              </span>
            </Button>
          ))}
        </div>
        <div className="project-grid archive-grid">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} index={projects.indexOf(p)} />
          ))}
        </div>
      </section>
      <ContactTeaser />
    </>
  );
}

export function JourneySection({ full = false }) {
  return (
    <section className="section container">
      <SectionHeading
        number="03"
        eyebrow="THE JOURNEY SO FAR"
        title={
          <>
            Learning. Building.
            <br />
            <span className="serif-italic">Getting better.</span>
          </>
        }
        link={full ? undefined : "/experience"}
        label="Explore my journey"
      />
      <div className="journey-grid">
        <div>
          <h3 className="column-label">
            <GitBranch size={19} /> Experience
          </h3>
          {experience.map((e) => (
            <Reveal key={e.id} className="timeline-item">
              <span className="timeline-dot" />
              <div className="timeline-date">
                {e.duration} <span>REMOTE</span>
              </div>
              <h3>{e.role}</h3>
              <p className="timeline-company">{e.company}</p>
              <p className="body-copy">• {e.description}</p>
              {full && (
                <ul className="task-list">
                  •{" "}
                  {e.tasks.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
              <div className="tech-tags">
                {e.skills.slice(0, full ? 8 : 3).map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
        <div>
          <h3 className="column-label">
            <Layers size={19} /> Education
          </h3>
          {education.map((e) => (
            <Reveal key={e.id} className="timeline-item">
              <span className="timeline-dot" />
              <div className="timeline-date">
                {e.duration}
                <span>EDUCATION</span>
              </div>
              <h3>{e.institute}</h3>
              <p className="timeline-company">{e.degree}</p>
              <p className="body-copy">• {e.description}</p>
              <div className="tech-tags">
                {e.courses.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
              {full && <p className="academic-score">Academic score: {e.cgpa}</p>}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const skillGroups = [
  ["Development & data", Code2, skills],
  ["My everyday tools", Terminal, tools],
  ["Beyond the code", BrainCircuit, [...soft, ...other]],
];

export function SkillsSection({ full = false }) {
  return (
    <section className="section skill-section">
      <div className="container">
        <SectionHeading
          number="04"
          eyebrow="MY TOOLBOX"
          title={
            <>
              The right tools.
              <br />
              <span className="serif-italic">The right mindset.</span>
            </>
          }
          link={full ? undefined : "/skills"}
          label="Inside my toolbox"
        />
        <div className="skills-grid">
          {skillGroups.map(([name, Icon, items]) => (
            <Reveal pop key={name} className="skill-group">
              <Icon size={28} />
              <h3>{name}</h3>
              <div className="skill-items">
                {items.map((item) => (
                  <motion.span
                    key={item.name}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  >
                    <span className="skill-mark">{item.name.slice(0, 2)}</span>
                    {item.name}
                  </motion.span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ActivitiesSection() {
  const icons = [Github, BrainCircuit, Code2, Layers, Terminal];
  return (
    <section className="section container">
      <SectionHeading
        number="05"
        eyebrow="BEYOND THE PROJECTS"
        title={
          <>
            A little more <span className="serif-italic">in the making.</span>
          </>
        }
        link="/activities"
        label="All activities"
      />
      <div className="activities-grid">
        {activities.map((a, i) => {
          const Icon = icons[i] || Code2;
          return (
            <Reveal className="activity-item" key={a.title}>
              <Icon size={23} />
              <h3>{a.title}</h3>
              <span>{String(i + 1).padStart(2, "0")}</span>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function GithubSection() {
  return (
    <section className="github-section container">
      <div>
        <p className="eyebrow">
          <Github size={16} /> BUILDING IN THE OPEN
        </p>
        <h2>
          Code is better <span className="serif-italic">shared.</span>
        </h2>
        <p>Experiments, contributions, and everything in between.</p>
      </div>
      <div className="github-stats">
        <div>
          <strong>132</strong>
          <span>Public repositories</span>
        </div>
        <div>
          <strong>8</strong>
          <span>GitHub followers</span>
        </div>
        <Button variant="outline" asChild>
          <a href={profile.github} target="_blank" rel="noreferrer">
            Explore GitHub <ArrowUpRight />
          </a>
        </Button>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const list = [
    testimonials.find((t) => t.name === "uday raj"),
    testimonials.find((t) => t.name === "Priya Sharma"),
    testimonials.find((t) => t.name === "Anika chaube"),
  ].filter(Boolean);
  return (
    <section className="section container">
      <SectionHeading
        number="06"
        eyebrow="KIND WORDS"
        title={
          <>
            Good work starts with
            <br />
            <span className="serif-italic">good people.</span>
          </>
        }
      />
      <div className="testimonial-grid">
        {list.map((t) => (
          <Reveal className="testimonial" key={t.name}>
            <div className="rating" aria-label={`${t.rating} out of 5 stars`}>
              {Array.from({ length: t.rating }, (_, i) => (
                <Star key={i} size={13} fill="currentColor" />
              ))}
            </div>
            <blockquote>“{t.feedback}”</blockquote>
            <div className="testimonial-person">
              <span className="person-initial">{t.name.slice(0, 1).toUpperCase()}</span>
              <div>
                <strong>{t.name}</strong>
                <span>
                  {t.role} · {t.institute}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="endorse-link">
        <Button asChild variant="link">
          <a href="https://forms.gle/wyR1g39bA79EYu8X8" target="_blank" rel="noreferrer">
            Share your experience <ArrowUpRight />
          </a>
        </Button>
      </div>
    </section>
  );
}

export function BlogSection({ full = false }) {
  return (
    <section className="section writing-section">
      <div className="container">
        <SectionHeading
          number="07"
          eyebrow="NOTES & PERSPECTIVES"
          title={
            <>
              Learning out loud.
              <br />
              <span className="serif-italic">One idea at a time.</span>
            </>
          }
          link={full ? undefined : "/blog"}
          label="All writing"
        />
        <div className="articles-list">
          {articles.slice(0, full ? articles.length : 3).map((a) => (
            <motion.a
              key={a.id}
              href={a.url}
              target="_blank"
              rel="noreferrer"
              className="article-row"
              whileHover={{ x: 6 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <span className="article-date">
                {new Date(a.published_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </span>
              <div>
                <span className="eyebrow">{a.tag_list.slice(0, 2).join(" / ")}</span>
                <h3>{a.title}</h3>
              </div>
              <span className="reading-time">{a.reading_time_minutes} min read</span>
              <ArrowUpRight size={22} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="section container">
      <div className="faq-grid">
        <div>
          <p className="eyebrow">08 — A FEW ANSWERS</p>
          <h2>
            Good questions.
            <br />
            <span className="serif-italic">Clear answers.</span>
          </h2>
          <p className="body-copy">Have something else in mind?</p>
          <Button asChild variant="link">
            <Link to="/contact">
              Let’s talk about it <ArrowUpRight />
            </Link>
          </Button>
        </div>
        <Accordion type="single" collapsible className="faq-accordion">
          {faqs.map(([question, answer], i) => (
            <AccordionItem key={question} value={`faq-${i}`}>
              <AccordionTrigger>
                <span className="faq-number">{String(i + 1).padStart(2, "0")}</span>
                <span>{question}</span>
              </AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

const RATE_LIMIT_KEY = "portfolio_contact_rate_limit";
const COOLDOWN_SECONDS = 60;
const MAX_PER_WINDOW = 3;
const WINDOW_MS = 10 * 60 * 1000;

export function ContactSection() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [remainingCooldown, setRemainingCooldown] = useState(0);

  // Check rate limit status on mount and when returning to view
  useEffect(() => {
    function checkLimit() {
      try {
        const raw = localStorage.getItem(RATE_LIMIT_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        const now = Date.now();
        if (parsed.blockedUntil && parsed.blockedUntil > now) {
          setRemainingCooldown(Math.ceil((parsed.blockedUntil - now) / 1000));
        }
      } catch {}
    }
    checkLimit();
  }, []);

  // Ticking countdown timer when rate limit is active
  useEffect(() => {
    if (remainingCooldown <= 0) return;
    const timer = setInterval(() => {
      setRemainingCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [remainingCooldown]);

  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Bot detection via invisible honeypot field
    if (data._gotcha) {
      setStatus("success");
      form.reset();
      return;
    }

    // Rate limiting check
    try {
      const now = Date.now();
      const raw = localStorage.getItem(RATE_LIMIT_KEY);
      const history = raw ? JSON.parse(raw) : { timestamps: [], blockedUntil: 0 };
      const recent = (history.timestamps || []).filter((t) => now - t < WINDOW_MS);

      if (history.blockedUntil && history.blockedUntil > now) {
        const seconds = Math.ceil((history.blockedUntil - now) / 1000);
        setRemainingCooldown(seconds);
        setError(
          `Rate limit active. Please wait ${seconds}s before submitting again, or email me directly.`,
        );
        return;
      }

      if (recent.length >= MAX_PER_WINDOW) {
        const blockedUntil = now + WINDOW_MS;
        localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ timestamps: recent, blockedUntil }));
        setRemainingCooldown(Math.ceil(WINDOW_MS / 1000));
        setError(
          "Too many submissions in a short period. Please wait 10 minutes or email me directly.",
        );
        return;
      }
    } catch {}

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("https://formspree.io/f/xvgqzalg", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Your message could not be sent. Please try again or email me directly.");
      }

      // Record successful submission into rate limit history
      try {
        const now = Date.now();
        const raw = localStorage.getItem(RATE_LIMIT_KEY);
        const history = raw ? JSON.parse(raw) : { timestamps: [] };
        const recent = (history.timestamps || []).filter((t) => now - t < WINDOW_MS);
        recent.push(now);
        const blockedUntil = now + COOLDOWN_SECONDS * 1000;
        localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ timestamps: recent, blockedUntil }));
        setRemainingCooldown(COOLDOWN_SECONDS);
      } catch {}

      setStatus("success");
      form.reset();
    } catch (err) {
      setError(err.message || "Connection problem. Please try again.");
      setStatus("idle");
    }
  }

  const socials = [
    [Github, "GitHub", profile.github],
    [Linkedin, "LinkedIn", profile.linkedin],
    [Code2, "LeetCode", "https://leetcode.com/u/ravivish3481/"],
    [Database, "Kaggle", "https://www.kaggle.com/ravivishwakarma0909"],
    [Globe, "Topmate", "https://topmate.io/ravi_vishwakarma0"],
    [Instagram, "Instagram", "https://www.instagram.com/i_am_ravi.07"],
    [ExternalLink, "X", "https://x.com/ravikumar3481"],
  ];

  return (
    <section className="section contact-section">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">09 — LET’S MAKE SOMETHING MEANINGFUL</p>
          <h2>
            Great things start
            <br />
            with a <span className="serif-italic">conversation.</span>
          </h2>
          <p>
            Have an idea, an opportunity, or just a good question?
            <br />
            I’d love to hear from you.
          </p>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
            <ArrowUpRight size={24} />
          </a>
          <div className="contact-socials">
            {socials.map(([Icon, name, url]) => (
              <a key={name} href={url} target="_blank" rel="noreferrer">
                <Icon size={16} />
                {name}
              </a>
            ))}
          </div>
          <span className="contact-location">
            <MapPin size={15} /> India · Open to remote collaboration
          </span>
        </div>

        <form onSubmit={submit} className="contact-form">
          {/* Honeypot field for bot protection */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            style={{ display: "none" }}
            aria-hidden="true"
          />

          <div className="form-two">
            <label>
              Your name
              <input name="name" placeholder="Ravi" required autoComplete="name" maxLength={120} />
            </label>
            <label>
              Email address
              <input
                type="email"
                name="email"
                placeholder="xyz@company.com"
                required
                autoComplete="email"
                maxLength={200}
              />
            </label>
          </div>

          <label>
            What’s on your mind?
            <select name="subject" required defaultValue="">
              <option value="" disabled>
                Select a subject
              </option>
              <option>General Inquiry</option>
              <option>Work With Us</option>
              <option>Hire Me</option>
              <option>Support</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Your message
            <textarea
              name="message"
              placeholder="Tell me a little about your idea…"
              rows={4}
              required
              maxLength={10000}
            />
          </label>

          <Button size="lg" type="submit" disabled={status === "sending" || remainingCooldown > 0}>
            {status === "sending" ? (
              "Sending…"
            ) : remainingCooldown > 0 ? (
              <>
                <Clock size={16} className="mr-2" /> Please wait ({remainingCooldown}s)
              </>
            ) : (
              <>
                Send message <ArrowUpRight />
              </>
            )}
          </Button>

          {remainingCooldown > 0 && (
            <div role="status" className="form-rate-limit">
              <ShieldAlert size={16} />
              <div>
                <strong>Rate limit active</strong> ({remainingCooldown}s remaining).
                <br />
                To prevent spam, submissions are temporarily throttled. You can also email directly
                at <a href={`mailto:${profile.email}`}>{profile.email}</a>.
              </div>
            </div>
          )}

          {status === "success" && (
            <motion.p
              role="status"
              className="form-success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Check size={17} /> Thank you. Your message has been sent.
            </motion.p>
          )}

          {error && (
            <motion.p
              role="alert"
              className="form-error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}
        </form>
      </div>
    </section>
  );
}

export function ContactTeaser() {
  return (
    <section className="contact-teaser container">
      <h2>
        Have something <span className="serif-italic">in mind?</span>
      </h2>
      <Button asChild size="lg">
        <Link to="/contact">
          Let’s talk <ArrowUpRight />
        </Link>
      </Button>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      {[
        AboutSection,
        FeaturedProjects,
        ExperienceSection,
        EducationSection,
        SkillsSection,
        ActivitiesSection,
        GithubActivity,
        QuoteSection,
        TestimonialSlider,
        BlogSection,
        FaqSection,
        ContactSection,
      ].map((Section) => (
        <Reveal key={Section.name}>
          <Section />
        </Reveal>
      ))}
    </>
  );
}

export function ImageViewer({ images, index, onClose, download }) {
  const [position, setPosition] = useState(0);
  const [zoom, setZoom] = useState(false);
  const open = index !== null;
  const active = images[position] || images[0];
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          onClose();
          setZoom(false);
        }
      }}
    >
      <DialogContent
        className="gallery-dialog"
        onOpenAutoFocus={() => {
          setPosition(index || 0);
          setZoom(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setPosition((p) => (p + 1) % images.length);
          if (e.key === "ArrowLeft") setPosition((p) => (p - 1 + images.length) % images.length);
          if (e.key === "Home") setPosition(0);
          if (e.key === "End") setPosition(images.length - 1);
          if (e.key.toLowerCase() === "z") setZoom((z) => !z);
        }}
      >
        <DialogTitle>{active?.label || "Project image"}</DialogTitle>
        <DialogDescription className="sr-only">Project image gallery</DialogDescription>
        <div className={`viewer-image ${zoom ? "zoomed" : ""}`}>
          <img src={active?.src} alt={active?.label || "Project screenshot"} />
        </div>
        <div className="viewer-controls">
          <span>
            {position + 1} / {images.length}
          </span>
          <div>
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Previous image"
                  onClick={() => setPosition((p) => (p - 1 + images.length) % images.length)}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Next image"
                  onClick={() => setPosition((p) => (p + 1) % images.length)}
                >
                  <ChevronRight />
                </Button>
              </>
            )}
            <Button
              variant="outline"
              size="icon"
              aria-label={zoom ? "Zoom out" : "Zoom in"}
              onClick={() => setZoom(!zoom)}
            >
              <Maximize2 />
            </Button>
            {download && (
              <Button variant="outline" asChild>
                <a href={download} target="_blank" rel="noreferrer">
                  Download PDF <Download />
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ProjectDetails({ project }) {
  const [index, setIndex] = useState(null);
  const images = [...new Set([...project.images, ...project.diagrams])].map((name) => ({
    name,
    src: imagekit(name),
    label: `${projectName(project)} — ${name.replace(/\.(webp|jpg|png|svg)$/, "").replace(/-/g, " ")}`,
  }));
  return (
    <>
      <div className="container project-detail-intro">
        <Link to="/projects" className="back-link">
          <ArrowLeft size={15} /> All projects
        </Link>
        <p className="eyebrow">{categoryName(project.category)} / CASE STUDY</p>
        <h1>
          {projectName(project)}
          <span className="text-primary">.</span>
        </h1>
        <p className="intro-description">{project.title.split(" - ").slice(1).join(" - ")}</p>
        <div className="detail-actions">
          {project.liveLink && (
            <Button asChild size="lg">
              <a href={project.liveLink} target="_blank" rel="noreferrer">
                Visit live project <ArrowUpRight />
              </a>
            </Button>
          )}
          <Button asChild variant="outline" size="lg">
            <a href={project.codeLink} target="_blank" rel="noreferrer">
              <Github /> View source code
            </a>
          </Button>
        </div>
        <Button
          variant="ghost"
          className="detail-cover"
          aria-label={`Enlarge ${projectName(project)} screenshot`}
          onClick={() =>
            setIndex(
              Math.max(
                0,
                images.findIndex((i) => i.name === project.thumbnail),
              ),
            )
          }
        >
          <img
            src={imagekit(project.thumbnail)}
            alt={`${projectName(project)} application overview`}
          />
          <span>
            <Maximize2 size={18} />
          </span>
        </Button>
        <div className="detail-summary">
          <div>
            <span className="eyebrow">PROJECT</span>
            <strong>{projectName(project)}</strong>
          </div>
          <div>
            <span className="eyebrow">FOCUS</span>
            <strong>{categoryName(project.category)}</strong>
          </div>
          <div>
            <span className="eyebrow">OUTCOME</span>
            <strong>{project.result}</strong>
          </div>
        </div>
      </div>
      <section className="section container case-layout">
        <aside>
          <p className="eyebrow">THE CASE STUDY</p>
          <h3>
            From problem
            <br />
            to possibility.
          </h3>
          <h4>Technology stack</h4>
          <div className="tech-tags">
            {project.technologies.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </aside>
        <div className="case-content">
          <Reveal>
            <p className="eyebrow">01 — THE CHALLENGE</p>
            <h2>The problem.</h2>
            <p>{project.problem}</p>
          </Reveal>
          <Reveal>
            <p className="eyebrow">02 — THE APPROACH</p>
            <h2>A thoughtful solution.</h2>
            <p>{project.solution}</p>
          </Reveal>
          <Reveal>
            <p className="eyebrow">03 — BEHIND THE BUILD</p>
            <h2>How it came together.</h2>
            <p>{project.caseStudy}</p>
          </Reveal>
          <div className="result-band">
            <p className="eyebrow">04 — THE RESULT</p>
            <h3>{project.result}</h3>
            <p>{project.result1}</p>
          </div>
        </div>
      </section>
      <section className="section gallery-section">
        <div className="container">
          <SectionHeading
            number="05"
            eyebrow="A CLOSER LOOK"
            title={
              <>
                Screens, systems,
                <br />
                and <span className="serif-italic">the details.</span>
              </>
            }
          />
          <div className="gallery-grid">
            {images.map((image) => (
              <Button
                variant="ghost"
                key={image.name}
                className="gallery-tile"
                aria-label={`Enlarge ${image.label}`}
                onClick={() => setIndex(images.findIndex((i) => i.name === image.name))}
              >
                <img src={image.src} alt={image.label} loading="lazy" />
                <span>
                  {image.label.split(" — ")[1]}
                  <Maximize2 size={17} />
                </span>
              </Button>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="journey-grid">
          <div>
            <p className="eyebrow">06 — DEVELOPMENT MILESTONES</p>
            <h2>The build, step by step.</h2>
            <ol className="milestone-list">
              {project.milestones.map((m, i) => (
                <li key={m}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <p>{m.replace(/^Phase \d+ — /, "")}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="eyebrow">07 — LESSONS & CONSTRAINTS</p>
            <h2>What made it interesting.</h2>
            <ul className="challenge-list">
              {project.challenges.map((c) => (
                <li key={c}>
                  <ArrowUpRight size={18} />
                  <p>{c}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <ContactTeaser />
      <ImageViewer images={images} index={index} onClose={() => setIndex(null)} />
    </>
  );
}
