/* eslint-disable no-console */
import { Server } from 'socket.io';
import { User } from '../modules/User/user.model';

export const setupSocket = (server: any) => {
  const io = new Server(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('userOnline', async (userId: string) => {
      const user = await User.findById(userId);
      if (user) {
        user.isOnline = true;
        await user.save();
        io.emit('updateUserStatus', { userId, isOnline: true });
      }
      socket.data.userId = userId;
    });

    socket.on('disconnect', async () => {
      const userId = socket.data.userId;
      if (!userId) return;
      const user = await User.findById(userId);
      if (user) {
        user.isOnline = false;
        await user.save();
        io.emit('updateUserStatus', { userId, isOnline: false });
      }
    });
  });

  return io;
};
