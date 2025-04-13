
import React, { useEffect, useRef } from 'react';
import Hologram from './Hologram';

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
      <div className="max-w-7xl mx-auto w-full relative">
        <div className="absolute top-0 left-0 right-0 flex justify-center z-20">
          <h1 className="edith-title text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            EDITH
          </h1>
        </div>
        
        <div className="hologram-wrapper mt-16 h-[75vh] min-h-[600px]">
          <Hologram />
        </div>
        
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
