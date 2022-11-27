import { IErrorResponse, IResponse } from "./interfaces/response.interface";
import { ErrorResponse, SuccessResponse } from "./types/express.types";

export default {
  success: {
    value: function (success: IResponse) {
      const successResponse = new SuccessResponse(success);
      return this.status(successResponse.response.statusCode || 200).json(
        successResponse.response
      );
    },
  },
  error: {
    value: function (error: IErrorResponse) {
      const errorResponse = new ErrorResponse(error);
      return this.status(errorResponse.response.statusCode || 400).json({
        status: errorResponse.response.status || false,
        ...errorResponse.response,
      });
    },
  },
};
