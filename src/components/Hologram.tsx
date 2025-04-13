
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import HologramHuman from './HologramHuman';

// Space background
const SpaceBackground = () => {
  return (
    <>
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
      <pointLight position={[10, 10, 10]} intensity={0.2} />
      <pointLight position={[-10, -10, -10]} intensity={0.1} color="#1EAEDB" />
    </>
  );
};

// Ambient light effect
const AmbientGlow = () => {
  return (
    <ambientLight intensity={0.6} color="#1EAEDB" />
  );
};

// Circular base for the hologram
const HologramBase = () => {
  return (
    <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[1.5, 1.5, 0.05, 32]} />
      <meshBasicMaterial color="#33C3F0" transparent opacity={0.3} />
    </mesh>
  );
};

// Hologram base glow effect
const BaseGlow = () => {
  return (
    <pointLight position={[0, -0.9, 0]} color="#1EAEDB" intensity={2.5} distance={3} />
  );
};

// Digital grid
const DigitalGrid = () => {
  return (
    <mesh position={[0, -0.97, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshBasicMaterial 
        color="#1EAEDB" 
        wireframe 
        transparent 
        opacity={0.15} 
      />
    </mesh>
  );
};

const HologramScene = () => {
  return (
    <>
      <SpaceBackground />
      <AmbientGlow />
      <HologramBase />
      <BaseGlow />
      <DigitalGrid />
      
      {/* Human hologram figure */}
      <HologramHuman scale={1.2} />
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI - Math.PI / 4}
      />
    </>
  );
};

const Hologram = () => {
  return (
    <div className="hologram-container relative">
      {/* Modern hologram effect overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 scan-line"></div>
        <div className="absolute inset-0 glitch-effect"></div>
      </div>
      
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <HologramScene />
      </Canvas>
    </div>
  );
};

export default Hologram;
