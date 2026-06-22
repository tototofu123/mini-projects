import React, { useEffect, useRef, useState, useCallback } from 'react'

type NavItem = { id: string; label: string; isLogo?: boolean }

export const Header: React.FC = () => {
  const navItems: NavItem[] = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'logo', label: 't', isLogo: true },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ]

  const navItemsRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Array<HTMLElement | null>>([])
  const highlightRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)

  const [activeIndex, setActiveIndex] = useState(-1)
  const activeIndexRef = useRef(-1)
  const lastScrollYRef = useRef(0)
  const lastXRef = useRef(0)
  const lastWRef = useRef(0)

  const scrollToId = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

  const movePillTo = useCallback((targetIndex: number) => {
    const container = navItemsRef.current
    const highlight = highlightRef.current
    if (!container || !highlight) return

    const targetEl = itemRefs.current[targetIndex]
    if (!targetEl) return

    const containerRect = container.getBoundingClientRect()
    const targetRect = targetEl.getBoundingClientRect()

    // Position relative to the nav-items container
    const toX = targetRect.left - containerRect.left - 6
    const toW = targetRect.width + 12
    const toH = targetRect.height

    const fromX = lastXRef.current
    const fromW = lastWRef.current
    const duration = 350
    const startTime = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration)
      const p = easeOutCubic(t)

      const x = fromX + (toX - fromX) * p
      const w = fromW + (toW - fromW) * p

      highlight.style.transform = `translateY(-50%) translateX(${x}px)`
      highlight.style.width = `${w}px`
      highlight.style.height = `${toH}px`

      lastXRef.current = x
      lastWRef.current = w

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const hidePill = useCallback(() => {
    const highlight = highlightRef.current
    if (highlight) {
      highlight.classList.remove('is-visible')
      highlight.classList.add('is-hidden')
    }
  }, [])

  const showPill = useCallback(() => {
    const highlight = highlightRef.current
    if (highlight) {
      highlight.classList.add('is-visible')
      highlight.classList.remove('is-hidden')
    }
  }, [])

  // Scroll spy
  useEffect(() => {
    const sectionIds = ['about', 'projects', 'skills', 'contact']
    const navIndexBySection = [0, 1, 3, 4]

    let ticking = false

    const getBounds = () =>
      sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el))
        .map((el) => {
          const rect = el.getBoundingClientRect()
          return { top: rect.top + window.scrollY, bottom: rect.bottom + window.scrollY }
        })

    const update = () => {
      const bounds = getBounds()
      if (bounds.length === 0) return

      const scrollY = window.scrollY
      const vh = window.innerHeight
      const dir = scrollY >= lastScrollYRef.current ? 'down' : 'up'
      lastScrollYRef.current = scrollY

      // Down: trigger when section top hits 20% viewport
      // Up: trigger when section top hits 80% viewport (hysteresis)
      const triggerDown = scrollY + vh * 0.2
      const triggerUp = scrollY + vh * 0.8

      let active = activeIndexRef.current

      if (active < 0 && scrollY > 100) {
        for (let i = bounds.length - 1; i >= 0; i--) {
          if (scrollY >= bounds[i].top - 50) { active = i; break }
        }
      }

      if (dir === 'down') {
        while (active + 1 < bounds.length && triggerDown >= bounds[active + 1].top) active++
      } else {
        while (active >= 0 && triggerUp < bounds[active].top) active--
      }

      if (active !== activeIndexRef.current) {
        activeIndexRef.current = active
        if (active < 0) {
          setActiveIndex(-1)
          hidePill()
        } else {
          const navIdx = navIndexBySection[active]
          setActiveIndex(navIdx)
          showPill()
          movePillTo(navIdx)
        }
      }
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => { ticking = false; update() })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [hidePill, showPill, movePillTo])

  return (
    <div className="site-header-wrapper">
      <div className="site-header">
        <div className="nav-inner">
          <div className="nav-items" ref={navItemsRef}>
            {navItems.map((it, idx) => {
              if (it.isLogo) {
                return (
                  <button
                    key={it.id}
                    ref={(el) => { itemRefs.current[idx] = el }}
                    className="nav-logo"
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToId('hero')
                      setActiveIndex(-1)
                      hidePill()
                      activeIndexRef.current = -1
                    }}
                    aria-label="logo"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#0F172A" />
                      <text x="12" y="16" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontSize="12" fill="#F8FAFC">t</text>
                    </svg>
                  </button>
                )
              }

              return (
                <a
                  key={it.id}
                  href={`#${it.id}`}
                  ref={(el) => { itemRefs.current[idx] = el }}
                  className={`nav-item ${activeIndex === idx ? 'is-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveIndex(idx)
                    showPill()
                    movePillTo(idx)
                    activeIndexRef.current = -1
                    scrollToId(it.id)
                  }}
                >
                  {it.label}
                </a>
              )
            })}
          </div>
          <div
            className="nav-highlight is-hidden"
            ref={highlightRef}
          />
        </div>
      </div>
    </div>
  )
}

export default Header
