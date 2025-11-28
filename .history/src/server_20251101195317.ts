/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
import { Server } from 'http';
import { setupSocket } from './app/sockets';
import './app/cron/nodeCron';

let server: Server;
const port = config.port;

async function main() {
  try {
    // 1️⃣ Connect MongoDB
    await mongoose.connect(config.db_url as string);
    console.log('MongoDB connected');

    // 2️⃣ Start server
    server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    // 3️⃣ Setup Socket.IO after server is ready
    setupSocket(server);
  } catch (err) {
    console.log(err);
  }
}

main();

// Handle unhandled promise rejections
process.on('unhandledRejection', () => {
  console.log(`😈🙉 unhandledRejection detected. Shutting down...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', () => {
  console.log(`😈🙉 uncaughtException detected. Shutting down...`);
  process.exit(1);
});
