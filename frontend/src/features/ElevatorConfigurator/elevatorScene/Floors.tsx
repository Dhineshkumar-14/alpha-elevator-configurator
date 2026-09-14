interface FloorsProps {
  floors: number;
  width: number;
  depth: number;
  floorHeight: number;
}

const Floors = ({ floors, width, depth, floorHeight }: FloorsProps) => {
  return (
    <group>
      {Array.from({ length: floors }).map((_, index) => {
        const y = index * floorHeight;

        return (
          <mesh key={index} position={[0, y, 0]} receiveShadow>
            <boxGeometry args={[width, 0.08, depth]} />

            <meshStandardMaterial color="#888888" />
          </mesh>
        );
      })}
    </group>
  );
};

export default Floors;
