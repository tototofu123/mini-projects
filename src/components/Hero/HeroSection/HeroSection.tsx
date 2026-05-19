import React from 'react'
import { AvatarContainer } from './AvatarContainer/AvatarContainer'
import { MainTitle } from './MainTitle/MainTitle'
import { IntroLines } from './IntroLines/IntroLines'
import { GitHubBox } from './GitHubBox/GitHubBox'
import { StatusRow } from './StatusRow/StatusRow'

export const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-deep-slate text-slate-100 relative overflow-hidden">
      <StatusRow />
      <div className="h-screen flex items-center justify-center relative">
        <AvatarContainer />
        <MainTitle />
        <IntroLines />
        <GitHubBox />
      </div>
    </section>
  )
}
