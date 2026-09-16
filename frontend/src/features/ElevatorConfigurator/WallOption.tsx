import type { WallPanelType } from "./elevatorConfig";

interface WallOptionProps {
  label: string;
  value: WallPanelType;
  onChange: (value: WallPanelType) => void;
}

export const WallOption = ({ label, value, onChange }: WallOptionProps) => {
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-[var(--color-text-primary)]">
        {label}
      </p>

      <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-[var(--color-border)]">
        <button
          type="button"
          onClick={() => onChange("glass")}
          className={`
            h-9 text-[11px] transition-colors
            ${
              value === "glass"
                ? "bg-[var(--color-primary)] text-white"
                : "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-card)]"
            }
          `}
        >
          Glass panels
        </button>

        <button
          type="button"
          onClick={() => onChange("sheet")}
          className={`
            h-9 border-l border-[var(--color-border)]
            text-[11px] transition-colors
            ${
              value === "sheet"
                ? "bg-[var(--color-primary)] text-white"
                : "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-card)]"
            }
          `}
        >
          Sheet panels
        </button>
      </div>
    </div>
  );
};
