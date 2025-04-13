
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Trail } from '@react-three/drei';
import * as THREE from 'three';

// Earth grid texture component
const GlobeGrid = ({ radius = 0.9 }: { radius?: number }) => {
  const gridMeshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (gridMeshRef.current) {
      gridMeshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });
  
  return (
    <mesh ref={gridMeshRef}>
      <sphereGeometry args={[radius, 36, 36]} />
      <meshBasicMaterial 
        color="#6b72ff" 
        wireframe 
        transparent 
        opacity={0.6} 
      />
    </mesh>
  );
};

// Inner glowing sphere
const CoreSphere = ({ radius = 0.8 }: { radius?: number }) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (sphereRef.current) {
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 0.8) * 0.05;
      sphereRef.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshBasicMaterial 
        color="#9b87f5" 
        transparent 
        opacity={0.3} 
      />
    </mesh>
  );
};

// Orbiting particles/data nodes
const Nodes = ({ count = 30, radius = 1.1 }: { count?: number; radius?: number }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = React.useMemo(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions.push(x, y, z);
    }
    return new Float32Array(positions);
  }, [count, radius]);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.08} 
        color="#c4b5fd" 
        sizeAttenuation={true} 
      />
    </points>
  );
};

// Orbital rings
const OrbitalRing = ({ 
  radius = 1.2, 
  rotation = 0, 
  color = "#7E69AB",
  thickness = 0.02,
  speed = 0.2
}: { 
  radius?: number; 
  rotation?: number; 
  color?: string;
  thickness?: number;
  speed?: number;
}) => {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * speed * rotation;
      ringRef.current.rotation.x = Math.PI / 4 + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });
  
  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2 + rotation, 0, 0]}>
      <torusGeometry args={[radius, thickness, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  );
};

// Orbiting particles
const OrbitalParticle = ({ 
  radius = 1.2, 
  speed = 0.5,
  rotationOffset = 0,
  size = 0.08,
  color = "#9b87f5"
}: { 
  radius?: number; 
  speed?: number;
  rotationOffset?: number;
  size?: number;
  color?: string;
}) => {
  const particleRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (particleRef.current) {
      const time = state.clock.getElapsedTime() + rotationOffset;
      particleRef.current.position.x = radius * Math.cos(time * speed);
      particleRef.current.position.z = radius * Math.sin(time * speed);
    }
  });
  
  return (
    <mesh ref={particleRef}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

// Orbital trail
const OrbitalTrail = ({ 
  radius = 1.2, 
  speed = 0.5,
  rotationOffset = 0,
  color = "#1EAEDB"
}: { 
  radius?: number; 
  speed?: number;
  rotationOffset?: number;
  color?: string;
}) => {
  const particleRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (particleRef.current) {
      const time = state.clock.getElapsedTime() + rotationOffset;
      particleRef.current.position.x = radius * Math.cos(time * speed);
      particleRef.current.position.z = radius * Math.sin(time * speed);
    }
  });
  
  return (
    <Trail
      width={0.05}
      length={7}
      color={new THREE.Color(color)}
      attenuation={(t) => t * t}
    >
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
};

// Ambient light effect
const AmbientGlow = () => {
  return (
    <ambientLight intensity={0.5} color="#8B5CF6" />
  );
};

const HologramScene = () => {
  return (
    <>
      <AmbientGlow />
      <CoreSphere />
      <GlobeGrid />
      <Nodes count={32} radius={1.1} />
      
      <OrbitalRing radius={1.3} rotation={1} color="#8B5CF6" />
      <OrbitalRing radius={1.6} rotation={-0.5} color="#6b72ff" />
      <OrbitalRing radius={1.9} rotation={0.7} color="#7E69AB" thickness={0.01} speed={0.12} />
      
      <OrbitalParticle radius={1.3} speed={0.5} size={0.08} color="#ffffff" />
      <OrbitalParticle radius={1.6} speed={-0.3} rotationOffset={Math.PI} size={0.05} color="#9b87f5" />
      <OrbitalParticle radius={1.9} speed={0.2} rotationOffset={Math.PI/2} size={0.06} color="#c4b5fd" />
      
      <OrbitalTrail radius={1.3} speed={0.5} color="#1EAEDB" />
      <OrbitalTrail radius={1.9} speed={-0.3} rotationOffset={Math.PI/3} color="#8B5CF6" />
      
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
