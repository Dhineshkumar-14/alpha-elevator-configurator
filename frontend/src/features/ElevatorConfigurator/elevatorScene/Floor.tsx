import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface FloorProps {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
  texture?: string;
}

const Floor = ({ position, size, color = "#E5E5E5", texture }: FloorProps) => {
  const floorTexture = texture ? useTexture(texture) : null;

  if (floorTexture) {
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;

    // Adjust based on elevator dimensions
    floorTexture.repeat.set(2, 2);

    floorTexture.colorSpace = THREE.SRGBColorSpace;
  }

  return (
    <group position={position}>
      {/* Main flooring */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={size} />

        <meshStandardMaterial
          color={color}
          map={floorTexture}
          roughness={0.45}
          metalness={0.05}
        />
      </mesh>

      {/* Slight inner floor surface */}
      <mesh position={[0, size[1] / 2 + 0.008, 0]} receiveShadow>
        <boxGeometry args={[size[0] - 0.04, 0.015, size[2] - 0.04]} />

        <meshStandardMaterial
          color={color}
          map={floorTexture}
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
};

export default Floor;
