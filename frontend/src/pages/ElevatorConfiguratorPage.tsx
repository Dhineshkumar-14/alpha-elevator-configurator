import { useState } from "react";

import DesignerHeader from "../features/ElevatorConfigurator/DesignerHeader";
import DesignerNavigation, {
  type DesignerStep,
} from "../features/ElevatorConfigurator/DesignerNavigation";

import ModelSelection from "../features/ElevatorConfigurator/ModelSelection";
import ElevatorPreview from "../features/ElevatorConfigurator/ElevatorPreview";

const ElevatorConfiguratorPage = () => {
  const [activeStep, setActiveStep] = useState<DesignerStep>("model");

  const handleModelChange = (model: any) => {
    console.log("Selected model:", model);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <main className="px-5">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* LEFT - Elevator Preview */}
          <div className="min-h-[650px]">
            <ElevatorPreview model="AURA" />
          </div>

          {/* RIGHT - Existing Model Selection */}
          <div className="flex flex-col items-start">
            <DesignerNavigation
              activeStep={activeStep}
              onStepChange={setActiveStep}
            />
            {activeStep === "model" && (
              <ModelSelection onChange={handleModelChange} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ElevatorConfiguratorPage;
