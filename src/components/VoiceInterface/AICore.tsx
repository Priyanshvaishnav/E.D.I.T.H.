
import React from 'react';

const AICore = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a1a2e" />
              <stop offset="100%" stopColor="#16213e" />
            </linearGradient>
            <filter id="coreGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="atop" />
            </filter>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="url(#coreGradient)"
            filter="url(#coreGlow)"
            className="animate-pulse-slow"
          />
          <path
            d="M50 20 C60 30, 65 40, 65 50 C65 65, 55 80, 50 80 C45 80, 35 65, 35 50 C35 40, 40 30, 50 20"
            fill="#9b87f5"
            opacity="0.2"
            className="animate-pulse"
          />
        </svg>
      </div>
    </div>
  );
};

export default AICore;
