import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import type { ElevatorConfig } from "./elevatorConfig";

import Elevator from "./elevatorScene/Elevator";

interface ElevatorSceneProps {
  config: ElevatorConfig;
}

const FLOOR_HEIGHT = 2.6;
const SCALE = 0.001;

const ElevatorScene = ({ config }: ElevatorSceneProps) => {
  const totalHeight = config.floors * FLOOR_HEIGHT;

  const cameraDistance = Math.max(8, totalHeight * 1.5);

  return (
    <Canvas
      shadows
      camera={{
        position: [0, totalHeight / 2, cameraDistance],
        fov: 45,
      }}
    >
      <color attach="background" args={["#101012"]} />

      {/* =========================
          LIGHTING
      ========================= */}

      <ambientLight intensity={1.2} />

      <directionalLight position={[5, 8, 5]} intensity={2} castShadow />

      <pointLight position={[0, 5, 0]} intensity={1.5} />

      {/* =========================
          ELEVATOR ON EVERY FLOOR
      ========================= */}

      {Array.from({
        length: config.floors,
      }).map((_, index) => (
        <Elevator
          key={index}
          floor={index}
          config={config}
          position={[0, index * FLOOR_HEIGHT, 0]}
        />
      ))}

      {/* =========================
          CAMERA
      ========================= */}

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
