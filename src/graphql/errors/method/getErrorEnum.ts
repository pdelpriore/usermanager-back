import { ErrorCodes, ErrorResponse } from "../Errors";

enum ErrorType {
  ARGUMENT_VALIDATION_ERROR = "ArgumentValidationError",
  QUERY_FAILED_ERROR = "QueryFailedError",
}

export const getErrorEnum = (errorKey: string | number, errorType: string) =>
  errorType === ErrorType.ARGUMENT_VALIDATION_ERROR
    ? ErrorResponse[errorKey as keyof typeof ErrorResponse]
    : errorType === ErrorType.QUERY_FAILED_ERROR
    ? ErrorResponse[
        ErrorCodes[
          errorKey as keyof typeof ErrorCodes
        ] as keyof typeof ErrorResponse
      ]
    : null;
