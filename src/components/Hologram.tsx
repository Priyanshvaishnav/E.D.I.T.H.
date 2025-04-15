import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Trail, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Interactive particles that follow cursor
const InteractiveParticles = ({ count = 50 }: { count?: number }) => {
  const points = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  const [positions, setPositions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.2 + Math.random() * 0.3;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  });

  useFrame(() => {
    if (!points.current) return;
    const positionArray = points.current.geometry.attributes.position.array as Float32Array;
    
    // Update particle positions based on mouse movement
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positionArray[i3];
      const y = positionArray[i3 + 1];
      const z = positionArray[i3 + 2];
      
      // Calculate distance to mouse position in 3D space
      const mouseX = (mouse.x * viewport.width) / 2;
      const mouseY = (mouse.y * viewport.height) / 2;
      const dx = mouseX - x;
      const dy = mouseY - y;
      
      // Add subtle movement based on mouse position
      positionArray[i3] += dx * 0.001;
      positionArray[i3 + 1] += dy * 0.001;
      
      // Keep particles within bounds
      const dist = Math.sqrt(x * x + y * y + z * z);
      if (dist > 2) {
        positionArray[i3] *= 0.95;
        positionArray[i3 + 1] *= 0.95;
        positionArray[i3 + 2] *= 0.95;
      }
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#60a5fa"
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Enhanced core sphere with glass effect
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
      <sphereGeometry args={[radius, 64, 64]} />
      <meshPhysicalMaterial
        color="#60a5fa"
        transparent
        opacity={0.3}
        roughness={0.2}
        metalness={0.8}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={1}
      />
    </mesh>
  );
};

// Enhanced grid with glow effect
const GlobeGrid = ({ radius = 0.9 }: { radius?: number }) => {
  const gridMeshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (gridMeshRef.current) {
      gridMeshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });
  
  return (
    <mesh ref={gridMeshRef}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshPhongMaterial
        color="#3b82f6"
        wireframe
        transparent
        opacity={0.5}
        emissive="#3b82f6"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

// Orbiting particles/data nodes
const Nodes = ({ count = 20, radius = 1 }: { count?: number; radius?: number }) => {
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
        color="#60a5fa" 
        sizeAttenuation={true} 
      />
    </points>
  );
};

// Enhanced orbital rings with blur and glow
const OrbitalRing = ({ 
  radius = 1.2, 
  rotation = 0, 
  color = "#3b82f6",
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
      <torusGeometry args={[radius, thickness, 32, 100]} />
      <meshPhongMaterial
        color={color}
        transparent
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.2}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

// Orbiting particles
const OrbitalParticle = ({ 
  radius = 1.2, 
  speed = 0.5,
  rotationOffset = 0,
  size = 0.08,
  color = "#60a5fa"
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

// Enhanced orbital trail with better glow
const OrbitalTrail = ({ 
  radius = 1.2, 
  speed = 0.5,
  rotationOffset = 0,
  color = "#60a5fa"
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
      length={8}
      color={new THREE.Color(color)}
      attenuation={(t) => t * t}
      opacity={0.6}
    >
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshPhongMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Trail>
  );
};

const HologramScene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <CoreSphere />
      <GlobeGrid />
      <Nodes count={25} radius={1} />
      <InteractiveParticles count={75} />
      
      <OrbitalRing radius={1.2} rotation={1} color="#3b82f6" />
      <OrbitalRing radius={1.5} rotation={-0.5} color="#3b82f6" />
      <OrbitalRing radius={1.8} rotation={0.7} color="#3b82f6" thickness={0.01} speed={0.1} />
      
      <OrbitalParticle radius={1.2} speed={0.5} size={0.08} color="#ffffff" />
      <OrbitalParticle radius={1.5} speed={-0.3} rotationOffset={Math.PI} size={0.05} color="#60a5fa" />
      <OrbitalParticle radius={1.8} speed={0.2} rotationOffset={Math.PI/2} size={0.06} color="#93c5fd" />
      
      <OrbitalTrail radius={1.2} speed={0.5} color="#3b82f6" />
      <OrbitalTrail radius={1.8} speed={-0.3} rotationOffset={Math.PI/3} color="#60a5fa" />
      
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
