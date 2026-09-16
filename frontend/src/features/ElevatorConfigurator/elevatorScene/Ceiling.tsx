import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface CeilingProps {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
  lightColor?: string;
  showLights?: boolean;
}

const Ceiling = ({
  position,
  size,
  color = "#E8E8E8",
  lightColor = "#FFFFFF",
  showLights = true,
}: CeilingProps) => {
  const [width, height, depth] = size;

  // Small thickness for the visible ceiling panel
  const ceilingThickness = Math.min(height, 0.08);

  // Recessed light border
  const border = 0.1;

  // LED strip dimensions
  const ledThickness = 0.012;
  const ledDepth = 0.018;

  // Central light panel
  const centerWidth = width * 0.38;
  const centerDepth = depth * 0.28;

  return (
    <group position={position}>
      {/* =====================================================
          MAIN CEILING BODY
      ===================================================== */}

      <RoundedBox
        args={[width, ceilingThickness, depth]}
        radius={0.025}
        smoothness={5}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial color={color} roughness={0.48} metalness={0.08} />
      </RoundedBox>

      {/* =====================================================
          RECESSED INNER CEILING
      ===================================================== */}

      <RoundedBox
        args={[width - border * 2, 0.018, depth - border * 2]}
        radius={0.018}
        smoothness={4}
        position={[0, -ceilingThickness * 0.5 - 0.008, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          color="#D7D7D7"
          roughness={0.55}
          metalness={0.04}
        />
      </RoundedBox>

      {showLights && (
        <>
          {/* =================================================
              LEFT LED STRIP
          ================================================= */}

          <mesh
            position={[
              -(width / 2 - border),
              -ceilingThickness * 0.5 - 0.022,
              0,
            ]}
          >
            <boxGeometry args={[ledThickness, ledDepth, depth - border * 2]} />

            <meshStandardMaterial
              color={lightColor}
              emissive={lightColor}
              emissiveIntensity={2.5}
              toneMapped={false}
            />
          </mesh>

          {/* =================================================
              RIGHT LED STRIP
          ================================================= */}

          <mesh
            position={[width / 2 - border, -ceilingThickness * 0.5 - 0.022, 0]}
          >
            <boxGeometry args={[ledThickness, ledDepth, depth - border * 2]} />

            <meshStandardMaterial
              color={lightColor}
              emissive={lightColor}
              emissiveIntensity={2.5}
              toneMapped={false}
            />
          </mesh>

          {/* =================================================
              FRONT LED STRIP
          ================================================= */}

          <mesh
            position={[0, -ceilingThickness * 0.5 - 0.022, depth / 2 - border]}
          >
            <boxGeometry args={[width - border * 2, ledDepth, ledThickness]} />

            <meshStandardMaterial
              color={lightColor}
              emissive={lightColor}
              emissiveIntensity={2.5}
              toneMapped={false}
            />
          </mesh>

          {/* =================================================
              BACK LED STRIP
          ================================================= */}

          <mesh
            position={[
              0,
              -ceilingThickness * 0.5 - 0.022,
              -(depth / 2 - border),
            ]}
          >
            <boxGeometry args={[width - border * 2, ledDepth, ledThickness]} />

            <meshStandardMaterial
              color={lightColor}
              emissive={lightColor}
              emissiveIntensity={2.5}
              toneMapped={false}
            />
          </mesh>

          {/* =================================================
              CENTRAL LIGHT PANEL
          ================================================= */}

          <RoundedBox
            args={[centerWidth, 0.012, centerDepth]}
            radius={0.025}
            smoothness={5}
            position={[0, -ceilingThickness * 0.5 - 0.018, 0]}
          >
            <meshStandardMaterial
              color={lightColor}
              emissive={lightColor}
              emissiveIntensity={3}
              toneMapped={false}
              roughness={0.18}
            />
          </RoundedBox>

          {/* =================================================
              CENTRAL LIGHT FRAME
          ================================================= */}

          <RoundedBox
            args={[centerWidth + 0.035, 0.008, centerDepth + 0.035]}
            radius={0.02}
            smoothness={4}
            position={[0, -ceilingThickness * 0.5 - 0.012, 0]}
          >
            <meshStandardMaterial
              color="#B8B8B8"
              metalness={0.5}
              roughness={0.28}
            />
          </RoundedBox>
        </>
      )}

      {/* =====================================================
          PHYSICAL LIGHT
          Adds actual illumination to the cabin
      ===================================================== */}

      {showLights && (
        <>
          <pointLight
            position={[0, -0.12, 0]}
            intensity={1.8}
            distance={4}
            decay={2}
            color={lightColor}
          />

          <pointLight
            position={[-width * 0.3, -0.08, -depth * 0.3]}
            intensity={0.45}
            distance={3}
            decay={2}
            color={lightColor}
          />

          <pointLight
            position={[width * 0.3, -0.08, depth * 0.3]}
            intensity={0.45}
            distance={3}
            decay={2}
            color={lightColor}
          />
        </>
      )}
    </group>
  );
};

export default Ceiling;
