import type { ElevatorConfig } from "../elevatorConfig";

interface ElevatorFloorProps {
  floor: number;
  config: ElevatorConfig;
  width: number;
  depth: number;
  floorHeight: number;
}

const ElevatorFloor = ({
  floor,
  config,
  width,
  depth,
  floorHeight,
}: ElevatorFloorProps) => {
  const y = floor * floorHeight;

  return (
    <group position={[0, y, 0]}>
      {/* =====================================================
          FLOOR SLAB
      ===================================================== */}

      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[width, 0.08, depth]} />

        <meshStandardMaterial color="#4a4a4a" roughness={0.7} />
      </mesh>

      {/* =====================================================
          ELEVATOR ENTRANCE
      ===================================================== */}

      <ElevatorDoor config={config} />
    </group>
  );
};

/* ============================================================
   ELEVATOR DOOR
============================================================ */

interface ElevatorDoorProps {
  config: ElevatorConfig;
}

const ElevatorDoor = ({ config }: ElevatorDoorProps) => {
  const doorWidth = 1.35;
  const doorHeight = 2.2;

  const frameWidth = 0.08;
  const frameDepth = 0.12;

  const doorY = doorHeight / 2;

  const isGlass = config.door.panelType === "glass";

  const doorColor = config.door.sameAsWall ? config.wall.color : "#777777";

  return (
    <group position={[0, 0, 0.05]}>
      {/* ==================================================
          LEFT VERTICAL FRAME
      ================================================== */}

      <mesh position={[-(doorWidth / 2 + frameWidth / 2), doorY, 0]} castShadow>
        <boxGeometry args={[frameWidth, doorHeight + 0.16, frameDepth]} />

        <meshStandardMaterial color="#8f8063" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* ==================================================
          RIGHT VERTICAL FRAME
      ================================================== */}

      <mesh position={[doorWidth / 2 + frameWidth / 2, doorY, 0]} castShadow>
        <boxGeometry args={[frameWidth, doorHeight + 0.16, frameDepth]} />

        <meshStandardMaterial color="#8f8063" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* ==================================================
          TOP FRAME
      ================================================== */}

      <mesh position={[0, doorHeight + 0.08, 0]} castShadow>
        <boxGeometry args={[doorWidth + 0.24, 0.16, frameDepth]} />

        <meshStandardMaterial color="#8f8063" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* ==================================================
          LEFT DOOR PANEL
      ================================================== */}

      <mesh position={[-doorWidth / 4, doorY, 0.06]} castShadow>
        <boxGeometry args={[doorWidth / 2 - 0.025, doorHeight, 0.045]} />

        {isGlass ? (
          <meshPhysicalMaterial
            color="#667176"
            metalness={0.15}
            roughness={0.18}
            transmission={0.15}
            transparent
            opacity={0.8}
          />
        ) : (
          <meshStandardMaterial
            color={doorColor}
            metalness={0.75}
            roughness={0.3}
          />
        )}
      </mesh>

      {/* ==================================================
          RIGHT DOOR PANEL
      ================================================== */}

      <mesh position={[doorWidth / 4, doorY, 0.06]} castShadow>
        <boxGeometry args={[doorWidth / 2 - 0.025, doorHeight, 0.045]} />

        {isGlass ? (
          <meshPhysicalMaterial
            color="#667176"
            metalness={0.15}
            roughness={0.18}
            transmission={0.15}
            transparent
            opacity={0.8}
          />
        ) : (
          <meshStandardMaterial
            color={doorColor}
            metalness={0.75}
            roughness={0.3}
          />
        )}
      </mesh>

      {/* ==================================================
          CENTER DOOR GAP
      ================================================== */}

      <mesh position={[0, doorY, 0.09]}>
        <boxGeometry args={[0.025, doorHeight, 0.01]} />

        <meshStandardMaterial color="#252525" roughness={0.6} />
      </mesh>

      {/* ==================================================
          BOTTOM DOOR TRACK
      ================================================== */}

      <mesh position={[0, 0.045, 0.08]}>
        <boxGeometry args={[doorWidth + 0.12, 0.09, 0.14]} />

        <meshStandardMaterial color="#242424" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
};

export default ElevatorFloor;
