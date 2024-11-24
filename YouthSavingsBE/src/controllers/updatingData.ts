import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";
import Updatingdata from "../models/Updatingdata";
import Controller from "../type/req&res";

const getUpdatingData: Controller = async (req, res) => {
  const { user: userId } = req;

  const updatingData = await Updatingdata.findOne({ createdBy: userId });

  if (!updatingData) {
    //handle with middle ware already so basically don't need the message
    throw new NotFoundError(
      `Updating data not found with this user id: ${userId.toString()}`
    );
  }

  res.status(StatusCodes.OK).json(updatingData);
};

const updateUpdatingData: Controller = async (req, res) => {
  const { user: userId } = req;
  const updatedUpdatingData = await Updatingdata.findOneAndUpdate(
    { createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedUpdatingData) {
    throw new NotFoundError(
      `Updating data not found with this user id: ${userId.toString()}`
    );
  }

  res.status(StatusCodes.OK).json(updatedUpdatingData);
};

export { getUpdatingData, updateUpdatingData };
