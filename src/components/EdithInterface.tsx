
import React, { useEffect } from 'react';

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
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="edith-container p-4 animate-fade-in">
      <div className="max-w-6xl w-full relative">
        <div className="absolute -top-16 left-0 right-0 flex justify-center">
          <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            EDITH
          </h1>
        </div>
        
        <elevenlabs-convai agent-id="l7x6pl7IIlFC8Q6ECgiw"></elevenlabs-convai>
        
        <div className="absolute -bottom-12 left-0 right-0 flex justify-center">
          <p className="text-xs text-muted-foreground">
            Powered by ElevenLabs
          </p>
        </div>
      </div>
    </div>
  );
};

export default EdithInterface;
