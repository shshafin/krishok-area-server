/* eslint-disable no-console */
import { Server } from 'socket.io';

interface OnlineUsersMap {
  [key: string]: string; // userId: socketId
}

export const setupSocket = (server: any) => {
  const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] },
  });

  const onlineUsers: OnlineUsersMap = {};

  io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);

    // user connect করলে তার userId track করা
    socket.on('userConnected', (userId: string) => {
      onlineUsers[userId] = socket.id;
      console.log(`User ${userId} connected as ${socket.id}`);
    });

    // 🎯 Follow / Like / Comment notification পাঠানোর event
    socket.on('sendNotification', (data) => {
      const { senderId, receiverId, type, message } = data;
      const receiverSocketId = onlineUsers[receiverId];

      if (receiverSocketId) {
        io.to(receiverSocketId).emit('getNotification', {
          senderId,
          type, // "follow" | "like" | "comment"
          message, // optional custom text
        });
        console.log(`📨 Notification sent to ${receiverId}`);
      } else {
        console.log(`❌ Receiver ${receiverId} not connected`);
      }
    });

    // disconnect
    socket.on('disconnect', () => {
      for (const [userId, socketId] of Object.entries(onlineUsers)) {
        if (socketId === socket.id) {
          delete onlineUsers[userId];
          console.log(`❌ User ${userId} disconnected`);
          break;
        }
      }
    });
  });

  return io;
};
