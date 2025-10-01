import { Router } from 'express';
import * as PostController from './post.controller';
import auth from '../../middlewares/auth';
import { upload } from '../../middlewares/upload';

const router = Router();

// --------------------
// POST ROUTES
// --------------------

// Create Post
router.post(
  '/create',
  upload.fields([
    { name: 'images', maxCount: 3 },
    { name: 'videos', maxCount: 3 },
  ]),
  auth(),
  PostController.createPost,
);

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

export const PostRoutes = router;
