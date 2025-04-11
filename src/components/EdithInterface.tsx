
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
      <div className="max-w-6xl w-full relative">
        <div className="absolute top-4 left-0 right-0 flex justify-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            EDITH
          </h1>
        </div>
        
        <div className="hologram-wrapper">
          <Hologram />
        </div>
        
        <div className="convai-widget-wrapper">
          <elevenlabs-convai agent-id="l7x6pl7IIlFC8Q6ECgiw"></elevenlabs-convai>
        </div>
      </div>
    </div>
  );
};

export default EdithInterface;
