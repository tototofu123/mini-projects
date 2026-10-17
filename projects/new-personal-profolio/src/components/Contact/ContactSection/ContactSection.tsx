import React from 'react'
import { motion } from 'framer-motion'

export const ContactSection: React.FC = () => (
  <motion.section className="contact-phase" id="contact">
    <div className="contact-layout">
      <div className="contact-left">
        <a href="#" className="resume-title">RESUME</a>
        <div className="contact-roles">
          <p>AI Engineer</p>
          <p>Frontend Developer</p>
          <p>Software Engineer</p>
          <p>Hardware Engineer</p>
        </div>
      </div>
      <div className="contact-right">
        <a href="mailto:tototofu0601@gmail.com" className="contact-link">Email ↗</a>
        <a href="https://github.com/tototofu123" target="_blank" rel="noopener noreferrer" className="contact-link">GitHub ↗</a>
        <a href="https://www.linkedin.com/in/lai-man-to" target="_blank" rel="noopener noreferrer" className="contact-link">LinkedIn ↗</a>
      </div>
    </div>
  </motion.section>
)
