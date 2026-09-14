import { useState } from "react";

import DesignerNavigation, {
  type DesignerStep,
} from "../features/ElevatorConfigurator/DesignerNavigation";

import ModelSelection from "../features/ElevatorConfigurator/ModelSelection";
import ElevatorPreview from "../features/ElevatorConfigurator/ElevatorPreview";

import {
  defaultElevatorConfig,
  type ElevatorConfig,
} from "../features/ElevatorConfigurator/elevatorConfig";

const ElevatorConfiguratorPage = () => {
  const [activeStep, setActiveStep] = useState<DesignerStep>("model");

  const [config, setConfig] = useState<ElevatorConfig>(defaultElevatorConfig);

  return (
    <div className="min-h-screen bg-black text-white">
      <DesignerNavigation
        activeStep={activeStep}
        onStepChange={setActiveStep}
      />

      <div className="grid min-h-[calc(100vh-80px)] grid-cols-1 lg:grid-cols-[420px_1fr]">
        {/* Configuration Panel */}
        <div className="border-r border-white/10 p-6">
          {activeStep === "model" && <ModelSelection />}

          {/* More configuration steps will come here */}
        </div>

        {/* 3D Preview */}
        <div className="min-h-[600px]">
          <ElevatorPreview config={config} />
        </div>
      </div>
    </div>
  );
};

export default ElevatorConfiguratorPage;
