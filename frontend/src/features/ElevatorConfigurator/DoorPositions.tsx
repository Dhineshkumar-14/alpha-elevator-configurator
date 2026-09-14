import type { DoorPosition, ElevatorConfig } from "./elevatorConfig";

interface DoorPositionsProps {
  config: ElevatorConfig;
  onChange: (config: ElevatorConfig) => void;
}

const positions: {
  label: string;
  value: DoorPosition;
}[] = [
  {
    label: "Front",
    value: "front",
  },
  {
    label: "Right",
    value: "right",
  },
  {
    label: "Left",
    value: "left",
  },
];

const DoorPositions = ({ config, onChange }: DoorPositionsProps) => {
  const togglePosition = (floor: number, position: DoorPosition) => {
    const floorConfig = config.floorConfigurations.find(
      (item) => item.floor === floor,
    );

    const currentPositions = floorConfig?.doorPositions ?? [];

    const alreadySelected = currentPositions.includes(position);

    let newPositions: DoorPosition[];

    // Remove position
    if (alreadySelected) {
      newPositions = currentPositions.filter((item) => item !== position);

      // Don't allow zero doors
      if (newPositions.length === 0) {
        return;
      }
    }

    // Add position
    else {
      // Maximum 2
      if (currentPositions.length >= 2) {
        return;
      }

      newPositions = [...currentPositions, position];
    }

    onChange({
      ...config,
      floorConfigurations: config.floorConfigurations.map((item) =>
        item.floor === floor
          ? {
              ...item,
              doorPositions: newPositions,
            }
          : item,
      ),
    });
  };

  return (
    <div>
      {/* Heading */}
      <div className="mb-3">
        <p className="text-xs font-medium text-[var(--color-text-primary)]">
          Door positions on floor
        </p>

        <p className="mt-1 text-[10px] text-[var(--color-text-secondary)]">
          Select up to 2 entrances for each floor.
        </p>
      </div>

      {/* Floors */}
      <div className="space-y-2">
        {config.floorConfigurations.map((floorConfig) => {
          const selectedCount = floorConfig.doorPositions.length;

          return (
            <div
              key={floorConfig.floor}
              className="
                  rounded-lg
                  border
                  border-[var(--color-border)]
                  bg-[var(--color-card)]
                  p-3
                "
            >
              {/* Floor header */}
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--color-text-primary)]">
                  {floorConfig.floor === 0
                    ? "Ground"
                    : `Floor ${floorConfig.floor}`}
                </span>
              </div>

              {/* Positions */}
              <div className="grid grid-cols-3 gap-2">
                {positions.map((option) => {
                  const selected = floorConfig.doorPositions.includes(
                    option.value,
                  );

                  const disabled = !selected && selectedCount >= 2;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      disabled={disabled}
                      onClick={() =>
                        togglePosition(floorConfig.floor, option.value)
                      }
                      className={`
                          h-8
                          rounded
                          border
                          text-[10px]
                          transition-all

                          ${
                            selected
                              ? `
                                border-[var(--color-primary)]
                                bg-[var(--color-primary)]
                                text-white
                              `
                              : disabled
                                ? `
                                  cursor-not-allowed
                                  border-[var(--color-border)]
                                  text-[var(--color-text-secondary)]
                                  opacity-30
                                `
                                : `
                                  border-[var(--color-border)]
                                  text-[var(--color-text-primary)]
                                  hover:border-[var(--color-primary)]/60
                                  hover:bg-[var(--color-bg)]
                                `
                          }
                        `}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoorPositions;
