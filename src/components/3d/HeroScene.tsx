import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function FloatingSphere({
  position,
  color,
  speed,
  distort,
  scale,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
  distort: number;
  scale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={scale} position={position}>
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  );
}

function ParticleField() {
  const count = 120;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#c9a84c"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function InteractiveCore({ pointer }: { pointer: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !orbitRef.current || !ringRef.current) return;
    groupRef.current.rotation.y += (pointer.x * 0.5 - groupRef.current.rotation.y) * 0.08;
    groupRef.current.rotation.x += (pointer.y * 0.3 - groupRef.current.rotation.x) * 0.08;
    groupRef.current.position.x += (pointer.x * 0.8 - groupRef.current.position.x) * 0.06;
    groupRef.current.position.y += (pointer.y * 0.5 - groupRef.current.position.y) * 0.06;
    orbitRef.current.rotation.y += 0.008;
    orbitRef.current.rotation.z += 0.006;
    ringRef.current.rotation.z += 0.01;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0.2, -0.4]}>
        <icosahedronGeometry args={[1.25, 0]} />
        <meshStandardMaterial
          color="#dbeafe"
          metalness={0.8}
          roughness={0.1}
          emissive="#c7d2fe"
          emissiveIntensity={0.25}
          transparent
          opacity={0.94}
        />
      </mesh>

      <group ref={orbitRef}>
        {[...Array(7)].map((_, index) => {
          const angle = (index / 7) * Math.PI * 2;
          return (
            <mesh
              key={index}
              position={[Math.cos(angle) * 3.1, Math.sin(angle) * 0.8, Math.sin(angle) * 2.4]}
            >
              <sphereGeometry args={[0.16, 32, 32]} />
              <meshStandardMaterial
                color={index % 2 === 0 ? "#7dd3fc" : "#bfdbfe"}
                metalness={0.85}
                roughness={0.16}
                transparent
                opacity={0.96}
              />
            </mesh>
          );
        })}
      </group>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.3, 0.08, 16, 120]} />
        <meshStandardMaterial color="#c7d2fe" metalness={0.9} roughness={0.1} transparent opacity={0.45} />
      </mesh>

      <Float speed={0.9} rotationIntensity={0.15} floatIntensity={0.45}>
        <mesh position={[0, -1.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2.8, 2.8, 0.05, 72]} />
          <meshStandardMaterial color="#f8fafc" transparent opacity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

function InteractiveGrid() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    gridRef.current.rotation.z = state.clock.elapsedTime * 0.025;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[22, 22, "#60a5fa", "#e2e8f0"]}
      position={[0, -1.8, 0]}
      rotation={[Math.PI / 2, 0, 0]}
    />
  );
}

export function HeroScene() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      onPointerMove={(event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = -(event.clientY / window.innerHeight - 0.5) * 2;
        setPointer({ x, y });
      }}
    >
      <hemisphereLight skyColor="#cfe8ff" groundColor="#5b7389" intensity={0.45} />
      <directionalLight position={[4, 5, 4]} intensity={1.05} color="#f8fafc" />
      <pointLight position={[-4, -4, -3]} intensity={0.55} color="#60a5fa" />
      <pointLight position={[4, 2.5, 3]} intensity={0.45} color="#7dd3fc" />

      <InteractiveCore pointer={pointer} />
      <InteractiveGrid />
      <ParticleField />
      <Stars radius={60} depth={40} count={300} factor={1.8} fade speed={0.3} />
    </Canvas>
  );
}
