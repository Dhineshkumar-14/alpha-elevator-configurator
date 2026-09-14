import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import type { ElevatorConfig } from "./elevatorConfig";
import Elevator from "./elevatorScene/Elevator";

interface ElevatorSceneProps {
  config: ElevatorConfig;
}

const FLOOR_HEIGHT = 2.6;

const ElevatorScene = ({ config }: ElevatorSceneProps) => {
  const elevatorHeight = config.floors * FLOOR_HEIGHT;

  // Move camera farther away as floors increase
  const cameraDistance = Math.max(8, elevatorHeight * 1.5);

  return (
    <Canvas
      shadows
      camera={{
        position: [0, elevatorHeight / 2, cameraDistance],
        fov: 45,
      }}
    >
      <color attach="background" args={["#101012"]} />

      {/* Lighting */}
      <ambientLight intensity={1.2} />

      <directionalLight position={[5, 8, 5]} intensity={2} castShadow />

      <pointLight position={[0, 5, 0]} intensity={1.5} />

      {/* Elevator */}
      <Elevator config={config} />

      {/* Controls */}
      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={25}
        target={[0, elevatorHeight / 2, 0]}
      />
    </Canvas>
  );
};

export default ElevatorScene;
