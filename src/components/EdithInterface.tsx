
import React, { useEffect, useRef } from 'react';
import { UniverseScene } from './UniverseScene';

// Define custom element for TypeScript
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
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create and append ElevenLabs widget script
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="edith-container p-4 animate-fade-in" ref={containerRef}>
      {/* Universe Scene */}
      <UniverseScene />
      
      {/* Background overlay with enhanced space effect */}
      <div className="fixed inset-0 z-0">
        {/* Multi-layer gradient overlay for space effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/30"></div>
        <div className="absolute inset-0 bg-[#0a0d1e]/50 mix-blend-overlay"></div>
        <img 
          src="/lovable-uploads/406fc301-03a2-470e-883d-e3b6ca3a661a.png" 
          alt="Background" 
          className="w-full h-full object-contain opacity-60 mix-blend-soft-light"
        />
      </div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="absolute top-0 left-0 right-0 flex justify-center z-20">
          <h1 className="edith-title text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-yellow-300">
            EDITH
          </h1>
        </div>
        
        <div className="mt-16 h-[75vh] min-h-[600px]" />
        
        <div className="convai-widget-wrapper mt-4 max-w-2xl mx-auto">
          <div className="neo-glass">
            <elevenlabs-convai agent-id="l7x6pl7IIlFC8Q6ECgiw"></elevenlabs-convai>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdithInterface;
