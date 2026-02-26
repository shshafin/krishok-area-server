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
      'http://178.16.138.218', // আপনার VPS IP
      'http://178.16.138.218:8000', // সরাসরি পোর্ট (ধরে নিচ্ছি ৮০০০ ইউজ করবেন)
      'https://krishokarea.com', // মেইন ডোমেইন (cPanel frontend)
      'https://www.krishokarea.com', // WWW ভার্সন
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
