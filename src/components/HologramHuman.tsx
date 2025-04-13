
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text } from '@react-three/drei';
import * as THREE from 'three';

// Male hologram figure with EDITH glasses
const HologramHuman = ({ scale = 1 }: { scale?: number }) => {
  const group = useRef<THREE.Group>(null);
  
  // Animation for subtle hovering/floating effect
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={group} scale={[scale, scale, scale]} position={[0, -0.5, 0]}>
      {/* Human silhouette */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.4, 1.7, 16]} />
        <meshBasicMaterial 
          color="#6b72ff" 
          wireframe 
          transparent 
          opacity={0.4} 
        />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial 
          color="#9b87f5" 
          wireframe 
          transparent 
          opacity={0.4} 
        />
      </mesh>
      
      {/* Shoulders */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.3]} />
        <meshBasicMaterial 
          color="#6b72ff" 
          wireframe 
          transparent 
          opacity={0.4} 
        />
      </mesh>
      
      {/* Arms */}
      <mesh position={[0.45, 0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.7, 8]} rotation={[0, 0, Math.PI * 0.1]} />
        <meshBasicMaterial 
          color="#6b72ff" 
          wireframe 
          transparent 
          opacity={0.4}
        />
      </mesh>
      
      <mesh position={[-0.45, 0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.7, 8]} rotation={[0, 0, -Math.PI * 0.1]} />
        <meshBasicMaterial 
          color="#6b72ff" 
          wireframe 
          transparent 
          opacity={0.4}
        />
      </mesh>
      
      {/* EDITH Glasses */}
      <mesh position={[0, 1.12, 0.15]}>
        <boxGeometry args={[0.4, 0.08, 0.05]} />
        <meshBasicMaterial 
          color="#1EAEDB"
          transparent 
          opacity={0.8}
        />
      </mesh>
      
      {/* Glowing elements for the glasses */}
      <pointLight position={[0, 1.12, 0.2]} color="#1EAEDB" intensity={0.5} distance={3} />
      
      {/* Circuit patterns on body (decorative lines) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`circuit-${i}`} position={[
          (Math.random() - 0.5) * 0.4, 
          (Math.random() * 1.4) - 0.5, 
          (Math.random() - 0.5) * 0.2
        ]}>
          <boxGeometry args={[0.05, 0.01, 0.01]} />
          <meshBasicMaterial color="#1EAEDB" transparent opacity={0.7} />
        </mesh>
      ))}
      
      {/* Holographic message */}
      <group position={[0, 1.5, 0.6]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.1}
          color="#1EAEDB"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.005}
          outlineColor="#9b87f5"
          material-transparent={true}
          material-opacity={0.8}
        >
          Hey You, I am here to help
        </Text>
        <Text
          position={[0, -0.15, 0]}
          fontSize={0.1}
          color="#1EAEDB"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.005}
          outlineColor="#9b87f5"
          material-transparent={true}
          material-opacity={0.8}
        >
          you in everything.
        </Text>
      </group>
      
      {/* Holographic UI elements projecting from glasses */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 0.6 - Math.PI * 0.3;
        const distance = 0.4 + Math.random() * 0.3;
        return (
          <mesh 
            key={`ui-element-${i}`} 
            position={[
              Math.sin(angle) * distance, 
              1.1 + Math.cos(angle) * distance * 0.5, 
              0.2 + distance * 0.3
            ]}
          >
            <boxGeometry args={[0.1, 0.05, 0.01]} />
            <meshBasicMaterial color="#1EAEDB" transparent opacity={0.6} />
          </mesh>
        );
      })}
      
      {/* Light beams from glasses */}
      <mesh position={[0, 1.12, 0.17]}>
        <coneGeometry args={[0.6, 1.2, 16, 1, true]} rotation={[Math.PI / 2, 0, 0]} />
        <meshBasicMaterial color="#1EAEDB" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

export default HologramHuman;
