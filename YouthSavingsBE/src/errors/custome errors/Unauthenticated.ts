import { StatusCodes } from "http-status-codes";
import BaseError from "../BaseError";
class UnauthenticatedError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export default UnauthenticatedError;
