"use client";

import { X } from "lucide-react";
import Button from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { Textarea } from "../../../../components/TextArea";
import { Label } from "../../../../components/Label";
import { BackgroundGradient } from "../../../../components/ui/background-gradient";
import { Select } from "../../../../components/Select";
import useAxiosPrivate from "../../../../hook/usePrivateAxious";
import { signal } from "@preact/signals-react";

// Signals
const amount = signal(0);
const date = signal<Date | null>(null);
const type = signal("");
const description = signal("");

type AddingExpenseFormProps = {
  handleClose: () => void;
};

// Axios instance

const AddingExpenseForm = ({ handleClose }: AddingExpenseFormProps) => {
  const axiousPrivate = useAxiosPrivate();

  // Function to add expense
  function addingExpense(e: any) {
    e.preventDefault();
    axiousPrivate.post("/updatingdata", {
      amount: amount.value,
      date: date.value,
      type: type.value,
      description: description.value,
    });
    handleClose();
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm ">
      <BackgroundGradient>
        <div
          className=" ~w-80/96 aspect-[2/3] card flex justify-center items-center
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

          <form className="w-full flex justify-around h-full flex-col">
            {/* Amount Field */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-yellow-500">
                Amount
              </Label>
              <Input
                onInput={(e) =>
                  (amount.value = parseFloat(e.currentTarget.value))
                }
                id="amount"
                type="number"
                placeholder="Enter amount"
                className="bg-white/90 border-0"
              />
            </div>

            {/* Date Field */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-yellow-500">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                className="bg-white/90 border-0"
                onInput={(e) => (date.value = new Date(e.currentTarget.value))}
              />
            </div>

            {/* Type Field */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-yellow-500">
                Type
              </Label>
              {/* Select Dropdown */}

              <Select
                id="type"
                defaultValue="fundamental"
                className="bg-white/90 w-2/3 px-2"
                onInput={(e) => (type.value = e.currentTarget.value)}
              >
                <option value="Pick a Type" disabled>
                  Pick a Type
                </option>
                <option value="fundamental">Fundamental</option>
                <option value="nice-to-have">Nice To Have</option>
                <option value="waste">Waste</option>
              </Select>
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-golden-light">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter expense description"
                className="bg-white/90 border-0 aspect-[2/1]"
                onInput={(e) => (description.value = e.currentTarget.value)}
              />
            </div>

            {/* Submit Button */}
            <Button
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black 
          font-medium border border-yellow-600"
              size="w-full aspect-[8/1]"
              action={addingExpense}
            >
              Add Expense
            </Button>
          </form>
        </div>
      </BackgroundGradient>
    </div>
  );
};

export default AddingExpenseForm;
