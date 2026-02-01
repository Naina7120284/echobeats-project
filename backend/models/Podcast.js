import mongoose from "mongoose";

const podcastSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    episodeNumber: {
      type: Number,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Podcast = mongoose.model("Podcast", podcastSchema);
