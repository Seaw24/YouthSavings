"use client";

import Button from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Label } from "../../../components/Label";
import { BackgroundGradient } from "../../../components/ui/background-gradient";
import useAxiosPrivate from "../../../hook/usePrivateAxious";
import { plannedMonth, income, fundamental, niceToHave } from "../../../App";

type AddingExpenseFormProps = {
  handleClose: () => void;
};

// Axios instance

const NewUserFixeddata = ({ handleClose }: AddingExpenseFormProps) => {
  const axiousPrivate = useAxiosPrivate();

  // Function to add expense
  function defaultFixedData(e: any) {
    e.preventDefault();
    axiousPrivate.post("/fixeddata", {
      income: income.value,
      plannedMonth: plannedMonth.value,
    });
    fundamental.value = income.value * 0.5;
    niceToHave.value = income.value * 0.2;

    handleClose();
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md ">
      <BackgroundGradient>
        <div
          className=" ~w-72/80 aspect-square  card flex justify-center items-center
        bg-opacity-95 p-4 relative"
        >
          <form className="w-full flex justify-around h-full flex-col items-center ">
            {/* Income Field */}
            <div className="space-y-2 ">
              <Label htmlFor="amount" className="text-yellow-500 text-center">
                Average Income
              </Label>
              <Input
                onInput={(e) =>
                  (income.value = parseFloat(e.currentTarget.value))
                }
                id="amount"
                type="number"
                placeholder="Enter amount"
                className="bg-white/90 border-0 w-full"
              />
            </div>

            {/* Planned Month Field */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-yellow-500 text-center">
                Planned Month
              </Label>
              <Input
                onInput={(e) =>
                  (plannedMonth.value = parseFloat(e.currentTarget.value))
                }
                id="date"
                type="number"
                placeholder={plannedMonth.value.toString()}
                className="bg-white/90 border-0 w-full"
              />
            </div>

            {/* Submit Button */}

            <Button
              className="bg-golden-gradient text-black rounded-lg hover:brightness-125 "
              action={defaultFixedData}
            >
              Submit
            </Button>
          </form>
        </div>
      </BackgroundGradient>
    </div>
  );
};

export default NewUserFixeddata;
