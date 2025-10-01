import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import path from 'path';
import './app/cron/nodeCron';

const app: Application = express();

// parsers
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://react-ui-sandy.vercel.app'],
    credentials: true,
  }),
);

const uploadsPath = path.resolve('uploads');

app.use('/uploads', express.static(uploadsPath));
// routes
app.use('/api/v1', router);

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
