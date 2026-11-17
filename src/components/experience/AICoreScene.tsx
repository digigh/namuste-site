"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function ParticleField({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3.2 + seededRandom(i * 3.1) * 3.4;
      const theta = seededRandom(i * 7.7) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(i * 13.3) - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.035;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#9BEA16"
        size={0.026}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function OrbitRing({
  radius,
  tilt,
  speed,
  color,
  thickness = 0.012,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
  thickness?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, thickness, 16, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} toneMapped={false} />
    </mesh>
  );
}

function AICore({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!groupRef.current || !coreRef.current) return;
    const t = state.clock.elapsedTime;

    if (!reducedMotion) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.35,
        0.04
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.25,
        0.04
      );
      coreRef.current.scale.setScalar(1 + Math.sin(t * 0.9) * 0.035);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Soft additive glow shell behind the core — cheap stand-in for bloom */}
      <mesh scale={1.5}>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshBasicMaterial color="#4E8C26" transparent opacity={0.12} depthWrite={false} />
      </mesh>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.35, 6]} />
        <MeshDistortMaterial
          color="#1C2420"
          emissive="#76C043"
          emissiveIntensity={0.55}
          roughness={0.25}
          metalness={0.45}
          distort={reducedMotion ? 0.15 : 0.3}
          speed={reducedMotion ? 0.4 : 1.3}
          transparent
          opacity={0.95}
        />
      </mesh>
      <OrbitRing radius={2.1} tilt={[Math.PI / 2.4, 0, 0]} speed={0.18} color="#9BEA16" />
      <OrbitRing radius={2.55} tilt={[Math.PI / 1.7, Math.PI / 6, 0]} speed={-0.12} color="#76C043" />
      <OrbitRing radius={2.9} tilt={[Math.PI / 3, -Math.PI / 5, 0]} speed={0.08} color="#4E8C26" thickness={0.008} />
      <pointLight position={[0, 0, 0]} color="#9BEA16" intensity={7} distance={6} />
      <pointLight position={[3, 2, 3]} color="#76C043" intensity={2.5} distance={10} />
    </group>
  );
}

export default function AICoreScene({
  reducedMotion,
  particleCount,
}: {
  reducedMotion: boolean;
  particleCount: number;
}) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 7.5], fov: 42 }}
    >
      <ambientLight intensity={0.35} />
      <AICore reducedMotion={reducedMotion} />
      <ParticleField count={particleCount} />
    </Canvas>
  );
}
