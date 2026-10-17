import React from 'react'
import { motion } from 'framer-motion'

export const ProjectsSection: React.FC = () => {
  return (
    <motion.section className="modern-phase" id="projects">
      <h2 className="projects-header">[ MODERN GALLERY ]</h2>
      <div className="projects-subtitle">Air Environment</div>
      <div className="projects-grid">
        <div className="project-card">
          <h3 className="project-title">HKUST Climbing App</h3>
          <div className="project-tags">
            <span className="tag">Full Stack</span><span className="tag">UI</span><span className="tag">AI</span><span className="tag">Python</span>
          </div>
          <p className="project-desc">Comprehensive web app for the climbing society. Features automated management workflows, AI integration, and a modern frontend UI.</p>
        </div>
        <div className="project-card">
          <h3 className="project-title">RAG AI Agent</h3>
          <div className="project-tags">
            <span className="tag">AI</span><span className="tag">RAG</span><span className="tag">LLM</span>
          </div>
          <p className="project-desc">Intelligent agent utilizing Retrieval-Augmented Generation to process, vectorize, and accurately query extensive technical documentation.</p>
        </div>
        <div className="project-card">
          <h3 className="project-title">Strategic Connect 4</h3>
          <div className="project-tags">
            <span className="tag">Python</span><span className="tag">Minimax</span><span className="tag">AI</span>
          </div>
          <p className="project-desc">Game intelligence engine built with Python. Utilizes Minimax algorithm and alpha-beta pruning to evaluate thousands of board states efficiently.</p>
        </div>
        <div className="project-card">
          <h3 className="project-title">HK Bus Tracker</h3>
          <div className="project-tags">
            <span className="tag">JavaScript</span><span className="tag">API</span><span className="tag">UI</span>
          </div>
          <p className="project-desc">Real-time transit web application integrating live public API data with a clean, responsive, and user-friendly interface.</p>
        </div>
        <div className="project-card">
          <h3 className="project-title">Combat Bot System</h3>
          <div className="project-tags">
            <span className="tag">Embedded</span><span className="tag">C++</span><span className="tag">Hardware</span>
          </div>
          <p className="project-desc">Custom-built robotic car machine featuring integrated microcontroller logic and a robust state-machine based PvE combat system.</p>
        </div>
        <div className="project-card">
          <h3 className="project-title">AI Image Detector</h3>
          <div className="project-tags">
            <span className="tag">Python</span><span className="tag">CNN</span><span className="tag">TensorFlow</span>
          </div>
          <p className="project-desc">Deep Convolutional Neural Network classifying real versus AI-generated imagery. High validation accuracy trained on a large local dataset.</p>
        </div>
      </div>
    </motion.section>
  )
}
