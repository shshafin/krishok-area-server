import { Schema, model, Document } from 'mongoose';
import { IVideo } from './video.interface';

export interface VideoDocument extends IVideo, Document {}

const VideoSchema = new Schema<VideoDocument>(
  {
    englishName: { type: String, required: true },
    banglaName: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true },
);

export const VideoModel = model<VideoDocument>('Video', VideoSchema);
