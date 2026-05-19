import React, { useState, useEffect } from 'react'
import { LoadingScreen } from './components/Global/LoadingScreen/LoadingScreen'
import { Header } from './components/Global/Header/Header'
import { HeroSection } from './components/Hero/HeroSection/HeroSection'
import { AboutSection } from './components/About/AboutSection/AboutSection'
import { ProjectsSection } from './components/Projects/ProjectsSection/ProjectsSection'
import { SkillsSection } from './components/Skills/SkillsSection/SkillsSection'
import { ContactSection } from './components/Contact/ContactSection/ContactSection'
import { FooterSection } from './components/Footer/FooterSection/FooterSection'

export function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <Header />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <FooterSection />
    </>
  )
}

export default App
