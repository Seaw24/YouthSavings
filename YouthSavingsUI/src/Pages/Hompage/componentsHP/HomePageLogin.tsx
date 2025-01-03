import ProcessBar from "../../../components/ProcessBar";
import { PlusCircleIcon, MinusCircleIcon } from "lucide-react";
import { signal } from "@preact/signals-react";
import AddingIncomeForm from "./HomePageLoginComponent/AddingIncomeForm";
import AddingExpenseForm from "./HomePageLoginComponent/AddingExpenseForm";

const addIncome = signal(false);
const addExpense = signal(false);

type HomePageLoginProps = {
  totalSaving?: number;
  plannedSaving?: number;
};

const HomePageLogin = ({
  totalSaving = 100,
  plannedSaving = 3600,
}: HomePageLoginProps) => {
  const handleAddIncome = () => {
    addIncome.value = !addIncome.value;
  };

  const handleAddExpense = () => {
    addExpense.value = !addExpense.value;
  };

  return (
    <div className="flex flex-col justify-center items-center flex-grow gap-9">
      <div className="w-2/3  items-center justify-center text-center flex flex-col">
        <div className="text-gray-200 font-bold text-shadow-lg text-center ~m-2/5 flex items-center justify-center  ~text-xl/3xl">
          {totalSaving}

          <span className="font-bold text-highlight"> /{plannedSaving} </span>
        </div>
        <ProcessBar size="28/1" />

        <div className="flex mt-7 gap-16 ">
          {addIncome.value ? (
            <AddingIncomeForm handleClose={handleAddIncome} />
          ) : (
            <button
              className="button w-fit p-1 rounded-full "
              onClick={handleAddIncome}
            >
              <PlusCircleIcon size={35} className="text-green-400" />
            </button>
          )}

          {addExpense.value ? (
            <AddingExpenseForm handleClose={handleAddExpense} />
          ) : (
            <button
              className="button  p-1 size-15 rounded-full"
              onClick={handleAddExpense}
            >
              <MinusCircleIcon size={35} className="text-red-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePageLogin;
