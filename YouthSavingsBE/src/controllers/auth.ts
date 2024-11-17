import User from "../models/User";
import SendMagicLink from "../middleware/SendMagicLink";
import { Response, Request } from "express";

const login = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }
  let user = await User.findOne({ email });

  if (!user) {
    // create new user
    user = await User.create({ ...req.body });
  }
  const token = user.createToken();

  await SendMagicLink(user.email, token);

  res
    .status(200)
    .json({ message: `Magic link has been sent to ${user.email} ` });
};

export { login };
