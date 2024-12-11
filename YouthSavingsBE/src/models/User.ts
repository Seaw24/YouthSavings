import mongoose, { Document } from "mongoose";
import jwt from "jsonwebtoken";

// user type interface
export interface IUser extends Document {
  magicToken: string;
  magicTokenExpires: Date;
  name: string;
  email: string;
  refreshToken: string[];
  createToken(): string;
  createRefreshToken(): string;
}

const UserSchema = new mongoose.Schema(
  {
    magicToken: {
      type: String,
      default: null,
    },
    magicTokenExpires: {
      type: Date,
      default: null,
    },
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
    refreshToken: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

//Functions

UserSchema.methods.createRefreshToken = function (): string {
  try {
    const refreshToken = jwt.sign(
      { userId: this._id, email: this.email },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_LIFETIME }
    );
    this.refreshToken.push(refreshToken);
    this.save();
    return refreshToken;
  } catch (err) {
    console.log(err);
  }
};

UserSchema.methods.createToken = function (): string {
  return jwt.sign(
    { userId: this._id, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.TOKEN_LIFETIME,
    }
  );
};

export default mongoose.model<IUser>("User", UserSchema);
