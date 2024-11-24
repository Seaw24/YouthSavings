import mongoose from "mongoose";

export interface IUpdatingData extends mongoose.Document {
  fundamental: number;
  niceToHave: number;
  waste: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const UpdatingDataSchema = new mongoose.Schema(
  {
    fundamental: {
      type: Number,
      required: [true, "Please provide the fundamental"],
      default: 0,
    },
    niceToHave: {
      type: Number,
      required: [true, "Please provide the nice to have"],
      default: 0,
    },
    waste: {
      type: Number,
      required: [true, "Please provide the waste"],
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

export default mongoose.model<IUpdatingData>(
  "UpdatingData",
  UpdatingDataSchema
);
