interface DoorProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}

const Door = ({ position, size, color }: DoorProps) => {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Door;
