import type { ElevatorConfig } from "../elevatorConfig";
import Ceiling from "./Ceiling";
import Door from "./Door";
import Floor from "./Floor";
import Wall from "./Wall";

interface ElevatorProps {
  config: ElevatorConfig;
}

const FLOOR_HEIGHT = 2600;
const SCALE = 0.001;

const Elevator = ({ config }: ElevatorProps) => {
  const width = config.dimensions.width * SCALE;
  const depth = config.dimensions.depth * SCALE;
  const height = FLOOR_HEIGHT * SCALE;

  const wallThickness = 0.1;
  const floorThickness = 0.1;

  const floorTop = floorThickness / 2;
  const wallCenterY = floorTop + height / 2;

  return (
    <group>
      {/* Floor */}
      <Floor
        position={[0, 0, 0]}
        size={[width, floorThickness, depth]}
        color={config.flooring.value}
      />

      {/* Back Wall */}
      <Wall
        position={[0, wallCenterY, -(depth / 2 - wallThickness / 2)]}
        size={[width, height, wallThickness]}
        color={config.wall.color}
      />

      {/* Left Wall */}
      <Wall
        position={[-(width / 2 - wallThickness / 2), wallCenterY, 0]}
        size={[wallThickness, height, depth]}
        color={config.wall.color}
      />

      {/* Right Wall */}
      <Wall
        position={[width / 2 - wallThickness / 2, wallCenterY, 0]}
        size={[wallThickness, height, depth]}
        color={config.wall.color}
      />

      {/* Ceiling */}
      <Ceiling
        position={[0, floorTop + height, 0]}
        size={[width, config.ceiling.thickness * SCALE, depth]}
        color="#E5E5E5"
      />

      {/* Full Front Door */}
      <Door
        position={[0, floorTop + height / 2, depth / 2]}
        size={[width, height, wallThickness]}
        color={config.door.color}
      />
    </group>
  );
};

export default Elevator;
