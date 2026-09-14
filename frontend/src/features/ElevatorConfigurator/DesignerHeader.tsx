import React from "react";
import { Save } from "lucide-react";

interface DesignerHeaderProps {
  onSave?: () => void;
}

const DesignerHeader = ({ onSave }: DesignerHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 h-[72px] border-b border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="relative mx-auto flex h-full w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="hidden h-5 w-px bg-[var(--color-primary)] sm:block" />

          <div>
            <p
              className="
                text-[11px]
                font-medium
                tracking-[0.22em]
                text-[var(--color-primary)]
                sm:text-xs
              "
            >
              ELEVATOR STUDIO
            </p>
          </div>
        </div>

        {/* Center Title */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            text-center
          "
        >
          <h1
            className="
              text-base
              font-medium
              tracking-tight
              text-[var(--color-text-primary)]
              sm:text-lg
              md:text-xl
            "
          >
            Design Studio
          </h1>

          <p
            className="
              mt-0.5
              hidden
              text-[10px]
              text-[var(--color-text-secondary)]
              sm:block
              sm:text-xs
            "
          >
            Design your perfect home elevator
          </p>
        </div>

        {/* Save */}
        <button
          type="button"
          onClick={onSave}
          className="
            group
            flex
            items-center
            gap-2
            rounded-lg
            px-2
            py-2
            text-xs
            font-medium
            text-[var(--color-primary)]
            transition-all
            duration-200
            hover:bg-[var(--color-card)]
            hover:text-[var(--color-text-primary)]
            sm:px-3
          "
        >
          <Save
            size={16}
            strokeWidth={1.7}
            className="transition-transform duration-200 group-hover:scale-105"
          />

          <span className="hidden sm:inline">Save Design</span>
        </button>
      </div>
    </header>
  );
};

export default DesignerHeader;
