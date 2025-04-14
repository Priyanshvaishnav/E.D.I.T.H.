
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

const HologramScene = () => {
  const sphereRef = useRef();

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <Sphere ref={sphereRef} args={[1, 100, 100]}>
          <MeshDistortMaterial
            color="#4FACF7"
            attach="material"
            distort={0.6}
            speed={1.5}
            roughness={0}
            metalness={0.8}
          />
        </Sphere>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default HologramScene;
