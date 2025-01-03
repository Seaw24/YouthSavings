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

  switch (err.name) {
    case "ValidationError":
      customError.msg = Object.values(err.errors).map(
        (item: any) => item.message
      );
      customError.statusCode = StatusCodes.BAD_REQUEST;
      break;
    case "CastError":
      console.log(err);
      customError.msg =
        "No item found with id :" +
        Object.values(err.value)
          .map((item: any) => item)
          .join(",");
      customError.statusCode = StatusCodes.NOT_FOUND;
      break;
  }
  /*  res.status(customError.statusCode).json({
    msg: err,
  });
}; */

  res.status(customError.statusCode).json({
    msg: Array.isArray(customError.msg) ? customError.msg : [customError.msg],
  });
};

export default errorHandlerMiddleware;
