import express from "express";
import {
  createFixedData,
  getFixedData,
  updateFixedData,
} from "../controllers/Fixeddata";

import auth from "../middleware/authentication";

const routerFixedData = express.Router();

routerFixedData
  .route("/")
  .get(auth, getFixedData)
  .post(auth, createFixedData)
  .patch(auth, updateFixedData);

export default routerFixedData;
