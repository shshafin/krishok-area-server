import { Schema, model, Document } from 'mongoose';
import { IVideo } from './video.interface';



const VideoSchema = new Schema<IVideo>(
  {
    
    location: { type: String, required: true },
  },
  { timestamps: true },
);

export const VideoModel = model<IVideo>('Video', VideoSchema);
