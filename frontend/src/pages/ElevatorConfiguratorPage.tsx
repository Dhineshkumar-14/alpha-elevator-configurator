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
import ConstructionSelection from "../features/ElevatorConfigurator/ConstructionSelection";
import InteriorSelection from "../features/ElevatorConfigurator/InteriorSelection";
import ExteriorSelection from "../features/ElevatorConfigurator/ExteriorSelection";

const ElevatorConfiguratorPage = () => {
  const [activeStep, setActiveStep] = useState<DesignerStep>("model");

  const [config, setConfig] = useState<ElevatorConfig>(defaultElevatorConfig);
  const [selectedModel, setSelectedModel] = useState("aura");
  return (
    <div className="min-h-screen bg-black text-white">
      <DesignerNavigation
        activeStep={activeStep}
        onStepChange={setActiveStep}
      />

      <div className="grid min-h-[calc(100vh-80px)] grid-cols-1 lg:grid-cols-[420px_1fr]">
        {/* Configuration Panel */}
        <div className="min-h-0 border-r border-white/10 p-6">
          {activeStep === "model" && (
            <ModelSelection
              value={selectedModel}
              onChange={(model) => {
                setSelectedModel(model.id);
                console.log("Selected model:", model);
              }}
            />
          )}

          {activeStep === "construction" && (
            <ConstructionSelection config={config} onChange={setConfig} />
          )}

          {activeStep === "interior" && (
            <InteriorSelection config={config} onChange={setConfig} />
          )}

          {activeStep === "exterior" && (
            <div className="h-[calc(100vh-80px)] min-h-0 overflow-hidden">
              <ExteriorSelection config={config} onChange={setConfig} />
            </div>
          )}
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
