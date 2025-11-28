import { Schema, model } from 'mongoose';
import { IVideo } from './video.interface';

const VideoSchema = new Schema<IVideo>(
  {
    videoUrl: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true },
);

export const VideoModel = model<IVideo>('Video', VideoSchema);
