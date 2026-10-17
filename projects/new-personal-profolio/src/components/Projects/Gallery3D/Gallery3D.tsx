import React from 'react'

interface Gallery3DProps {
  children: React.ReactNode
}

export const Gallery3D: React.FC<Gallery3DProps> = ({ children }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Deep perspective grid lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(203, 213, 225, 0.4) 100%), linear-gradient(0deg, transparent 24%, rgba(203, 213, 225, 0.2) 25%, rgba(203, 213, 225, 0.2) 26%, transparent 27%, transparent 74%, rgba(203, 213, 225, 0.2) 75%, rgba(203, 213, 225, 0.2) 76%, transparent 77%), linear-gradient(90deg, transparent 24%, rgba(203, 213, 225, 0.2) 25%, rgba(203, 213, 225, 0.2) 26%, transparent 27%, transparent 74%, rgba(203, 213, 225, 0.2) 75%, rgba(203, 213, 225, 0.2) 76%, transparent 77%)',
          backgroundSize: '100px 100px',
        }}
      />

      {/* Hallway side wall panels in 3D */}
      <div className="absolute inset-0 pointer-events-none flex justify-between z-0">
        {/* Left Wall */}
        <div 
          className="w-1/4 h-full bg-gradient-to-r from-slate-200/20 to-transparent border-r border-slate-200/30"
          style={{
            transform: 'perspective(1200px) rotateY(60deg) translate3d(-50px, 0, 0)',
            transformOrigin: 'left center',
          }}
        />
        {/* Right Wall */}
        <div 
          className="w-1/4 h-full bg-gradient-to-l from-slate-200/20 to-transparent border-l border-slate-200/30"
          style={{
            transform: 'perspective(1200px) rotateY(-60deg) translate3d(50px, 0, 0)',
            transformOrigin: 'right center',
          }}
        />
      </div>

      {/* Vanishing point light source */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-50 bg-gradient-to-tr from-orange-200 to-amber-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
      />

      {/* 3D Perspective container */}
      <div 
        className="relative w-full h-full flex items-center justify-center"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </div>
  )
}
