import { NotFoundError } from "../errors";
import Fixeddata from "../models/Fixeddata";
import Controller from "../type/req&res";
const getFixedData: Controller = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const fixedData = await Fixeddata.findOne({ createdBy: userId });
  if (!fixedData) {
    throw new NotFoundError(
      `Fixed data not found with this user id: ${userId}`
    );
  }
  res.status(200).json(fixedData);
};

const createFixedData: Controller = async (req, res) => {
  const {
    user: { userId },
  } = req;
  req.body.createdBy = userId;
  const newFixedData = await Fixeddata.create(req.body);
  res.status(201).json(newFixedData);
};

const updateFixedData: Controller = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const updatedFixedData = await Fixeddata.findOneAndUpdate(
    { createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedFixedData) {
    throw new NotFoundError(
      `Fixed data not found with this user id: ${userId}`
    );
  }
  res.status(200).json(updatedFixedData);
};

export { getFixedData, createFixedData, updateFixedData };
