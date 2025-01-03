import express from "express";
import logOut from "../controllers/logOut";

const routerlogOut = express.Router();

routerlogOut.route("/").get(logOut);

export default routerlogOut;
