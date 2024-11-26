import React from "react";
import { NavLink } from "react-router-dom";
import { GlobeDemo } from "../../components/ui/fsdfsfd";
import { Cover } from "../../components/ui/cover";
const HomePage = () => {
  return (
    <div className="flex justify-between  items-center flex-grow  mx-10 gap-10 ">
      {/* <Login /> */}

      <div className="flex flex-col items-center   w-2/3  -translate-y-6 gap-5 ">
        <div>
          <h1
            className="mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent 
                    bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700
                     dark:from-neutral-800 dark:via-white dark:to-white ~text-3xl/6xl font-extrabold whitespace-nowrap "
          >
            Achive financial freedom
            <br></br> <Cover> with Vision </Cover>
          </h1>

          <p className="text-center text-neutral-500 dark:text-neutral-400 ~text-base/xl ">
            Begin your journey to financial independence now. Each month of
            savings brings you closer to realizing your dreams, whether it's
            gaining job flexibility, launching your own business, or diving into
            personal passions!
          </p>
        </div>
        <div className="flex w-[56%] justify-around ">
          <NavLink
            to={"login"}
            className="bg-neutral-200 border-neutral-950 border   text-2xl py-4 px-8 rounded-xl  
                h-[clamp(1rem,5vw,3.2rem)] w-[clamp(2rem,20vw,11rem)] items-center text-[clamp(0.8rem,1.5vw,1.5rem)] flex  font-bold justify-center"
          >
            {" "}
            Play
          </NavLink>
          <NavLink
            to={"savings"}
            className="button text-2xl  rounded-xl  
                h-[clamp(1rem,5vw,3.2rem)] w-[clamp(2rem,20vw,11rem)]  text-[clamp(0.8rem,1.5vw,1.5rem)] font-bold text-shadow-lg  items-center flex  justify-center"
          >
            Play
          </NavLink>
        </div>
      </div>

      <div className=" w-[40%] flex justify-center items-center">
        <GlobeDemo />
      </div>
    </div>
  );
};

export default HomePage;
