import React, { useState } from "react";
import { Maximize2, Minus, Plus } from "lucide-react";

type ViewMode = "interior" | "exterior";

interface ElevatorPreviewProps {
  model?: "AURA" | "GRANDE" | "HORIZON";
}

const ElevatorPreview = ({ model = "AURA" }: ElevatorPreviewProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>("interior");
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 1.3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.8));
  };

  return (
    <section className="relative flex h-full min-h-[650px] w-full items-center justify-center overflow-hidden bg-[var(--color-bg)]">
      {/* ========================================
          BACKGROUND
      ======================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(
                var(--color-text-primary) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                var(--color-text-primary) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "45px 45px",
          }}
        />

        {/* soft center glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)]/[0.04] blur-[100px]" />
      </div>

      {/* ========================================
          TOP LABEL
      ======================================== */}

      <div className="absolute left-1/2 top-7 z-20 -translate-x-1/2 text-center">
        <p className="text-[9px] tracking-[0.35em] text-[var(--color-text-secondary)]">
          {viewMode === "interior" ? "INTERIOR VIEW" : "EXTERIOR VIEW"}
        </p>

        <h2 className="mt-1 font-serif text-lg tracking-wide text-[var(--color-primary)]">
          {model}
        </h2>
      </div>

      {/* ========================================
          ELEVATOR
      ======================================== */}

      <div
        className="relative z-10 transition-transform duration-300 ease-out"
        style={{
          transform: `scale(${zoom})`,
        }}
      >
        <Elevator model={model} viewMode={viewMode} />
      </div>

      {/* ========================================
          ZOOM CONTROLS
      ======================================== */}

      <div className="absolute bottom-24 right-5 z-30 flex flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] shadow-xl">
        <button
          type="button"
          onClick={handleZoomIn}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            border-b
            border-[var(--color-border)]
            text-[var(--color-text-secondary)]
            transition
            hover:bg-[var(--color-bg)]
            hover:text-[var(--color-primary)]
          "
        >
          <Plus size={15} strokeWidth={1.5} />
        </button>

        <button
          type="button"
          onClick={handleZoomOut}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            border-b
            border-[var(--color-border)]
            text-[var(--color-text-secondary)]
            transition
            hover:bg-[var(--color-bg)]
            hover:text-[var(--color-primary)]
          "
        >
          <Minus size={15} strokeWidth={1.5} />
        </button>

        <button
          type="button"
          onClick={() => setZoom(1)}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            text-[var(--color-text-secondary)]
            transition
            hover:bg-[var(--color-bg)]
            hover:text-[var(--color-primary)]
          "
        >
          <Maximize2 size={14} strokeWidth={1.5} />
        </button>
      </div>

      {/* ========================================
          INTERIOR / EXTERIOR SWITCH
      ======================================== */}

      <div className="absolute bottom-7 left-1/2 z-30 -translate-x-1/2">
        <div className="flex rounded-full border border-[var(--color-border)] bg-[var(--color-card)] p-1 shadow-xl">
          <button
            type="button"
            onClick={() => setViewMode("interior")}
            className={`
              rounded-full
              px-6
              py-2.5
              text-[10px]
              font-medium
              tracking-[0.16em]
              transition-all
              ${
                viewMode === "interior"
                  ? "bg-[var(--color-primary)] text-[var(--color-bg)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }
            `}
          >
            INTERIOR
          </button>

          <button
            type="button"
            onClick={() => setViewMode("exterior")}
            className={`
              rounded-full
              px-6
              py-2.5
              text-[10px]
              font-medium
              tracking-[0.16em]
              transition-all
              ${
                viewMode === "exterior"
                  ? "bg-[var(--color-primary)] text-[var(--color-bg)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }
            `}
          >
            EXTERIOR
          </button>
        </div>
      </div>

      {/* ========================================
          BOTTOM DESCRIPTION
      ======================================== */}

      <p className="absolute bottom-1 left-1/2 hidden -translate-x-1/2 translate-y-full text-[10px] text-[var(--color-text-secondary)] sm:block">
        Customize your elevator design
      </p>
    </section>
  );
};

/* =====================================================
   ELEVATOR
===================================================== */

interface ElevatorProps {
  model: "AURA" | "GRANDE" | "HORIZON";
  viewMode: ViewMode;
}

