interface FloorProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}

const Floor = ({ position, size, color }: FloorProps) => {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Floor;
