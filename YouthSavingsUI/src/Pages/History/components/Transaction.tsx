import React from 'react'
import { BackgroundGradient } from '../../../components/ui/background-gradient'

type TransactionProps = { 
  history?: boolean
}


const Transaction = ({history = false} : TransactionProps) => {
    let payments = ['fsffsfds', 'fsdfsdfsdfsd', 'fdsdfsdfsdf', 'sdfsdfsdf', 'fdsdfsdfsdf', 'sdfsdfsdf', 'fsffsfds', 'fsdfsdfsdfsd', 'fdsdfsdfsdf', 'sdfsdfsdf', 'fdsdfsdfsdf', 'sdfsdfsdf', 'fsffsfds', 'fsdfsdfsdfsd', 'fdsdfsdfsdf', 'sdfsdfsdf', 'fdsdfsdfsdf', 'sdfsdfsdf', 'fsffsfds', 'fsdfsdfsdfsd', 'fdsdfsdfsdf', 'sdfsdfsdf', 'fdsdfsdfsdf', 'sdfsdfsdf']
    if(!history)  {
        payments = payments.slice(0, 3)
    }
  return (
    <div>
       <div className='grid w-full grid-cols-2 md:grid-cols-3 ~gap-5/12   place-items-center'>
          {payments.map((content, index) => (
        <BackgroundGradient>
            <div 
            key={index}
            className="card ~w-32/80 aspect-[16/8] flex justify-center p-2 flex-col ~text-xs/lg text-center" >
            
              {content}
            </div>
      </BackgroundGradient>
          ))}
        </div> 
    </div>
  )
}

export default Transaction
