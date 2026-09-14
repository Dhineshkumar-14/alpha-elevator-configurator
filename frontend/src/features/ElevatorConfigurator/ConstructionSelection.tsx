import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import type { ElevatorConfig, WallPanelType } from "./elevatorConfig";
import { DimensionInput } from "./DimensionInput";
import { WallOption } from "./WallOption";
import { AreaOption } from "./AreaOption";

interface ConstructionSelectionProps {
  config: ElevatorConfig;
  onChange: (config: ElevatorConfig) => void;
}

type ConstructionTab = "ceiling" | "walls";

const ConstructionSelection = ({
  config,
  onChange,
}: ConstructionSelectionProps) => {
  const { floors, dimensions } = config;

  const [activeTab, setActiveTab] = useState<ConstructionTab>("ceiling");

  const [selectedFloor, setSelectedFloor] = useState(0);

  const updateConfig = (updates: Partial<ElevatorConfig>) => {
    onChange({
      ...config,
      ...updates,
    });
  };

  const updateDimensions = (updates: Partial<ElevatorConfig["dimensions"]>) => {
    onChange({
      ...config,
      dimensions: {
        ...config.dimensions,
        ...updates,
      },
    });
  };

  const increaseFloors = () => {
    if (floors >= 6) return;

    const newFloorCount = floors + 1;

    const existingConfigurations = config.floorWallConfigurations ?? [];

    onChange({
      ...config,
      floors: newFloorCount,
      floorWallConfigurations: [
        ...existingConfigurations,
        {
          floor: floors,
          walls: {
            front: "glass",
            left: "glass",
            right: "glass",
          },
        },
      ],
    });
  };

  const decreaseFloors = () => {
    if (floors <= 1) return;

    onChange({
      ...config,
      floors: floors - 1,
      floorWallConfigurations: config.floorWallConfigurations.slice(
        0,
        floors - 1,
      ),
    });

    if (selectedFloor >= floors - 1) {
      setSelectedFloor(floors - 2);
    }
  };

  const selectedFloorConfig = config.floorWallConfigurations.find(
    (item) => item.floor === selectedFloor,
  );

  const updateWall = (
    wall: "front" | "left" | "right",
    value: WallPanelType,
  ) => {
    const updatedConfigurations = config.floorWallConfigurations.map(
      (floorConfig) =>
        floorConfig.floor === selectedFloor
          ? {
              ...floorConfig,
              walls: {
                ...floorConfig.walls,
                [wall]: value,
              },
            }
          : floorConfig,
    );

    onChange({
      ...config,
      floorWallConfigurations: updatedConfigurations,
    });
  };

  return (
    <section className="w-full max-w-2xl">
      {/* Header */}
      <div className="mb-7">
        <h2 className="text-2xl font-medium tracking-tight text-[var(--color-text-primary)]">
          Construction
        </h2>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Define the size and structural requirements for your elevator.
        </p>
      </div>

      <div className="space-y-6">
        {/* Floors */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-medium text-[var(--color-text-primary)]">
              Number of floors
            </h3>

            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
              Select the number of floors the elevator will serve.
            </p>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-4">
            <div>
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                {floors} {floors === 1 ? "Floor" : "Floors"}
              </p>

              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                Ground + {floors - 1} upper
                {floors - 1 === 1 ? " floor" : " floors"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={decreaseFloors}
                disabled={floors <= 1}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] transition hover:bg-[var(--color-bg)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Minus size={15} />
              </button>

              <span className="flex h-9 min-w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]/[0.08] px-3 text-sm font-medium text-[var(--color-primary)]">
                {floors}
              </span>

              <button
                type="button"
                onClick={increaseFloors}
                disabled={floors >= 6}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] transition hover:bg-[var(--color-bg)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Pick Floor */}
        <div>
          <p className="mb-2 text-xs font-medium text-[var(--color-text-primary)]">
            Pick floor
          </p>

          <div className="grid grid-cols-6 overflow-hidden rounded border border-[var(--color-border)]">
            {Array.from({ length: floors }, (_, index) => {
              const selected = selectedFloor === index;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedFloor(index)}
                  className={`
                    h-8 border-r border-b border-[var(--color-border)]
                    text-[11px] transition-colors
                    ${
                      selected
                        ? "bg-[var(--color-primary)] text-white"
                        : "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-card)]"
                    }
                  `}
                >
                  {index === 0 ? "Bottom" : index}
                </button>
              );
            })}
          </div>
        </div>

        {/* Construction Tabs */}
        <div>
          <div className="grid grid-cols-2 overflow-hidden rounded border border-[var(--color-border)]">
            <button
              type="button"
              onClick={() => setActiveTab("ceiling")}
              className={`
                h-9 text-[11px] transition-colors
                ${
                  activeTab === "ceiling"
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-[var(--color-text-primary)] hover:bg-[var(--color-card)]"
                }
              `}
            >
              Ceiling
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("walls")}
              className={`
                h-9 border-l border-[var(--color-border)] text-[11px] transition-colors
                ${
                  activeTab === "walls"
                    ? "bg-[var(--color-primary)] text-white"
                    : "text-[var(--color-text-primary)] hover:bg-[var(--color-card)]"
                }
              `}
            >
              Walls
            </button>
          </div>
        </div>

        {/* Ceiling */}
        {activeTab === "ceiling" && (
          <div className="space-y-5">
            <DimensionInput
              label="Ceiling height in mm"
              value={config.ceiling.height}
              onChange={(value) =>
                updateConfig({
                  ceiling: {
                    ...config.ceiling,
                    height: value,
                  },
                })
              }
            />

            <DimensionInput
              label="Ceiling thickness in mm"
              value={config.ceiling.thickness}
              onChange={(value) =>
                updateConfig({
                  ceiling: {
                    ...config.ceiling,
                    thickness: value,
                  },
                })
              }
            />

            <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4">
              <span className="text-xs text-[var(--color-text-secondary)]">
                Total travel height
              </span>

              <span className="text-xs font-medium text-[var(--color-text-primary)]">
                {config.ceiling.height + config.ceiling.thickness}
                mm
              </span>
            </div>
          </div>
        )}

        {/* Walls */}
        {activeTab === "walls" && selectedFloorConfig && (
          <div className="space-y-4">
            <WallOption
              label="Front"
              value={selectedFloorConfig.walls.front}
              onChange={(value) => updateWall("front", value)}
            />

            <WallOption
              label="Left"
              value={selectedFloorConfig.walls.left}
              onChange={(value) => updateWall("left", value)}
            />

            <WallOption
              label="Right"
              value={selectedFloorConfig.walls.right}
              onChange={(value) => updateWall("right", value)}
            />
          </div>
        )}

        {/* Area */}
        <div>
          <div className="mb-3">
            <h3 className="text-sm font-medium text-[var(--color-text-primary)]">
              Available area
            </h3>

            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
              Choose the available space for the elevator.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <AreaOption
              label="Compact"
              dimensions="800 × 1000 mm"
              active={dimensions.width === 800 && dimensions.depth === 1000}
              onClick={() =>
                updateDimensions({
                  width: 800,
                  depth: 1000,
                })
              }
            />

            <AreaOption
              label="Standard"
              dimensions="900 × 1040 mm"
              active={dimensions.width === 900 && dimensions.depth === 1040}
              onClick={() =>
                updateDimensions({
                  width: 900,
                  depth: 1040,
                })
              }
            />

            <AreaOption
              label="Spacious"
              dimensions="1000 × 1200 mm"
              active={dimensions.width === 1000 && dimensions.depth === 1200}
              onClick={() =>
                updateDimensions({
                  width: 1000,
                  depth: 1200,
                })
              }
            />
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[var(--color-text-secondary)]">
              Configuration
            </span>

            <span className="text-xs font-medium text-[var(--color-text-primary)]">
              {floors} {floors === 1 ? "floor" : "floors"}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-[var(--color-text-secondary)]">
              Cabin size
            </span>

            <span className="text-xs font-medium text-[var(--color-text-primary)]">
              {dimensions.width} × {dimensions.depth} mm
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionSelection;
