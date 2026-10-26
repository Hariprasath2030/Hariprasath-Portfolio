import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

// Individual floating shape component
const FloatingShape = ({ position, geometry, color, speed = 1 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * speed * 0.5) * 0.3;
    }
  });

  const ShapeComponent = geometry;
  
  return (
    <ShapeComponent
      ref={meshRef}
      position={position}
      scale={0.5}
    >
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </ShapeComponent>
  );
};

// Particle system for background
const Particles = () => {
  const particlesRef = useRef();
  
  const particlesCount = 100;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00ff88"
        size={0.05}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Main 3D scene
const Scene = () => {
  const shapes = [
    { position: [-4, 2, -2], geometry: Sphere, color: "#00ff88", speed: 1.2 },
    { position: [4, -1, -3], geometry: Box, color: "#ffffff", speed: 0.8 },
    { position: [-2, -3, -1], geometry: Torus, color: "#ff6b6b", speed: 1.5 },
    { position: [3, 3, -4], geometry: Octahedron, color: "#4ecdc4", speed: 1.0 },
    { position: [0, 4, -2], geometry: Sphere, color: "#45b7d1", speed: 0.9 },
    { position: [-5, -1, -3], geometry: Box, color: "#f9ca24", speed: 1.3 },
  ];

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ff88" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      
      <Particles />
      
      {shapes.map((shape, index) => (
        <FloatingShape
          key={index}
          position={shape.position}
          geometry={shape.geometry}
          color={shape.color}
          speed={shape.speed}
        />
      ))}
    </>
  );
};

// Main component
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{ 
          antialias: false,
          powerPreference: "high-performance"
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default FloatingElements;