import { RequestHandler } from "express";
import { Maybe, AnyObject, ObjectSchema, ValidationError } from "yup";
import { StatusCodes } from "http-status-codes";

type TProperty = 'body' | 'header' | 'params' | 'query';

type TGetSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>;
type TAllSchema = Record<TProperty, ObjectSchema<any>>;
type TGetAllSchema = (getSchema: TGetSchema) => Partial<TAllSchema>;

export const validation = (getAllSchemas: TGetAllSchema): RequestHandler => {
  return async (req, res, next) => {
    const schemas = getAllSchemas(schema => schema);
    const errorsResult: Record<string, Record<string, string>> = {};

    for (const [key, schema] of Object.entries(schemas)) {
      try {
        await schema.validate(req[key as TProperty], { abortEarly: false });
      } catch (err) {
        const yupError = err as ValidationError;
        const errors: Record<string, string> = {};
        yupError.inner.forEach(error => {
          if (!error.path) return;
          errors[error.path] = error.message;
        });
        errorsResult[key as TProperty] = errors;
      }
    }

    if (Object.keys(errorsResult).length === 0) {
      return next();
    }

    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
  };
};