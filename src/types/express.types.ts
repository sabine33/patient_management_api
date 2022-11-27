import { IErrorResponse, IResponse } from "@/interfaces/response.interface";
import { IUser } from "@/interfaces/user.interface";
import { isArray } from "lodash";

declare module "express-serve-static-core" {
  interface Request {
    user: IUser;
  }
  interface Response {
    success(resp: IResponse): SuccessResponse;
    error(resp: IErrorResponse): ErrorResponse;
  }
}
export class SuccessResponse {
  _response: IResponse;
  constructor(response: IResponse) {
    this._response = {
      status: true,
      statusCode: response.statusCode || 200,
      data: isArray(response.data)
        ? response.data
        : { ...response.data } || "{}",
      message: response.message || "Success",
    };
  }

  public get response(): IResponse {
    return this._response;
  }
}

export class ErrorResponse {
  resp: IErrorResponse;
  constructor(response: IErrorResponse) {
    this.resp = {
      status: false,
      statusCode: response.statusCode || 400,
      message: response.message || "Error Occured",
      errors: [response.errors || "Error Occured."],
    };
  }

  public get response(): IErrorResponse {
    return this.resp;
  }
}
