import React from 'react'
import SavingCard from './componentsSV/SavingCard'
import { Wallet, PiggyBank, TrendingUp } from "lucide-react"

const savingsCategories = [
  { title: "Emergency", icon: Wallet },
  { title: "Investing", icon: TrendingUp },
  { title: "Retirement", icon: PiggyBank }
];

const Savings = () => {
  return (
    <div className='flex absolute top-1/2 -translate-y-1/4 w-full justify-evenly'>
      {savingsCategories.map((category, index) => (
        <SavingCard 
          key={index} 
          title={category.title} 
          icon={category.icon}
        />
      ))}
    </div>
  )
}

export default Savings
