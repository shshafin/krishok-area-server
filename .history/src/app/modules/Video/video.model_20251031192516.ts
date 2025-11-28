import { Schema, model, Document } from 'mongoose';
import { IVideo } from './video.interface';



const VideoSchema = new Schema<IVideo>(
  {
    englishName: { type: String, required: true },
    banglaName: { type: String, required: true },
    location: { type: String, required: true },
  },
  { timestamps: true },
);

export const VideoModel = model<IVideo>('Video', VideoSchema);
