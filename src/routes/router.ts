import express from "express";
import eventRouter from "./eventRouter";
import { redisRouter } from "../redis/redis";

const router = express.Router();

router.use(eventRouter).use(redisRouter);

export default router;
