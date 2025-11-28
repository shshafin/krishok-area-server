import { model, Schema } from 'mongoose';

const notificationSchema = new Schema<any>(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['follow', 'like', 'comment'], required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post' }, // optional
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Notification = model('Notification', notificationSchema);
