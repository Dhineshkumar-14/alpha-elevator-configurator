import React from "react";

export type DesignerStep =
  | "model"
  | "construction"
  | "interior"
  | "exterior"
  | "architect";

interface DesignerNavigationProps {
  activeStep: DesignerStep;
  onStepChange: (step: DesignerStep) => void;
}

const steps: {
  id: DesignerStep;
  label: string;
}[] = [
  {
    id: "model",
    label: "MODEL",
  },
  {
    id: "construction",
    label: "CONSTRUCTION",
  },
  {
    id: "interior",
    label: "INTERIOR",
  },
  {
    id: "exterior",
    label: "EXTERIOR",
  },
  {
    id: "architect",
    label: "ARCHITECT",
  },
];

const DesignerNavigation = ({
  activeStep,
  onStepChange,
}: DesignerNavigationProps) => {
  return (
    <nav className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto flex h-[56px] w-full max-w-[1800px]">
        {steps.map((step) => {
          const isActive = activeStep === step.id;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepChange(step.id)}
              className={`
                relative
                flex
                flex-1
                items-center
                justify-center
                px-3
                text-[11px]
                font-medium
                tracking-[0.18em]
                transition-all
                duration-200

                ${
                  isActive
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }
              `}
            >
              {step.label}

              {/* Active indicator */}
              <span
                className={`
                  absolute
                  bottom-0
                  left-1/2
                  h-[2px]
                  -translate-x-1/2
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "w-12 bg-[var(--color-primary)]"
                      : "w-0 bg-transparent"
                  }
                `}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default DesignerNavigation;
