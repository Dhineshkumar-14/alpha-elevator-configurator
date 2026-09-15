import { RoundedBox } from "@react-three/drei";

export type DoorSide = "front" | "back" | "left" | "right";

export type DoorType = "large-glass" | "double-door";

export type DoorPanelType = "glass" | "sheet";

export type GlassFinish = "clear" | "tinted";

interface DoorProps {
  side: DoorSide;

  position: [number, number, number];
  size: [number, number, number];

  type?: DoorType;
  panelType?: DoorPanelType;

  /**
   * Used for sheet doors / frame color
   */
  color?: string;

  /**
   * Door frame
   */
  frameColor?: string;

  /**
   * Glass tint
   */
  glassColor?: string;

  /**
   * clear / tinted
   */
  glassFinish?: GlassFinish;

  showHandles?: boolean;
  showGlassReflection?: boolean;
}

/* =========================================================
   METAL
========================================================= */

const MetalMaterial = ({ color = "#2F3033" }: { color?: string }) => (
  <meshStandardMaterial color={color} metalness={0.88} roughness={0.2} />
);

/* =========================================================
   GLASS
========================================================= */

const GlassMaterial = ({
  color,
  finish,
}: {
  color: string;
  finish: GlassFinish;
}) => {
  const isTinted = finish === "tinted";

  return (
    <meshPhysicalMaterial
      color={isTinted ? color : "#DCE8E8"}
      metalness={0.02}
      roughness={isTinted ? 0.12 : 0.06}
      transmission={0.45}
      thickness={0.025}
      ior={1.45}
      reflectivity={0.92}
      clearcoat={0.85}
      clearcoatRoughness={0.08}
      transparent
      opacity={isTinted ? 0.72 : 0.42}
    />
  );
};

/* =========================================================
   SHEET
========================================================= */

const SheetMaterial = ({ color }: { color: string }) => (
  <meshStandardMaterial color={color} metalness={0.38} roughness={0.27} />
);

/* =========================================================
   DOOR
========================================================= */

