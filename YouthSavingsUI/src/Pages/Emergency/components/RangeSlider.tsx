"use client"

import * as React from "react"
import { Slider } from "../../../components/ui/Slider"

export default function RangeSlider({ label = "Nam", income, signal,max }) {

  const percentage = Math.round((signal.value / income.value) * 100)
  return (
    <div className="w-full">
      <label htmlFor={`range-slider-${label}`} className="font-medium text-shadow-lg text-gray-100 ~text-xs/lg">
        {label}
      </label>
      <div className="flex items-center justify-between ~gap-1/2">
        <Slider
          id={`range-slider-${label}`}
          max={max.value}
          step={10}
          className="w-full"
          value={[signal.value]}
          onValueChange={([value]) => signal.value = value}
          aria-label={`Range Slider`}
        />
        <span className="font-medium 2xl:text-lg text-gray-100 ~text-xs/lg">
          {signal.value}$
        </span>
      </div>
      <span className="font-medium text-shadow-lg text-gray-100 ~text-xs/sm ">~{percentage}%</span>

    </div>
  )
}