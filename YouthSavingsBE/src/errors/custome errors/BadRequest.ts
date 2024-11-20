import { StatusCodes } from "http-status-codes";
import BaseError from "../BaseError";

class BadRequestCustomeError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export default BadRequestCustomeError;
