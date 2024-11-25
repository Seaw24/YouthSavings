import { UnauthenticatedError } from "../errors";
import jwt from "jsonwebtoken";
import { Controller, CustomJwtPayload } from "../type/indexTypes";
const auth: Controller = async (req, res, next) => {
  const token = req.cookies.session_token;
  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  try {
    // accese token and set req.user to user id
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as CustomJwtPayload;

    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export default auth;
