import express from "express";
import refreshToken from "../controllers/refreshToken";

const routerRefreshToken = express.Router();

routerRefreshToken.route("/").post(refreshToken);

export default routerRefreshToken;
