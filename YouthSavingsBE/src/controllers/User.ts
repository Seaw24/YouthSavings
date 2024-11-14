import User from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import SendMagicLink from "../middleware/SendMagicLink";
import { Response, Request } from "express";
dotenv.config();

const login = async (req: Request, res: Response) => {
  const { userEmail } = req.body;
  if (!userEmail) {
    return res.status(400).json({ message: "Email is required" });
  }
  let user = await User.findOne(
    (u: { userEmail: String }) => u.userEmail === req.body.userEmail
  );

  if (!user) {
    // create new user
    user = new User({
      userEmail: req.body.userEmail,
      userName: req.body.userEmail,
    });
    await user.save();
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1hr",
  });

  await SendMagicLink(user.userEmail, token);

  res
    .status(200)
    .json({ message: `Magic link has been sent to ${user.userEmail} ` });
};
