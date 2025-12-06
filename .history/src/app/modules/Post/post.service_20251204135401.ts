import { NotificationService } from '../Notification/notification.service';
import { Post } from './post.model';
import mongoose from 'mongoose';

export const PostService = {
  // 1️⃣ Create Post
  createPost: async (payload: any) => {
    const { userId, text, images, videos } = payload;

    if (images && images.length > 3)
      throw new Error('Maximum 3 images allowed');
    if (videos && videos.length > 3)
      throw new Error('Maximum 3 videos allowed');

    const post = await Post.create({
      user: userId,
      text,
      images,
      videos,
    });

    return post;
  },

  // delete post
  deletePost: async (postId: string, userId: string) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error('Post not found');

    // authorization check
    if (post.user.toString() !== userId.toString())
      throw new Error('Not authorized');

    // Delete the post
    await Post.findByIdAndDelete(postId);
  },

  // 2️⃣ Like / Unlike
  toggleLike: async (postId: any, userId: any) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error('Post not found');

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const index = post.likes.findIndex(
      (id: any) => id.toString() === userObjectId.toString(),
    );

    if (index === -1) {
      post.likes.push(userObjectId);

      // create notification if liker is not the post owner
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
      .populate('user', 'username email profileImage')
      .populate('comments.user', 'username profileImage')
      .populate('likes', 'username profileImage');

    return populatedPost;
  },

  // 3️⃣ Add Comment
  addComment: async (payload: any) => {
    const { postId, userId, text } = payload;
    const post = await Post.findById(postId);
    if (!post) throw new Error('Post not found');

    // add comment
    post.comments.push({ user: userId, text, createdAt: new Date() });
    await post.save();

    // create notification if commenter is not the post owner
    if (post.user.toString() !== userId.toString()) {
      await NotificationService.create({
        sender: userId,
        receiver: post.user,
        type: 'comment',
        post: post._id,
        message: 'commented on your post',
      });
    }

    // populate user inside comments
    const populatedPost = await Post.findById(postId)
      .populate('comments.user', 'username profileImage')
      .populate('user', 'username email profileImage'); // optionally populate post owner

    return populatedPost;
  },

  // 4️⃣ Delete Comment
  deleteComment: async (postId: string, commentId: string, userId: string) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error('Post not found');

    // find the comment
    const comment = post.comments.id(commentId);
    if (!comment) throw new Error('Comment not found');

    // authorization check
    if (comment.user.toString() !== userId.toString())
      throw new Error('Not authorized');

    // remove comment from array
    post.comments = post.comments.filter(
      (c: any) => c._id.toString() !== commentId,
    );

    await post.save();

    return post;
  },

  // 5️⃣ Fetch Posts (optional)
  getAllPosts: async () => {
    const posts = await Post.find()
      .populate('user', 'username email profileImage') // post owner
      .populate('comments.user', 'username profileImage') // comment users
      .populate('likes', 'username profileImage') // liked users
      .sort({ createdAt: -1 });

    return posts;
  },

  getSinglePost: async (id: string) => {
    const result = await Post.findById(id)
      .populate('user') 
      .populate('comments');
    return result;
  },

  // 6️⃣ Fetch User's Posts
  getUserPosts: async (userId: string) => {
    const posts = await Post.find({ user: userId })
      .populate('user', 'username email profileImage')
      .populate('comments.user', 'username profileImage')
      .populate('likes', 'username profileImage')
      .sort({ createdAt: -1 });
    return posts;
  },
};
