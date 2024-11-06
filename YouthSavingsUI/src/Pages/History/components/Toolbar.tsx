import ButtonHover from '../../../components/ButtonHover'
import React from 'react'

const modes = ["All", "Fundamental", "Nice to have", "Waste"]

type toolbarProps = { activeMode: { value: string } }
export default function Toolbar({activeMode}: toolbarProps) {
  return (
    

    <div className='border-b-2 border-golden w-2/3 flex justify-center relative '>
      
      <div className='flex ~gap-5/12  '>
        {modes.map((mode) => (
          <ButtonHover 
            key={mode}
            isActive={activeMode.value === mode}
            onClick={() => activeMode.value=  mode}
            className='~text-xs/xl'
          >
            {mode}
          </ButtonHover>
        ))}
      </div>
      <form className='w-1/5 grid place-items-center absolute bottom-0 translate-y-[calc(100%+0.8rem)] right-2 '>
          <input   type="text"
          placeholder="Search"
          className ='rounded-md  p-1 w-full bg-primary  '
          
        />
          </form> 

     

    </div>
  )
}