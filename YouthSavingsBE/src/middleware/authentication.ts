import { UnauthenticatedError } from "../errors";
import jwt from "jsonwebtoken";
import { Controller, CustomJwtPayload } from "../type/indexTypes";
const auth: Controller = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid no header");
  }

  const token = header.split(" ")[1];

  try {
    // accese token and set req.user to user id
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as CustomJwtPayload;

    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError(error.toString() + token);
  }
};

export default auth;
