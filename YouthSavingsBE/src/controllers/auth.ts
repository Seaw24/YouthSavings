import User from "../models/User";
import { Controller } from "../type/indexTypes";
import { BadRequestError } from "../errors";
import { StatusCodes } from "http-status-codes";

const login: Controller = async (req, res) => {
  /*                     Checking magic token                  */
  const cookies = req.cookies;
  const { magicToken } = req.body;

  const user = await User.findOne({ magicToken: magicToken });

  if (!user || user.magicTokenExpires < new Date()) {
    throw new BadRequestError("Invalid Magic token");
  }

  //if Magic token is valid
  /*  user.magicToken = null;
  user.magicTokenExpires = null;
  await user.save(); */

  /* -------------------------------------------------------------------------- */
  /*                          Check if user has refresh token in the cookie     */
  if (cookies && cookies.refresh_token) {
    const refreshToken = cookies.refresh_token;
    /*  might be the senario when user refresh token is alr hacked and hacker alr request a new 
      one thats why the token not in the database anymore */
    const foundToken = await User.findOne({ refreshToken: refreshToken });

    if (!foundToken) {
      //we log out all the user session
      user.refreshToken = [];
    } else {
      user.refreshToken = user.refreshToken.filter(
        (rt) => rt !== cookies.refresh_token
      );
      //remove the refresh token from the cookie
      res.clearCookie("refresh_token", {
        httpOnly: true,
        sameSite: "lax",
      });
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                         Create token for user                              */

  const sessionToken = user.createToken();
  const refreshToken = user.createRefreshToken();
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
    domain: "localhost", // This helps with cross-port cookie sharing
  });
  res
    .status(StatusCodes.OK)
    .json({ name: user.name, accessToken: sessionToken, email: user.email });
};

export default login;
