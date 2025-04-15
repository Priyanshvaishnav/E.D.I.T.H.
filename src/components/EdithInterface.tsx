
import React, { useEffect } from 'react';
import VoiceAssistant from './VoiceInterface/VoiceAssistant';

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
    <div className="edith-container p-4 animate-fade-in">
      <div className="max-w-6xl w-full relative">
        <div className="absolute top-0 left-0 right-0 flex justify-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            EDITH
          </h1>
        </div>
        
        <VoiceAssistant />
        
        <div className="convai-widget-wrapper mt-4">
          <elevenlabs-convai agent-id="bZv6t6o4WznwBDWymlB9"></elevenlabs-convai>
        </div>
      </div>
    </div>
  );
};

export default EdithInterface;
