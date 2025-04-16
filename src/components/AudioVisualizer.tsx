
import React, { useEffect, useRef } from 'react';

const AudioVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resize = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Audio setup
    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let dataArray: Uint8Array;
    let source: MediaStreamAudioSourceNode;
    
    const initAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        
        animate();
      } catch (error) {
        console.error("Error accessing microphone:", error);
        // Fallback to demo animation if microphone access fails
        animateFallback();
      }
    };
    
    initAudio();
    
    // Animation functions
    const animate = () => {
      if (!ctx || !analyser) {
        animateFallback();
        return;
      }
      
      animationRef.current = requestAnimationFrame(animate);
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Get frequency data
      analyser.getByteFrequencyData(dataArray);
      
      // Draw orb
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.15;
      
      // Draw glowing orb
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, baseRadius * 1.5
      );
      gradient.addColorStop(0, 'rgba(120, 0, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(80, 0, 200, 0.5)');
      gradient.addColorStop(1, 'rgba(60, 0, 150, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw equalizer circles
      const numPoints = dataArray.length / 2;
      const angleStep = (Math.PI * 2) / numPoints;
      
      for (let i = 0; i < numPoints; i++) {
        const amplitude = dataArray[i] / 256; // Normalize to 0-1
        const radiusOffset = baseRadius * 0.5 * amplitude;
        const radius = baseRadius + radiusOffset;
        
        const angle = i * angleStep;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        // Draw lines
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(${150 + amplitude * 100}, ${50 + amplitude * 200}, 255, ${0.3 + amplitude * 0.7})`;
        ctx.lineWidth = 2 + amplitude * 3;
        ctx.stroke();
        
        // Draw points
        ctx.beginPath();
        ctx.arc(x, y, 2 + amplitude * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${150 + amplitude * 100}, ${50 + amplitude * 200}, 255, ${0.7 + amplitude * 0.3})`;
        ctx.fill();
      }
    };
    
    // Fallback animation if microphone access is denied
    const animateFallback = () => {
      if (!ctx) return;
      
      animationRef.current = requestAnimationFrame(animateFallback);
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Simulate audio data
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.15;
      const time = Date.now() / 1000;
      
      // Draw glowing orb
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, baseRadius * 1.5
      );
      gradient.addColorStop(0, 'rgba(120, 0, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(80, 0, 200, 0.5)');
      gradient.addColorStop(1, 'rgba(60, 0, 150, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw equalizer circles
      const numPoints = 32;
      const angleStep = (Math.PI * 2) / numPoints;
      
      for (let i = 0; i < numPoints; i++) {
        const angle = i * angleStep;
        // Simulate audio amplitude with sine waves of different frequencies
        const amplitude = 
          0.3 + 
          0.2 * Math.sin(time * 2 + i * 0.2) + 
          0.3 * Math.sin(time * 3 + i * 0.5);
        
        const radiusOffset = baseRadius * 0.5 * amplitude;
        const radius = baseRadius + radiusOffset;
        
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        // Draw lines
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(${150 + amplitude * 100}, ${50 + amplitude * 200}, 255, ${0.3 + amplitude * 0.7})`;
        ctx.lineWidth = 2 + amplitude * 3;
        ctx.stroke();
        
        // Draw points
        ctx.beginPath();
        ctx.arc(x, y, 2 + amplitude * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${150 + amplitude * 100}, ${50 + amplitude * 200}, 255, ${0.7 + amplitude * 0.3})`;
        ctx.fill();
      }
    };
    
    // Clean up
    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (source && audioContext) {
        source.disconnect();
        audioContext.close();
      }
    };
  }, []);
  
  return (
    <div className="visualizer-container w-full h-full relative">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full rounded-full"
        style={{
          filter: 'drop-shadow(0 0 15px rgba(120, 0, 255, 0.6))'
        }}
      />
    </div>
  );
};

export default AudioVisualizer;
