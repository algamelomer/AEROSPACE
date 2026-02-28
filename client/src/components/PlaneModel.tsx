import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function PlaneModel({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const scroll = useScroll();
  
  // Load the CRJ-900 model
  const { scene } = useGLTF("/models/crj-900/scene.gltf");

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

  return (
    <group ref={group} scale={[2.2, 2.2, 2.2]}>
      <primitive object={scene} rotation={[0, 0, 0]} />
    </group>
  );
}

// Preload the model to avoid pop-in
useGLTF.preload("/models/crj-900/scene.gltf");