const Door = ({
  side,
  position,
  size,

  type = "large-glass",
  panelType = "glass",

  color = "#2F3033",
  frameColor = "#2F3033",

  glassColor = "#26343A",
  glassFinish = "tinted",

  showHandles = true,
  showGlassReflection = true,
}: DoorProps) => {
  const [width, height, depth] = size;

  /* =======================================================
     ORIENTATION
  ======================================================= */

  const rotation: [number, number, number] =
    side === "left"
      ? [0, -Math.PI / 2, 0]
      : side === "right"
        ? [0, Math.PI / 2, 0]
        : side === "back"
          ? [0, Math.PI, 0]
          : [0, 0, 0];

  /* =======================================================
     DIMENSIONS
  ======================================================= */

  const outerWidth = width * 0.94;

  const outerHeight = height * 0.96;

  const frameThickness = 0.045;

  const centerGap = 0.018;

  const panelWidth = (outerWidth - centerGap) / 2;

  const panelHeight = outerHeight - frameThickness * 2;

  const frameDepth = Math.max(depth * 0.8, 0.055);

  const glassDepth = Math.max(depth * 0.32, 0.018);

  /* =======================================================
     LARGE GLASS STYLE
  ======================================================= */

  const isLargeGlass = type === "large-glass";

  return (
    <group position={position} rotation={rotation}>
      {/* =================================================
          DOOR RECESS
      ================================================= */}

      <RoundedBox
        args={[outerWidth, outerHeight, frameDepth * 0.55]}
        radius={0.018}
        smoothness={5}
        receiveShadow
      >
        <meshStandardMaterial
          color="#101214"
          roughness={0.28}
          metalness={0.6}
        />
      </RoundedBox>

      {/* =================================================
          LEFT GLASS PANEL
      ================================================= */}

      <group position={[-(panelWidth + centerGap) / 2, 0, frameDepth * 0.52]}>
        <RoundedBox
          args={[panelWidth, panelHeight, glassDepth]}
          radius={0.012}
          smoothness={6}
          castShadow
          receiveShadow
        >
          {panelType === "glass" ? (
            <GlassMaterial color={glassColor} finish={glassFinish} />
          ) : (
            <SheetMaterial color={color} />
          )}
        </RoundedBox>

        {/* ---------------------------------------------
            INNER GLASS LAYER
        --------------------------------------------- */}

        {panelType === "glass" && (
          <RoundedBox
            args={[panelWidth * 0.94, panelHeight * 0.94, 0.006]}
            radius={0.009}
            smoothness={5}
            position={[0, 0, glassDepth * 0.65]}
          >
            <meshPhysicalMaterial
              color={glassColor}
              transparent
              opacity={glassFinish === "tinted" ? 0.12 : 0.06}
              roughness={0.05}
              transmission={0.35}
              metalness={0}
            />
          </RoundedBox>
        )}

        {/* ---------------------------------------------
            REALISTIC REFLECTION
        --------------------------------------------- */}

        {panelType === "glass" && showGlassReflection && (
          <>
            {/* Main vertical reflection */}

            <mesh position={[-panelWidth * 0.28, 0, glassDepth * 0.72]}>
              <planeGeometry args={[panelWidth * 0.045, panelHeight * 0.84]} />

              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.12} />
            </mesh>

            {/* Secondary reflection */}

            <mesh
              position={[
                panelWidth * 0.18,
                panelHeight * 0.12,
                glassDepth * 0.72,
              ]}
              rotation={[0, 0, -0.08]}
            >
              <planeGeometry args={[panelWidth * 0.018, panelHeight * 0.55]} />

              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.055} />
            </mesh>
          </>
        )}
      </group>

      {/* =================================================
          RIGHT GLASS PANEL
      ================================================= */}

      <group position={[(panelWidth + centerGap) / 2, 0, frameDepth * 0.52]}>
        <RoundedBox
          args={[panelWidth, panelHeight, glassDepth]}
          radius={0.012}
          smoothness={6}
          castShadow
          receiveShadow
        >
          {panelType === "glass" ? (
            <GlassMaterial color={glassColor} finish={glassFinish} />
          ) : (
            <SheetMaterial color={color} />
          )}
        </RoundedBox>

        {/* INNER GLASS */}

        {panelType === "glass" && (
          <RoundedBox
            args={[panelWidth * 0.94, panelHeight * 0.94, 0.006]}
            radius={0.009}
            smoothness={5}
            position={[0, 0, glassDepth * 0.65]}
          >
            <meshPhysicalMaterial
              color={glassColor}
              transparent
              opacity={glassFinish === "tinted" ? 0.12 : 0.06}
              roughness={0.05}
              transmission={0.35}
            />
          </RoundedBox>
        )}

        {/* REFLECTION */}

        {panelType === "glass" && showGlassReflection && (
          <>
            <mesh position={[panelWidth * 0.28, 0, glassDepth * 0.72]}>
              <planeGeometry args={[panelWidth * 0.045, panelHeight * 0.84]} />

              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.12} />
            </mesh>

            <mesh
              position={[
                -panelWidth * 0.18,
                panelHeight * 0.12,
                glassDepth * 0.72,
              ]}
              rotation={[0, 0, 0.08]}
            >
              <planeGeometry args={[panelWidth * 0.018, panelHeight * 0.55]} />

              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.055} />
            </mesh>
          </>
        )}
      </group>

      {/* =================================================
          CENTER MEETING STILE
      ================================================= */}

      <RoundedBox
        args={[isLargeGlass ? 0.022 : 0.032, outerHeight, frameDepth]}
        radius={0.006}
        smoothness={4}
        position={[0, 0, frameDepth * 0.68]}
        castShadow
      >
        <MetalMaterial color={frameColor} />
      </RoundedBox>

      {/* =================================================
          LEFT VERTICAL FRAME
      ================================================= */}

      <RoundedBox
        args={[0.045, outerHeight, frameDepth]}
        radius={0.007}
        smoothness={4}
        position={[-outerWidth / 2, 0, frameDepth * 0.68]}
        castShadow
      >
        <MetalMaterial color={frameColor} />
      </RoundedBox>

      {/* =================================================
          RIGHT VERTICAL FRAME
      ================================================= */}

      <RoundedBox
        args={[0.045, outerHeight, frameDepth]}
        radius={0.007}
        smoothness={4}
        position={[outerWidth / 2, 0, frameDepth * 0.68]}
        castShadow
      >
        <MetalMaterial color={frameColor} />
      </RoundedBox>

      {/* =================================================
          TOP HEADER
      ================================================= */}

      <RoundedBox
        args={[outerWidth + 0.07, 0.085, frameDepth]}
        radius={0.01}
        smoothness={5}
        position={[0, outerHeight / 2, frameDepth * 0.68]}
        castShadow
      >
        <MetalMaterial color={frameColor} />
      </RoundedBox>

      {/* =================================================
          TOP TRACK
      ================================================= */}

      <RoundedBox
        args={[outerWidth * 0.82, 0.022, 0.038]}
        radius={0.004}
        smoothness={3}
        position={[0, outerHeight / 2 - 0.052, frameDepth * 0.84]}
      >
        <meshStandardMaterial
          color="#080909"
          metalness={0.9}
          roughness={0.18}
        />
      </RoundedBox>

      {/* =================================================
          BOTTOM SILL
      ================================================= */}

      <RoundedBox
        args={[outerWidth + 0.07, 0.055, frameDepth + 0.018]}
        radius={0.007}
        smoothness={4}
        position={[0, -outerHeight / 2, frameDepth * 0.68]}
        castShadow
        receiveShadow
      >
        <MetalMaterial color={frameColor} />
      </RoundedBox>

      {/* =================================================
          HANDLE
      ================================================= */}

      {showHandles && (
        <>
          {/* LEFT HANDLE */}

          <group
            position={[centerGap * 2.2, -height * 0.03, frameDepth * 0.94]}
          >
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.011, 0.011, height * 0.105, 24]} />

              <MetalMaterial color={frameColor} />
            </mesh>

            <mesh
              position={[0, height * 0.052, -0.024]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.013, 0.013, 0.048, 24]} />

              <MetalMaterial color={frameColor} />
            </mesh>

            <mesh
              position={[0, -height * 0.052, -0.024]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.013, 0.013, 0.048, 24]} />

              <MetalMaterial color={frameColor} />
            </mesh>
          </group>

          {/* RIGHT HANDLE */}

          <group
            position={[-centerGap * 2.2, -height * 0.03, frameDepth * 0.94]}
          >
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.011, 0.011, height * 0.105, 24]} />

              <MetalMaterial color={frameColor} />
            </mesh>

            <mesh
              position={[0, height * 0.052, -0.024]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.013, 0.013, 0.048, 24]} />

              <MetalMaterial color={frameColor} />
            </mesh>

            <mesh
              position={[0, -height * 0.052, -0.024]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.013, 0.013, 0.048, 24]} />

              <MetalMaterial color={frameColor} />
            </mesh>
          </group>
        </>
      )}

      {/* =================================================
          GLASS HIGHLIGHT
      ================================================= */}

      {panelType === "glass" && showGlassReflection && (
        <mesh position={[0, outerHeight * 0.39, frameDepth * 0.95]}>
          <boxGeometry args={[outerWidth * 0.48, 0.008, 0.005]} />

          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={1.2}
            transparent
            opacity={0.22}
            toneMapped={false}
          />
        </mesh>
      )}
    </group>
  );
};

export default Door;
