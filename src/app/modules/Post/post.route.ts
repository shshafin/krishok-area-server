import { Router } from 'express';
import * as PostController from './post.controller';
import auth from '../../middlewares/auth';
import { upload } from '../../middlewares/upload';

const router = Router();

// Create Post
// ✅ Fix: video বাদ, শুধু images — maxCount 4 করলাম
router.post(
  '/create',
  auth(),
  upload.fields([{ name: 'images', maxCount: 4 }]),
  PostController.createPost,
);

// Delete Post
router.delete('/:postId', PostController.deletePost);

// Toggle Like / Unlike
router.put('/:postId/like', auth(), PostController.toggleLike);

// Add Comment
router.post('/:postId/comment', auth(), PostController.addComment);

// Delete Comment
router.delete(
  '/:postId/comment/:commentId',
  auth(),
  PostController.deleteComment,
);

// Get All Posts
router.get('/', PostController.getAllPosts);

// Get User's Posts
router.get('/profile/:userId/posts', PostController.getUserProfilePosts);

// Get Single Post
router.get('/:postId', PostController.getSinglePost);

export const PostRoutes = router;
