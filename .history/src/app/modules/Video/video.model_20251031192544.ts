import { Schema, model, Document } from 'mongoose';
import { IVideo } from './video.interface';

const VideoSchema = new Schema<IVideo>(
  {
    video: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true },
);

export const VideoModel = model<IVideo>('Video', VideoSchema);
