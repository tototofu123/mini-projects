import React from 'react'

interface ProjectTagProps {
  name: string
}

export const ProjectTag: React.FC<ProjectTagProps> = ({ name }) => {
  const getTagStyles = (tagName: string) => {
    const nameLower = tagName.toLowerCase()
    if (nameLower.includes('ai') || nameLower.includes('rag') || nameLower.includes('llm') || nameLower.includes('cnn') || nameLower.includes('tensorflow')) {
      return 'bg-cyan-50 text-cyan-600 border-cyan-200/80'
    }
    if (nameLower.includes('ui') || nameLower.includes('react') || nameLower.includes('figma') || nameLower.includes('framer') || nameLower.includes('frontend')) {
      return 'bg-purple-50 text-purple-600 border-purple-200/80'
    }
    if (nameLower.includes('javascript') || nameLower.includes('python') || nameLower.includes('full stack') || nameLower.includes('api')) {
      return 'bg-emerald-50 text-emerald-600 border-emerald-200/80'
    }
    return 'bg-slate-50 text-slate-600 border-slate-200/80'
  }

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm ${getTagStyles(
        name
      )}`}
    >
      {name}
    </span>
  )
}
