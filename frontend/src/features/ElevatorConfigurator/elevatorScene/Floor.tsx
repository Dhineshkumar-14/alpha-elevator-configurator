import { useTexture } from "@react-three/drei";

interface FloorProps {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
  texture?: string;
}

const Floor = ({ position, size, color = "#E5E5E5", texture }: FloorProps) => {
  const floorTexture = texture ? useTexture(texture) : null;

  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={size} />

      <meshStandardMaterial color={color} map={floorTexture} />
    </mesh>
  );
};

export default Floor;
