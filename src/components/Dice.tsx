import { motion } from 'motion/react';
import React, { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

interface DiceProps {
  value: number | null;
  onRoll: () => void;
  disabled: boolean;
}

export function Dice({ value, onRoll, disabled }: DiceProps) {
  const [rolling, setRolling] = useState(false);
  const [displayValue, setDisplayValue] = useState<number | null>(value);

  // Trigger roll animation when value changes to something new while we act like we are rolling
  useEffect(() => {
    if (value && !rolling && value !== displayValue) {
      setRolling(true);
      
      let intervals = 0;
      const interval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * 6) + 1);
        intervals++;
        if (intervals > 10) {
          clearInterval(interval);
          setDisplayValue(value);
          setRolling(false);
        }
      }, 50);

      return () => clearInterval(interval);
    } else if (value === null) {
      setDisplayValue(null);
    }
  }, [value]);

  const dots = {
    1: ['center'],
    2: ['top-right', 'bottom-left'],
    3: ['top-right', 'center', 'bottom-left'],
    4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
    6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right']
  };

  const getDotStyle = (pos: string) => {
    const base = 'absolute w-2 h-2 bg-[#c5a47e]';
    switch (pos) {
      case 'center': return cn(base, 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2');
      case 'top-left': return cn(base, 'top-3 left-3');
      case 'top-right': return cn(base, 'top-3 right-3');
      case 'middle-left': return cn(base, 'top-1/2 left-3 -translate-y-1/2');
      case 'middle-right': return cn(base, 'top-1/2 right-3 -translate-y-1/2');
      case 'bottom-left': return cn(base, 'bottom-3 left-3');
      case 'bottom-right': return cn(base, 'bottom-3 right-3');
      default: return base;
    }
  };

  return (
    <button
      onClick={onRoll}
      disabled={disabled || rolling}
      className={cn(
        "relative w-16 h-16 border border-[#c5a47e] bg-[#0f1114] transition-all outline-none",
        "focus-visible:ring-1 focus-visible:ring-[#c5a47e] shadow-[0_0_15px_rgba(197,164,126,0.1)]",
        disabled && !rolling ? "opacity-50 cursor-not-allowed" : "hover:bg-[#15171a] hover:shadow-[0_0_20px_rgba(197,164,126,0.2)] active:scale-95 cursor-pointer"
      )}
    >
      <motion.div
        animate={{
          rotate: rolling ? [0, 90, 180, 270, 360] : 0,
          scale: rolling ? [1, 1.1, 1] : 1
        }}
        transition={{ duration: 0.5 }}
        className="w-full h-full relative"
      >
        {displayValue ? (
          dots[displayValue as keyof typeof dots].map((pos, i) => (
            <div key={i} className={getDotStyle(pos)} />
          ))
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-serif italic text-[#888]">
            ?
          </div>
        )}
      </motion.div>
    </button>
  );
}
