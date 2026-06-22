/**
 * Sound Manager — Toggleable sound effects system
 */

import { useEffect, useRef } from 'react';

const SOUNDS: Record<string, string> = {
  plasma: '/sounds/plasma-whoosh.mp3',
  glassShatter: '/sounds/glass-shatter.mp3',
  waterRush: '/sounds/water-rush.mp3',
  hammerHit: '/sounds/hammer-rock.mp3',
  hover: '/sounds/ui-hover.mp3',
  click: '/sounds/ui-click.mp3',
  ocean: '/sounds/ocean-ambience.mp3',
  fire: '/sounds/fire-crackle.mp3',
};

export class SoundManagerClass {
  sounds: Record<string, HTMLAudioElement> = {};
  enabled = false;
  loaded = false;

  async load() {
    if (this.loaded) return;
    for (const [name, url] of Object.entries(SOUNDS)) {
      try {
        const audio = new Audio(url);
        audio.preload = 'auto';
        this.sounds[name] = audio;
      } catch (_e) {
        console.warn(`Failed to load sound: ${name}`);
      }
    }
    this.loaded = true;
  }

  play(name: string) {
    if (!this.enabled || !this.sounds[name]) return;
    const sound = this.sounds[name];
    sound.currentTime = 0;
    sound.volume = 0.5;
    sound.play().catch(() => {});
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (enabled) this.load();
  }

  dispose() {
    Object.values(this.sounds).forEach(audio => {
      audio.pause();
      audio.src = '';
    });
  }
}

export const soundManager = new SoundManagerClass();

export const SoundManager = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    soundManager.setEnabled(enabled);
    return () => { soundManager.dispose(); };
  }, [enabled]);

  return (
    <button
      ref={btnRef}
      className={`sound-toggle ${enabled ? 'is-on' : 'is-off'}`}
      onClick={onToggle}
      aria-label={enabled ? 'Mute sounds' : 'Enable sounds'}
      title={enabled ? 'Sound ON' : 'Sound OFF'}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {enabled ? (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </>
        ) : (
          <>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </>
        )}
      </svg>
    </button>
  );
};

export default SoundManager;
