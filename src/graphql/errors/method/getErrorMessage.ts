import { ErrorTypes } from "../Errors";

export const getErrorMessage = (errorType: string): string =>
  ErrorTypes[errorType];
