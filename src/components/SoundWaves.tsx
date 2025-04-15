
import React from 'react';

const SoundWaves = () => {
  return (
    <div className="sound-waves absolute inset-0 z-0 pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 border border-blue-400/30 rounded-full animate-pulse"
          style={{
            animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite ${i * 0.5}s`,
            transform: `scale(${1 + i * 0.2})`,
          }}
        />
      ))}
    </div>
  );
};

export default SoundWaves;
