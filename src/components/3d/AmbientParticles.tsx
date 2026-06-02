import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function GlassBox({
  position,
  scale,
  rotation,
}: {
  position: [number, number, number];
  scale: number;
  rotation: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x =
      rotation[0] + state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y =
      rotation[1] + state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          roughness={0.05}
          transmissionSampler
          chromaticAberration={0.1}
          anisotropicBlur={0.1}
          distortion={0.1}
          distortionScale={0.3}
          temporalDistortion={0.2}
          color="#c9a84c"
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

export function AmbientParticles() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, 3, 0]} intensity={0.8} color="#c9a84c" />

      <GlassBox position={[-2, 1, 0]} scale={0.8} rotation={[0.3, 0.5, 0]} />
      <GlassBox position={[2, -1, -1]} scale={0.6} rotation={[0.8, 0.2, 0.5]} />
      <GlassBox position={[0.5, 2, -2]} scale={0.5} rotation={[0.1, 0.7, 0.3]} />
    </Canvas>
  );
}
