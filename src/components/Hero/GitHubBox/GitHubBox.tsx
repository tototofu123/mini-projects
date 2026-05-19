import React from 'react'
import { motion } from 'framer-motion'
import { githubBoxAnimation, heartbeatAnimation } from './GitHubBox.animation'

export const GitHubBox: React.FC = () => {
  const handleClick = () => {
    window.open('https://github.com/tototofu123', '_blank')
  }

  return (
    <motion.div
      onClick={handleClick}
      className="absolute bottom-8 left-16 border border-slate-700 bg-slate-700/30 px-12 py-8 rounded-xl cursor-pointer hover:border-slate-600 transition"
      variants={githubBoxAnimation}
      initial="initial"
      animate="animate"
      whileHover={{ borderColor: '#F97316' }}
    >
      <p className="font-space text-sm text-slate-400">GitHub Stats</p>
      <p className="font-space text-xl text-slate-400">
        <motion.span animate={heartbeatAnimation} className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></motion.span>
        Commits: 1,204 | PRs: 42
      </p>
    </motion.div>
  )
}
