import { model, Schema } from 'mongoose';

const commentSchema = new Schema<any>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true },
);

const postSchema = new Schema<any>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, trim: true },
    images: {
      type: [String],
      validate: {
        validator: function (val: string[]) {
          return val.length <= 3;
        },
        message: 'Maximum 3 images allowed',
      },
    },

    videos: {
      type: [String],
      validate: {
        validator: function (val: string[]) {
          return val.length <= 3;
        },
        message: 'Maximum 3 videos allowed',
      },
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [commentSchema],
  },
  { timestamps: true },
);

export const Post = model<any>('Post', postSchema);
