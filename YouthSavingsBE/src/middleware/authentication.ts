import Controller from "../type/req&res";
import jwt, { JwtPayload } from "jsonwebtoken";

const auth: Controller = async (req, res, next) => {
  // checking header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  try {
    // accese token and set req.user to user id
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = { userId: (payload as JwtPayload).userId };
    next();
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

export default auth;