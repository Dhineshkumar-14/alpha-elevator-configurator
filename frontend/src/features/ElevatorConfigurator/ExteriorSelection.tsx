import { elevatorColors } from "../../config/elevatorColors";
import ColorSelector from "./ColorSelector";
import DoorPositions from "./DoorPositions";

import type {
  ElevatorConfig,
  GlassFinish,
  GlassWallType,
} from "./elevatorConfig";

interface ExteriorSelectionProps {
  config: ElevatorConfig;
  onChange: (config: ElevatorConfig) => void;
}

const ExteriorSelection = ({ config, onChange }: ExteriorSelectionProps) => {
  const glassWallOptions: {
    label: string;
    value: GlassWallType;
  }[] = [
    { label: "No", value: "none" },
    { label: "Standard", value: "standard" },
    { label: "High", value: "high" },
  ];

  const glassFinishOptions: {
    label: string;
    value: GlassFinish;
  }[] = [
    { label: "Clear", value: "clear" },
    { label: "Tinted", value: "tinted" },
  ];

  const doorTypeOptions = [
    {
      label: "Large glass",
      value: "large-glass" as const,
    },
    {
      label: "Double door",
      value: "double-door" as const,
    },
  ];

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto pr-2">
        <div className="space-y-5">
          {/* Glass Walls */}
          <div>
            <p className="mb-2 text-xs font-medium text-[var(--color-text-primary)]">
              Do you want the glass walls on the lift?
            </p>

            <div className="grid grid-cols-3 overflow-hidden rounded border border-[var(--color-border)]">
              {glassWallOptions.map((option) => {
                const selected = config.glassWalls === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      onChange({
                        ...config,
                        glassWalls: option.value,
                      })
                    }
                    className={`
                      h-8
                      border-r border-[var(--color-border)]
                      text-[11px]
                      last:border-r-0
                      transition-colors
                      ${
                        selected
                          ? "bg-[var(--color-primary)] text-white"
                          : "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-card)]"
                      }
                    `}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Glass Finish */}
          {config.glassWalls !== "none" && (
            <div>
              <p className="mb-2 text-xs font-medium text-[var(--color-text-primary)]">
                What glass finish do you prefer?
              </p>

              <div className="grid grid-cols-2 overflow-hidden rounded border border-[var(--color-border)]">
                {glassFinishOptions.map((option) => {
                  const selected = config.glassFinish === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        onChange({
                          ...config,
                          glassFinish: option.value,
                        })
                      }
                      className={`
                        h-8
                        border-r border-[var(--color-border)]
                        text-[11px]
                        last:border-r-0
                        transition-colors
                        ${
                          selected
                            ? "bg-[var(--color-primary)] text-white"
                            : "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-card)]"
                        }
                      `}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Wall Colour */}
          <div>
            <p className="mb-2 text-xs font-medium text-[var(--color-text-primary)]">
              Wall colour
            </p>

            <ColorSelector
              options={elevatorColors}
              value={config.wall.color}
              onChange={(color) =>
                onChange({
                  ...config,
                  wall: {
                    ...config.wall,
                    color,
                  },
                  door: config.door.sameAsWall
                    ? {
                        ...config.door,
                        color,
                      }
                    : config.door,
                })
              }
            />
          </div>

          {/* Door Type */}
          <div>
            <p className="mb-2 text-xs font-medium text-[var(--color-text-primary)]">
              What door type do you want?
            </p>

            <div className="grid grid-cols-2 overflow-hidden rounded border border-[var(--color-border)]">
              {doorTypeOptions.map((option) => {
                const selected = config.door.type === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      onChange({
                        ...config,
                        door: {
                          ...config.door,
                          type: option.value,
                        },
                      })
                    }
                    className={`
                      h-8
                      border-r border-[var(--color-border)]
                      text-[11px]
                      last:border-r-0
                      transition-colors
                      ${
                        selected
                          ? "bg-[var(--color-primary)] text-white"
                          : "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-card)]"
                      }
                    `}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Door Colour Same As Wall */}
          <div>
            <p className="mb-2 text-xs font-medium text-[var(--color-text-primary)]">
              Door colour same as walls
            </p>

            <div className="grid grid-cols-2 overflow-hidden rounded border border-[var(--color-border)]">
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...config,
                    door: {
                      ...config.door,
                      sameAsWall: true,
                      color: config.wall.color,
                    },
                  })
                }
                className={`
                  h-8
                  border-r border-[var(--color-border)]
                  text-[11px]
                  ${
                    config.door.sameAsWall
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-[var(--color-text-primary)] hover:bg-[var(--color-card)]"
                  }
                `}
              >
                Yes
              </button>

              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...config,
                    door: {
                      ...config.door,
                      sameAsWall: false,
                    },
                  })
                }
                className={`
                  h-8
                  text-[11px]
                  ${
                    !config.door.sameAsWall
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-[var(--color-text-primary)] hover:bg-[var(--color-card)]"
                  }
                `}
              >
                No
              </button>
            </div>
          </div>

          {/* Door Colour */}
          {!config.door.sameAsWall && (
            <div>
              <p className="mb-2 text-xs font-medium text-[var(--color-text-primary)]">
                Door colour
              </p>

              <ColorSelector
                options={elevatorColors}
                value={config.door.color}
                onChange={(color) =>
                  onChange({
                    ...config,
                    door: {
                      ...config.door,
                      color,
                      sameAsWall: false,
                    },
                  })
                }
              />
            </div>
          )}

          {/* Door Positions */}
          <DoorPositions config={config} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default ExteriorSelection;
