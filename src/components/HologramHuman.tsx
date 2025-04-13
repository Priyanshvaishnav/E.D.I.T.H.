
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const HologramHuman = ({ scale = 1 }: { scale?: number }) => {
  const group = useRef<THREE.Group>(null);
  
  // Animation for subtle hovering/floating effect
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  return (
    <group ref={group} scale={[scale, scale, scale]} position={[0, -0.2, 0]}>
      {/* Head - main part of the hologram */}
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial 
          color="#1EAEDB" 
          wireframe 
          transparent 
          opacity={0.7} 
        />
      </mesh>
      
      {/* Face features - simplified */}
      <mesh position={[0, 1.08, 0.15]}>
        <boxGeometry args={[0.2, 0.12, 0.05]} />
        <meshBasicMaterial 
          color="#1EAEDB"
          wireframe
          transparent 
          opacity={0.5}
        />
      </mesh>
      
      {/* EDITH Glasses - more detailed and brighter to match the image */}
      <mesh position={[0, 1.12, 0.18]}>
        <boxGeometry args={[0.4, 0.08, 0.01]} />
        <meshBasicMaterial 
          color="#33C3F0"
          transparent 
          opacity={0.9}
        />
      </mesh>
      
      {/* Left lens - brighter yellow/cyan to match image */}
      <mesh position={[-0.1, 1.12, 0.2]}>
        <boxGeometry args={[0.13, 0.07, 0.01]} />
        <meshBasicMaterial 
          color="#50E6F0"
          transparent 
          opacity={0.8}
        />
      </mesh>
      
      {/* Right lens - brighter yellow/cyan to match image */}
      <mesh position={[0.1, 1.12, 0.2]}>
        <boxGeometry args={[0.13, 0.07, 0.01]} />
        <meshBasicMaterial 
          color="#50E6F0"
          transparent 
          opacity={0.8}
        />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.1, 0.18, 0.3, 16]} />
        <meshBasicMaterial 
          color="#1EAEDB" 
          wireframe 
          transparent 
          opacity={0.6} 
        />
      </mesh>
      
      {/* Torso - upper body */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.7, 16]} />
        <meshBasicMaterial 
          color="#1EAEDB" 
          wireframe 
          transparent 
          opacity={0.6} 
        />
      </mesh>
      
      {/* Shoulders */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.3]} />
        <meshBasicMaterial 
          color="#1EAEDB" 
          wireframe 
          transparent 
          opacity={0.6} 
        />
      </mesh>
      
      {/* Left arm */}
      <group position={[0.45, 0.4, 0]} rotation={[0, 0, Math.PI * 0.1]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.1, 0.7, 8]} />
          <meshBasicMaterial 
            color="#1EAEDB" 
            wireframe 
            transparent 
            opacity={0.6}
          />
        </mesh>
      </group>
      
      {/* Right arm */}
      <group position={[-0.45, 0.4, 0]} rotation={[0, 0, -Math.PI * 0.1]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.1, 0.7, 8]} />
          <meshBasicMaterial 
            color="#1EAEDB" 
            wireframe 
            transparent 
            opacity={0.6}
          />
        </mesh>
      </group>
      
      {/* Glowing elements for the glasses - brighter to match image */}
      <pointLight position={[0, 1.12, 0.25]} color="#33C3F0" intensity={1.2} distance={3} />
      
      {/* Circuit patterns on body (decorative lines) */}
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={`circuit-${i}`} position={[
          (Math.random() - 0.5) * 0.5, 
          (Math.random() * 1.6) - 0.5, 
          (Math.random() - 0.5) * 0.2 + 0.1
        ]}>
          <boxGeometry args={[Math.random() * 0.1 + 0.05, 0.01, 0.01]} />
          <meshBasicMaterial color={i % 3 === 0 ? "#50E6F0" : "#1EAEDB"} transparent opacity={0.8} />
        </mesh>
      ))}
      
      {/* Message box with text */}
      <group position={[0, 0, 0.6]}>
        {/* Message box frame */}
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.4, 0.8, 0.01]} />
          <meshBasicMaterial 
            color="#1EAEDB" 
            transparent 
            opacity={0.1} 
          />
        </mesh>
        
        {/* Box border - top */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[1.4, 0.02, 0.01]} />
          <meshBasicMaterial color="#33C3F0" transparent opacity={0.8} />
        </mesh>
        
        {/* Box border - bottom */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[1.4, 0.02, 0.01]} />
          <meshBasicMaterial color="#33C3F0" transparent opacity={0.8} />
        </mesh>
        
        {/* Box border - left */}
        <mesh position={[-0.7, 0.2, 0]}>
          <boxGeometry args={[0.02, 0.8, 0.01]} />
          <meshBasicMaterial color="#33C3F0" transparent opacity={0.8} />
        </mesh>
        
        {/* Box border - right */}
        <mesh position={[0.7, 0.2, 0]}>
          <boxGeometry args={[0.02, 0.8, 0.01]} />
          <meshBasicMaterial color="#33C3F0" transparent opacity={0.8} />
        </mesh>
        
        {/* Corner details - top left */}
        <mesh position={[-0.65, 0.55, 0]}>
          <boxGeometry args={[0.12, 0.02, 0.01]} />
          <meshBasicMaterial color="#50E6F0" transparent opacity={0.8} />
        </mesh>
        
        {/* Corner details - top right */}
        <mesh position={[0.65, 0.55, 0]}>
          <boxGeometry args={[0.12, 0.02, 0.01]} />
          <meshBasicMaterial color="#50E6F0" transparent opacity={0.8} />
        </mesh>
        
        {/* Corner details - bottom left */}
        <mesh position={[-0.65, -0.15, 0]}>
          <boxGeometry args={[0.12, 0.02, 0.01]} />
          <meshBasicMaterial color="#50E6F0" transparent opacity={0.8} />
        </mesh>
        
        {/* Corner details - bottom right */}
        <mesh position={[0.65, -0.15, 0]}>
          <boxGeometry args={[0.12, 0.02, 0.01]} />
          <meshBasicMaterial color="#50E6F0" transparent opacity={0.8} />
        </mesh>
        
        {/* Message text - using the same text as in the image */}
        <Text
          position={[0, 0.35, 0.05]}
          fontSize={0.13}
          color="#50E6F0"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.005}
          outlineColor="#1EAEDB"
          material-transparent={true}
          material-opacity={0.9}
        >
          Hey You,
        </Text>
        <Text
          position={[0, 0.2, 0.05]}
          fontSize={0.13}
          color="#50E6F0"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.005}
          outlineColor="#1EAEDB"
          material-transparent={true}
          material-opacity={0.9}
        >
          I am here to help you
        </Text>
        <Text
          position={[0, 0.05, 0.05]}
          fontSize={0.13}
          color="#50E6F0"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.005}
          outlineColor="#1EAEDB"
          material-transparent={true}
          material-opacity={0.9}
        >
          in everything.
        </Text>
      </group>
      
      {/* Light cone effect from glasses */}
      <group position={[0, 1.12, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <coneGeometry args={[0.6, 1.2, 16, 1, true]} />
          <meshBasicMaterial color="#33C3F0" transparent opacity={0.2} />
        </mesh>
      </group>
      
      {/* Background glow effect */}
      <pointLight position={[0, 0.5, -0.5]} color="#1EAEDB" intensity={0.8} distance={5} />
    </group>
  );
};

export default HologramHuman;
