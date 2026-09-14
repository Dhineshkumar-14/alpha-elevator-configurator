import Floor from "./Floor";
import type { ElevatorConfig } from "../elevatorConfig";

interface ElevatorProps {
  config: ElevatorConfig;
}

const FLOOR_HEIGHT = 2600;

const Elevator = ({ config }: ElevatorProps) => {
  const { width, depth } = config.dimensions;

  const scale = 0.001;

  const w = width * scale;
  const d = depth * scale;
  const h = config.floors * FLOOR_HEIGHT * scale;

  return (
    <group>
      <Floor
        position={[0, 0, 0]}
        size={[w, 0.1, d]}
        color={config.flooring.value}
      />

      {/* Other elevator components will come here */}
    </group>
  );
};

export default Elevator;
