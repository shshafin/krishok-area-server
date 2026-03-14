import { NotificationService } from '../Notification/notification.service';
import { Post } from './post.model';
import mongoose from 'mongoose';

export const PostService = {
  // CREATE POST
  createPost: async (payload: any) => {
    const { userId, text, images } = payload;

    // ✅ Fix: video check বাদ, শুধু images
    if (images && images.length > 4)
      throw new Error('Maximum 4 images allowed');

    const post = await Post.create({
      user: userId,
      text,
      images,
    });

    return post;
  },

  // DELETE POST
  deletePost: async (postId: string) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error('Post not found');
    await Post.findByIdAndDelete(postId);
  },

  // TOGGLE LIKE
  toggleLike: async (postId: any, userId: any) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error('Post not found');

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const index = post.likes.findIndex(
      (id: any) => id.toString() === userObjectId.toString(),
    );

    if (index === -1) {
      post.likes.push(userObjectId);
      if (post.user.toString() !== userId.toString()) {
        await NotificationService.create({
          sender: userId,
          receiver: post.user,
          type: 'like',
          post: post._id,
          message: 'liked your post',
        });
      }
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();

    const populatedPost = await Post.findById(postId)
      .populate('user', 'name username email state profileImage')
      .populate('comments.user', 'name username state profileImage')
      .populate('likes', 'name username state profileImage');

    return populatedPost;
  },

  // ADD COMMENT
  addComment: async (payload: any) => {
    const { postId, userId, text } = payload;
    const post = await Post.findById(postId);
    if (!post) throw new Error('Post not found');

    post.comments.push({ user: userId, text, createdAt: new Date() });
    await post.save();

    if (post.user.toString() !== userId.toString()) {
      await NotificationService.create({
        sender: userId,
        receiver: post.user,
        type: 'comment',
        post: post._id,
        message: 'commented on your post',
      });
    }

    const populatedPost = await Post.findById(postId)
      .populate('comments.user', 'name username state profileImage')
      .populate('user', 'name username email state profileImage');

    return populatedPost;
  },

  // DELETE COMMENT
  deleteComment: async (postId: string, commentId: string, userId: string) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error('Post not found');

    const comment = post.comments.id(commentId);
    if (!comment) throw new Error('Comment not found');

    if (comment.user.toString() !== userId.toString())
      throw new Error('Not authorized');

    post.comments = post.comments.filter(
      (c: any) => c._id.toString() !== commentId,
    );

    await post.save();
    return post;
  },

  // GET ALL POSTS
  getAllPosts: async () => {
    return await Post.find()
      .populate('user', 'name username email profileImage')
      .populate('comments.user', 'name username profileImage')
      .populate('likes', 'name username profileImage')
      .sort({ createdAt: -1 });
  },

  // GET SINGLE POST
  getSinglePost: async (id: string) => {
    return await Post.findById(id)
      .populate('user', 'name username email state profileImage')
      .populate('likes')
      .populate('comments');
  },

  // GET USER POSTS
  getUserPosts: async (userId: string) => {
    return await Post.find({ user: userId })
      .populate('user', 'name username email state profileImage')
      .populate('comments.user', 'name username state profileImage')
      .populate('likes', 'name username state profileImage')
      .sort({ createdAt: -1 });
  },
};
