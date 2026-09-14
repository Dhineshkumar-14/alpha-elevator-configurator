import React, { useState } from "react";
import { Check } from "lucide-react";

interface Model {
  id: string;
  name: string;
  description: string;
  dimensions: string;
  capacity: string;
  floors: string;
}

const models: Model[] = [
  {
    id: "aura",
    name: "AURA",
    description: "Elegant compact lift for intimate spaces",
    dimensions: "580 × 805 mm",
    capacity: "250 kg",
    floors: "Up to 4 floors",
  },
  {
    id: "grande",
    name: "GRANDE",
    description: "Versatile standard lift for modern homes",
    dimensions: "880 × 805 mm",
    capacity: "320 kg",
    floors: "Up to 5 floors",
  },
  {
    id: "horizon",
    name: "HORIZON",
    description: "Spacious premium lift with panoramic views",
    dimensions: "1000 × 1000 mm",
    capacity: "400 kg",
    floors: "Up to 6 floors",
  },
];

interface ModelSelectionProps {
  value?: string;
  onChange?: (model: Model) => void;
}

const ModelSelection = ({ value = "aura", onChange }: ModelSelectionProps) => {
  const [selectedModel, setSelectedModel] = useState(value);

  const handleSelect = (model: Model) => {
    setSelectedModel(model.id);
    onChange?.(model);
  };

  return (
    <section className="w-full max-w-2xl">
      {/* Heading */}
      <div className="mb-7">
        <h2
          className="
            text-2xl
            font-normal
            tracking-tight
            text-[var(--color-text-primary)]
            sm:text-3xl
          "
        >
          Choose Your Model
        </h2>

        <p
          className="
            mt-2
            text-sm
            text-[var(--color-text-secondary)]
          "
        >
          Select the elevator that defines your home.
        </p>
      </div>

      {/* Models */}
      <div className="space-y-3">
        {models.map((model) => {
          const isSelected = selectedModel === model.id;

          return (
            <button
              key={model.id}
              type="button"
              onClick={() => handleSelect(model)}
              className={`
                group
                relative
                w-full
                rounded-lg
                border
                p-5
                text-left
                transition-all
                duration-300
                sm:p-6

                ${
                  isSelected
                    ? `
                      border-[var(--color-primary)]
                      bg-[var(--color-primary)]/[0.06]
                    `
                    : `
                      border-[var(--color-border)]
                      bg-transparent
                      hover:border-[var(--color-primary)]/[0.45]
                      hover:bg-[var(--color-card)]
                    `
                }
              `}
            >
              {/* Selected check */}
              {isSelected && (
                <Check
                  size={19}
                  strokeWidth={1.5}
                  className="
                    absolute
                    right-4
                    top-5
                    text-[var(--color-primary)]
                  "
                />
              )}

              <div className="flex gap-4 sm:gap-5">
                {/* Elevator Icon / Preview */}
                <div
                  className={`
                    flex
                    h-[88px]
                    w-[66px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-md
                    transition-colors

                    ${
                      isSelected
                        ? "bg-[var(--color-primary)]/[0.12]"
                        : "bg-[var(--color-card)]"
                    }
                  `}
                >
                  <ElevatorIcon selected={isSelected} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  {/* Model name */}
                  <h3
                    className="
                      font-serif
                      text-xl
                      font-normal
                      tracking-tight
                      text-[var(--color-text-primary)]
                    "
                  >
                    {model.name}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      mt-1
                      max-w-md
                      text-sm
                      leading-5
                      text-[var(--color-text-secondary)]
                    "
                  >
                    {model.description}
                  </p>

                  {/* Specs */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span
                      className="
                        rounded
                        bg-[var(--color-primary)]/[0.12]
                        px-2
                        py-1
                        text-[11px]
                        font-medium
                        text-[var(--color-primary)]
                      "
                    >
                      {model.dimensions}
                    </span>

                    <span
                      className="
                        text-[11px]
                        text-[var(--color-text-secondary)]
                      "
                    >
                      {model.capacity}
                    </span>
                  </div>

                  {/* Floors */}
                  <p
                    className="
                      mt-3
                      text-[11px]
                      text-[var(--color-text-secondary)]
                    "
                  >
                    {model.floors}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

/* ---------------------------------------------
   ELEVATOR ICON
--------------------------------------------- */

interface ElevatorIconProps {
  selected: boolean;
}

const ElevatorIcon = ({ selected }: ElevatorIconProps) => {
  return (
    <div className="relative h-[62px] w-[40px]">
      {/* Outer */}
      <div
        className={`
          absolute
          inset-0
          rounded-[2px]
          border
          ${
            selected
              ? "border-[var(--color-primary)]"
              : "border-[var(--color-border)]"
          }
        `}
      />

      {/* Inner door */}
      <div
        className={`
          absolute
          bottom-[5px]
          left-[6px]
          right-[6px]
          top-[6px]
          rounded-[1px]
          border
          ${
            selected
              ? "border-[var(--color-primary)]/60"
              : "border-[var(--color-border)]/60"
          }
        `}
      />

      {/* Door split */}
      <div
        className={`
          absolute
          bottom-[6px]
          left-1/2
          top-[7px]
          w-px
          -translate-x-1/2
          ${
            selected
              ? "bg-[var(--color-primary)]/40"
              : "bg-[var(--color-border)]/40"
          }
        `}
      />

      {/* Handle */}
      <div
        className={`
          absolute
          left-[20px]
          top-1/2
          h-[3px]
          w-[10px]
          -translate-y-1/2
          rounded-full
          ${selected ? "bg-[var(--color-primary)]" : "bg-[var(--color-border)]"}
        `}
      />
    </div>
  );
};

export default ModelSelection;
