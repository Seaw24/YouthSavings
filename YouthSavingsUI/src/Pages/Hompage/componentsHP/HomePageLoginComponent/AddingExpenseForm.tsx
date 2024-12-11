"use client";

import { X } from "lucide-react";
import Button from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import { Textarea } from "../../../../components/TextArea";
import { Label } from "../../../../components/Label";

export default function ExpenseForm() {
  return (
    <div className="min-h-screen bg-[#001524] bg-opacity-95 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-[#001524] rounded-lg border border-purple-400/20 shadow-lg backdrop-blur-sm p-6">
        {/* Close button */}
        <button className="absolute right-4 top-4 text-yellow-500 hover:text-yellow-400">
          <X className="h-5 w-5" />
        </button>

        <form className="space-y-6">
          {/* Amount Field */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-yellow-500">
              Amount
            </Label>
            <Input
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
            <Input id="date" type="date" className="bg-white/90 border-0" />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-yellow-500">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter expense description"
              className="bg-white/90 border-0 min-h-[100px]"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-medium border border-yellow-600"
          >
            Add Expense
          </Button>
        </form>
      </div>
    </div>
  );
}
