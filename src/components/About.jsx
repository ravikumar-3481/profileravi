import { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

function Counter({ target, duration = 1.5, suffix = "+" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const isFloat = target % 1 !== 0;
    const controls = animate(0, target, {
      duration: duration,
      ease: "easeOut",
      onUpdate: (value) => {
        if (isFloat) {
          setCount(parseFloat(value.toFixed(1)));
        } else {
          setCount(Math.floor(value));
        }
      }
    });
    return () => controls.stop();
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const scrollRef = useRef(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  // Marquee list contents
  const marqueeItems = [
    "Machine Learning", "User Research", "Data Pipelines", 
    "Full-Stack Development", "Data Analytics", "Design System", 
    "AI Models", "Branding", "Deployment", "Agentic AI"
  ];

  // Repeat twice for seamless infinite scrolling loop
  const doubleMarqueeItems = [...marqueeItems, ...marqueeItems];

  return (
    <section className="about" id="about" ref={scrollRef}>
      {/* 1. Marquee Divider */}
      <div className="about-marquee">
        <div className="about-marquee-content">
          {doubleMarqueeItems.map((item, idx) => (
            <div key={idx} className="about-marquee-item">
              {item} <span className="accent-star">✦</span>
            </div>
          ))}
        </div>
      </div>

      <motion.div 
        className="section-tittle" 
        style={{ marginBottom: '5rem' }}
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1>About Me</h1>
        <div className="tittle-under"></div>
      </motion.div>
      {/* 2. Main About Details */}
      <div className="about-grid-new">
        {/* Left Column: Heading and Location */}
        <motion.div 
          className="about-left-col"
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: false, amount: 0.2 }}
          variants={textVariants}
        >
          <h2 className="about-headline-new">
            Designing with <span className="italic-gradient">intention</span>, shipping with <span className="italic-gradient">care</span>.
          </h2>
          <div className="about-location-badge">
            <i className="fas fa-map-marker-alt" style={{ color: '#9124ff' }}></i>
            <span>Based in Satna · Working worldwide</span>
          </div>
        </motion.div>

        {/* Right Column: Paragraph Bio & Stats Grid */}
        <motion.div 
          className="about-right-col"
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={{ once: false, amount: 0.2 }}
          variants={rightVariants}
        >
          <p className="about-bio-text">
            I am a B.Tech CSE student specializing in AI & Data Science. I am obsessed with building scalable software systems and analyzing complex datasets to solve real-world problems. Whether it's training machine learning models or designing full-stack interfaces, I focus on the small decisions that turn tangled logic into experiences that feel inevitable.
          </p>
          <p className="about-bio-text">
            Over the past few years, I've developed predictive analytics dashboards improving decision timelines by 40% and engineered data pipelines supporting 50,000+ records. I strive to build applications that are clean, performant, and helpful.
          </p>

          {/* Stats Metrics Grid */}
          <div className="about-stats-grid">
            <div className="about-stat-box">
              <div className="about-stat-number">
                <Counter target={1.5} suffix="+" />
              </div>
              <div className="about-stat-label">Years of Experience</div>
            </div>
            <div className="about-stat-box">
              <div className="about-stat-number">
                <Counter target={63} suffix="+" />
              </div>
              <div className="about-stat-label">Projects Completed</div>
            </div>
            <div className="about-stat-box">
              <div className="about-stat-number">
                <Counter target={124} suffix="+" />
              </div>
              <div className="about-stat-label">LeetCode Solved</div>
            </div>
            <div className="about-stat-box">
              <div className="about-stat-number">
                <Counter target={50} suffix="K+" />
              </div>
              <div className="about-stat-label">Data Records Managed</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
