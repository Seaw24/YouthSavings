import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;
