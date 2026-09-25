/**
 * Sidebar Navigation — Fixed right side section indicators
 */

import { useEffect, useState } from 'react';

const sections = [
  { id: 'hero', label: 'HOME' },
  { id: 'ai', label: 'APPLIED AI' },
  { id: 'robotics', label: 'ROBOTICS' },
  { id: 'climbing', label: 'CLIMBING' },
  { id: 'lab', label: 'THE LAB' },
  { id: 'contact', label: 'CONTACT' },
];

export const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-track">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            className={`sidebar-dot ${activeSection === id ? 'is-active' : ''}`}
            onClick={() => scrollTo(id)}
            aria-label={label}
          >
            <span className="dot" />
            <span className="label">{label}</span>
          </button>
        ))}
      </div>
      <div className="sidebar-line" />
    </nav>
  );
};

export default Sidebar;
