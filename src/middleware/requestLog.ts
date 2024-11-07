import { NextFunction, Request, Response } from "express";

export const reqLogPrefix = (req: Request): string => {
  const { ip, path, method } = req;

  return `${path} - ${method} request from IP '${ip}'.'`;
};

export const requestLog = (req: Request, res: Response, next: NextFunction) => {
  console.log(reqLogPrefix(req));
  next();
};
