import express from "express";
import { postEvent } from "../conrollers/eventController";

const router = express.Router();

router.post("/event", postEvent);

export default router;
