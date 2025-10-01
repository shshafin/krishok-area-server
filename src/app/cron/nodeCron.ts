/* eslint-disable no-console */
import cron from 'node-cron';
import fs from 'fs';
import path from 'path';
import { Post } from '../modules/Post/post.model';

// Cron job: every day at 2:00 AM
cron.schedule('0 2 * * *', async () => {
  console.log('Running cron job: Delete posts older than 7 days');

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  try {
    const oldPosts = await Post.find({ createdAt: { $lt: sevenDaysAgo } });

    for (const post of oldPosts) {
      // delete images
      for (const img of post.images) {
        const filePath = path.join(
          process.cwd(),
          img.replace('/uploads/', 'uploads/'),
        );
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }

      // delete videos
      for (const vid of post.videos) {
        const filePath = path.join(
          process.cwd(),
          vid.replace('/uploads/', 'uploads/'),
        );
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }

      // delete post from DB
      await Post.findByIdAndDelete(post._id);
    }

    console.log(`Deleted ${oldPosts.length} old posts`);
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});
