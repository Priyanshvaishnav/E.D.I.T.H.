
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
import GlowingRing from './GlowingRing';
import VoiceWaves from './VoiceWaves';
import AICore from './AICore';

const VoiceAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsActive(true);
      setTimeout(() => setIsActive(false), 2000); // Simulate initial activation animation
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gradient-to-b from-background/90 to-background/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="relative w-[80vh] h-[80vh] max-w-3xl max-h-3xl">
            <GlowingRing />
            <VoiceWaves isActive={isActive} />
            <AICore />
          </div>
        </div>
      )}
      
      <Button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-primary/20 hover:bg-primary/30 backdrop-blur-sm border border-primary/30"
        variant="ghost"
      >
        <Mic className="w-6 h-6 text-primary" />
      </Button>
    </>
  );
};

export default VoiceAssistant;
