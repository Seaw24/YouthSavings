import React from "react";
import ProcessBar from "../../components/ProcessBar";
import { TypewriterEffect } from "../../components/ui/typewriter-effect";
import { TypewriterEffectSmooth } from "../../components/ui/typewriter-effect";
import Input from "./components/Input";
import { BackgroundGradient } from "../../components/ui/background-gradient";
type EmergencyProps = {
  fundamental: { value: number };
  niceToHave: { value: number };
  income: { value: number };
  totalSaving: { value: number };
};
const Emergency = ({
  fundamental,
  niceToHave,
  income,
  totalSaving,
}: EmergencyProps) => {
  const title = [
    {
      text: "Emergency",
    },
    {
      text: " Fund",
    },
  ];

  const desc = [
    {
      text: "try",
    },

    {
      text: "to",
    },

    {
      text: "unfuck",
    },
    {
      text: "your",
    },

    {
      text: "life",
    },
  ];

  return (
    <div className="flex flex-col h-[280vh] items-center">
      <div className=" flex justify-center items-center flex-col ~gap-4/6  w-full  h-[30%]">
        <TypewriterEffect
          words={title}
          className=" ~text-5xl/8xl font-extrabold text-center   "
          cursorClassName="opacity-0"
        />
        <TypewriterEffectSmooth
          words={desc}
          className="text-highlight ~mb-6/11 ~text-base/lg "
        />

        <div className="w-1/3">
          <ProcessBar funda={50} total={100} />
        </div>
      </div>

      <div className="h-screen flex flex-col justify-around items-center w-full">
        <BackgroundGradient>
          <video controls className="card ~w-64/96 aspect-video">
            <source src="path/to/your/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </BackgroundGradient>
      </div>

      <div className=" flex items-center  h-screen">
        <Input
          income={income}
          fundamental={fundamental}
          niceToHave={niceToHave}
          totalSaving={totalSaving}
        />
      </div>
    </div>
  );
};

export default Emergency;
