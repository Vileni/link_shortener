import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { promisify } from 'util';
import * as dotenv from 'dotenv';
import catchAsync from '@utils/catchAsync';
import AppError from '@utils/appError';
import User, { IUser } from '@server/models/userModel';

dotenv.config({ path: `${__dirname}/.env` });

const signToken = (id: string) => {
  return jwt.sign({ id }, `${process.env.SECRET_KEY}`, {
    expiresIn: '10h',
  });
};

const createSendToken = (user: IUser, statusCode: number, req: Request, res: Response) => {
  const token = signToken(user._id);
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 10 * 60 * 60 * 1000),
    httpOnly: true,
    // secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });
  const { linksCreated, visited, status, _id, email, name } = user as IUser;

  res.status(statusCode).json({
    status: 'success',
    data: { linksCreated, visited, status, _id, email, name },
  });
};

const signUp = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
  const { email, name, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(new AppError('Confirm password is not same as password.', 401));
  }
  
  const user = await User.create({
    email,
    name,
    password,
    confirmPassword,
  });

  if (user) {
    createSendToken(user, 200, req, res);
  } else {
    next(new AppError('Sign up problem', 401));
  }
});

const logIn = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
  const { email, password } = req.body;
  console.log(email, password);

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  return createSendToken(user, 200, req, res);
});
const Me = catchAsync(async (req: Request|any, res: Response): Promise<void> => {
  const { id } = req.user;
  const me = await User.findById(id);
  res.status(200).json({
    status: 'success',
    data: me,
  });
});
const protect = catchAsync(async (req: Request|any, res: Response, next: NextFunction): Promise<void | NextFunction> => {
  // 1) Getting token and check if it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    [, token] = req.headers.authorization.split(' ');
  } else if (req.headers.cookie) {
    [, token] = req.headers.cookie.split('=');
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 201));
  }

  // 2) Verification token

  // @ts-ignore
  const decoded: { id: string; iat: string } = await promisify(jwt.verify)(token, process.env.SECRET_KEY);

  // 3) Check if user still exists
  const currentUser: IUser | null = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token does no longer exist.', 401));
  }



  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  return next();
});



const logOut = catchAsync(async (req: Request, res: Response): Promise<void> => {
  res.cookie('jwt', 'You are loged out!', {
    expires: new Date(Date.now() + 30),
    // httpOnly: true,
    // secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });
  res.status(200).json({
    status: 'success',
  });
});

const alreadyIn = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    [, token] = req.headers.authorization.split(' ');
  } else if (req.headers.cookie) {
    [, token] = req.headers.cookie.split('=');
  }
  // if there is no token then just continue it will not make troubles.
  if (!token) {
    return next();
  }
  // @ts-ignore
  const decoded: { id: string; iat: string } = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
  // 3) Check if user still exists
  const currentUser: IUser | null = await User.findById(decoded.id);
  if (!currentUser) {
    return next();
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  // @ts-ignore
  req.user = currentUser;

  return next();
});

export { signUp, logIn, protect, logOut,  alreadyIn, Me };
