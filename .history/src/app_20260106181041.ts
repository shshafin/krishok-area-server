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
      'http://localhost:5173',
      'https://react-ui-sandy.vercel.app',
      'https://rainbow-klepon-d21b1b.netlify.app',
      'https://krishokarea.marcelinestudios.com',
      'https://krishokarea.com',
      'https://krishok-area-client-final.vercel.app',
      'https://krishok-frontend.vercel.app',
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
}

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
