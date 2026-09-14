import { useTexture } from "@react-three/drei";

interface WallProps {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
  texture?: string;
}

const Wall = ({ position, size, color = "#C8B08A", texture }: WallProps) => {
  const wallTexture = texture ? useTexture(texture) : null;

  if (wallTexture) {
    wallTexture.wrapS = 1000;
    wallTexture.wrapT = 1000;
  }

  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />

      <meshStandardMaterial color={color} map={wallTexture} />
    </mesh>
  );
};

export default Wall;
