import mongoose from "mongoose";

export interface IFixedData extends mongoose.Document {
  userId: string;
  plannedMonth: number;
  income: number;
  fundamental: number;
  niceToHave: number;
}

const FixedDataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "Please provide the user id"],
  },
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
});

export default mongoose.model<IFixedData>("FixedData", FixedDataSchema);
