import express from "express";
import {
  createFixedData,
  getFixedData,
  updateFixedData,
} from "../controllers/Fixeddata";

const routerFixedData = express.Router();

routerFixedData
  .route("/:id")
  .get(getFixedData)
  .post(createFixedData)
  .patch(updateFixedData);

export default routerFixedData;
