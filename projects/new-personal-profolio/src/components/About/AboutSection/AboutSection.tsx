import React from 'react'
import { motion } from 'framer-motion'
import { assetUrl } from '../../../utils/assetUrl'

export const AboutSection: React.FC = () => {
  return (
    <motion.section className="about-section" id="about">
      <div className="about-header">[ PROFILE ENGINE ]</div>
      <div className="about-grid">
        <div className="about-left-col">
          <div className="about-box">
            <p>
              I'm Toto, a <strong>Computer Engineering and AI student at HKUST</strong>. I build systems that connect the physical world to the digital one.
            </p>
          </div>
          <div className="about-box">
            <span className="box-title">AI</span>
            <p>Training <strong>CNN models</strong> and leveraging <strong>AI automation</strong> to accelerate productivity.</p>
          </div>
          <div className="about-box">
            <span className="box-title">UI</span>
            <p>Using <strong>design tools</strong> and modern <strong>code</strong> to craft high-performance interactive experiences.</p>
          </div>
          <div className="about-box">
            <span className="box-title">Embedded Systems</span>
            <p>Integrating <strong>embedded hardware</strong> and physical computing solutions.</p>
          </div>
        </div>
        <div className="about-right-asset">
          <img src={assetUrl('/images/profile.jpg')} alt="Toto Lai" />
        </div>
      </div>
    </motion.section>
  )
}
