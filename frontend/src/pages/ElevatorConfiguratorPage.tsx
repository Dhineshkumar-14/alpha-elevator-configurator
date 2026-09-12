const ElevatorConfiguratorPage = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background text-text-primary">
      {/* Header */}
      <header className="h-[var(--token-header-height)] shrink-0 border-b border-border bg-background-primary">
        <div className="flex h-full items-center justify-between px-8">
          {/* Brand */}
          <div>
            <p className="font-display text-lg font-semibold tracking-wide">
              ALPHA ELEVATORS
            </p>

            <p className="mt-0.5 text-xs uppercase tracking-wider text-text-tertiary">
              Elevator Studio
            </p>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <button className="rounded-md border border-border px-4 py-2 text-sm text-text-secondary transition hover:border-border-light hover:text-text-primary">
              Save Design
            </button>

            <button className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-text-inverse transition hover:bg-primary-light">
              Request a Quote
            </button>

            <button className="px-3 py-2 text-sm text-text-tertiary transition hover:text-text-primary">
              Exit
            </button>
          </div>
        </div>
      </header>

      {/* Main Configurator */}
      <main className="relative flex min-h-0 flex-1">
        {/* Elevator Preview */}
        <section className="relative flex-1 bg-background-secondary">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs uppercase tracking-uppercase text-text-tertiary">
                Elevator Preview
              </p>

              <h1 className="mt-3 font-display text-4xl font-medium">
                Your Elevator
              </h1>

              <p className="mt-2 text-sm text-text-secondary">
                Preview will appear here
              </p>
            </div>
          </div>

          {/* Preview Controls */}
          <div className="absolute bottom-6 left-6 flex items-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition hover:bg-surface-hover hover:text-text-primary">
              −
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition hover:bg-surface-hover hover:text-text-primary">
              +
            </button>
          </div>
        </section>

        {/* Configuration Panel */}
        <aside className="w-[var(--token-panel-width)] shrink-0 border-l border-border bg-background-primary">
          <div className="flex h-full flex-col">
            {/* Panel Header */}
            <div className="border-b border-border p-6">
              <p className="text-xs uppercase tracking-uppercase text-primary">
                Configuration
              </p>

              <h2 className="mt-2 font-display text-2xl font-medium">
                Customize
              </h2>
            </div>

            {/* Configuration Navigation */}
            <nav className="flex gap-1 overflow-x-auto border-b border-border p-3">
              {[
                "Model",
                "Construction",
                "Interior",
                "Exterior",
                "Architect",
              ].map((item, index) => (
                <button
                  key={item}
                  className={`whitespace-nowrap rounded-md px-3 py-2 text-xs transition ${
                    index === 0
                      ? "bg-primary-soft text-primary"
                      : "text-text-tertiary hover:bg-surface hover:text-text-primary"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Configuration Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-text-tertiary">
                  Elevator Model
                </p>

                <h3 className="mt-2 text-lg font-medium">Select a Model</h3>

                <p className="mt-1 text-sm leading-normal text-text-secondary">
                  Choose an elevator model to begin customizing the design.
                </p>
              </div>

              {/* Temporary Model Cards */}
              <div className="mt-6 space-y-3">
                {["Aura", "Linea", "Vista"].map((model, index) => (
                  <button
                    key={model}
                    className={`w-full rounded-lg border p-4 text-left transition ${
                      index === 0
                        ? "border-primary bg-primary-soft"
                        : "border-border bg-surface hover:border-border-light hover:bg-surface-hover"
                    }`}
                  >
                    <p className="font-medium">{model}</p>

                    <p className="mt-1 text-xs text-text-tertiary">
                      Home Elevator
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Panel Footer */}
            <div className="border-t border-border p-4">
              <button className="h-12 w-full rounded-md bg-primary font-medium text-text-inverse transition hover:bg-primary-light">
                Continue Configuration
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* Bottom Summary Bar */}
      <footer className="flex h-[var(--token-bottom-bar-height)] shrink-0 items-center justify-between border-t border-border bg-background-primary px-8">
        <div className="flex items-center gap-8">
          <div>
            <p className="text-xs uppercase tracking-wider text-text-tertiary">
              Model
            </p>
            <p className="mt-1 text-sm">Aura</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-text-tertiary">
              Floors
            </p>
            <p className="mt-1 text-sm">2 Floors</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-text-tertiary">
              Interior
            </p>
            <p className="mt-1 text-sm">Classic</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-text-tertiary">
              Exterior
            </p>
            <p className="mt-1 text-sm">Glass</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-md border border-border px-5 py-2.5 text-sm text-text-secondary transition hover:border-border-light hover:text-text-primary">
            Export Preview
          </button>

          <button className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-text-inverse transition hover:bg-primary-light">
            Request Quote
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ElevatorConfiguratorPage;
