import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";
import Updatingdata from "../models/Updatingdata";
import { Controller } from "../type/indexTypes";

const getUpdatingData: Controller = async (req, res) => {
  const { userId } = req.user;
  const { month } = req.query;
  const year = new Date().getFullYear();
  const startDate = new Date(`${year}-${month}-01`);
  const endDate = new Date(`${year}-${month}-31`);

  const updatingData = await Updatingdata.find({
    createdBy: userId,
    date: {
      $gte: startDate,
      $lt: endDate,
    },
  }).sort({
    date: -1,
  });

  if (!updatingData) {
    //handle with middle ware already so basically don't need the message
    throw new NotFoundError(
      `Updating data not found with this user id: ${userId}, ${month}`
    );
  }

  res.status(StatusCodes.OK).json(updatingData);
};

const createUpdatingData: Controller = async (req, res) => {
  const { userId } = req.user;
  const { amount, date, description, type } = req.body;

  const newUpdatingData = await Updatingdata.create({
    amount,
    date,
    description,
    type,
    createdBy: userId,
  });

  res.status(StatusCodes.OK).json(newUpdatingData);
};

const updateUpdatingData: Controller = async (req, res) => {
  const { userId } = req.user;
  const { _id, amount, date, description, type } = req.body;

  const updatingData = await Updatingdata.findOneAndUpdate(
    { _id, createdBy: userId },
    {
      amount,
      date,
      description,
      type,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatingData) {
    throw new NotFoundError(`Updating data not found with this id: ${_id}`);
  }

  res.status(StatusCodes.OK).json(updatingData);
};

export { getUpdatingData, createUpdatingData, updateUpdatingData };
