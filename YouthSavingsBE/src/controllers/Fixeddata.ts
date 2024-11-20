import { NotFoundError } from "../errors";
import Fixeddata from "../models/Fixeddata";
import { Request, Response } from "express";

const getFixedData = async (req: Request, res: Response): Promise<void> => {
  const { id: userId } = req.params;
  const fixedData = await Fixeddata.findOne({ userId });
  if (!fixedData) {
    throw new NotFoundError(
      `Fixed data not found with this user id: ${userId}`
    );
  }
  res.status(200).json(fixedData);
};

const createFixedData = async (req: Request, res: Response): Promise<void> => {
  const newFixedData = await Fixeddata.create(req.body);
  res.status(201).json(newFixedData);
};

const updateFixedData = async (req: Request, res: Response): Promise<void> => {
  const { id: userId } = req.params;
  const updatedFixedData = await Fixeddata.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedFixedData) {
    throw new NotFoundError(
      `Fixed data not found with this user id: ${userId}`
    );
  }
  res.status(200).json(updatedFixedData);
};

export { getFixedData, createFixedData, updateFixedData };
