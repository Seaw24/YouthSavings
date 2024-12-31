"use client";

import { X } from "lucide-react";
import Button from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { Textarea } from "../../../../components/TextArea";
import { Label } from "../../../../components/Label";
import { BackgroundGradient } from "../../../../components/ui/background-gradient";
import { signal } from "@preact/signals-react";
import useAxiosPrivate from "../../../../hook/usePrivateAxious";
// Signals
const amount = signal(0);
const date = signal<Date | null>(null);
const type = signal("income");
const description = signal("");

// Type
type AddingIncomeFormProps = {
  handleClose: () => void;
};
const AddingIncomeForm = ({ handleClose }: AddingIncomeFormProps) => {
  // Axios instance
  const axiousPrivate = useAxiosPrivate();
  // Function to add income
  function addingIncome(e: any) {
    e.preventDefault();
    axiousPrivate.post("/updatingdata", {
      amount: amount.value,
      date: date.value,
      type: type.value,
      description: description.value,
    });
    handleClose();
    return;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm ">
      <BackgroundGradient>
        <div
          className=" ~w-80/96 aspect-[8/11] card flex justify-center items-center
        bg-opacity-95 p-4 relative"
        >
          {/* Close button */}
          <Button
            className="absolute right-3 top-3 z-10"
            size={"size-7"}
            action={handleClose}
          >
            <X size={20} />
          </Button>

          <form className="w-full flex justify-around h-full flex-col  ">
            {/* Amount Field */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-yellow-500">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                step="5"
                placeholder="Enter amount"
                onInput={(e) =>
                  (amount.value = parseFloat(e.currentTarget.value))
                }
                className="bg-white/90 border-0 text-center"
              />
            </div>

            {/* Date Field */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-yellow-500">
                Date
              </Label>
              <Input
                id="date"
                onInput={(e) => (date.value = new Date(e.currentTarget.value))}
                type="date"
                className="bg-white/90 border-0 text-center"
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-yellow-500">
                Description
              </Label>
              <Textarea
                onInput={(e) => (description.value = e.currentTarget.value)}
                id="description"
                placeholder="Enter expense description"
                className="bg-white/90 border-0 aspect-[2/1]"
              />
            </div>

            {/* Submit Button */}
            <Button
              className="w-full bg-golden hover:bg-golden-light text-black 
          font-medium border border-yellow-600"
              size="w-full aspect-[8/1]"
              action={addingIncome}
            >
              Add Income
            </Button>
          </form>
        </div>
      </BackgroundGradient>
    </div>
  );
};

export default AddingIncomeForm;
