import { UnauthenticatedError } from "../errors";
import Controller from "../type/req&res";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth: Controller = async (req, res, next) => {
  // checking header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw next(new UnauthenticatedError("Authentication invalid"));
  }

  try {
    // accese token and set req.user to user id
    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = { userId: (payload as JwtPayload).userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export default auth;
