export type GlassWallType = "none" | "standard" | "high";

export type GlassFinish = "clear" | "tinted";

export type WallType = "full-design" | "half-mirror" | "half";

export type DoorType = "large-glass" | "double-door";

export type DoorPanelType = "glass" | "sheet";

export type DoorPosition = "front" | "right" | "left" | "back";

export interface FloorConfiguration {
  floor: number;
  doorPositions: DoorPosition[];
}

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
  };

  door: {
    type: DoorType;
    panelType: DoorPanelType;
    sameAsWall: boolean;
    color: string;
  };

  floorConfigurations: FloorConfiguration[];

  flooring: {
    type: "theme" | "color";
    value: string;
  };

  ceiling: {
    height: number;
    thickness: number;
  };
}

export const defaultElevatorConfig: ElevatorConfig = {
  // Ground + 2 upper floors
  floors: 4,

  // Cabin dimensions in mm
  dimensions: {
    width: 900,
    depth: 1040,
  },

  // Glass walls
  glassWalls: "standard",
  glassFinish: "tinted",

  // Interior walls
  wall: {
    type: "full-design",
    color: "#C8B08A",
  },

  // Doors
  door: {
    type: "large-glass",
    panelType: "glass",
    sameAsWall: false,
    color: "#2F3033",
  },

  // Door position for each floor
  floorConfigurations: [
    {
      floor: 0,
      doorPositions: ["front", "right"],
    },
    {
      floor: 1,
      doorPositions: ["front"],
    },
    {
      floor: 2,
      doorPositions: ["left", "right"],
    },
  ],

  // Premium flooring
  flooring: {
    type: "theme",
    value: "red",
  },

  // Ceiling
  ceiling: {
    height: 2400,
    thickness: 100,
  },
};
