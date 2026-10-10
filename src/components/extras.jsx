import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import { ViewportReveal } from '@/components/viewport-reveal';
import { Code2, Database, BrainCircuit, Braces, Container, GitFork } from 'lucide-react';
import { Sun, Moon, ArrowUp, ChevronLeft, ChevronRight, Star, Quote, Download, X, GitBranch, Layers, Flame, Github, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { imagekit, profile } from '@/data/portfolio';
import testimonials from '@/data/testimonials.json';
import experience from '@/data/experience.json';
import education from '@/data/education.json';
import skills from '@/data/skills.json';
import tools from '@/data/tools.json';

const GH = 'ravikumar-3481';

export function Preloader() {
  const [show, setShow] = useState(true);
  useEffect(() => { const t = setTimeout(() => setShow(false), 1600); return () => clearTimeout(t); }, []);
  return <AnimatePresence>{show && <motion.div className="preloader" initial={{ opacity: 1 }} exit={{ y: '-100%' }} transition={{ duration: .7, ease: [.76, 0, .24, 1] }} aria-hidden="true">
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="preloader-mark">ravi<span className="text-primary">.</span></motion.div>
    <p className="preloader-sub">AI Engineer · Data Scientist</p>
    <div className="preloader-bar"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4, ease: 'easeInOut' }} /></div>
  </motion.div>}</AnimatePresence>;
}

export function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => { setDark(document.documentElement.classList.contains('dark')); }, []);
  function toggle() { const next = !dark; setDark(next); document.documentElement.classList.toggle('dark', next); try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch {} }
  return <Button variant="ghost" size="icon" className="theme-toggle" aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={toggle}>
    <AnimatePresence mode="wait" initial={false}><motion.span key={dark ? 'm' : 's'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: .2 }} style={{ display: 'flex' }}>{dark ? <Sun size={17} /> : <Moon size={17} />}</motion.span></AnimatePresence>
  </Button>;
}

export function Typewriter({ words }) {
  const [i, setI] = useState(0); const [text, setText] = useState(''); const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    if (!del && text === word) { const t = setTimeout(() => setDel(true), 1600); return () => clearTimeout(t); }
    if (del && text === '') { setDel(false); setI(i + 1); return; }
    const t = setTimeout(() => setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)), del ? 40 : 80);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return <span className="typewriter">{text}<span className="caret" aria-hidden="true" /></span>;
}

export function SkillMarquee() {
  const ref = useRef(null);
  const visible = useInView(ref, { amount: .2 });
  const icons = { Python: Code2, TensorFlow: BrainCircuit, React: Braces, MySQL: Database, 'Node.js': Code2, Docker: Container, Git: GitFork, Pandas: Database };
  const names = ['Python', 'TensorFlow', 'React', 'MySQL', 'Node.js', 'Docker', 'Git', 'Pandas'];
  const items = names.map(name => [...skills, ...tools].find(item => item.name === name)).filter(Boolean);
  return <ViewportReveal pop className="tech-strip container"><section ref={ref} className="tech-marquee" aria-label="Top skills and languages">
    <div className="tech-strip-label"><span className="status-dot"/><span>CORE<br/><strong>STACK</strong></span></div>
    <div className="marquee"><div className={`marquee-track ${visible ? 'is-running' : ''}`}>
      {[0, 1].map(copy => <div className="marquee-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>{items.map(item => { const Icon = icons[item.name]; return <span className="marquee-item" key={item.name}><Icon size={24} strokeWidth={1.5}/><span>{item.name}</span></span>; })}</div>)}
    </div></div>
  </section></ViewportReveal>;
}

export function QuoteSection() {
  return <section className="quote-section"><div className="container"><Quote size={30} className="text-primary" /><blockquote>“Data is just noise until <span className="serif-italic">curiosity</span> turns it into a story — and engineering turns that story into something people can use.”</blockquote><p>— Ravi Vishwakarma</p></div></section>;
}

export function TestimonialSlider() {
  const list = testimonials.filter(t => t.name !== 'Ravi Kumar Vishwakarma').slice(0, 6);
  const ref = useRef(null);
  const visible = useInView(ref, { amount: .15 });
  const reduced = useReducedMotion();
  const [idx, setIdx] = useState(0); const [dir, setDir] = useState(1);
  const go = d => { setDir(d); setIdx(p => (p + d + list.length) % list.length); };
  useEffect(() => { if (!visible || reduced) return; const t = setInterval(() => go(1), 6000); return () => clearInterval(t); }, [idx, visible, reduced]);
  const t = list[idx];
  return <section className="section container"><div className="section-heading"><div><div className="eyebrow"><span>08</span><span className="tiny-line" />KIND WORDS</div><h2>Good work starts with<br /><span className="serif-italic">good people.</span></h2></div><div className="slider-controls"><Button variant="outline" size="icon" aria-label="Previous review" onClick={() => go(-1)}><ChevronLeft /></Button><Button variant="outline" size="icon" aria-label="Next review" onClick={() => go(1)}><ChevronRight /></Button></div></div>
    <div ref={ref} className="slider-window"><AnimatePresence mode="wait" custom={dir}><motion.figure key={idx} custom={dir} initial={{ x: reduced ? 0 : dir * 80, opacity: reduced ? 1 : 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: reduced ? 0 : -dir * 80, opacity: reduced ? 1 : 0 }} transition={{ duration: reduced ? 0 : .45 }} className="slide">
      <div className="rating" aria-label={`${t.rating} out of 5 stars`}>{Array.from({ length: t.rating }, (_, i) => <Star key={i} size={15} fill="currentColor" />)}</div>
      <blockquote>“{t.feedback}”</blockquote>
      <figcaption className="testimonial-person"><span className="person-initial">{t.name.slice(0, 1).toUpperCase()}</span><div><strong>{t.name}</strong><span>{t.role} · {t.institute}</span></div></figcaption>
    </motion.figure></AnimatePresence></div>
    <div className="slider-dots">{list.map((_, i) => <button key={i} aria-label={`Show review ${i + 1}`} className={i === idx ? 'active' : ''} onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }} />)}</div>
  </section>;
}

