import mongoose from "mongoose";

export interface IUpdatingData extends mongoose.Document {
  amount: number;
  date: Date;
  type: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const UpdatingDataSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Please provide the amount"],
    },
    date: {
      type: Date,
      required: [true, "Please provide the date"],
      index: true,
    },
    type: {
      type: String,
      required: [true, "Please provide the type"],
      enum: {
        values: ["fundamental", "nice-to-have", "waste", "income"],
        message: "Type is either: fundamental, nice-to-have, waste, income",
      },
    },
    description: {
      type: String,
      default: "",
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

UpdatingDataSchema.index({ createBy: 1, date: -1 });

export default mongoose.model<IUpdatingData>(
  "UpdatingData",
  UpdatingDataSchema
);
