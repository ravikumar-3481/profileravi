import { useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Download, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Typewriter, SkillMarquee } from '@/components/extras';
import { profile } from '@/data/portfolio';
import { imagekit } from '@/data/portfolio';

const roles = ['AI Engineer', 'Data Scientist', 'ML Practitioner', 'Full-Stack Builder'];

export function PortraitHero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const visible = useInView(ref, { amount: .1 });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 75, damping: 24 });
  const y = useSpring(pointerY, { stiffness: 75, damping: 24 });
  const portraitX = useTransform(x, value => value * 12);
  const portraitY = useTransform(y, value => value * 8);
  const linesX = useTransform(x, value => value * -20);
  const linesY = useTransform(y, value => value * -14);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorOpacity = useMotionValue(0);
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 25 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 25 });
  function move(event) {
    if (reduced || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - .5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - .5);
    cursorX.set(event.clientX - bounds.left - 24);
    cursorY.set(event.clientY - bounds.top - 24);
    cursorOpacity.set(1);
  }
  function reset() { pointerX.set(0); pointerY.set(0); cursorOpacity.set(0); }
  return <>
    <section ref={ref} className={`portrait-hero ${visible ? 'is-visible' : ''}`} aria-label="Introducing Ravi kumar Vishwakarma" onPointerMove={move} onPointerLeave={reset}>
      <motion.div className="hero-linework" style={{ x: linesX, y: linesY }} aria-hidden="true">
        <svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" fill="none">
          <g className="hero-contours">
            {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M ${-160 + i * 35} 930 C ${180 + i * 26} 610, ${160 + i * 34} 200, ${590 + i * 30} 130 S ${1080 + i * 32} 420, ${1510 + i * 26} -60`} />)}
          </g>
          <path className="hero-signal" d="M-90 760 C260 460 250 180 700 180 S1100 390 1480 20" />
          <g className="hero-coordinates"><path d="M110 165h20m-10-10v20M1240 650h20m-10-10v20M1110 120h20m-10-10v20"/><circle cx="120" cy="165" r="24"/><circle cx="1250" cy="650" r="24"/></g>
        </svg>
      </motion.div>
      <div className="portrait-hero-top"><span className="hero-availability"><i className="status-dot"/> Available for new opportunities</span><span className="portrait-location"><MapPin size={13}/> India · Working worldwide</span></div>
      <motion.h1 className="portrait-title" initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .2 }}><span>RAVI</span><span>VISHWAKARMA<span className="portrait-title-dot">.</span></span></motion.h1>
      <motion.div className="portrait-cutout" style={{ x: portraitX, y: portraitY }} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: .3 }}><img src={imagekit('profileimage.png')} alt="Ravi Vishwakarma, AI engineer and data scientist" width="500" height="500" fetchPriority="high" /></motion.div>
      <motion.div className="portrait-intro" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .5 }}><p className="portrait-kicker">CURIOSITY MEETS CODE</p><div className="portrait-role">I’m a <Typewriter words={roles}/></div><p className="portrait-description">I turn complex data into clear insights and build intelligent systems that make a real difference.</p><div className="portrait-socials"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="Ravi on GitHub"><Github size={18}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="Ravi on LinkedIn"><Linkedin size={18}/></a><span>Always learning. Always building.</span></div></motion.div>
      <motion.div className="portrait-actions" initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .6 }}><p>Thoughtful engineering.<br/>Real-world impact.</p><Button asChild size="lg"><Link to="/projects">Explore my work <ArrowUpRight size={18}/></Link></Button><Button variant="ghost" onClick={() => window.dispatchEvent(new Event('open-resume'))}>View resume <Download size={15}/></Button></motion.div>
      <div className="portrait-hero-bottom"><span>AI / DATA / DEVELOPMENT</span><Link to="/about">Meet the person behind the code <ArrowDown size={15}/></Link><span>PORTFOLIO / {new Date().getFullYear()}</span></div>
      <motion.div className="hero-cursor-ring" style={{ x: ringX, y: ringY, opacity: cursorOpacity }} aria-hidden="true"/>
    </section>
    <SkillMarquee/>
  </>;
}