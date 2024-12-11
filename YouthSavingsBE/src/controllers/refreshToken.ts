import jwt from "jsonwebtoken";
import { BadRequestError, UnauthenticatedError } from "../errors";
import User from "../models/User";
import { Controller, CustomJwtPayload } from "../type/indexTypes";
import { IUser } from "../models/User";

const refreshToken: Controller = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies || !cookies.refresh_token) {
    throw new BadRequestError("no refresh token");
  }
  const refreshToken = cookies.refresh_token;
  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  const user: IUser = await User.findOne({ refreshToken: refreshToken });

  // refresh token is attempted to be reused
  if (!user) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET,
      async (err: unknown, payload: CustomJwtPayload) => {
        if (err) {
          throw new UnauthenticatedError("Invalid token");
        }
        const hackedUser = await User.findById(payload.userId);
        hackedUser.refreshToken = [];
        await hackedUser.save();
        throw new UnauthenticatedError("Invalid token");
      }
    );
    throw new UnauthenticatedError("Invalid token");
  }
  // remove old refresh token from user
  const newRefreshTokenArray = user.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  // verify refresh token token might be expired
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (err: unknown, payload: CustomJwtPayload) => {
      if (err || !payload) {
        user.refreshToken = [...newRefreshTokenArray];
        await user.save();
        throw new UnauthenticatedError(err.toString());
      }
      if (payload.userId !== user._id.toString()) {
        throw new UnauthenticatedError("Token does not match user");
      }
    }
  );

  //create new token pair if refresh token is valid
  const newRefreshToken = user.createRefreshToken();
  const sessionToken = user.createToken();

  res.cookie("refresh_token", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
    domain: "localhost",
  });
  res.status(200).json({ accessToken: sessionToken });
};

export default refreshToken;
