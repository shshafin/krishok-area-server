/* eslint-disable no-console */
import cron from 'node-cron';
import fs from 'fs';
import path from 'path';
import { Post } from '../modules/Post/post.model';

// ✅ Fix: duplicate run ঠেকাতে initialized check
let initialized = false;

export const startCronJobs = () => {
  if (initialized) return;
  initialized = true;

  // প্রতি সপ্তাহে রবিবার রাত ২টায় চলবে
  cron.schedule('0 2 * * 0', async () => {
    console.log('[Cron] Running: Delete posts older than 7 days');

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    try {
      const oldPosts = await Post.find({ createdAt: { $lt: sevenDaysAgo } });

      if (oldPosts.length === 0) {
        console.log('[Cron] No old posts found');
        return;
      }

      let deletedCount = 0;
      let fileDeletedCount = 0;

      for (const post of oldPosts) {
        // ✅ Fix: images + videos একসাথে handle
        const allFiles = [...(post.images || []), ...(post.videos || [])];

        for (const fileUrl of allFiles) {
          if (!fileUrl || typeof fileUrl !== 'string') continue;

          // ✅ Fix: /uploads/filename.jpg → uploads/filename.jpg
          const relativePath = fileUrl.startsWith('/')
            ? fileUrl.slice(1)
            : fileUrl;

          const absolutePath = path.join(process.cwd(), relativePath);

          try {
            if (fs.existsSync(absolutePath)) {
              fs.unlinkSync(absolutePath);
              fileDeletedCount++;
              console.log(`[Cron] Deleted file: ${absolutePath}`);
            }
          } catch (fileErr) {
            // একটা file delete fail হলে বাকিগুলো চলবে
            console.error(
              `[Cron] Failed to delete file: ${absolutePath}`,
              fileErr,
            );
          }
        }

        await Post.findByIdAndDelete(post._id);
        deletedCount++;
      }

      console.log(
        `[Cron] Done — ${deletedCount} posts deleted, ${fileDeletedCount} files removed`,
      );
    } catch (error) {
      console.error('[Cron] Error:', error);
    }
  });

  console.log('[Cron] Scheduled: weekly post cleanup every Sunday at 2:00 AM');
};
