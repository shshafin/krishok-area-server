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
    origin: [
      'http://178.16.138.218',
      'http://178.16.138.218:5001',
      'https://krishokarea.com',
      'https://www.krishokarea.com',
      'http://localhost:3000',
    ],
    credentials: true,
  }),
);

const uploadsPath = path.resolve('uploads');

app.use('/uploads', express.static(uploadsPath));
// routes
app.use('/api/v1', router);

// home route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/v1', (req, res) => {
  res.send('API is running...');
});

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
