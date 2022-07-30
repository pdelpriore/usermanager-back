import { ErrorCodes, ErrorResponse } from "../Errors";

export const getErrorEnum = (errorKey: string | number, errorType: string) =>
  errorType === "ArgumentValidationError"
    ? ErrorResponse[errorKey as keyof typeof ErrorResponse]
    : errorType === "QueryFailedError"
    ? ErrorResponse[
        ErrorCodes[
          errorKey as keyof typeof ErrorCodes
        ] as keyof typeof ErrorResponse
      ]
    : null;
