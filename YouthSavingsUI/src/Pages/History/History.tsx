import React, { useRef, useEffect, useState } from 'react'
import ProcessBar from '../../components/ProcessBar'
import Toolbar from './components/Toolbar'
import Button from '../../components/Button'
import Transaction from './components/Transaction'
import { FcNext, FcPrevious } from 'react-icons/fc'
import { signal } from '@preact/signals-react'

type historyProps = { 
  fundamentalSpending: { value: number },
  niceToHaveSpending: { value: number },
  totalCost: { value: number },
  fundamental: { value: number },
  niceToHave: { value: number },
  totalSpending: { value: number },
  wasteSpending: { value: number }
}

const activeMode = signal('All')
const History = ( {fundamentalSpending, niceToHaveSpending, totalCost,fundamental, niceToHave,
totalSpending, wasteSpending
 } : historyProps) => {

  
  const gridRef = useRef<HTMLDivElement >(null);
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect()
        setIsSticky(rect.top <= 0 && rect.bottom > window.innerHeight)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

 let total = 0
 let current = 0
 if(activeMode.value === 'All') {
    total = totalCost.value
    current = totalSpending.value
  } else if(activeMode.value === 'Fundamental') {
    total = fundamental.value
    current = fundamentalSpending.value

  }
  else if(activeMode.value === 'Nice to have') {
    total = niceToHave.value
    current = niceToHaveSpending.value
  }

  



  return (
    
<div className='flex flex-col items-center mt-[4.25rem] flex-grow justify-around'>
      

      <Toolbar activeMode ={activeMode} />

      <div className='flex-col w-2/3 ~my-8/12 border-golden-light'>
      
        <div className='text-gray-200 font-bold text-shadow-lg text-center ~m-2/5 flex items-center justify-center  ~text-xl/3xl'>
          {current}
          
         <span className='font-bold text-highlight'> /{total} </span>
        </div>
      
        <ProcessBar    
          size="28/1"
          funda={fundamentalSpending.value}
          nice={niceToHaveSpending.value}
          total={total}
          activeMode={activeMode.value}
          history={true} />    
          </div>






  <div className=' relative w-full grid place-items-center'> 
      <Button 
          action={() => {/* Handle next */}} 
          size='~size-6/12' 
          className={`${
            isSticky 
              ? 'fixed right-[4%] top-1/2 transform -translate-y-1/2' 
              : 'absolute right-[4%] top-[7%] '
          } transition-all duration-1000 ease-in-out`}
        >
          <FcNext />
      </Button>


      <Button 
          action={() => {/* Handle previous */}} 
          size='~size-6/12' 
          className={`${
            isSticky 
              ? 'fixed left-[4%] top-1/2 transform -translate-y-1/2' 
              : 'absolute left-[4%]  top-[7%]'
          } transition-all duration-1000 ease-in-out `}
        >
          <FcPrevious />
      </Button>



      <div className='relative w-5/6 ~my-0/16' ref={gridRef}>
       <Transaction history={true}/>
      </div>



  </div>
</div>
  )
}

export default History