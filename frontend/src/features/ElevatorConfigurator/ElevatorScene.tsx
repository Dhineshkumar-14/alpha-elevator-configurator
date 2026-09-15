import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import type { ElevatorConfig } from "./elevatorConfig";

import Elevator from "./elevatorScene/Elevator";
import Shaft from "./elevatorScene/Shaft";

interface ElevatorSceneProps {
  config: ElevatorConfig;
}

const FLOOR_HEIGHT = 2.6;
const SCALE = 0.001;

const ElevatorScene = ({ config }: ElevatorSceneProps) => {
  /*
   * ==========================================
   * SHAFT / BUILDING DIMENSIONS
   * ==========================================
   */

  const width = config.dimensions.width * SCALE;
  const depth = config.dimensions.depth * SCALE;

  const totalHeight = config.floors * FLOOR_HEIGHT;

  /*
   * ==========================================
   * CAMERA
   * ==========================================
   */

  const cameraDistance = Math.max(8, totalHeight * 1.5);

  /*
   * ==========================================
   * RENDER
   * ==========================================
   */

  return (
    <Canvas
      shadows
      camera={{
        position: [0, totalHeight / 2, cameraDistance],
        fov: 45,
      }}
    >
      {/* =====================================
          SCENE BACKGROUND
      ===================================== */}

      <color attach="background" args={["#101012"]} />

      {/* =====================================
          LIGHTING
      ===================================== */}

      <ambientLight intensity={1.2} />

      <directionalLight position={[5, 8, 5]} intensity={2} castShadow />

      <pointLight position={[0, 5, 0]} intensity={1.5} />

      {/* =====================================
          ELEVATOR SHAFT
          Shaft gets the complete config.
      ===================================== */}

      <Shaft
        config={config}
        width={width}
        depth={depth}
        floorHeight={FLOOR_HEIGHT}
      />

      {/* =====================================
          ELEVATOR
          Interior design comes from config.
      ===================================== */}

      <Elevator config={config} />

      {/* =====================================
          CAMERA CONTROLS
      ===================================== */}

      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={25}
        target={[0, totalHeight / 2, 0]}
      />
    </Canvas>
  );
};

export default ElevatorScene;
