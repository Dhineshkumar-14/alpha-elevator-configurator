export type GlassWallType = "none" | "standard" | "high";

export type GlassFinish = "clear" | "tinted";

export type WallType = "full-design" | "half-mirror" | "half";

export type DoorType = "large-glass" | "double-door";

export type DoorPanelType = "glass" | "sheet";

export type DoorPosition = "front" | "right" | "left" | "back";

export type WallPanelType = "glass" | "sheet";

export interface FloorWallConfiguration {
  floor: number;
  walls: {
    front: WallPanelType;
    left: WallPanelType;
    right: WallPanelType;
  };
}

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

export const defaultElevatorConfig: ElevatorConfig = {
  floors: 6,

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
    color: "#2F3033",
  },

  // Door positions
  floorConfigurations: [
    { floor: 0, doorPositions: ["front"] },
    { floor: 1, doorPositions: ["front"] },
    { floor: 2, doorPositions: ["front"] },
    { floor: 3, doorPositions: ["front"] },
    { floor: 4, doorPositions: ["front"] },
    { floor: 5, doorPositions: ["front"] },
  ],

  // Construction wall configuration
  floorWallConfigurations: [
    {
      floor: 0,
      walls: {
        front: "glass",
        left: "glass",
        right: "glass",
      },
    },
    {
      floor: 1,
      walls: {
        front: "glass",
        left: "glass",
        right: "glass",
      },
    },
    {
      floor: 2,
      walls: {
        front: "glass",
        left: "glass",
        right: "glass",
      },
    },
    {
      floor: 3,
      walls: {
        front: "glass",
        left: "glass",
        right: "glass",
      },
    },
    {
      floor: 4,
      walls: {
        front: "glass",
        left: "glass",
        right: "glass",
      },
    },
    {
      floor: 5,
      walls: {
        front: "glass",
        left: "glass",
        right: "glass",
      },
    },
  ],

  flooring: {
    type: "theme",
    value: "aged-oak",
  },

  ceiling: {
    height: 2400,
    thickness: 100,
  },
};
