import express from "express";
import logOut from "../controllers/logOut";

const routerlogOut = express.Router();

routerlogOut.route("/").post(logOut);

export default routerlogOut;
