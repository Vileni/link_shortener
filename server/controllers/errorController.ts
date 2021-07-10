import { NextFunction, Request, Response } from 'express';
import AppError from '@utils/appError';

const sendErrorDev = (err: AppError, _req: Request, res: Response) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, _req: Request, res: Response) => {
  if (err.isoperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.error('ERROR 💥', err);

  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};

const DuplicateFieldIndb = (err: any) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

export default (err: AppError, req: Request, res: Response, next: NextFunction): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  }

  if (process.env.NODE_ENV === 'production') {
    // @ts-ignore:Mongoose will Throw Duplicate error with code 11000
    if (err.code === 11000) {
      err = DuplicateFieldIndb(err);
    }
    sendErrorProd(err, req, res);
  }

  if (process.env.NEXT) next();
};
