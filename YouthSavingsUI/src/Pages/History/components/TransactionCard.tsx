"use client";

import {
  X,
  Edit2,
  Check,
  ArrowUpCircle,
  ArrowDownCircle,
  Calendar,
  Tag,
  FileText,
} from "lucide-react";
import Button from "../../../components/Button";
import { Input } from "../../../components/Input";
import { Label } from "../../../components/Label";
import { BackgroundGradient } from "../../../components/ui/background-gradient";
import { signal, Signal, useSignal } from "@preact/signals-react";
import { UpdattingDataType } from "../../../types/UpdattingDataType";
import { Select } from "../../../components/Select";
import { Textarea } from "../../../components/TextArea";
import useAxiosPrivate from "../../../hook/usePrivateAxious";
import { cn } from "../../../lib/utils";

// Signals
const editingField = signal("");

// Type
type TransactionCardProps = {
  handleClose: () => void;
  payments: Signal<UpdattingDataType[]>;
  selectedTransactionIndex: number;
};

const TransactionCard = ({
  handleClose,
  payments,
  selectedTransactionIndex,
}: TransactionCardProps) => {
  const localTransaction = useSignal<UpdattingDataType>({
    ...payments.value[selectedTransactionIndex],
  });
  console.log("TransactionCard");

  // Handle input changes and update the local transaction state
  const handleEditInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    localTransaction.value = {
      ...localTransaction.value,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    };
  };

  // Axios
  const axiosPrivate = useAxiosPrivate();

  // Save changes and update the payments array
  const handleSaveChanges = async () => {
    try {
      // Save to the backend
      await axiosPrivate.patch("/updatingdata", localTransaction.value);

      // Update the transaction in the payments array
      payments.value[selectedTransactionIndex] = { ...localTransaction.value };

      // force rerender history
      payments.value = [...payments.value];
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  const editableField = (
    label: string,
    icon: React.ReactNode,
    field: keyof UpdattingDataType
  ) => {
    const isEditing = field === editingField.value;
    return (
      <div className="mb-4 flex w-full justify-between text-gray-300 gap-2 items-center transition-all duration-300 ease-in-out hover:bg-white/10 rounded-lg p-2">
        <div className="flex items-center gap-2">
          {icon}
          <Label className="text-sm font-medium">{label}:</Label>
        </div>
        {isEditing ? (
          field === "type" ? (
            <div className="flex items-center gap-2">
              <Select
                name={field}
                value={localTransaction.value[field]}
                onChange={handleEditInput}
                className="bg-white/90  px-2"
              >
                <option value="Pick a Type" disabled>
                  Pick a Type
                </option>
                <option value="income">Income</option>
                <option value="fundamental">Fundamental</option>
                <option value="nice-to-have">Nice To Have</option>
                <option value="waste">Waste</option>
              </Select>

              <Button
                className="text-sm bg-transparent hover:bg-white/20 transition-colors duration-300"
                size={"size-7"}
                action={() => (editingField.value = "")}
              >
                <Check size={16} />
              </Button>
            </div>
          ) : field === "description" ? (
            <div className="flex items-center gap-2">
              <Textarea
                name={field}
                value={localTransaction.value[field]?.toString() || ""}
                onChange={handleEditInput}
                className="bg-white/20 border-0 rounded-md text-white resize-none"
              />
              <Button
                className="text-sm bg-transparent hover:bg-white/20 transition-colors duration-300"
                size={"size-7"}
                action={() => (editingField.value = "")}
              >
                <Check size={16} />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Input
                name={field}
                value={localTransaction.value[field]}
                onChange={handleEditInput}
                className="bg-white/20 border-0 rounded-md text-white"
              />
              <Button
                className="text-sm bg-transparent hover:bg-white/20 transition-colors duration-300"
                size={"size-7"}
                action={() => (editingField.value = "")}
              >
                <Check size={16} />
              </Button>
            </div>
          )
        ) : (
          <div className="flex w-2/3 items-center">
            <p className="text-white w-full rounded-xl  overflow-hidden overflow-ellipsis">
              {localTransaction.value[field]?.toString()}
            </p>
            <Button
              className="text-sm bg-transparent hover:bg-white/20 transition-colors duration-300"
              size={"size-7"}
              action={() => (editingField.value = field)}
            >
              <Edit2 size={16} />
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
      <BackgroundGradient>
        <div className="w-96 aspect-[8/11] card flex items-center bg-opacity-95 p-4 relative">
          <Button
            className="absolute right-3 top-3 z-10"
            size={"size-8"}
            action={handleClose}
          >
            <X size={20} />
          </Button>

          <div className="flex flex-col justify-around h-full relative w-full px-2">
            <div className="flex w-full justify-center items-center mt-4 text-4xl font-bold">
              {localTransaction.value.type === "income" ? (
                <ArrowUpCircle className="w-10 h-10 text-green-500 mr-2" />
              ) : (
                <ArrowDownCircle
                  className={cn("w-10 h-10 mr-2", localTransaction.value.color)}
                />
              )}
              <span className={cn(localTransaction.value.color)}>
                {localTransaction.value.type === "income" ? "+" : "-"}$
                {localTransaction.value.amount}
              </span>
            </div>
            <div className="space-y-4 w-full">
              {editableField(
                "Amount",
                <Tag className="text-blue-400" />,
                "amount"
              )}
              {editableField(
                "Date",
                <Calendar className="text-green-400" />,
                "date"
              )}
              {editableField(
                "Type",
                <Check className="text-yellow-400" />,
                "type"
              )}
              {editableField(
                "Description",
                <FileText className="text-purple-400" />,
                "description"
              )}
            </div>
            <Button
              className="w-full bg-golden hover:bg-golden-light text-black font-medium border border-yellow-600"
              size="w-full aspect-[8/1]"
              action={handleSaveChanges}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </BackgroundGradient>
    </div>
  );
};

export default TransactionCard;
