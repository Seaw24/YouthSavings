import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
  res.status(404).send("Where are you trying to go (◣_◢)");
};

export default notFound;
