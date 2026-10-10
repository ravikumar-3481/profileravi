import { useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Compass, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Floating decorative shapes — pure SVG, animated with framer-motion springs.
function FloatingShapes({ reduced }) {
  const shapes = [
    { cx: '12%', cy: '22%', size: 10, delay: 0, dur: 5.5 },
    { cx: '84%', cy: '18%', size: 14, delay: .6, dur: 6.5 },
    { cx: '78%', cy: '74%', size: 8, delay: .3, dur: 5 },
    { cx: '18%', cy: '68%', size: 12, delay: .9, dur: 7 },
    { cx: '50%', cy: '12%', size: 7, delay: 1.2, dur: 6 },
    { cx: '90%', cy: '46%', size: 9, delay: .2, dur: 5.8 },
  ];
  return <div className="nf-shapes" aria-hidden="true">
    {shapes.map((s, i) => <motion.span key={i} className="nf-shape" style={{ left: s.cx, top: s.cy }}
      animate={reduced ? undefined : { y: [0, -18, 0], opacity: [.35, .8, .35] }}
      transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}>
      <svg width={s.size + 6} height={s.size + 6} viewBox="0 0 20 20" fill="none">
        {i % 3 === 0 && <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" />}
        {i % 3 === 1 && <rect x="4" y="4" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />}
        {i % 3 === 2 && <path d="M10 3 L17 16 L3 16 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />}
      </svg>
    </motion.span>)}
  </div>;
}

// Technical linework: contours, a flowing signal path, coordinates and a radar sweep.
function NotFoundLinework({ visible, reduced }) {
  return <motion.div className="nf-linework" style={reduced ? undefined : { opacity: visible ? 1 : 0 }} aria-hidden="true">
    <svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" fill="none">
      <g className="nf-contours">
        {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${-120 + i * 40} 920 C ${220 + i * 30} 640, ${140 + i * 36} 260, ${600 + i * 34} 150 S ${1120 + i * 30} 400, ${1520 + i * 24} -40`} />)}
      </g>
      <path className="nf-signal" d="M-90 720 C280 500 240 240 700 200 S1120 420 1500 60" />
      <g className="nf-radar" style={reduced ? { opacity: .5 } : undefined}>
        <circle cx="700" cy="430" r="150" />
        <circle cx="700" cy="430" r="230" />
        <circle cx="700" cy="430" r="310" />
        <line x1="700" y1="120" x2="700" y2="740" />
        <line x1="390" y1="430" x2="1010" y2="430" />
      </g>
      <g className="nf-coordinates">
        <path d="M120 700h20m-10-10v20M1260 180h20m-10-10v20M980 760h20m-10-10v20" />
        <circle cx="130" cy="700" r="18" />
        <circle cx="1270" cy="180" r="18" />
      </g>
      <g className="nf-trail" style={reduced ? { strokeDasharray: '4 10' } : undefined}>
        <motion.circle
          r="4" fill="currentColor" stroke="none"
          animate={reduced ? undefined : { cx: [220, 640, 1080, 640, 220], cy: [560, 420, 480, 420, 560] }}
          transition={reduced ? undefined : { duration: 14, repeat: Infinity, ease: 'linear' }}
        />
      </g>
    </svg>
  </motion.div>;
}

export function NotFoundPage() {
  const ref = useRef(null);
  const visible = useInView(ref, { amount: .1 });
  const reduced = useReducedMotion();
  const stagger = i => reduced ? {}
    : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: .7, delay: .15 + i * .12, ease: [.22, 1, .36, 1] } };
  return <section ref={ref} className={`nf-page ${visible ? 'is-visible' : ''}`} aria-label="Page not found">
    <NotFoundLinework visible={visible} reduced={reduced} />
    <FloatingShapes reduced={reduced} />
    <div className="nf-content">
      <motion.p className="nf-eyebrow" {...stagger(0)}><Compass size={14} /> <span>ERROR 404 · SIGNAL LOST</span></motion.p>
      <motion.div className="nf-digits" aria-hidden="true">
        {['4', '0', '4'].map((d, i) => <motion.span key={i}
          initial={false}
          animate={reduced ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 3.2, delay: i * .35, repeat: Infinity, ease: 'easeInOut' }}>
          {d}{i === 2 && <em className="nf-digit-dot">.</em>}
        </motion.span>)}
      </motion.div>
      <motion.h1 className="nf-title" {...stagger(1)}>This page wandered <span className="serif-italic">off the map.</span></motion.h1>
      <motion.p className="nf-description" {...stagger(2)}>The route you followed doesn’t exist — but your curiosity is noted. Head back home or explore the work instead.</motion.p>
      <motion.div className="nf-actions" {...stagger(3)}>
        <Button asChild size="lg"><Link to="/"><Home size={17} /> Back home</Link></Button>
        <Button asChild variant="outline" size="lg"><Link to="/projects">Explore my work <ArrowUpRight size={17} /></Link></Button>
      </motion.div>
    </div>
    <motion.div className="nf-footer" {...stagger(4)}><span>PORTFOLIO / RAVI VISHWAKARMA</span><span>STATUS: EXPLORING</span></motion.div>
  </section>;
}
