import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import * as dotenv from 'dotenv';
import errorHandler from './controllers/errorController';
import userRouter from './routes/userRoutes';
import urlRouter from './routes/urlRoutes';
import AppError from './utils/appError';

const app = express();

dotenv.config({ path: `${__dirname}/.env` });
app.set('trust proxy', true);

// security http
app.use(helmet());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
app.use('/api/v1/url', urlRouter);
app.use('/api/v1/user', userRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError('This route is not found!!!', 404));
});
app.use(errorHandler);

export default app;
