import User from "../models/User";
import { Controller } from "../type/indexTypes";
import { BadRequestError } from "../errors";
import { StatusCodes } from "http-status-codes";

const login: Controller = async (req, res) => {
  const { token } = req.body;

  const user = await User.findOne({ magicToken: token });

  if (!user || user.magicTokenExpires < new Date()) {
    throw new BadRequestError("Invalid token");
  }

  //if token is valid
  user.magicToken = null;
  user.magicTokenExpires = null;
  await user.save();

  //create token for user
  const sessionToken = user.createToken();
  res.cookie("token", sessionToken, {
    httpOnly: true,
  });
  res.status(StatusCodes.OK).json({ name: user.name });
};

export default login;
