import type { ElevatorConfig } from "../elevatorConfig";

interface ShaftProps {
  config: ElevatorConfig;
  width: number;
  depth: number;
  floorHeight: number;
}

const Shaft = ({ config, width, depth, floorHeight }: ShaftProps) => {
  /*
   * ==========================================
   * SHAFT CONFIGURATION
   * ==========================================
   */

  const floors = config.floors;

  const shaftHeight = floors * floorHeight;

  const wallThickness = 0.1;

  /*
   * ==========================================
   * SHAFT MATERIAL
   * ==========================================
   */

  const shaftMaterial = (
    <meshStandardMaterial color="#555555" roughness={0.75} metalness={0.05} />
  );

  /*
   * ==========================================
   * GET DOORS FOR A FLOOR
   * ==========================================
   */

  const getDoorPositions = (floor: number) => {
    const floorConfig = config.floorConfigurations?.find(
      (item) => item.floor === floor,
    );

    return floorConfig?.doorPositions ?? [];
  };

  /*
   * ==========================================
   * WALL SEGMENT HELPER
   * ==========================================
   *
   * Creates a wall with an opening in the
   * middle for a door.
   *
   * For front/back:
   *
   * ┌──────────────┐
   * │   │ DOOR │   │
   * └──────────────┘
   *
   * For left/right the same logic is rotated.
   */

  const renderWallWithOpening = ({
    position,
    size,
    door,
    floor,
    side,
  }: {
    position: [number, number, number];
    size: [number, number, number];
    door: boolean;
    floor: number;
    side: "front" | "back" | "left" | "right";
  }) => {
    /*
     * No door on this floor.
     * Render a complete wall.
     */

    if (!door) {
      return (
        <mesh key={`${side}-wall-${floor}`} position={position} receiveShadow>
          <boxGeometry args={size} />
          {shaftMaterial}
        </mesh>
      );
    }

    /*
     * ========================================
     * DOOR OPENING DIMENSIONS
     * ========================================
     */

    const doorWidth = Math.min(
      side === "left" || side === "right" ? depth * 0.7 : width * 0.7,
      1.2,
    );

    const doorHeight = Math.min(floorHeight * 0.85, 2.3);

    /*
     * Remaining wall width on both sides
     */

    const wallLength =
      (side === "left" || side === "right" ? depth : width) / 2 - doorWidth / 2;

    /*
     * Door opening starts from floor level.
     */

    const bottomHeight = (floorHeight - doorHeight) / 2;

    /*
     * ========================================
     * FRONT / BACK WALL
     * ========================================
     */

    if (side === "front" || side === "back") {
      const z = position[2];

      return (
        <group key={`${side}-wall-${floor}`}>
          {/* Left section */}
          {wallLength > 0 && (
            <mesh
              position={[-(doorWidth / 2 + wallLength / 2), position[1], z]}
              receiveShadow
            >
              <boxGeometry args={[wallLength, floorHeight, wallThickness]} />
              {shaftMaterial}
            </mesh>
          )}

          {/* Right section */}
          {wallLength > 0 && (
            <mesh
              position={[doorWidth / 2 + wallLength / 2, position[1], z]}
              receiveShadow
            >
              <boxGeometry args={[wallLength, floorHeight, wallThickness]} />
              {shaftMaterial}
            </mesh>
          )}

          {/* Top section */}
          <mesh
            position={[
              0,
              position[1] + doorHeight / 2 + (floorHeight - doorHeight) / 2,
              z,
            ]}
            receiveShadow
          >
            <boxGeometry
              args={[doorWidth, floorHeight - doorHeight, wallThickness]}
            />
            {shaftMaterial}
          </mesh>
        </group>
      );
    }

    /*
     * ========================================
     * LEFT / RIGHT WALL
     * ========================================
     */

    const x = position[0];

    return (
      <group key={`${side}-wall-${floor}`}>
        {/* Back section */}
        {wallLength > 0 && (
          <mesh
            position={[x, position[1], -(doorWidth / 2 + wallLength / 2)]}
            receiveShadow
          >
            <boxGeometry args={[wallThickness, floorHeight, wallLength]} />
            {shaftMaterial}
          </mesh>
        )}

        {/* Front section */}
        {wallLength > 0 && (
          <mesh
            position={[x, position[1], doorWidth / 2 + wallLength / 2]}
            receiveShadow
          >
            <boxGeometry args={[wallThickness, floorHeight, wallLength]} />
            {shaftMaterial}
          </mesh>
        )}

        {/* Top section */}
        <mesh
          position={[
            x,
            position[1] + doorHeight / 2 + (floorHeight - doorHeight) / 2,
            0,
          ]}
          receiveShadow
        >
          <boxGeometry
            args={[wallThickness, floorHeight - doorHeight, doorWidth]}
          />
          {shaftMaterial}
        </mesh>
      </group>
    );
  };

  /*
   * ==========================================
   * RENDER
   * ==========================================
   */

  return (
    <group>
      {/* =====================================
          FLOOR SLABS
      ===================================== */}

      {Array.from({ length: floors }).map((_, floor) => {
        const floorY = floor * floorHeight;

        return (
          <mesh key={`floor-${floor}`} position={[0, floorY, 0]} receiveShadow>
            <boxGeometry args={[width, 0.08, depth]} />

            <meshStandardMaterial color="#777777" roughness={0.9} />
          </mesh>
        );
      })}

      {/* =====================================
          SHAFT WALLS PER FLOOR
      ===================================== */}

      {Array.from({ length: floors }).map((_, floor) => {
        /*
         * Bottom Y of this floor.
         */

        const floorBottom = floor * floorHeight;

        /*
         * Center Y of this floor.
         */

        const centerY = floorBottom + floorHeight / 2;

        /*
         * Doors configured for this floor.
         */

        const doorPositions = getDoorPositions(floor);

        const hasFrontDoor = doorPositions.includes("front");

        const hasBackDoor = doorPositions.includes("back");

        const hasLeftDoor = doorPositions.includes("left");

        const hasRightDoor = doorPositions.includes("right");

        return (
          <group key={`shaft-floor-${floor}`}>
            {/* ==============================
                  BACK WALL
              ============================== */}

            {renderWallWithOpening({
              floor,
              side: "back",
              door: hasBackDoor,
              position: [0, centerY, -depth / 2],
              size: [width, floorHeight, wallThickness],
            })}

            {/* ==============================
                  FRONT WALL
              ============================== */}

            {renderWallWithOpening({
              floor,
              side: "front",
              door: hasFrontDoor,
              position: [0, centerY, depth / 2],
              size: [width, floorHeight, wallThickness],
            })}

            {/* ==============================
                  LEFT WALL
              ============================== */}

            {renderWallWithOpening({
              floor,
              side: "left",
              door: hasLeftDoor,
              position: [-width / 2, centerY, 0],
              size: [wallThickness, floorHeight, depth],
            })}

            {/* ==============================
                  RIGHT WALL
              ============================== */}

            {renderWallWithOpening({
              floor,
              side: "right",
              door: hasRightDoor,
              position: [width / 2, centerY, 0],
              size: [wallThickness, floorHeight, depth],
            })}
          </group>
        );
      })}

      {/* =====================================
          TOP SHAFT COVER
      ===================================== */}

      <mesh position={[0, shaftHeight, 0]} receiveShadow>
        <boxGeometry args={[width, wallThickness, depth]} />

        <meshStandardMaterial color="#444444" roughness={0.8} />
      </mesh>
    </group>
  );
};

export default Shaft;
