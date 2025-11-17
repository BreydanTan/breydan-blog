"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

function AvatarModel() {
  const groupRef = useRef<THREE.Group>(null);

  // Gentle floating and rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
  });

  // Asian skin tone - warm peachy beige
  const skinColor = "#ffd7b5";
  const hairColor = "#4a3728"; // Brown hair
  const shirtColor = "#1a1a1a"; // Black polo
  const glassesColor = "#000000"; // Black frames
  const necklaceColor = "#ffd700"; // Gold

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Head - smoother sphere */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <sphereGeometry args={[0.42, 64, 64]} />
        <meshStandardMaterial
          color={skinColor}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Hair - styled to the left */}
      <group position={[0, 1.75, 0]}>
        {/* Main hair volume */}
        <mesh position={[-0.08, 0.12, 0]} castShadow>
          <sphereGeometry args={[0.38, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
          <meshStandardMaterial color={hairColor} roughness={0.8} />
        </mesh>
        {/* Hair swept to left */}
        <mesh position={[-0.25, 0.08, 0.05]} rotation={[0, 0, -0.3]} castShadow>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial color={hairColor} roughness={0.8} />
        </mesh>
        {/* Front bangs */}
        <mesh position={[0, 0.02, 0.35]} castShadow>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color={hairColor} roughness={0.8} />
        </mesh>
      </group>

      {/* Eyes - big round black Asian eyes */}
      <group>
        {/* Left eye white */}
        <mesh position={[-0.15, 1.58, 0.35]}>
          <sphereGeometry args={[0.09, 32, 32]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Left pupil */}
        <mesh position={[-0.15, 1.58, 0.42]}>
          <sphereGeometry args={[0.06, 32, 32]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        {/* Left eye shine */}
        <mesh position={[-0.13, 1.6, 0.46]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
        </mesh>

        {/* Right eye white */}
        <mesh position={[0.15, 1.58, 0.35]}>
          <sphereGeometry args={[0.09, 32, 32]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Right pupil */}
        <mesh position={[0.15, 1.58, 0.42]}>
          <sphereGeometry args={[0.06, 32, 32]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        {/* Right eye shine */}
        <mesh position={[0.17, 1.6, 0.46]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* Nose - small with reddish tip */}
      <mesh position={[0, 1.45, 0.38]} castShadow>
        <sphereGeometry args={[0.06, 32, 32]} />
        <meshStandardMaterial color="#ffb5a0" roughness={0.5} />
      </mesh>

      {/* Smile - wide happy mouth */}
      <group position={[0, 1.32, 0.36]}>
        {/* Mouth curve */}
        <mesh rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.16, 0.025, 16, 64, Math.PI]} />
          <meshStandardMaterial color="#ff6b9d" />
        </mesh>
        {/* Teeth showing */}
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[0.25, 0.06, 0.02]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Chunky black frame glasses */}
      <group position={[0, 1.58, 0.38]}>
        {/* Left lens frame */}
        <mesh position={[-0.15, 0, 0]}>
          <torusGeometry args={[0.12, 0.025, 16, 64]} />
          <meshStandardMaterial color={glassesColor} metalness={0.3} roughness={0.4} />
        </mesh>
        {/* Left lens */}
        <mesh position={[-0.15, 0, 0.01]}>
          <circleGeometry args={[0.11, 32]} />
          <meshStandardMaterial
            color="#88ccff"
            transparent
            opacity={0.2}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Right lens frame */}
        <mesh position={[0.15, 0, 0]}>
          <torusGeometry args={[0.12, 0.025, 16, 64]} />
          <meshStandardMaterial color={glassesColor} metalness={0.3} roughness={0.4} />
        </mesh>
        {/* Right lens */}
        <mesh position={[0.15, 0, 0.01]}>
          <circleGeometry args={[0.11, 32]} />
          <meshStandardMaterial
            color="#88ccff"
            transparent
            opacity={0.2}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Bridge */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.08, 16]} />
          <meshStandardMaterial color={glassesColor} metalness={0.3} roughness={0.4} />
        </mesh>
      </group>

      {/* Large ears */}
      <group>
        {/* Left ear */}
        <mesh position={[-0.42, 1.5, 0]} rotation={[0, 0, -0.3]} castShadow>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial color={skinColor} roughness={0.5} />
        </mesh>
        <mesh position={[-0.42, 1.5, 0.03]}>
          <sphereGeometry args={[0.06, 32, 32]} />
          <meshStandardMaterial color="#ffccaa" roughness={0.6} />
        </mesh>

        {/* Right ear */}
        <mesh position={[0.42, 1.5, 0]} rotation={[0, 0, 0.3]} castShadow>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshStandardMaterial color={skinColor} roughness={0.5} />
        </mesh>
        <mesh position={[0.42, 1.5, 0.03]}>
          <sphereGeometry args={[0.06, 32, 32]} />
          <meshStandardMaterial color="#ffccaa" roughness={0.6} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.18, 0.3, 32]} />
        <meshStandardMaterial color={skinColor} roughness={0.4} />
      </mesh>

      {/* Black polo shirt */}
      <group>
        {/* Body */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.35, 0.45, 0.7, 32]} />
          <meshStandardMaterial color={shirtColor} roughness={0.7} />
        </mesh>

        {/* Collar - left side */}
        <mesh position={[-0.12, 0.82, 0.2]} rotation={[-0.3, -0.5, 0]}>
          <boxGeometry args={[0.12, 0.25, 0.02]} />
          <meshStandardMaterial color={shirtColor} roughness={0.6} />
        </mesh>

        {/* Collar - right side */}
        <mesh position={[0.12, 0.82, 0.2]} rotation={[-0.3, 0.5, 0]}>
          <boxGeometry args={[0.12, 0.25, 0.02]} />
          <meshStandardMaterial color={shirtColor} roughness={0.6} />
        </mesh>
      </group>

      {/* Thin gold necklace */}
      <mesh position={[0, 0.85, 0.2]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[0.18, 0.015, 16, 64]} />
        <meshStandardMaterial
          color={necklaceColor}
          metalness={0.9}
          roughness={0.2}
          emissive={necklaceColor}
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

export function Avatar3D() {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        {/* Camera positioned to center the character */}
        <PerspectiveCamera makeDefault position={[0, 0.8, 3.2]} fov={45} />

        {/* Enhanced Lighting for better quality */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
        <spotLight position={[0, 10, 0]} intensity={0.4} angle={0.3} penumbra={1} />
        <pointLight position={[0, 2, 3]} intensity={0.6} color="#ffffff" />

        {/* Environment for realistic reflections */}
        <Suspense fallback={null}>
          <Environment preset="studio" />
        </Suspense>

        {/* 3D Avatar Model */}
        <Suspense fallback={null}>
          <AvatarModel />
        </Suspense>

        {/* Interactive Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate
          autoRotateSpeed={2}
          target={[0, 0.8, 0]}
        />
      </Canvas>
    </div>
  );
}
