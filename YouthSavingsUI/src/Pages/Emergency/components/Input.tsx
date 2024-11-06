import React from 'react'
import ProcessBar from '../../../components/ProcessBar'
import RangeSlider from './RangeSlider'
import { computed } from '@preact/signals-react'
import { BackgroundGradient } from '../../../components/ui/background-gradient'

type InputProps = {
  income: { value: number },
  fundamental: { value: number },
  niceToHave: { value: number },
  totalSaving: { value: number }
}
const Input = ({ income, fundamental, niceToHave, totalSaving } : InputProps) => {

  const maxNTH = computed(() => income.value - fundamental.value);
  const maxFundamental = computed(() => income.value - niceToHave.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted', {
      fundamental: fundamental.value,
      niceToHave: niceToHave.value,
    })
  }

  return (
    <BackgroundGradient>
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col card ~w-64/[28rem] aspect-[8/9] items-center'>
        <div className='~text-xl/4xl font-bold text-shadow-lg text-center ~mt-4/8 ~mb-8/14'>
          Challenge Form
        </div>

        <div className='flex flex-col justify-around h-3/4 w-full items-center'>
          <div className='w-5/6'>
            <RangeSlider 
              label='Fundamental cost' 
              income={income} 
              max={maxFundamental}
              signal={fundamental}
            />
          </div>

          <div className='w-5/6'>
            <RangeSlider 
              label='Nice to have' 
              income={income} 
              max={maxNTH}
              signal={niceToHave}
            />
          </div>

          <div className='w-4/5 ~text-sm/base'>
            <div className='text-center ~mb-1/2'>
              {totalSaving.value}/
              <span className='font-extrabold text-shadow-lg text-base'>{fundamental.value *6}</span>
            </div>
            <div className='flex'> 
              <ProcessBar funda={totalSaving.value} total={income.value} />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-[38%] aspect-[7/1] bg-golden-gradient text-black font-bold ~text-xs/sm hover:brightness-110"
          >
            accept 
          </button>
        </div>
      </form>
    </div>
    </BackgroundGradient>
  )
}

export default Input