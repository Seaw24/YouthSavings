import React from 'react';
import { plannedSaving } from '../App';
import { totalSaving } from '../App';

type ProcessBarProps = {
  funda?: number;
  nice?: number;
  waste?: number;
  total?: number;
  size?: string;
  activeMode?: string;
  history?: boolean;
};

const ProcessBar = ({funda =0,nice =0,waste=0, total =100 ,size = '16/1', activeMode = 'All', history =false }: ProcessBarProps) => {

  const sizeAspect = {
    '16/1': 'aspect-16/1',
    '28/1': 'aspect-28/1',
  };
  
  let progressFunda = (funda / total) * 100;
  let progressNice = (nice / total) * 100;
  let progressWaste = (waste / total) * 100;
  let savingProgress = (totalSaving.value / plannedSaving.value) * 100;

  if(activeMode === 'Fundamental') {
    progressNice = 0;
    progressWaste = 0;
  }
  else if(activeMode === 'Nice to have') {
    progressFunda = 0;
    progressWaste = 0;
  }
  else if(activeMode === 'Waste') {
    progressFunda = 0;
    progressNice = 0;
  }


if(history) {
  return (
    <div className="w-full">
   
      <div className={`w-full bg-gray-700 rounded-xl border border-highlight drop-shadow-[0_0_2px_hsl(46,84%,70%)] ${sizeAspect[size]} 
      flex overflow-hidden`}>
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
};

return(
  <div className="w-full">
   
  <div className={`w-full bg-gray-700 rounded-xl border border-highlight-dark drop-shadow-[0_0_2px_hsl(46,84%,70%)] ${sizeAspect[size]} 
  flex overflow-hidden`}>
    <div 
      className="bg-golden-gradient  h-full " 
      style={{ width: `${savingProgress}%` }}
    ></div>


  </div>
</div>

)
};

export default ProcessBar;
