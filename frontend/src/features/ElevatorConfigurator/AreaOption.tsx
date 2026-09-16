interface AreaOptionProps {
  label: string;
  dimensions: string;
  active: boolean;
  onClick: () => void;
}

export const AreaOption = ({
  label,
  dimensions,
  active,
  onClick,
}: AreaOptionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        rounded-xl border p-3 text-left
        transition-all duration-200
        ${
          active
            ? "border-[var(--color-primary)] bg-[var(--color-primary)]/[0.05]"
            : "border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-primary)]/40"
        }
      `}
    >
      <div className="flex items-center justify-between">
        <span
          className={`
            text-xs font-medium
            ${
              active
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-text-primary)]"
            }
          `}
        >
          {label}
        </span>

        {active && (
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
        )}
      </div>

      <p className="mt-1 text-[10px] text-[var(--color-text-secondary)]">
        {dimensions}
      </p>
    </button>
  );
};