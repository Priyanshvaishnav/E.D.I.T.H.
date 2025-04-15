
import React from 'react';

const VoiceWaves = ({ isActive = false }: { isActive?: boolean }) => {
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {[...Array(12)].map((_, i) => (
          <circle
            key={i}
            cx="50"
            cy="50"
            r={40 + i * 1.5}
            fill="none"
            stroke="rgba(155, 135, 245, 0.3)"
            strokeWidth="0.2"
            className={`transform-origin-center ${isActive ? 'animate-pulse-wave' : 'animate-pulse-slow'}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </svg>
    </div>
  );
};

export default VoiceWaves;
