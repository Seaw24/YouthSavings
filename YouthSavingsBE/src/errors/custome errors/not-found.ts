import { StatusCodes } from "http-status-codes";
import BaseError from "../BaseError";

class NotFoundCustomeError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}
