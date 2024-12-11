import { Controller } from "../type/indexTypes";
import User from "../models/User";
const logOut: Controller = async (req, res) => {
  const cookies = req.cookies;

  if (cookies && cookies.refresh_token) {
    const refreshToken = cookies.refresh_token;
    const user = await User.findOne({ refreshToken: refreshToken });
    res.clearCookie("refresh_token", {
      httpOnly: true,
      sameSite: "lax",
    });
    if (user) {
      user.refreshToken = user.refreshToken.filter(
        (rt) => rt !== cookies.refresh_token
      );
      await user.save();
    }
  }

  res.status(200).json({ message: "logout success" });
};

export default logOut;
