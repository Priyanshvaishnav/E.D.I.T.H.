
import React, { useEffect, useState } from 'react';
import AudioVisualizer from './AudioVisualizer';
import { BackgroundBeams } from "./ui/background-beams";
import { SparklesCore } from "./ui/sparkles";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-id': string;
      };
    }
  }
}

const EdithInterface = () => {
  const [shootingStars, setShootingStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    // Generate shooting stars
    const generateShootingStar = () => {
      return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        rotation: `${Math.random() * 360}deg`
      };
    };

    const newShootingStars = Array.from({ length: 5 }, () => (
      <div 
        key={Math.random()}
        className="shooting-star" 
        style={{
          ...generateShootingStar(),
          transform: `rotate(${generateShootingStar().rotation})`
        }} 
      />
    ));

    setShootingStars(newShootingStars);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="edith-container p-4 animate-fade-in relative min-h-screen bg-black/90">
      {/* Aceternity UI background effects */}
      <BackgroundBeams className="absolute inset-0" />
      <div className="absolute inset-0 h-screen w-full bg-black [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" />
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="absolute inset-0 h-full w-full"
        particleColor="#FFFFFF"
      />
      
      <div className="aurora-container">
        <div className="aurora-beam aurora-beam-1"></div>
        <div className="aurora-beam aurora-beam-2"></div>
        <div className="aurora-beam aurora-beam-3"></div>
      </div>
      
      {shootingStars}
      
      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center">
          <h1 
            className="font-orbitron text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 mb-8 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]"
            style={{
              backgroundSize: '200% 100%',
              animation: 'fadeIn 1s ease-out 0.5s forwards, gradient 8s linear infinite',
              textShadow: '0 0 15px rgba(206, 73, 255, 0.8), 0 0 30px rgba(206, 73, 255, 0.6)'
            }}
          >
            EDITH
          </h1>
          
          <div className="relative w-full max-w-md aspect-square mx-auto mb-8">
            <AudioVisualizer />
          </div>
          
          <div className="convai-widget-wrapper mt-8 w-full max-w-xl mx-auto">
            <elevenlabs-convai agent-id="bZv6t6o4WznwBDWymlB9"></elevenlabs-convai>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdithInterface;
