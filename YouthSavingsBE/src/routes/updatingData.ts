import express from "express";
import auth from "../middleware/authentication";
import {
  getUpdatingData,
  updateUpdatingData,
} from "../controllers/updatingData";

const routeruUpdatingData = express.Router();

routeruUpdatingData
  .route("/")
  .get(auth, getUpdatingData)
  .patch(auth, updateUpdatingData);

export default routeruUpdatingData;
