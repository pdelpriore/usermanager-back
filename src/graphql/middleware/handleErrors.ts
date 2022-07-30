import { ArgumentValidationError, MiddlewareFn } from "type-graphql";
import { QueryFailedError } from "typeorm";
import { IContext } from "../context/Context";
import { getErrorEnum } from "../errors/method/getErrorEnum";

const handleErrors: MiddlewareFn<IContext> = async (_, next) => {
  try {
    return await next();
  } catch (err) {
    if (err instanceof ArgumentValidationError) {
      const errorEnums = err.validationErrors.map(
        ({ property, constraints }: any) => {
          const errorKey = `${
            Object.keys(constraints)[0]
          }_${property}`.toUpperCase();

          return getErrorEnum(errorKey, "ArgumentValidationError") as string;
        }
      );

      errorEnums.forEach((errorEnum) => {
        throw new Error(errorEnum);
      });
    } else if (err instanceof QueryFailedError) {
      const errDetail = err.driverError.detail;
      const targetProperty = errDetail.slice(
        errDetail.indexOf("(") + 1,
        errDetail.indexOf(")")
      );
      const errorKey = `${err.driverError.code}-${targetProperty}`;

      const errorEnum = getErrorEnum(errorKey, "QueryFailedError") as string;
      throw new Error(errorEnum);
    } else {
      throw err;
    }
  }
};

export default handleErrors;
