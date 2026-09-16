import type { ElevatorConfig } from "../elevatorConfig";
import { flooringOptions, wallOptions } from "../InteriorSelection";

import CabinPanel from "./CabinPanel";
import Ceiling from "./Ceiling";
import Floor from "./Floor";
import Door from "./Door";

interface ElevatorProps {
  config: ElevatorConfig;

  /**
   * Floor number.
   *
   * 0 = ground floor
   * 1 = first floor
   * 2 = second floor
   * etc.
   */
  floor?: number;

  /**
   * Position of this elevator/floor in the 3D scene.
   */
  position?: [number, number, number];
}

/**
 * Real-world elevator floor height in millimeters.
 */
const FLOOR_HEIGHT = 2600;

/**
 * Convert millimeters to Three.js meters.
 */
const SCALE = 0.001;

const Elevator = ({
  config,
  floor = 0,
  position = [0, 0, 0],
}: ElevatorProps) => {
  /*
   * ==========================================
   * CABIN DIMENSIONS
   * ==========================================
   */

  const width = config.dimensions.width * SCALE;
  const depth = config.dimensions.depth * SCALE;
  const height = FLOOR_HEIGHT * SCALE;

  /*
   * ==========================================
   * CONSTRUCTION
   * ==========================================
   */

  const wallThickness = 0.08;
  const floorThickness = 0.1;

  const floorTop = floorThickness / 2;

  const wallCenterY = floorTop + height / 2;

  /*
   * ==========================================
   * SELECTED MATERIALS
   * ==========================================
   */

  const selectedFlooring = flooringOptions.find(
    (item) => item.id === config.flooring.value,
  );

  const selectedWall = wallOptions.find(
    (item) => item.id === config.wall.design,
  );

  const wallColor = config.wall.color || "#6E2929";

  /*
   * ==========================================
   * FLOOR CONFIGURATION
   * ==========================================
   *
   * IMPORTANT:
   *
   * Previously this was hardcoded to:
   *
   * floor.floor === 0
   *
   * Now it uses the actual floor prop.
   */

  const floorConfig = config.floorConfigurations?.find(
    (item) => item.floor === floor,
  );
console.log(config);

  const doorPositions = floorConfig?.doorPositions ?? ["front"];

  const hasFrontDoor = doorPositions.includes("front");

  const hasRightDoor = doorPositions.includes("right");

  const hasLeftDoor = doorPositions.includes("left");

  const hasBackDoor = doorPositions.includes("back");

  /*
   * ==========================================
   * CABIN PANEL DIMENSIONS
   * ==========================================
   */

  const sidePanelSize: [number, number, number] = [
    wallThickness,
    height,
    depth,
  ];

  /*
   * ==========================================
   * BACK PANEL POSITION
   * ==========================================
   */

  const backPanelPosition: [number, number, number] = [
    0,
    wallCenterY,
    -depth / 2 + wallThickness / 2,
  ];

  /*
   * ==========================================
   * COMMON DOOR PROPS
   * ==========================================
   */

  const doorType = config.door.type;
  const doorPanelType = config.door.panelType;
  const doorColor = config.door.color;

  /*
   * ==========================================
   * RENDER
   * ==========================================
   */

  return (
    <group position={position}>
      {/* =====================================
          FLOOR
      ===================================== */}

      <Floor
        position={[0, 0, 0]}
        size={[width, floorThickness, depth]}
        texture={selectedFlooring?.image}
      />

      {/* =====================================
          LEFT CABIN PANEL
      ===================================== */}

      {!hasLeftDoor && (
        <CabinPanel
          side="left"
          position={[-width / 2, wallCenterY, 0]}
          size={sidePanelSize}
          innerColor={wallColor}
          outerColor="#333333"
          showHandrail
        />
      )}

      {/* =====================================
          RIGHT CABIN PANEL
      ===================================== */}

      {!hasRightDoor && (
        <CabinPanel
          side="right"
          position={[width / 2, wallCenterY, 0]}
          size={sidePanelSize}
          innerColor={wallColor}
          outerColor="#333333"
        />
      )}

      {/* =====================================
          BACK CABIN PANEL
      ===================================== */}

      {!hasBackDoor && (
        <CabinPanel
          side="front"
          position={backPanelPosition}
          size={[width, height, wallThickness]}
          innerColor={wallColor}
          texture={selectedWall?.image}
          showSeams
          showTrim
          showHandrail
        />
      )}

      {/* =====================================
          CEILING
      ===================================== */}

      <Ceiling
        position={[0, floorTop + height, 0]}
        size={[width, config.ceiling.thickness * SCALE, depth]}
        color="#E8E8E8"
        lightColor="#FFFFFF"
        showLights
      />

      {/* =====================================
          FRONT DOOR
      ===================================== */}

      {hasFrontDoor && (
        <Door
          side="front"
          position={[0, wallCenterY, depth / 2 + wallThickness / 2]}
          size={[width, height, wallThickness]}
          type={doorType}
          panelType={doorPanelType}
          color={doorColor}
          frameColor="#333333"
          glassColor={doorColor}
          glassFinish={config.glassFinish}
          showHandles
          showGlassReflection
        />
      )}

      {/* =====================================
          RIGHT DOOR
      ===================================== */}

      {hasRightDoor && (
        <Door
          side="right"
          position={[width / 2 + wallThickness / 2, wallCenterY, 0]}
          size={[depth, height, wallThickness]}
          type={doorType}
          panelType={doorPanelType}
          color={doorColor}
          frameColor="#333333"
          glassColor={doorColor}
          glassFinish={config.glassFinish}
          showHandles
          showGlassReflection
        />
      )}

      {/* =====================================
          LEFT DOOR
      ===================================== */}

      {hasLeftDoor && (
        <Door
          side="left"
          position={[-width / 2 - wallThickness / 2, wallCenterY, 0]}
          size={[depth, height, wallThickness]}
          type={doorType}
          panelType={doorPanelType}
          color={doorColor}
          frameColor="#333333"
          glassColor={doorColor}
          glassFinish={config.glassFinish}
          showHandles
          showGlassReflection
        />
      )}

      {/* =====================================
          BACK DOOR
      ===================================== */}

      {hasBackDoor && (
        <Door
          side="back"
          position={[0, wallCenterY, -depth / 2 - wallThickness / 2]}
          size={[width, height, wallThickness]}
          type={doorType}
          panelType={doorPanelType}
          color={doorColor}
          frameColor="#333333"
          glassColor="#26343A"
          glassFinish={config.glassFinish}
          showHandles
          showGlassReflection
        />
      )}
    </group>
  );
};

export default Elevator;
