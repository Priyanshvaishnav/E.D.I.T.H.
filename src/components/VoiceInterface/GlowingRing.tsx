
import React from 'react';

const GlowingRing = () => {
  return (
    <div className="absolute inset-0 animate-pulse">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="ringGradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#9b87f5" className="animate-gradient-shift">
              <animate
                attributeName="stop-color"
                values="#9b87f5; #7E69AB; #8B5CF6; #D946EF; #9b87f5"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#D946EF" className="animate-gradient-shift">
              <animate
                attributeName="stop-color"
                values="#D946EF; #9b87f5; #7E69AB; #8B5CF6; #D946EF"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth="0.5"
          filter="url(#glow)"
          className="animate-spin-slow"
        />
      </svg>
    </div>
  );
};

export default GlowingRing;
