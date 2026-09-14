interface ShaftProps {
  floors: number;
  width: number;
  depth: number;
  floorHeight: number;
}

const Shaft = ({ floors, width, depth, floorHeight }: ShaftProps) => {
  const shaftHeight = floors * floorHeight;

  const wallThickness = 0.1;

  return (
    <group>
      {/* Back Shaft Wall */}
      <mesh position={[0, shaftHeight / 2, -depth / 2]} receiveShadow>
        <boxGeometry args={[width, shaftHeight, wallThickness]} />

        <meshStandardMaterial color="#555555" />
      </mesh>

      {/* Left Shaft Wall */}
      <mesh position={[-width / 2, shaftHeight / 2, 0]} receiveShadow>
        <boxGeometry args={[wallThickness, shaftHeight, depth]} />

        <meshStandardMaterial color="#555555" />
      </mesh>

      {/* Right Shaft Wall */}
      <mesh position={[width / 2, shaftHeight / 2, 0]} receiveShadow>
        <boxGeometry args={[wallThickness, shaftHeight, depth]} />

        <meshStandardMaterial color="#555555" />
      </mesh>

      {/* Floor Slabs */}
      {Array.from({ length: floors }).map((_, index) => (
        <mesh key={index} position={[0, index * floorHeight, 0]} receiveShadow>
          <boxGeometry args={[width, 0.08, depth]} />

          <meshStandardMaterial color="#777777" />
        </mesh>
      ))}
    </group>
  );
};

export default Shaft;
