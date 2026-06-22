import React from 'react'
import { motion } from 'framer-motion'

export const SkillsSection: React.FC = () => (
	<motion.section className="ancient-phase" id="skills">
		<h2 className="skills-header" style={{ opacity: 0.1, position: 'absolute', marginBottom: 0 }}>[ DEEP ECOSYSTEM ]</h2>
		<div className="skills-layout">
			<div className="skill-row row-ai">
				<div className="skill-side left">
					<span className="skill-pill">TensorFlow</span>
					<span className="skill-pill">RAG</span>
					<span className="skill-pill">Dify</span>
				</div>
				<h3 className="skill-main">ARTIFICIAL INTELLIGENCE</h3>
				<div className="skill-side right">
					<span className="skill-pill">n8n</span>
					<span className="skill-pill">AI PRD</span>
					<span className="skill-pill">MCP</span>
				</div>
			</div>

			<div className="skill-row row-ui">
				<div className="skill-side left">
					<span className="skill-pill">HTML</span>
					<span className="skill-pill">CSS</span>
				</div>
				<h3 className="skill-main">USER INTERFACE</h3>
				<div className="skill-side right">
					<span className="skill-pill">Figma</span>
					<span className="skill-pill">Framer</span>
				</div>
			</div>

			<div className="skill-row row-sw">
				<div className="skill-side left">
					<span className="skill-pill">Python</span>
					<span className="skill-pill">JavaScript</span>
				</div>
				<h3 className="skill-main">SOFTWARE ENGINEERING</h3>
				<div className="skill-side right">
					<span className="skill-pill">C</span>
					<span className="skill-pill">C++</span>
				</div>
			</div>

			<div className="skill-row row-hw">
				<div className="skill-side left">
					<span className="skill-pill">Arduino</span>
					<span className="skill-pill">STM32</span>
				</div>
				<h3 className="skill-main">HARDWARE &amp; SYSTEMS</h3>
				<div className="skill-side right">
					<span className="skill-pill">CAD</span>
					<span className="skill-pill">PID Control</span>
				</div>
			</div>
		</div>
	</motion.section>
)
