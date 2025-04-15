
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Trail } from '@react-three/drei';
import * as THREE from 'three';

// Core AI orb with pulsing effect
const CoreOrb = ({ radius = 0.8 }: { radius?: number }) => {
  const orbRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (orbRef.current) {
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 0.8) * 0.05;
      orbRef.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <mesh ref={orbRef}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshBasicMaterial 
        color="#60a5fa"
        transparent 
        opacity={0.6}
      />
    </mesh>
  );
};

// AI face silhouette effect
const AISilhouette = ({ radius = 1.2 }: { radius?: number }) => {
  const silhouetteRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(radius, 64, 64);
    // Create face-like indentations
    const positions = geo.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      
      // Create subtle facial features
      const distortion = Math.sin(y * 5) * 0.05;
      positions[i] = x * (1 + distortion);
      positions[i + 2] = z * (1 + distortion);
    }
    return geo;
  }, [radius]);

  useFrame((state) => {
    if (silhouetteRef.current) {
      silhouetteRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <mesh ref={silhouetteRef} geometry={geometry}>
      <meshBasicMaterial 
        color="#3b82f6"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

// Data rings with rotation
const DataRing = ({ 
  radius = 1.5,
  rotation = 0,
  color = "#3b82f6",
  speed = 0.2,
  thickness = 0.02
}: { 
  radius?: number;
  rotation?: number;
  color?: string;
  speed?: number;
  thickness?: number;
}) => {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.getElapsedTime() * speed;
      ringRef.current.rotation.y = state.clock.getElapsedTime() * speed * 0.5;
    }
  });
  
  return (
    <mesh ref={ringRef} rotation={[Math.PI / 4 + rotation, 0, 0]}>
      <torusGeometry args={[radius, thickness, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
};

// Voice wave animation
const VoiceWave = ({ isActive = false }: { isActive?: boolean }) => {
  const waveRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (waveRef.current) {
      const intensity = isActive ? 0.2 : 0.05;
      const speed = isActive ? 2 : 0.5;
      waveRef.current.scale.y = 1 + Math.sin(state.clock.getElapsedTime() * speed) * intensity;
    }
  });

  return (
    <group ref={waveRef} position={[0, -1.5, 0]}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[0, i * 0.2, 0]}>
          <planeGeometry args={[2, 0.02]} />
          <meshBasicMaterial 
            color="#60a5fa"
            transparent
            opacity={0.3 - i * 0.1}
          />
        </mesh>
      ))}
    </group>
  );
};

const HologramScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <CoreOrb />
      <AISilhouette />
      
      <DataRing radius={1.4} rotation={0} color="#3b82f6" />
      <DataRing radius={1.8} rotation={Math.PI / 4} color="#60a5fa" thickness={0.01} />
      <DataRing radius={2.2} rotation={-Math.PI / 6} color="#93c5fd" thickness={0.015} speed={0.1} />
      
      <VoiceWave isActive={true} />
      
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
    <div className="hologram-container">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <HologramScene />
      </Canvas>
    </div>
  );
};

export default Hologram;
