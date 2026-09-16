export type GlassWallType = "none" | "standard" | "high";

export type GlassFinish = "clear" | "tinted";

export type WallType = "full-design" | "half-mirror" | "half";

export type DoorType = "large-glass" | "double-door";

export type DoorPanelType = "glass" | "sheet";

export type DoorPosition = "front" | "right" | "left" | "back";

export type WallPanelType = "glass" | "sheet";

/* ============================================================
   FLOOR WALL CONFIGURATION
============================================================ */

export interface FloorWallConfiguration {
  floor: number;

  walls: {
    front: WallPanelType;
    left: WallPanelType;
    right: WallPanelType;
  };
}

/* ============================================================
   FLOOR DOOR CONFIGURATION
============================================================ */

export interface FloorConfiguration {
  floor: number;

  doorPositions: DoorPosition[];
}

/* ============================================================
   ELEVATOR CONFIGURATION
============================================================ */

export interface ElevatorConfig {
  floors: number;

  dimensions: {
    width: number;
    depth: number;
  };

  glassWalls: GlassWallType;

  glassFinish: GlassFinish;

  wall: {
    type: WallType;
    color: string;
    design: string;
  };

  door: {
    type: DoorType;
    panelType: DoorPanelType;
    sameAsWall: boolean;
    color: string;
  };

  floorConfigurations: FloorConfiguration[];

  floorWallConfigurations: FloorWallConfiguration[];

  flooring: {
    type: "theme" | "color";
    value: string;
  };

  ceiling: {
    height: number;
    thickness: number;
  };
}

/* ============================================================
   DEFAULT FLOOR CONFIG
============================================================ */

const createDefaultFloorConfiguration = (
  floor: number,
): FloorConfiguration => ({
  floor,
  doorPositions: ["front"],
});

/* ============================================================
   DEFAULT FLOOR WALL CONFIG
============================================================ */

const createDefaultFloorWallConfiguration = (
  floor: number,
): FloorWallConfiguration => ({
  floor,

  walls: {
    front: "glass",
    left: "glass",
    right: "glass",
  },
});

/* ============================================================
   DEFAULT ELEVATOR CONFIG
============================================================ */

const DEFAULT_FLOORS = 2;

export const defaultElevatorConfig: ElevatorConfig = {
  floors: DEFAULT_FLOORS,

  dimensions: {
    width: 900,
    depth: 1040,
  },

  glassWalls: "standard",

  glassFinish: "tinted",

  wall: {
    type: "full-design",
    color: "#C8B08A",
    design: "evelina-classic",
  },

  door: {
    type: "large-glass",
    panelType: "glass",
    sameAsWall: false,
    color: "#E4D0AF",
  },

  /* ==========================================================
     DOOR POSITIONS
  ========================================================== */

  floorConfigurations: Array.from({ length: DEFAULT_FLOORS }, (_, floor) =>
    createDefaultFloorConfiguration(floor),
  ),

  /* ==========================================================
     CONSTRUCTION WALLS
  ========================================================== */

  floorWallConfigurations: Array.from({ length: DEFAULT_FLOORS }, (_, floor) =>
    createDefaultFloorWallConfiguration(floor),
  ),

  /* ==========================================================
     FLOORING
  ========================================================== */

  flooring: {
    type: "theme",
    value: "aged-oak",
  },

  /* ==========================================================
     CEILING
  ========================================================== */

  ceiling: {
    height: 2400,
    thickness: 100,
  },
};
