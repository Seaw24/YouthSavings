import React from 'react'
import ProcessBar from '../../components/ProcessBar'
import Transaction from '../History/components/Transaction'
import { Calendar, PlusCircleIcon, MinusCircleIcon, X } from 'lucide-react'
import { BackgroundGradient } from '../../components/ui/background-gradient'
import { signal } from '@preact/signals-react'
import Button from '../../components/Button'



const addIncome = signal(false)
const addExpense = signal(false)

type HomePageLoginProps = {
    totalSaving?: number,
    plannedSaving?: number
}

const HomePageLogin = ({totalSaving=100, plannedSaving =3600} : HomePageLoginProps) => {

    const handleAddIncome = () => {
        addIncome.value = !addIncome.value
    }

    const handleAddExpense = () => {
        addExpense.value = !addExpense.value
    }


  return (
    < div className='flex flex-col justify-center items-center flex-grow gap-9' >
        <div className='w-2/3  items-center justify-center text-center flex flex-col' >
        <div className='text-gray-200 font-bold text-shadow-lg text-center ~m-2/5 flex items-center justify-center  ~text-xl/3xl'>
          {totalSaving}
          
         <span className='font-bold text-highlight'> /{plannedSaving} </span>
        </div>
      <ProcessBar size='16/1'/>


        


      <div className='flex mt-7 gap-16 '>

        {addIncome.value ?
      <BackgroundGradient key={'addIncome'} >
        <div className='card ~w-32/96 aspect-[12/8] flex justify-center flex-col ~text-xs/lg text-center items-center ' >
        <Button className='absolute right-3 top-3' size={'size-7'} action={handleAddIncome}>
                    <X size={20} />
                </Button>
          <form className='flex w-full h-full  flex-col justify-end items-center gap-9'>
            <div className='flex flex-col gap-5 '>
            <input type='text' placeholder=' amount' className="rounded-lg border-2 text-neutral-800  border-neutral-800 focus:ring-2 focus:ring-teal-500 relative z-10  text-center placeholder:text-neutral-700"
/>
                <div className='flex flex-row gap-9 justify-center '>
                

                    <Calendar size={19} />
                </div>
            </div>
                
              

            <button className='button w-2/3 mb-5 '>Update</button>
            </form>
        </div>
        </BackgroundGradient>
        : <button className='button w-fit p-1 rounded-full ' onClick={handleAddIncome}>
        <PlusCircleIcon size={35} className='text-green-400'/>
        </button>}
      
      {addExpense.value ?
      <BackgroundGradient key={'addExpense'}>
        <div className='card ~w-32/96 aspect-[12/8] flex justify-center flex-col ~text-xs/lg text-center items-center' >
         <Button className='absolute right-3 top-3' size={'size-7'} action={handleAddExpense}>
                    <X size={20} />
                </Button>
          <form className='flex w-full h-full  flex-col justify-end items-center gap-9'>
            <div className='flex flex-col gap-5 '>
            <input type='text' placeholder=' amount' className="rounded-lg border-2 border-neutral-800 focus:ring-2 focus:ring-teal-500 relative z-10  text-center text-neutral-800 placeholder:text-neutral-700"
/>
                <div className='flex flex-row gap-9 justify-center '>
                 <select className=' rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-[60%] bg-stone-900 '>
                    <option disabled selected hidden value='monthly'> Type</option>
                     <option value='monthly'>Fundamental</option>
                     <option value='yearly'>Nice To Have </option>
                     <option value='yearly'>Waste</option>
                    </select>

                    <Calendar size={19} />
                </div>
            </div>
              

            <button className='button w-2/3 mb-5 '>Update</button>
            </form>
        </div>
        </BackgroundGradient>
        :  <button className='button  p-1 size-15 rounded-full' onClick={handleAddExpense}>
        <MinusCircleIcon size={35} className='text-red-400' />
        </button>}
                          
     
        </div>


        </div>
        
    </div>
  )
}

export default HomePageLogin
