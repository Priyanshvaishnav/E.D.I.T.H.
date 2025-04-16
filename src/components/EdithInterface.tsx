
import React, { useEffect } from 'react';
import SoundWaves from './SoundWaves';

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
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="edith-container p-4 animate-fade-in relative">
      <div className="max-w-6xl w-full mx-auto relative">
        <div className="flex flex-col items-center justify-center">
          <h1 
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 mb-8 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]"
            style={{
              backgroundSize: '200% 100%',
              animation: 'fadeIn 1s ease-out 0.5s forwards, gradient 8s linear infinite',
            }}
          >
            EDITH
          </h1>
          
          <div className="relative w-full max-w-2xl aspect-[3/4] mx-auto">
            <SoundWaves />
            <img 
              src="/lovable-uploads/0c5f7602-7c7c-449e-811b-c1c1e054004c.png"
              alt="EDITH Interface"
              className="w-full h-full object-contain relative z-10 animate-pulse"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))',
              }}
            />
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
