import { NextFunction, Request, Response } from "express";
import { insertEvent } from "../services/eventService";

export const postEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  try {
    await insertEvent(body);
    console.log(`Post event with id: ${body.id} was successful`);
    res.status(201).json({ message: "data created successfully", data: body });
  } catch (error) {
    console.error(`Post event with id: ${body.id} failed: ${error}`);
    next(error);
  }
};
