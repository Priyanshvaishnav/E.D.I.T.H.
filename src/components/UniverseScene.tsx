
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

const RotatingStars = () => {
  const starsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.x = clock.getElapsedTime() * 0.05;
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  // Updated stars with purplish-blue color scheme
  return (
    <Stars 
      ref={starsRef} 
      radius={100} 
      depth={50} 
      count={5000} 
      factor={4} 
      saturation={0.5} 
      fade 
      speed={1}
      color="#9b87f5" // Added purplish color
    />
  );
};

export const UniverseScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <color attach="background" args={['#0a0d1e']} /> {/* Darker blue background color */}
      <ambientLight intensity={0.7} color="#1EAEDB" /> {/* Added blue tint to ambient light */}
      <RotatingStars />
    </Canvas>
  );
};
