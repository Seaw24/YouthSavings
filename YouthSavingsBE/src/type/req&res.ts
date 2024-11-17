import { Request, Response, NextFunction } from "express";
type RequestExtended = Request & { user?: { userId: string } };

type Controller = (
  req: RequestExtended,
  res: Response,
  next: NextFunction
) => Promise<void>;

export default Controller;
