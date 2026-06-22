import React from 'react'
import { motion } from 'framer-motion'

export const FooterSection: React.FC = () => (
  <motion.footer className="footer-phase" id="footer">
    <div className="override-text">&gt; system.override(tototofu); // take off headset</div>
    <div className="footer-grid">
      <div className="footer-col">
        <div className="col-header">DEVELOPMENT</div>
        <ul className="footer-links">
          <li><a href="https://repo.lai.codes" target="_blank" rel="noopener noreferrer">repo.lai.codes</a></li>
          <li><a href="https://github.com/tototofu123" target="_blank" rel="noopener noreferrer">GitHub Profile</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <div className="col-header">BLOG</div>
        <ul className="footer-links">
          <li><a href="https://blog.lai.codes" target="_blank" rel="noopener noreferrer">blog.lai.codes</a></li>
          <li><a href="https://github.com/tototofu123" target="_blank" rel="noopener noreferrer">Technical Writing</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <div className="col-header">CONNECT</div>
        <ul className="footer-links">
          <li><a href="https://www.linkedin.com/in/lai-man-to" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href="mailto:tototofu0601@gmail.com">Email</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <div className="col-header">STATUS</div>
        <ul className="footer-links">
          <li><a href="https://github.com/tototofu123" target="_blank" rel="noopener noreferrer">More about Me →</a></li>
        </ul>
      </div>
    </div>
    <div className="sign-off">
      <span>© 2026 Toto Lai Man To. All systems operational.</span>
      <span>t.tofu</span>
    </div>
  </motion.footer>
)
