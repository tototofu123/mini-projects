import React, { useState, useEffect, useRef } from 'react'
import { SpringBody } from '../../../physics/SpringPhysics'
import { setupPhysicsManagerEffects } from './SpringPhysicsManager.effects'
import { ProjectCard } from '../ProjectCard/ProjectCard'

const INITIAL_CARDS: SpringBody[] = [
  {
    id: 'climbing',
    x: -380,
    y: 50,
    vx: 0,
    vy: 0,
    anchorX: -380,
    anchorY: 50,
    mass: 1.0,
    damping: 0.94,
    stiffness: 0.05,
  },
  {
    id: 'rag',
    x: 380,
    y: 50,
    vx: 0,
    vy: 0,
    anchorX: 380,
    anchorY: 50,
    mass: 1.0,
    damping: 0.94,
    stiffness: 0.05,
  },
  {
    id: 'connect4',
    x: -240,
    y: -100,
    vx: 0,
    vy: 0,
    anchorX: -240,
    anchorY: -100,
    mass: 1.2,
    damping: 0.94,
    stiffness: 0.04,
  },
  {
    id: 'bus',
    x: 240,
    y: -100,
    vx: 0,
    vy: 0,
    anchorX: 240,
    anchorY: -100,
    mass: 1.2,
    damping: 0.94,
    stiffness: 0.04,
  },
  {
    id: 'bot',
    x: -120,
    y: -250,
    vx: 0,
    vy: 0,
    anchorX: -120,
    anchorY: -250,
    mass: 1.4,
    damping: 0.94,
    stiffness: 0.03,
  },
  {
    id: 'detector',
    x: 120,
    y: -250,
    vx: 0,
    vy: 0,
    anchorX: 120,
    anchorY: -250,
    mass: 1.4,
    damping: 0.94,
    stiffness: 0.03,
  },
]

const CARDS_CONTENT = {
  climbing: {
    title: 'HKUST Climbing App',
    category: 'Full Stack App',
    description: 'Comprehensive web app featuring automated route approval workflows, smart attendance verification, and Cloudflare D1 unified backup sync layers.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Cloudflare D1', 'Supabase API'],
    depth: 'front' as const,
  },
  rag: {
    title: 'RAG AI Agent',
    category: 'Artificial Intelligence',
    description: 'Advanced retrieval-augmented generation engine supporting dynamic semantic chunking and highly contextual vector database lookups.',
    tags: ['AI', 'RAG', 'LLM', 'Python', 'ChromaDB'],
    depth: 'front' as const,
  },
  connect4: {
    title: 'Strategic Connect 4',
    category: 'Game Theory',
    description: 'Highly competitive Connect 4 AI solver integrating minimax logic with alpha-beta pruning and optimized board evaluation heuristics.',
    tags: ['Python', 'Minimax', 'AI', 'Heuristics'],
    depth: 'middle' as const,
  },
  bus: {
    title: 'HK Bus Tracker',
    category: 'Frontend Dev',
    description: 'Real-time transit tracker integrated with Hong Kong transit public APIs, optimized for responsive performance and high-frequency live rendering.',
    tags: ['JavaScript', 'API', 'UI', 'Live Feed'],
    depth: 'middle' as const,
  },
  bot: {
    title: 'Combat Bot 1st Place',
    category: 'Systems Engineering',
    description: 'First-place combat robotics vehicle executing state-machine behavior, sensory polling pipelines, and sub-millisecond hardware motor loops.',
    tags: ['Embedded', 'C++', 'Hardware', 'Robotics'],
    depth: 'back' as const,
  },
  detector: {
    title: 'AI Image Detector',
    category: 'Computer Vision',
    description: 'High-accuracy Convolutional Neural Network trained to distinguish real images from AI-generated deepfakes at high speeds.',
    tags: ['Python', 'CNN', 'TensorFlow', 'AI'],
    depth: 'back' as const,
  },
}

export const SpringPhysicsManager: React.FC = () => {
  const [bodies, setBodies] = useState<Map<string, SpringBody>>(new Map())
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  const [wellPos, setWellPos] = useState<{ x: number; y: number } | null>(null)
  
  const physicsControllerRef = useRef<{
    spawnGravityWell: (x: number, y: number) => void
    clearWells: () => void
  } | null>(null)

  useEffect(() => {
    const controller = setupPhysicsManagerEffects(INITIAL_CARDS, (updatedBodies) => {
      setBodies(updatedBodies)
    })

    physicsControllerRef.current = controller

    return () => {
      controller.cleanup()
    }
  }, [])

  // Handle click on background to spawn gravity well
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If clicking a card, don't trigger gravity well
    if ((e.target as HTMLElement).closest('.cursor-grab')) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    setWellPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    physicsControllerRef.current?.spawnGravityWell(x, y)

    // Decay/clear gravity well after 1.5 seconds
    setTimeout(() => {
      physicsControllerRef.current?.clearWells()
      setWellPos(null)
    }, 1500)
  }

  return (
    <div 
      className="absolute inset-0 w-full h-full cursor-crosshair z-10"
      onClick={handleBackgroundClick}
    >
      {/* Visual Gravity Well Indicator */}
      {wellPos && (
        <div
          className="absolute w-8 h-8 rounded-full border-2 border-orange-500 bg-orange-500/20 animate-ping pointer-events-none z-30"
          style={{
            left: wellPos.x - 16,
            top: wellPos.y - 16,
          }}
        />
      )}

      {/* Render Spring-Controlled Cards */}
      {INITIAL_CARDS.map((card) => {
        const body = bodies.get(card.id) || card
        const content = CARDS_CONTENT[card.id as keyof typeof CARDS_CONTENT]

        return (
          <ProjectCard
            key={card.id}
            id={card.id}
            title={content.title}
            category={content.category}
            description={content.description}
            tags={content.tags}
            physicsX={body.x}
            physicsY={body.y}
            depth={content.depth}
            isSelected={selectedCardId === card.id}
            onClick={() => setSelectedCardId(card.id)}
            onClose={() => setSelectedCardId(null)}
          />
        )
      })}
    </div>
  )
}
