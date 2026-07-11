import { motion } from 'framer-motion';

export default function GitHubStats() {
  return (
    <section id="github-stats" className="github-premium-section relative">
      <div className="gh-bg-glow"></div>
      <motion.div 
        className="section-tittle"
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <h1>GitHub Activity</h1>
        <div className="tittle-under"></div>
        <p className="section-description">A visual footprint of my open-source contributions, engineering velocity, and consistency.</p>
      </motion.div>

      <div className="github-bento-grid">
        <motion.div 
          className="gh-card gh-chart-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0 }}
        >
          <div className="gh-card-header">
            <div className="gh-icon-wrapper">
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="gh-icon">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </div>
            <h3>Contribution Heatmap</h3>
          </div>
          <div className="gh-chart-wrapper">
            <img src="https://ghchart.rshah.org/9124ff/ravikumar-3481" alt="Ravi's GitHub Contributions" loading="lazy" className="gh-heatmap-img" />
          </div>
        </motion.div>

        <motion.div 
          className="gh-card gh-stats-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        >
          <div className="gh-card-header">
            <div className="gh-icon-wrapper">
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="gh-icon">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h3>Developer Stats</h3>
          </div>
          <div className="gh-img-container" style={{ width: '100%' }}>
            <img src="https://github-readme-activity-graph.vercel.app/graph?username=ravikumar-3481&theme=react-dark&bg_color=0D1117&color=17A8B8&line=0F7B8C&point=ffffff&area=true&hide_border=true" width="100%" alt="GitHub Stats" loading="lazy" />
          </div>
        </motion.div>

        <motion.div 
          className="gh-card gh-streak-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        >
          <div className="gh-card-header">
            <div className="gh-icon-wrapper">
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="gh-icon">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
            </div>
            <h3>Commit Streak</h3>
          </div>
          <div className="gh-img-container" style={{ width: '100%' }}>
            <img src="https://github-readme-streak-stats.herokuapp.com/?user=ravikumar-3481&theme=dracula&hide_border=true&background=00000000&ring=9124ff&fire=9124ff&currStreakLabel=9124ff" alt="GitHub Streak" loading="lazy" />
          </div>
        </motion.div>
      </div>

      <div className="github-action-container">
        <a href="https://github.com/ravikumar-3481" target="_blank" rel="noreferrer" className="github-view-btn">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          <span>View Full GitHub Profile</span>
          <div className="btn-glow"></div>
        </a>
      </div>
    </section>
  );
}
