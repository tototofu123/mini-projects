import React, { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { cardDropVariants } from './ProjectCard.animation'
import { setupCardEffects } from './ProjectCard.effects'
import { ProjectTag } from '../ProjectTag/ProjectTag'

interface ProjectCardProps {
  id: string
  title: string
  category: string
  description: string
  tags: string[]
  physicsX: number
  physicsY: number
  depth: 'back' | 'middle' | 'front'
  isSelected: boolean
  onClick: () => void
  onClose: () => void
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id: _id,
  title,
  category,
  description,
  tags,
  physicsX,
  physicsY,
  depth,
  isSelected,
  onClick,
  onClose,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [dragProgress, setDragProgress] = useState(0)

  // Drag tracking for the "tear-open" gesture
  const dragX = useMotionValue(0)
  const tearThreshold = 120

  useEffect(() => {
    if (!cardRef.current) return
    return setupCardEffects(cardRef.current, (progress) => {
      setDragProgress(progress)
    })
  }, [])

  // Depth translations for CSS 3D space
  const zDepth = {
    back: -400,
    middle: -200,
    front: 0,
  }[depth]

  const scaleVal = {
    back: 0.8,
    middle: 0.9,
    front: 1.0,
  }[depth]

  // Morph card shape based on drag progress to simulate a "tearing curtain"
  const clipPathVal = useTransform(
    dragX,
    [0, tearThreshold],
    ['polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', 'polygon(0% 0%, 85% 10%, 100% 100%, 0% 90%)']
  )

  const handleDragEnd = () => {
    if (Math.abs(dragX.get()) > tearThreshold) {
      onClick()
    }
    dragX.set(0)
    setDragProgress(0)
  }

  return (
    <>
      <motion.div
        ref={cardRef}
        className={`absolute w-80 h-96 rounded-2xl border bg-white/70 border-slate-200/60 backdrop-blur-lg shadow-xl shadow-slate-200/50 flex flex-col justify-between p-6 select-none cursor-grab active:cursor-grabbing transition-shadow duration-300 ${
          isHovered ? 'shadow-2xl shadow-orange-500/10 border-orange-500/20' : ''
        }`}
        style={{
          x: physicsX + dragX.get(),
          y: physicsY,
          z: zDepth,
          scale: scaleVal,
          transformStyle: 'preserve-3d',
          clipPath: clipPathVal,
        }}
        variants={cardDropVariants(depth)}
        initial="initial"
        animate="animate"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          dragX.set(0)
          setDragProgress(0)
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style-custom={{ dragX }}
        onDrag={(_, info) => {
          dragX.set(info.offset.x)
          setDragProgress(Math.min(Math.abs(info.offset.x) / tearThreshold, 1))
        }}
        onDragEnd={handleDragEnd}
      >
        {/* Tension line from ceiling */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-[1px] h-48 bg-slate-300/40 pointer-events-none" />

        {/* Folded Top-Right Corner decoration on hover */}
        <div
          className="absolute top-0 right-0 w-8 h-8 bg-slate-100 border-l border-b border-slate-200 rounded-bl-lg transition-transform duration-300 origin-top-right"
          style={{
            transform: isHovered ? 'scale(1)' : 'scale(0)',
          }}
        />

        <div className="flex flex-col gap-2">
          <span className="font-space text-xs font-semibold uppercase tracking-wider text-orange-500">
            {category}
          </span>
          <h3 className="font-syne text-2xl font-bold text-slate-800 leading-tight">
            {title}
          </h3>
          <p className="font-dm text-sm text-slate-600 mt-2 line-clamp-3">
            {description}
          </p>
        </div>

        <div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.slice(0, 3).map((tag, idx) => (
              <ProjectTag key={idx} name={tag} />
            ))}
          </div>

          {/* Swipe indicator */}
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden relative">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-100"
              style={{ width: `${dragProgress * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-space text-slate-400 block mt-1.5 text-center">
            {dragProgress > 0.5 ? 'RELEASE TO TEAR OPEN ⚡' : 'DRAG HORIZONTALLY TO TEAR'}
          </span>
        </div>
      </motion.div>

      {/* Expanded Modal view */}
      {isSelected && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <motion.div
            className="bg-white rounded-3xl border border-slate-100 max-w-2xl w-full p-8 shadow-2xl relative flex flex-col gap-6"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 flex items-center justify-center transition-colors"
              onClick={onClose}
            >
              ✕
            </button>

            <div>
              <span className="font-space text-xs font-semibold uppercase tracking-wider text-orange-500">
                {category}
              </span>
              <h2 className="font-syne text-4xl font-bold text-slate-900 mt-1">
                {title}
              </h2>
            </div>

            <p className="font-dm text-lg text-slate-700 leading-relaxed border-t border-b border-slate-100 py-6">
              {description}
            </p>

            <div>
              <h4 className="font-space text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Technologies Integrated
              </h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <ProjectTag key={idx} name={tag} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
