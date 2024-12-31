"use client";

import { BackgroundGradient } from "../../../components/ui/background-gradient";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { signal, Signal } from "@preact/signals-react";
import TransactionCard from "./TransactionCard";
import { UpdattingDataType } from "../../../types/UpdattingDataType";
import { cn } from "../../../lib/utils";

// Signals
const selectedTransactionIndex = signal<number | null>(null);

const Transaction = ({
  payments,
  month,
}: {
  payments: Signal<UpdattingDataType[]>;
  month: number;
}) => {
  return (
    <div className="container mx-auto px-4 pb-8">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl "></div>
        <div className="relative flex items-center justify-center ~py-3/6 ">
          <h1 className="~text-4xl/7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 tracking-tight">
            {new Date(0, month - 1).toLocaleString("default", {
              month: "long",
            })}
          </h1>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 ~w-10/14 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full "></div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ~gap-6/12 ~mt-0/12">
        {payments.value.map((content, index) => (
          <BackgroundGradient key={content._id} className="rounded-xl">
            <div
              className="card aspect-[16/9] p-4 flex flex-col justify-between text-sm cursor-pointer"
              onClick={() => {
                selectedTransactionIndex.value = index;
              }}
            >
              <div className="flex justify-between items-center">
                <span className={cn("text-lg font-semibold", content.color)}>
                  {content.type === "income" ? "+" : "-"}${content.amount}
                </span>
                {content.type === "income" ? (
                  <ArrowUpCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <ArrowDownCircle className={cn("w-6 h-6", content.color)} />
                )}
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <p className={cn(content.color)}>
                  <span className="text-gray-400">Type: </span> {content.type}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Date: </span> {content.date}
                </p>
                <p className="text-gray-300 truncate">
                  <span className="text-gray-400">Note: </span>{" "}
                  {content.description}
                </p>
              </div>
            </div>
          </BackgroundGradient>
        ))}
      </div>
      {selectedTransactionIndex.value !== null && (
        <TransactionCard
          handleClose={() => (selectedTransactionIndex.value = null)}
          selectedTransactionIndex={selectedTransactionIndex.value}
          payments={payments}
        />
      )}
    </div>
  );
};

export default Transaction;
