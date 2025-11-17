"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function AvatarModel() {
  const groupRef = useRef<THREE.Group>(null);

  // Gentle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Head */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#f5d5b8" />
      </mesh>

      {/* Hair */}
      <mesh position={[-0.05, 1.85, 0]}>
        <sphereGeometry args={[0.32, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial color="#3d2817" />
      </mesh>

      {/* Left Eye */}
      <mesh position={[-0.12, 1.65, 0.28]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Right Eye */}
      <mesh position={[0.12, 1.65, 0.28]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 1.55, 0.32]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#f5c5a8" />
      </mesh>

      {/* Smile */}
      <mesh position={[0, 1.45, 0.3]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.12, 0.02, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Glasses Frame - Left */}
      <mesh position={[-0.12, 1.65, 0.32]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.11, 0.015, 16, 32]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Glasses Frame - Right */}
      <mesh position={[0.12, 1.65, 0.32]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.11, 0.015, 16, 32]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Glasses Bridge */}
      <mesh position={[0, 1.65, 0.32]}>
        <cylinderGeometry args={[0.015, 0.015, 0.1, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Body/Torso */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.28, 0.35, 0.8, 32]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Collar */}
      <mesh position={[0, 1.25, 0.15]}>
        <boxGeometry args={[0.5, 0.05, 0.05]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Necklace */}
      <mesh position={[0, 1.15, 0.3]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.15, 0.012, 16, 32]} />
        <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Left Ear */}
      <mesh position={[-0.35, 1.6, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#f5d5b8" />
      </mesh>

      {/* Right Ear */}
      <mesh position={[0.35, 1.6, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#f5d5b8" />
      </mesh>
    </group>
  );
}

export function Avatar3D() {
  return (
    <div className="w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 1.5, 3]} fov={50} />

        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, 5, 5]} intensity={0.3} />
        <pointLight position={[0, 2, 2]} intensity={0.4} />

        {/* 3D Avatar */}
        <AvatarModel />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={1.5}
        />
      </Canvas>
    </div>
  );
}
