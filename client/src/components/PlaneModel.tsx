import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";

export default function PlaneModel({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (!group.current) return;

    // Base idle floating animation
    const time = state.clock.getElapsedTime();
    if (!reducedMotion) {
      group.current.position.y = Math.sin(time * 2) * 0.2;
    }

    // Scroll-based animations
    const r1 = scroll.range(0, 1 / 3);
    const r2 = scroll.range(1 / 3, 1 / 3);
    const r3 = scroll.range(2 / 3, 1 / 3);

    // Initial position (Hero)
    let targetX = 2;
    let targetY = 0;
    let targetZ = 2;
    let targetRotX = 0;
    let targetRotY = -Math.PI / 6;
    let targetRotZ = Math.PI / 12;

    // Section 2: Features
    if (r1 > 0) {
      targetX = 2 - r1 * 6; // Moves to the left
      targetY = r1 * 2;
      targetZ = 2 - r1 * 4;
      targetRotY = -Math.PI / 6 + r1 * Math.PI; // Spins around
      targetRotZ = Math.PI / 12 - r1 * (Math.PI / 6);
    }

    // Section 3: Stats
    if (r2 > 0) {
      targetX = -4 + r2 * 8; // Sweeps to the right
      targetY = 2 + r2 * 1;
      targetZ = -2 + r2 * 6;
      targetRotY = (5 * Math.PI) / 6 - r2 * Math.PI; // Turns back
      targetRotZ = -Math.PI / 12 + r2 * (Math.PI / 4);
    }

    // Section 4: CTA
    if (r3 > 0) {
      targetX = 4 - r3 * 4; // Centers up
      targetY = 3 - r3 * 3;
      targetZ = 4 + r3 * 2;
      targetRotX = r3 * (Math.PI / 8);
      targetRotY = -Math.PI / 6 - r3 * (Math.PI / 12);
      targetRotZ = Math.PI / 6 - r3 * (Math.PI / 6);
    }

    // Smooth interpolation
    if (!reducedMotion) {
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.05);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY + Math.sin(time * 2) * 0.1, 0.05);
      group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.05);
      
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotX, 0.05);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotY, 0.05);
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetRotZ, 0.05);
    } else {
      // Direct assignment for reduced motion
      group.current.position.set(targetX, targetY, targetZ);
      group.current.rotation.set(targetRotX, targetRotY, targetRotZ);
    }
  });

  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.2,
    metalness: 0.8,
  });

  const accentMaterial = new THREE.MeshStandardMaterial({
    color: 0x00d2ff, // Cyan primary
    roughness: 0.3,
    metalness: 0.9,
    emissive: 0x0055ff,
    emissiveIntensity: 0.5,
  });

  const darkMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.5,
    metalness: 0.8,
  });

  return (
    <group ref={group} scale={[0.5, 0.5, 0.5]}>
      {/* Fuselage */}
      <mesh material={bodyMaterial} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.4, 6, 32]} />
      </mesh>
      
      {/* Nose */}
      <mesh material={bodyMaterial} position={[0, 0, 3.8]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.6, 1.6, 32]} />
      </mesh>

      {/* Cockpit / Glass */}
      <mesh material={darkMaterial} position={[0, 0.4, 3.2]} rotation={[Math.PI / 2 - 0.2, 0, 0]}>
        <capsuleGeometry args={[0.3, 0.3, 1, 16]} />
      </mesh>

      {/* Main Wings */}
      <mesh material={bodyMaterial} position={[0, -0.1, 0]}>
        <boxGeometry args={[7, 0.1, 2]} />
      </mesh>
      
      {/* Wing accents */}
      <mesh material={accentMaterial} position={[3.45, -0.1, 0.5]}>
        <boxGeometry args={[0.1, 0.15, 2.5]} />
      </mesh>
      <mesh material={accentMaterial} position={[-3.45, -0.1, 0.5]}>
        <boxGeometry args={[0.1, 0.15, 2.5]} />
      </mesh>

      {/* Engines */}
      <mesh material={darkMaterial} position={[1.5, -0.3, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 1.5, 32]} />
      </mesh>
      <mesh material={darkMaterial} position={[-1.5, -0.3, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 1.5, 32]} />
      </mesh>
      
      {/* Engine glow */}
      <mesh position={[1.5, -0.3, -1.26]}>
        <circleGeometry args={[0.35, 32]} />
        <meshBasicMaterial color={0x00ffff} />
      </mesh>
      <mesh position={[-1.5, -0.3, -1.26]}>
        <circleGeometry args={[0.35, 32]} />
        <meshBasicMaterial color={0x00ffff} />
      </mesh>

      {/* Tail - Vertical */}
      <mesh material={accentMaterial} position={[0, 1.2, -2.5]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.1, 2, 1.5]} />
      </mesh>

      {/* Tail - Horizontal */}
      <mesh material={bodyMaterial} position={[0, 0.2, -2.7]}>
        <boxGeometry args={[2.8, 0.1, 1]} />
      </mesh>
    </group>
  );
}