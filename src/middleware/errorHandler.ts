import {
  httpsStatusCode,
  httpsStatusName,
} from "./../error/httpsStatusCode.enum";
import {
  BadRequest,
  ForbiddenError,
  GeneralError,
  InternalServer,
  NotFound,
} from "../error/errorTypes.error";
import { reqLogPrefix } from "./requestLog";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER, NOT_FOUND, OK } =
    httpsStatusCode;
  if (err.code === BAD_REQUEST) {
    const error = new BadRequest(BAD_REQUEST, "Validation Error", false);

    console.error(`${reqLogPrefix(req)} - Request failed: Bad Request `, err);
    res.status(error.getCode()).send(error);
  } else if (err.code === FORBIDDEN) {
    const error = new ForbiddenError(
      FORBIDDEN,
      "Request failed due to Forbidden Error (permissions/ token etc.)",
      true
    );

    console.error(`${reqLogPrefix(req)} - Request failed: ForbiddenError`, err);
    res.status(error.getCode()).send(error);
  } else if (err.code === NOT_FOUND) {
    const error = new NotFound(
      NOT_FOUND,
      "Query params of the request were not valid",
      true
    );

    console.error(
      `${reqLogPrefix(req)} - Request failed: Request Not Found`,
      err
    );
    res.status(error.getCode()).send(error);
  } else if (err.code === INTERNAL_SERVER) {
    const error = new InternalServer(
      INTERNAL_SERVER,
      "Request failed due to an error in the server",
      true
    );

    console.error(
      `${reqLogPrefix(req)} - Request failed, internal server Error:  `,
      err
    );
    res.status(INTERNAL_SERVER).send(error);
  } else {
    const error = new GeneralError(
      httpsStatusName.GENERAL_ERROR,
      err.code,
      err.message
    );

    console.error(
      `${reqLogPrefix(req)} - Request failed, General Error: `,
      err
    );
    res.status(error.getCode()).send(error);
  }
};
