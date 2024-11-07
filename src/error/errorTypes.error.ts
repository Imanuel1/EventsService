import { BaseError } from "./baseError.error";
import { httpsStatusCode, httpsStatusName } from "./httpsStatusCode.enum";

const { BAD_REQUEST, FORBIDDEN, INTERNAL_SERVER, NOT_FOUND, OK } =
  httpsStatusCode;

export class ForbiddenError extends BaseError {
  constructor(
    httpCode = FORBIDDEN,
    description: string,
    isOperational: boolean = true
  ) {
    super(httpsStatusName.FORBIDDEN, httpCode, description, isOperational);
  }
}

export class NotFound extends BaseError {
  constructor(
    httpCode = NOT_FOUND,
    description: string,
    isOperational: boolean = true
  ) {
    super(httpsStatusName.NOT_FOUND, httpCode, description, isOperational);
  }
}

export class BadRequest extends BaseError {
  constructor(
    httpCode = BAD_REQUEST,
    description: string,
    isOperational: boolean = true
  ) {
    super(httpsStatusName.BAD_REQUEST, httpCode, description, isOperational);
  }
}

export class InternalServer extends BaseError {
  constructor(
    httpCode = INTERNAL_SERVER,
    description: string,
    isOperational: boolean = true
  ) {
    super(
      httpsStatusName.INTERNAL_SERVER,
      httpCode,
      description,
      isOperational
    );
  }
}

export class GeneralError extends BaseError {
  constructor(
    name = httpsStatusName.GENERAL_ERROR,
    httpCode: httpsStatusCode,
    description: string,
    isOperational: boolean = true
  ) {
    super(name, httpCode, description, isOperational);
  }
}
