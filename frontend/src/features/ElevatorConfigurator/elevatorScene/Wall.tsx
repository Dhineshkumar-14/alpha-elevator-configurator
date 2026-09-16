import { RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface WallProps {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
  texture?: string;
  mirror?: boolean;
  handles?: boolean;
}

const MetalMaterial = () => (
  <meshStandardMaterial color="#BFC1C2" metalness={0.85} roughness={0.22} />
);

const Wall = ({
  position,
  size,
  color = "#6E2929",
  texture,
  mirror = false,
  handles = false,
}: WallProps) => {
  const wallTexture = texture ? useTexture(texture) : null;

  if (wallTexture) {
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(1, 1);
    wallTexture.colorSpace = THREE.SRGBColorSpace;
  }

  const [width, height, depth] = size;

  /*
   * Handrail position
   *
   * The wall center is Y = 0.
   * Moving the handrail upward means using a value closer to 0.
   *
   * Previous:
   *   -height * 0.31
   *
   * New:
   *   -height * 0.18
   *
   * This gives the handrail a more natural elevator-cabin height.
   */
  const handrailY = -height * 0.18;

  return (
    <group position={position}>
      {/* =================================
          MAIN WALL
      ================================= */}

      <RoundedBox
        args={[width, height, depth]}
        radius={0.012}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={color}
          map={wallTexture}
          roughness={0.35}
          metalness={0.02}
        />
      </RoundedBox>

      {/* =================================
          VERTICAL PANEL SEAMS
      ================================= */}

      <mesh position={[-width * 0.25, 0, depth / 2 + 0.006]}>
        <boxGeometry args={[0.006, height, 0.008]} />
        <meshStandardMaterial color="#572020" roughness={0.5} />
      </mesh>

      <mesh position={[width * 0.25, 0, depth / 2 + 0.006]}>
        <boxGeometry args={[0.006, height, 0.008]} />
        <meshStandardMaterial color="#572020" roughness={0.5} />
      </mesh>

      {handles && (
        <group>
          {/* Main handrail */}
          <mesh
            position={[0, -height * 0.02, depth / 2 + 0.065]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
          >
            <cylinderGeometry
              args={[
                0.022, // radius
                0.022,
                width * 0.68, // rail length
                32,
              ]}
            />

            <MetalMaterial />
          </mesh>

          {/* =================================
        LEFT SUPPORT
    ================================= */}

          <group position={[-width * 0.24, -height * 0.02, depth / 2 + 0.045]}>
            {/* Wall mounting plate */}

            <RoundedBox
              args={[0.065, 0.085, 0.018]}
              radius={0.012}
              smoothness={4}
              castShadow
            >
              <MetalMaterial />
            </RoundedBox>

            {/* Support arm */}

            <RoundedBox
              args={[0.035, 0.075, 0.055]}
              radius={0.012}
              smoothness={4}
              position={[0, 0, 0.025]}
              castShadow
            >
              <MetalMaterial />
            </RoundedBox>
          </group>

          {/* =================================
        RIGHT SUPPORT
    ================================= */}

          <group position={[width * 0.24, -height * 0.02, depth / 2 + 0.045]}>
            {/* Wall mounting plate */}

            <RoundedBox
              args={[0.065, 0.085, 0.018]}
              radius={0.012}
              smoothness={4}
              castShadow
            >
              <MetalMaterial />
            </RoundedBox>

            {/* Support arm */}

            <RoundedBox
              args={[0.035, 0.075, 0.055]}
              radius={0.012}
              smoothness={4}
              position={[0, 0, 0.025]}
              castShadow
            >
              <MetalMaterial />
            </RoundedBox>
          </group>

          {/* =================================
        END CAPS
    ================================= */}

          <mesh
            position={[-width * 0.34, -height * 0.02, depth / 2 + 0.065]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <sphereGeometry args={[0.022, 24, 24]} />
            <MetalMaterial />
          </mesh>

          <mesh
            position={[width * 0.34, -height * 0.02, depth / 2 + 0.065]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <sphereGeometry args={[0.022, 24, 24]} />
            <MetalMaterial />
          </mesh>
        </group>
      )}
    </group>
  );
};

export default Wall;
