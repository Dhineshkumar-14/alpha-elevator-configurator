interface CeilingProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}

const Ceiling = ({ position, size, color }: CeilingProps) => {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Ceiling;
