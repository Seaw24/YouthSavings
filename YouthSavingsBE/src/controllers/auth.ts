import User from "../models/User";
import SendMagicLink from "../middleware/SendMagicLink";
import crypto from "crypto";
import { Controller } from "../type/indexTypes";
import { BadRequestError } from "../errors";
import { StatusCodes } from "http-status-codes";

const magicLink: Controller = async (req, res) => {
  // destructing email
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Please provide a valid email address");
  }
  let user = await User.findOne({ email });

  //if not a user yet
  if (!user) {
    // create new user
    user = await User.create({ ...req.body });
  }

  //create a token for the user
  const magicToken = crypto.randomBytes(32).toString("hex");
  user.magicToken = magicToken;
  user.magicTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  //send token to the email
  await SendMagicLink(user.email, magicToken);

  res.status(StatusCodes.OK).json({
    message: `Magic link has been sent to ${user.email} and token is ${magicToken}`,
  });
};

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

export { magicLink, login };