const Elevator = ({ model, viewMode }: ElevatorProps) => {
  const width =
    model === "AURA"
      ? "w-[260px]"
      : model === "GRANDE"
        ? "w-[290px]"
        : "w-[320px]";

  return (
    <div className={`relative ${width} transition-all duration-500`}>
      {/* ==========================================
          FLOOR SHADOW
      ========================================== */}

      <div className="absolute -bottom-8 left-1/2 h-8 w-[120%] -translate-x-1/2 rounded-full bg-black/40 blur-xl" />

      {/* ==========================================
          OUTER ELEVATOR FRAME
      ========================================== */}

      <div className="relative rounded-[3px] border-[8px] border-[#ad8b55] bg-[#211e1a] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
        {/* Gold inner border */}
        <div className="rounded-[2px] border border-[#665437] p-2">
          {/* ======================================
              ELEVATOR INTERIOR
          ====================================== */}

          {viewMode === "interior" ? <InteriorView /> : <ExteriorView />}
        </div>
      </div>

      {/* model label */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2">
        <span className="text-[8px] tracking-[0.45em] text-[var(--color-primary)]">
          {model}
        </span>
      </div>
    </div>
  );
};

/* =====================================================
   INTERIOR VIEW
===================================================== */

const InteriorView = () => {
  return (
    <div className="relative h-[470px] overflow-hidden bg-[#e8e1d4]">
      {/* ceiling */}
      <div className="absolute left-4 right-4 top-4 h-[70px] bg-gradient-to-b from-[#fff8e9] to-[#e8d5a6]" />

      {/* warm LED */}
      <div className="absolute left-10 right-10 top-8 h-[3px] rounded-full bg-[#f2cc7c] shadow-[0_0_18px_#f2cc7c]" />

      {/* back wall */}
      <div className="absolute bottom-[65px] left-[35px] right-[35px] top-[75px] bg-gradient-to-b from-[#fff8e8] to-[#ddd8cf]" />

      {/* left wall */}
      <div className="absolute bottom-[65px] left-0 top-[75px] w-[35px] bg-gradient-to-r from-[#c5beb3] to-[#ece7de]" />

      {/* right wall */}
      <div className="absolute bottom-[65px] right-0 top-[75px] w-[35px] bg-gradient-to-l from-[#bdb6ac] to-[#e6e1d8]" />

      {/* mirror */}
      <div className="absolute bottom-[120px] left-[55px] right-[55px] top-[105px] border border-white/60 bg-gradient-to-br from-white/40 via-white/10 to-black/10">
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent" />
      </div>

      {/* control panel */}
      <div className="absolute right-[20px] top-[170px] flex w-[27px] flex-col items-center gap-2 rounded-md bg-[#292724] py-3">
        <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#c4a568] text-[6px] text-[#c4a568]">
          3
        </span>

        <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#c4a568] text-[6px] text-[#c4a568]">
          2
        </span>

        <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#c4a568] text-[6px] text-[#c4a568]">
          1
        </span>
      </div>

      {/* hand rail */}
      <div className="absolute bottom-[115px] left-[55px] right-[55px] h-[4px] rounded-full bg-[#777168]" />

      {/* floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[65px] bg-gradient-to-t from-[#9d9991] to-[#e5e1d8]">
        {/* marble lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/3 top-0 h-full w-px bg-black" />
          <div className="absolute left-2/3 top-0 h-full w-px bg-black" />
        </div>
      </div>
    </div>
  );
};

/* =====================================================
   EXTERIOR VIEW
===================================================== */

const ExteriorView = () => {
  return (
    <div className="relative h-[470px] overflow-hidden bg-gradient-to-b from-[#68645e] to-[#242321]">
      {/* elevator door */}
      <div className="absolute bottom-0 left-[35px] right-[35px] top-[45px] border border-[#b89b67] bg-gradient-to-r from-[#393735] via-[#11110f] to-[#393735]">
        {/* door split */}
        <div className="absolute bottom-0 left-1/2 top-0 w-px bg-[#8c7650]" />

        {/* reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30" />
      </div>

      {/* top light */}
      <div className="absolute left-[60px] right-[60px] top-[28px] h-[3px] bg-[#d3b676] shadow-[0_0_15px_#d3b676]" />

      {/* side frame */}
      <div className="absolute bottom-0 left-0 top-0 w-[35px] bg-gradient-to-r from-[#34322f] to-[#858078]" />

      <div className="absolute bottom-0 right-0 top-0 w-[35px] bg-gradient-to-l from-[#34322f] to-[#858078]" />
    </div>
  );
};

export default ElevatorPreview;
