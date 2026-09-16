interface DimensionInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export const DimensionInput = ({
  label,
  value,
  onChange,
}: DimensionInputProps) => {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-[var(--color-text-primary)]">
        {label}
      </span>

      <div className="relative">
        <input
          type="number"
          min={100}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="
            h-11 w-full rounded-lg
            border border-[var(--color-border)]
            bg-[var(--color-card)]
            px-3 pr-12
            text-sm text-[var(--color-text-primary)]
            outline-none
            transition
            focus:border-[var(--color-primary)]
          "
        />

        <span
          className="
            absolute right-3 top-1/2
            -translate-y-1/2
            text-[10px]
            text-[var(--color-text-secondary)]
          "
        >
          mm
        </span>
      </div>
    </label>
  );
};