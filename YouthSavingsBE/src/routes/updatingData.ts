import express from "express";
import auth from "../middleware/authentication";
import {
  getUpdatingData,
  createUpdatingData,
  updateUpdatingData,
} from "../controllers/updatingData";

const routeruUpdatingData = express.Router();

routeruUpdatingData
  .route("/")
  .get(auth, getUpdatingData)
  .post(auth, createUpdatingData)
  .patch(auth, updateUpdatingData);

export default routeruUpdatingData;
