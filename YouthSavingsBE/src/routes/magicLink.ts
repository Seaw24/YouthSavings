import express from "express";
import magicLink from "../controllers/magicLink";
import exp from "constants";

const routerMagicLink = express.Router();

routerMagicLink.route("/magicLink").post(magicLink);

export default routerMagicLink;
