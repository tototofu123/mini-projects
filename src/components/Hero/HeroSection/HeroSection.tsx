import React from 'react'
import { motion } from 'framer-motion'

export const HeroSection: React.FC = () => {
  return (
    <motion.section className="hero-section" id="hero">
      <div className="hero-content-wrapper">
        {/* Left: Hero image with dark overlay for contrast */}
        <div className="hero-image-left">
          <img src="/images/hero-bg.jpg" alt="Hero background" />
          <div className="hero-image-overlay" />
        </div>

        {/* Right: Text content */}
        <div className="hero-text-container">
          <h1 className="hero-greeting">Hi, I am Toto Lai</h1>
          <p className="hero-role">an AI engineer and UI developer</p>
          <p className="hero-location">based in Hong Kong</p>
        </div>
      </div>

      {/* Below: GitHub streak stats — positioned relative to the section, not overlapping */}
      <div className="hero-bottom-bar">
        <div className="github-stats-box">
          <img
            src="https://github-readme-streak-stats.herokuapp.com/?user=tototofu123&theme=dark&hide_border=true&background=0F172A&stroke=1E293B&ring=F97316&fire=F97316&currStreakLabel=F97316&sideLabels=94A3B8&dates=64748B&currStreakNum=F8FAFC&sideNums=F8FAFC"
            alt="GitHub Streak Stats"
            className="streak-stats-img"
          />
        </div>
        <div className="hero-subtitle-bottom">
          Computer Engineering and Artificial Intelligence student at HKUST
        </div>
      </div>
    </motion.section>
  )
}
