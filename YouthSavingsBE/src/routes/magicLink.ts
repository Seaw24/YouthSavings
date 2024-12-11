import express from "express";
import magicLink from "../controllers/magicLink";

const routerMagicLink = express.Router();

routerMagicLink.route("/").post(magicLink);

export default routerMagicLink;
