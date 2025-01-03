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
      default: 6,
    },
    income: {
      type: Number,
      required: [true, "Please provide the income"],
    },
    fundamental: {
      type: Number,
      default: 0,
    },
    niceToHave: {
      type: Number,
      default: 0,
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
