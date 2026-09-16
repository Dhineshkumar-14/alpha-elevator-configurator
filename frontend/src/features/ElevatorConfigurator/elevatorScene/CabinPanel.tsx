import { RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";

export type PanelSide = "left" | "right" | "front";

interface CabinPanelProps {
  side: PanelSide;
  position: [number, number, number];
  size: [number, number, number];

  // Separate interior and exterior colors
  innerColor?: string;
  outerColor?: string;

  texture?: string;

  showSeams?: boolean;
  showTrim?: boolean;
  showHandrail?: boolean;
  showControls?: boolean;

  panelCount?: number;
}

/* =========================================================
   OUTER / METAL MATERIAL
========================================================= */

const OuterMaterial = ({ color }: { color: string }) => (
  <meshStandardMaterial color={color} metalness={0.78} roughness={0.24} />
);

/* =========================================================
   CABIN PANEL
========================================================= */

const CabinPanel = ({
  side,
  position,
  size,

  innerColor = "#6E2929",
  outerColor = "#BFC1C2",

  texture,

  showSeams = true,
  showTrim = true,
  showHandrail = false,
  showControls = false,

  panelCount = 3,
}: CabinPanelProps) => {
  const panelTexture = texture ? useTexture(texture) : null;

  if (panelTexture) {
    panelTexture.wrapS = THREE.RepeatWrapping;
    panelTexture.wrapT = THREE.RepeatWrapping;

    panelTexture.repeat.set(1, 1);

    panelTexture.colorSpace = THREE.SRGBColorSpace;
  }

  const [width, height, depth] = size;

  const isFront = side === "front";
  const isSide = side === "left" || side === "right";

  /* =======================================================
     HANDRAIL POSITION
  ======================================================= */

  const handrailY = -height * 0.02;

  /* =======================================================
     DECORATIVE PANEL
  ======================================================= */

  const decorativeHeight = height * 0.1;

  /* =======================================================
     PANEL SPACING
  ======================================================= */

  const panelGap = width * 0.018;

  const panelWidth = (width - panelGap * (panelCount + 1)) / panelCount;

  /* =======================================================
     ROTATION
  ======================================================= */

  const rotation: [number, number, number] =
    side === "left"
      ? [0, Math.PI / 2, 0]
      : side === "right"
        ? [0, -Math.PI / 2, 0]
        : [0, 0, 0];

  /* =======================================================
     LOCAL DIMENSIONS
  ======================================================= */

  const localWidth = isSide ? size[2] : size[0];
  console.log(showSeams, showTrim, depth, decorativeHeight, panelWidth);
  return (
    <group position={position} rotation={rotation}>
      {/* =====================================================
          MAIN INNER PANEL
      ===================================================== */}

      <RoundedBox
        args={[localWidth, height, 0.055]}
        radius={0.018}
        smoothness={5}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={innerColor}
          map={panelTexture}
          roughness={0.34}
          metalness={0.04}
        />
      </RoundedBox>

      {/* =====================================================
          INNER PANEL LAYER
      ===================================================== */}

      <RoundedBox
        args={[localWidth * 0.96, height * 0.94, 0.012]}
        radius={0.012}
        smoothness={4}
        position={[0, 0, 0.034]}
        receiveShadow
      >
        <meshStandardMaterial
          color={innerColor}
          map={panelTexture}
          roughness={0.3}
          metalness={0.03}
        />
      </RoundedBox>

      {/* =====================================================
          HANDRAIL
      ===================================================== */}

      {showHandrail && (
        <group position={[0, handrailY, 0.085]}>
          {/* Main rail */}

          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.021, 0.021, localWidth * 0.64, 32]} />

            <OuterMaterial color={outerColor} />
          </mesh>

          {/* =================================================
              LEFT MOUNT
          ================================================= */}

          <group position={[-localWidth * 0.23, 0, -0.018]}>
            <RoundedBox
              args={[0.06, 0.075, 0.018]}
              radius={0.008}
              smoothness={4}
              castShadow
            >
              <OuterMaterial color={outerColor} />
            </RoundedBox>

            <RoundedBox
              args={[0.028, 0.06, 0.06]}
              radius={0.008}
              smoothness={4}
              position={[0, 0, 0.028]}
              castShadow
            >
              <OuterMaterial color={outerColor} />
            </RoundedBox>
          </group>

          {/* =================================================
              RIGHT MOUNT
          ================================================= */}

          <group position={[localWidth * 0.23, 0, -0.018]}>
            <RoundedBox
              args={[0.06, 0.075, 0.018]}
              radius={0.008}
              smoothness={4}
              castShadow
            >
              <OuterMaterial color={outerColor} />
            </RoundedBox>

            <RoundedBox
              args={[0.028, 0.06, 0.06]}
              radius={0.008}
              smoothness={4}
              position={[0, 0, 0.028]}
              castShadow
            >
              <OuterMaterial color={outerColor} />
            </RoundedBox>
          </group>

          {/* LEFT END CAP */}

          <mesh position={[-localWidth * 0.32, 0, 0]}>
            <sphereGeometry args={[0.021, 24, 24]} />

            <OuterMaterial color={outerColor} />
          </mesh>

          {/* RIGHT END CAP */}

          <mesh position={[localWidth * 0.32, 0, 0]}>
            <sphereGeometry args={[0.021, 24, 24]} />

            <OuterMaterial color={outerColor} />
          </mesh>
        </group>
      )}

      {/* =====================================================
          CONTROL PANEL
      ===================================================== */}

      {showControls && isFront && (
        <group position={[0, -height * 0.22, 0.085]}>
          {/* Control panel body */}

          <RoundedBox
            args={[localWidth * 0.42, height * 0.11, 0.04]}
            radius={0.015}
            smoothness={5}
            castShadow
          >
            <meshStandardMaterial
              color={outerColor}
              roughness={0.24}
              metalness={0.35}
            />
          </RoundedBox>

          {/* Display */}

          <RoundedBox
            args={[localWidth * 0.09, height * 0.045, 0.012]}
            radius={0.005}
            smoothness={3}
            position={[0, height * 0.015, 0.03]}
          >
            <meshStandardMaterial
              color="#242424"
              roughness={0.18}
              metalness={0.4}
            />
          </RoundedBox>

          {/* Buttons */}

          {[-0.12, -0.06, 0, 0.06, 0.12].map((x) => (
            <mesh
              key={x}
              position={[localWidth * x, -height * 0.015, 0.033]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.015, 0.015, 0.008, 24]} />

              <meshStandardMaterial
                color={outerColor}
                metalness={0.75}
                roughness={0.22}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* =====================================================
          SUBTLE REFLECTION STRIP
      ===================================================== */}

      {isSide && (
        <mesh position={[0, height * 0.28, 0.055]}>
          <boxGeometry args={[localWidth * 0.86, 0.006, 0.008]} />

          <meshStandardMaterial
            color={outerColor}
            roughness={0.25}
            metalness={0.6}
            transparent
            opacity={0.12}
          />
        </mesh>
      )}
    </group>
  );
};

export default CabinPanel;
