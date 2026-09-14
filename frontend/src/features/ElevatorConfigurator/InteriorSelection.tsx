import { ChevronUp } from "lucide-react";
import type { ElevatorConfig } from "./elevatorConfig";
import agedOak from "../../assets/elevator/flooring/aged_oak.webp";
import alphaFlowStreamSilver from "../../assets/elevator/flooring/alpha_flow_stream_silver.webp";
import alphaGraphicGradient from "../../assets/elevator/flooring/alpha_graphic_gradient.webp";
import alphaSisalPlainSand from "../../assets/elevator/flooring/alpha_sisal_plain_sand.webp";
import darkGreyVinyl from "../../assets/elevator/flooring/dark_grey_vinyl.webp";
import europeanOak from "../../assets/elevator/flooring/european_oak.webp";
import lightGreyVinyl from "../../assets/elevator/flooring/light_grey_vinyl.webp";
import oiledOak from "../../assets/elevator/flooring/oiled_oak.webp";
import diagonal from "../../assets/elevator/walls/diagonal.webp";
import evelinaBlue from "../../assets/elevator/walls/evelina_blue.webp";
import evelinaClassic from "../../assets/elevator/walls/evelina_classic.webp";
import evelinaPink from "../../assets/elevator/walls/evelina_pink.webp";
import keywest from "../../assets/elevator/walls/keywest.webp";
import orange from "../../assets/elevator/walls/orange.webp";
import orientalic from "../../assets/elevator/walls/orientalic.webp";
import pink from "../../assets/elevator/walls/pink.webp";
import sheet from "../../assets/elevator/walls/sheet.webp";
import structure from "../../assets/elevator/walls/structure.webp";
import white from "../../assets/elevator/walls/white.webp";
import skyline from "../../assets/elevator/walls/skyline.webp";

interface InteriorSelectionProps {
  config: ElevatorConfig;
  onChange: (config: ElevatorConfig) => void;
}

export const flooringOptions = [
  {
    id: "aged-oak",
    name: "Aged Oak",
    image: agedOak,
  },
  {
    id: "alpha-flow-stream-silver",
    name: "Alpha Flow Stream Silver",
    image: alphaFlowStreamSilver,
  },
  {
    id: "alpha-graphic-gradient",
    name: "Alpha Graphic Gradient",
    image: alphaGraphicGradient,
  },
  {
    id: "alpha-sisal-plain-sand",
    name: "Alpha Sisal Plain Sand",
    image: alphaSisalPlainSand,
  },
  {
    id: "dark-grey-vinyl",
    name: "Dark Grey Vinyl",
    image: darkGreyVinyl,
  },
  {
    id: "european-oak",
    name: "European Oak",
    image: europeanOak,
  },
  {
    id: "light-grey-vinyl",
    name: "Light Grey Vinyl",
    image: lightGreyVinyl,
  },
  {
    id: "oiled-oak",
    name: "Oiled Oak",
    image: oiledOak,
  },
];

const wallOptions = [
  {
    id: "diagonal",
    name: "Diagonal",
    image: diagonal,
    type: "full-design" as const,
  },
  {
    id: "evelina-blue",
    name: "Evelina Blue",
    image: evelinaBlue,
    type: "full-design" as const,
  },
  {
    id: "evelina-classic",
    name: "Evelina Classic",
    image: evelinaClassic,
    type: "full-design" as const,
  },
  {
    id: "evelina-pink",
    name: "Evelina Pink",
    image: evelinaPink,
    type: "full-design" as const,
  },
  {
    id: "keywest",
    name: "Keywest",
    image: keywest,
    type: "full-design" as const,
  },
  {
    id: "orange",
    name: "Orange",
    image: orange,
    type: "full-design" as const,
  },
  {
    id: "orientalic",
    name: "Orientalic",
    image: orientalic,
    type: "full-design" as const,
  },
  {
    id: "pink",
    name: "Pink",
    image: pink,
    type: "full-design" as const,
  },
  {
    id: "sheet",
    name: "Sheet",
    image: sheet,
    type: "full-design" as const,
  },
  {
    id: "structure",
    name: "Structure",
    image: structure,
    type: "full-design" as const,
  },
  {
    id: "white",
    name: "White",
    image: white,
    type: "full-design" as const,
  },
  {
    id: "skyline",
    name: "Skyline",
    image: skyline,
    type: "full-design" as const,
  },
];

const InteriorSelection = ({ config, onChange }: InteriorSelectionProps) => {
  const selectedFlooring = flooringOptions.find(
    (item) => item.id === config.flooring.value,
  );

  const selectedWall = wallOptions.find(
    (item) => item.id === config.wall.design,
  );

  const handleFlooringChange = (id: string) => {
    onChange({
      ...config,
      flooring: {
        type: "theme",
        value: id,
      },
    });
  };
  const handleWallChange = (
    id: string,
    type: "full-design" | "half-mirror" | "half",
  ) => {
    onChange({
      ...config,
      wall: {
        ...config.wall,
        type,
        design: id,
      },
    });
  };

  return (
    <section className="w-full">
      <div className="px-1 py-6">
        {/* =========================
            FLOORING
        ========================= */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-[var(--color-text-primary)]">
              Lift flooring
            </h3>

            <span className="text-sm text-[var(--color-text-primary)]">
              {selectedFlooring?.name ?? "Select flooring"}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {flooringOptions.map((item) => {
              const selected = config.flooring.value === item.id;

              return (
                <MaterialCard
                  key={item.id}
                  image={item.image}
                  selected={selected}
                  label={item.name}
                  onClick={() => handleFlooringChange(item.id)}
                />
              );
            })}
          </div>
        </div>

        {/* =========================
            WALL
        ========================= */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-[var(--color-text-primary)]">
              Design Wall
            </h3>

            <span className="text-sm text-[var(--color-text-primary)]">
              {selectedWall?.name ?? "Select wall"}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {wallOptions.map((item) => {
              const selected = config.wall.design === item.id;

              return (
                <MaterialCard
                  key={item.id}
                  image={item.image}
                  selected={selected}
                  label={item.name}
                  onClick={() => handleWallChange(item.id, item.type)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------
   MATERIAL CARD
--------------------------------------------- */

interface MaterialCardProps {
  image?: string;
  color?: string;
  label: string;
  selected: boolean;
  onClick: () => void;
}

const MaterialCard = ({
  image,
  color,
  label,
  selected,
  onClick,
}: MaterialCardProps) => {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className={`
        relative aspect-square overflow-hidden
        rounded-sm border-2
        transition-all duration-150
        focus:outline-none

        ${
          selected
            ? "border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]"
            : "border-transparent hover:border-[var(--color-primary)]/50"
        }
      `}
    >
      {image ? (
        <img src={image} alt={label} className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full" style={{ backgroundColor: color }} />
      )}

      {/* Selected indicator */}
      {selected && (
        <div className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6L4.5 8.5L10 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </button>
  );
};

export default InteriorSelection;
