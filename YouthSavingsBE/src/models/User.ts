import mongoose, { Document } from "mongoose";
import jwt from "jsonwebtoken";

// user type interface
interface IUser extends Document {
  name: string;
  email: string;
  createToken(): string;
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide user email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: [true, "Email has already been taken"],
    },

    //name default as email

    name: {
      type: String,
      default: function () {
        return this.email;
      },
    },
  },
  {
    timestamps: true,
  }
);

//Functions

UserSchema.methods.createToken = function (): string {
  return jwt.sign(
    { userId: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.TOKEN_LIFETIME }
  );
};

export default mongoose.model<IUser>("User", UserSchema);
