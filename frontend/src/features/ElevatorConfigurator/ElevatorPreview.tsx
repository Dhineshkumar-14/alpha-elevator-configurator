import ElevatorScene from "./ElevatorScene";

import type { ElevatorConfig } from "./elevatorConfig";

interface ElevatorPreviewProps {
  config: ElevatorConfig;
}

const ElevatorPreview = ({ config }: ElevatorPreviewProps) => {
  return (
    <div className="h-full min-h-[600px] pb-20 w-full overflow-hidden rounded-2xl">
      <ElevatorScene config={config} />
    </div>
  );
};

export default ElevatorPreview;
