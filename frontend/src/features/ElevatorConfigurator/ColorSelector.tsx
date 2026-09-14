import { Check } from "lucide-react";

export interface ColorOption {
  name: string;
  value: string;
  code?: string;
}

interface ColorSelectorProps {
  options: ColorOption[];
  value: string;
  onChange: (value: string) => void;
}

const ColorSelector = ({ options, value, onChange }: ColorSelectorProps) => {
  const selectedColor = options.find((option) => option.value === value);

  return (
    <div>
      {/* Selected color */}
      {selectedColor && (
        <div className="mb-2 flex items-center justify-end gap-1">
          <span className="text-xs text-[var(--color-text-primary)]">
            {selectedColor.name}
          </span>

          {selectedColor.code && (
            <span className="text-[9px] text-[var(--color-text-secondary)]">
              {selectedColor.code}
            </span>
          )}
        </div>
      )}

      {/* Colors */}
      <div className="grid grid-cols-5 gap-2">
        {options.map((option) => {
          const selected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              title={`${option.name}${option.code ? ` · ${option.code}` : ""}`}
              aria-label={option.name}
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
              className={`
                relative
                aspect-square
                rounded-sm
                border
                transition-all
                duration-150
                focus:outline-none

                ${
                  selected
                    ? `
                      border-[var(--color-primary)]
                      ring-1
                      ring-[var(--color-primary)]
                    `
                    : `
                      border-[var(--color-border)]
                      hover:border-[var(--color-primary)]/60
                    `
                }
              `}
              style={{
                backgroundColor: option.value,
              }}
            >
              {selected && (
                <span
                  className="
                    absolute
                    right-1
                    top-1
                    flex
                    h-4
                    w-4
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--color-primary)]
                    text-white
                  "
                >
                  <Check size={10} strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
