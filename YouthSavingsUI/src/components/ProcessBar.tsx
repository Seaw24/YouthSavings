import { plannedSaving } from "../App";
import { totalSaving } from "../App";
import { Signal } from "@preact/signals-react";
import { cn } from "../lib/utils";

type ProcessBarProps = {
  funda?: Signal<number>;
  nice?: Signal<number>;
  waste?: Signal<number>;
  total?: Signal<number>;
  className?: string;
  activeMode?: string;
  history?: boolean;
};

const ProcessBar = ({
  funda,
  nice,
  waste,
  total,
  activeMode = "All",
  history = false,
  className,
}: ProcessBarProps) => {
  const sizeAspect = {
    "16/1": "aspect-16/1",
    "28/1": "aspect-28/1",
  };

  let progressFunda = ((funda?.value ?? 0) / (total?.value ?? 1)) * 100;
  let progressNice = ((nice?.value ?? 0) / (total?.value ?? 1)) * 100;
  let progressWaste = ((waste?.value ?? 0) / (total?.value ?? 1)) * 100;
  let savingProgress = (totalSaving.value / plannedSaving.value) * 100;

  if (activeMode === "Fundamental") {
    progressNice = 0;
    progressWaste = 0;
  } else if (activeMode === "Nice to have") {
    progressFunda = 0;
    progressWaste = 0;
  } else if (activeMode === "Waste") {
    progressFunda = 0;
    progressNice = 0;
  }

  if (history) {
    return (
      <div className="w-full">
        <div
          className={cn(
            "last:w-full bg-gray-700 rounded-xl border border-highlight drop-shadow-[0_0_2px_hsl(46,84%,70%)] aspect-16/1 flex overflow-hidden",
            className
          )}
        >
          <div
            className="bg-golden-gradient  h-full "
            style={{ width: `${progressFunda}%` }}
          ></div>

          <div
            className=" bg-[hsl(244,52%,39%)] h-full "
            style={{ width: `${progressNice}%` }}
          ></div>

          <div
            className=" bg-red-600 h-full "
            style={{ width: `${progressWaste}%` }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className={cn(
          " flex overflow-hidden w-full bg-gray-700 rounded-xl border border-highlight-dark drop-shadow-[0_0_2px_hsl(46,84%,70%)] aspect-16/1",
          className
        )}
      >
        <div
          className="bg-golden-gradient  h-full "
          style={{ width: `${savingProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProcessBar;
