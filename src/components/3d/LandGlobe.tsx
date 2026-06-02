import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Ring({
  radius,
  tube,
  color,
  speed,
  rotationAxis,
}: {
  radius: number;
  tube: number;
  color: string;
  speed: number;
  rotationAxis: "x" | "y" | "z";
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    (meshRef.current.rotation as any)[rotationAxis] =
      state.clock.elapsedTime * speed;
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[radius, tube, 32, 100]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.25}
      />
    </mesh>
  );
}

function FloatingLand() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    groupRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  const particles = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      const r = 2 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      positions[i * 3] = r * Math.cos(theta);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 2] = r * Math.sin(theta);
    }
    return positions;
  }, []);

  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.8, 2.2, 0.3, 64]} />
        <meshStandardMaterial color="#2d6a4f" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1.7, 1.8, 0.15, 64]} />
        <meshStandardMaterial color="#1b4332" metalness={0.4} roughness={0.5} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#c9a84c" transparent opacity={0.8} sizeAttenuation />
      </points>
    </group>
  );
}

export function LandGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-3, 3, 3]} intensity={1} color="#c9a84c" />

      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <FloatingLand />
      </Float>
      <Ring radius={2.8} tube={0.02} color="#c9a84c" speed={0.3} rotationAxis="y" />
      <Ring radius={3.2} tube={0.015} color="#2d6a4f" speed={-0.2} rotationAxis="x" />
    </Canvas>
  );
}
