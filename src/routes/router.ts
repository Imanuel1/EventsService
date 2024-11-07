import express from "express";
import eventRouter from "./eventRouter";

const router = express.Router();

router.use(eventRouter);

export default router;
