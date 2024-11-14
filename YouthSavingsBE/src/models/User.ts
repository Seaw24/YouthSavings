import mongoose from "mongoose";
import { Request, Response } from "express";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide the user name"],
    },
    userEmail: {
      type: String,
      required: [true, "Please provide user email"],
      unique: [true, "Email has already been taken"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
