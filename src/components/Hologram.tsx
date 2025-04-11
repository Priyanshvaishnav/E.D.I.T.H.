
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Ring = ({ radius, rotation, color }: { radius: number; rotation: number; color: string }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.2 * rotation;
    }
  });
  
  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius, radius + 0.05, 64]} />
      <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.6} />
    </mesh>
  );
};

const Sphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.scale.x = 1 + Math.sin(state.clock.getElapsedTime()) * 0.1;
      sphereRef.current.scale.y = 1 + Math.sin(state.clock.getElapsedTime()) * 0.1;
      sphereRef.current.scale.z = 1 + Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });
  
  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshBasicMaterial color="#3b82f6" />
    </mesh>
  );
};

const Particles = ({ count = 50, radius = 5 }: { count?: number; radius?: number }) => {
  const points = Array.from({ length: count }, () => {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * Math.cbrt(Math.random());
    
    return new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
  });
  
  return (
    <group>
      {points.map((position, i) => (
        <mesh key={i} position={position}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
};

const HologramScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Sphere />
      <Ring radius={1} rotation={1} color="#3b82f6" />
      <Ring radius={1.5} rotation={-0.5} color="#3b82f6" />
      <Ring radius={2} rotation={0.7} color="#3b82f6" />
      <Particles count={30} radius={4} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
};

const Hologram = () => {
  return (
    <div className="hologram-container">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <HologramScene />
      </Canvas>
    </div>
  );
};

export default Hologram;
