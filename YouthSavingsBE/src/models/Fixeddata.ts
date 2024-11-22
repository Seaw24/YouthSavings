import mongoose from "mongoose";

export interface IFixedData extends mongoose.Document {
  userId: string;
  plannedMonth: number;
  income: number;
  fundamental: number;
  niceToHave: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const FixedDataSchema = new mongoose.Schema(
  {
    plannedMonth: {
      type: Number,
      required: [true, "Please provide the planned month"],
    },
    income: {
      type: Number,
      required: [true, "Please provide your average income"],
    },
    fundamental: {
      type: Number,
      required: [true, "Please provide the fundamental"],
    },
    niceToHave: {
      type: Number,
      required: [true, "Please provide the nice to have"],
    },
    createdBy: {
      type: String,
      required: [true, "Please provide the user id"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IFixedData>("FixedData", FixedDataSchema);
