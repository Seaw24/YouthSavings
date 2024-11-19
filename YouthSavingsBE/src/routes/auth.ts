import express from "express";
import { login } from "../controllers/auth";

const routerAuth = express.Router();

routerAuth.route("/login").post(login);

/* routerAuth.route("/dashboar").post(dashboar);
 */
export default routerAuth;
