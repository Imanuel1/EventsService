import express from "express";
import { postEvent } from "../conrollers/eventController";

const router = express.Router();

router.route("/event").post(postEvent);

export default router;
