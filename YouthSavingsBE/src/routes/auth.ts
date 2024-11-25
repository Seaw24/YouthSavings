import express from "express";
import { magicLink, login } from "../controllers/auth";

const routerAuth = express.Router();

routerAuth.route("/login").post(login).post(magicLink);

/* routerAuth.route("/dashboar").post(dashboar);
 */
export default routerAuth;