export function GithubActivity() {
  const [stats, setStats] = useState(null);
  useEffect(() => { fetch(`https://api.github.com/users/${GH}`).then(r => r.ok ? r.json() : null).then(setStats).catch(() => {}); }, []);
  return <section className="section github-activity"><div className="container"><div className="section-heading"><div><div className="eyebrow"><Github size={14} /><span className="tiny-line" />BUILDING IN THE OPEN</div><h2>Code is better <span className="serif-italic">shared.</span></h2></div><Button variant="outline" asChild><a href={profile.github} target="_blank" rel="noreferrer">Explore GitHub <ArrowUpRight /></a></Button></div>
    <div className="gh-stats">{[['Public repositories', stats?.public_repos ?? 132], ['Followers', stats?.followers ?? 8], ['Following', stats?.following ?? '—']].map(([l, v]) => <div key={l}><strong>{v}</strong><span>{l}</span></div>)}</div>
    <div className="gh-card"><p className="eyebrow"><GitBranch size={14} /> CONTRIBUTION CALENDAR</p><img className="gh-calendar" src={`https://ghchart.rshah.org/6b7f3a/${GH}`} alt="GitHub contribution calendar for the last year" loading="lazy" /></div>
    <div className="gh-grid"><div className="gh-card"><p className="eyebrow"><Flame size={14} /> COMMIT STREAK</p><img src={`https://streak-stats.demolab.com?user=${GH}&hide_border=true&background=00000000&ring=7c8f45&fire=7c8f45&currStreakLabel=7c8f45&sideLabels=8a8a80&currStreakNum=8a8a80&sideNums=8a8a80&dates=8a8a80&stroke=8a8a8044`} alt="GitHub commit streak statistics" loading="lazy" /></div>
      <div className="gh-card"><p className="eyebrow"><Layers size={14} /> COMMIT HISTORY</p><img src={`https://github-readme-activity-graph.vercel.app/graph?username=${GH}&bg_color=00000000&color=8a8a80&line=7c8f45&point=7c8f45&area=true&area_color=7c8f45&hide_border=true&title_color=8a8a80`} alt="GitHub commit activity graph" loading="lazy" /></div></div>
  </div></section>;
}

function Timeline({ items, kind }) {
  return <div className="timeline-wide">{items.map(e => <ViewportReveal pop key={e.id} className="timeline-item"><span className="timeline-dot" />
    {kind === 'exp' ? <><div className="timeline-date">{e.duration} <span>REMOTE</span></div><h3>{e.role}</h3><p className="timeline-company">{e.company}</p><p className="body-copy">{e.description}</p><ul className="task-list">{e.tasks.map(t => <li key={t}>{t}</li>)}</ul><div className="tech-tags">{e.skills.map(s => <span key={s}>{s}</span>)}</div></>
      : <><div className="timeline-date">{e.duration}<span>EDUCATION</span></div><h3>{e.institute}</h3><p className="timeline-company">{e.degree}</p><p className="body-copy">{e.description}</p><div className="tech-tags">{e.courses.map(c => <span key={c}>{c}</span>)}</div>{e.cgpa && <p className="academic-score">Academic score: {e.cgpa}</p>}</>}
  </ViewportReveal>)}</div>;
}
export function ExperienceSection() {
  return <section className="section container"><div className="section-heading"><div><div className="eyebrow"><span>03</span><span className="tiny-line" />EXPERIENCE</div><h2>Where I’ve <span className="serif-italic">worked.</span></h2></div></div><Timeline items={experience} kind="exp" /></section>;
}
export function EducationSection() {
  return <section className="section container edu-section"><div className="section-heading"><div><div className="eyebrow"><span>04</span><span className="tiny-line" />EDUCATION</div><h2>Where I’ve <span className="serif-italic">learned.</span></h2></div></div><Timeline items={education} kind="edu" /></section>;
}

export function ResumeModal({ open, onClose }) {
  const src = imagekit('Ravi_Kumar_Vishwakarma_Resume_updated_page-0001.jpg');
  const pdfsrc = 'https://drive.google.com/uc?export=download&id=1M8tIvQtegWqFx9_DKpJwxOFpfl0DQPfB';
  return <Dialog open={open} onOpenChange={v => !v && onClose()}><DialogContent className="resume-dialog [&>button:last-child]:hidden">
    <div className="resume-head"><DialogTitle>Ravi Vishwakarma — Resume</DialogTitle><DialogDescription className="sr-only">Resume preview</DialogDescription>
      <div className="resume-actions"><Button asChild size="sm"><a href={pdfsrc} download="Ravi_Vishwakarma_Resume.pdf" target="_blank" rel="noreferrer"><Download /> Download</a></Button><Button variant="outline" size="sm" onClick={onClose}><X /> Close</Button></div></div>
    <div className="resume-body"><img src={src} alt="Ravi Vishwakarma Resume" /></div> 
  </DialogContent></Dialog>;
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const f = () => setShow(window.scrollY > 600); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  return <AnimatePresence>{show && <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="back-to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={18} /></motion.button>}</AnimatePresence>;
}
