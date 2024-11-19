class BaseError extends Error {
  //types
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode || 500;
  }
}

export default BaseError;