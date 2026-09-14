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
    description: "Compact and elegant for modern homes.",
    dimensions: "580 × 805 mm",
    capacity: "250 kg",
    floors: "4 floors",
  },
  {
    id: "grande",
    name: "GRANDE",
    description: "Versatile lift designed for everyday comfort.",
    dimensions: "880 × 805 mm",
    capacity: "320 kg",
    floors: "5 floors",
  },
  {
    id: "horizon",
    name: "HORIZON",
    description: "Spacious cabin with a panoramic experience.",
    dimensions: "1000 × 1000 mm",
    capacity: "400 kg",
    floors: "6 floors",
  },
];
interface ModelSelectionProps {
  value: string;
  onChange: (model: Model) => void;
}
const ModelSelection = ({ value, onChange }: ModelSelectionProps) => {
  return (
    <section className="w-full max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-medium tracking-tight text-[var(--color-text-primary)]">
          Choose a model
        </h2>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Select a model to start customizing your elevator.
        </p>
      </div>
      {/* Model List */}
      <div className="space-y-3">
        {models.map((model) => {
          const selected = value === model.id;
          return (
            <button
              key={model.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(model)}
              className={` group relative flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/40 ${selected ? ` border-[var(--color-primary)] bg-[var(--color-primary)]/[0.05] shadow-sm ` : ` border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)]/[0.02] `} `}
            >
              {/* Preview */}
              <div
                className={` flex h-20 w-16 shrink-0 items-center justify-center rounded-lg transition-colors ${selected ? "bg-[var(--color-primary)]/[0.10]" : "bg-[var(--color-bg)]"} `}
              >
                <ElevatorIcon selected={selected} />
              </div>
              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3
                    className={` text-base font-medium ${selected ? "text-[var(--color-primary)]" : "text-[var(--color-text-primary)]"} `}
                  >
                    {model.name}
                  </h3>
                  {selected && (
                    <span className=" flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)] text-white ">
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs leading-5 text-[var(--color-text-secondary)]">
                  {model.description}
                </p>
                {/* Specs */}
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[var(--color-text-secondary)]">
                  <span>{model.dimensions}</span>
                  <span className="h-3 w-px bg-[var(--color-border)]" />
                  <span>{model.capacity}</span>
                  <span className="h-3 w-px bg-[var(--color-border)]" />
                  <span>{model.floors}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
/* --------------------------------------------- ELEVATOR PREVIEW --------------------------------------------- */ interface ElevatorIconProps {
  selected: boolean;
}
const ElevatorIcon = ({ selected }: ElevatorIconProps) => {
  return (
    <div
      className={` relative h-14 w-9 transition-transform duration-200 group-hover:scale-[1.03] `}
    >
      {/* Cabin */}
      <div
        className={` absolute inset-0 rounded-[3px] border ${selected ? "border-[var(--color-primary)]" : "border-[var(--color-border)]"} `}
      />
      {/* Door */}
      <div
        className={` absolute bottom-1 left-1 right-1 top-1 rounded-[2px] border ${selected ? "border-[var(--color-primary)]/60" : "border-[var(--color-border)]/60"} `}
      />
      {/* Door Split */}
      <div
        className={` absolute bottom-1 left-1/2 top-1 w-px -translate-x-1/2 ${selected ? "bg-[var(--color-primary)]/50" : "bg-[var(--color-border)]/50"} `}
      />
    </div>
  );
};
export default ModelSelection;
