import { Request, Response } from 'express';
import { PostService } from './post.service';
import httpStatus from 'http-status';

// --------------------
// CREATE POST
// --------------------
export const createPost = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;

    const { text } = req.body;

    // multer files
    const images =
      req.files && (req.files as any).images
        ? (req.files as any).images.map(
            (file: any) => `/uploads/${file.filename}`,
          )
        : [];
    const videos =
      req.files && (req.files as any).videos
        ? (req.files as any).videos.map(
            (file: any) => `/uploads/${file.filename}`,
          )
        : [];

    const post = await PostService.createPost({ userId, text, images, videos });

    res.status(httpStatus.CREATED).json({
      success: true,
      message: 'Post created successfully',
      post,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

// --------------------
// DELETE POST
// --------------------
export const deletePost = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { postId } = req.params;

    await PostService.deletePost(postId, userId);

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};
// --------------------

// --------------------
// TOGGLE LIKE
// --------------------
export const toggleLike = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { postId } = req.params;

    const post = await PostService.toggleLike(postId, userId);

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Like status updated',
      post,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

// --------------------
// ADD COMMENT
// --------------------
export const addComment = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { postId } = req.params;
    const { text } = req.body;

    const post = await PostService.addComment({ postId, userId, text });

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Comment added',
      post,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

// --------------------
// DELETE COMMENT
// --------------------
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const { postId, commentId } = req.params;

    const post = await PostService.deleteComment(postId, commentId, userId);

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Comment deleted',
      post,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

// --------------------
// GET ALL POSTS
// --------------------
export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await PostService.getAllPosts();

    res.status(httpStatus.OK).json({
      success: true,
      posts,
    });
  } catch (error: any) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

// --------------------
