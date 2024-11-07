import { httpsStatusCode, httpsStatusName } from "./httpsStatusCode.enum";

export class BaseError extends Error {
  protected isOperational: any;
  protected description: any;
  protected code: number;

  constructor(
    name: httpsStatusName,
    code: number,
    description: string,
    isOperational: boolean
  ) {
    super(description);

    this.name = name;
    this.code = code;
    this.isOperational = isOperational;
    this.description = description;
    Error.captureStackTrace(this, this.constructor);
  }

  getCode() {
    return this.code;
  }

  isTrustedError(error: BaseError) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}
