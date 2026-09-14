interface WallProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}

const Wall = ({ position, size, color }: WallProps) => {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Wall;
