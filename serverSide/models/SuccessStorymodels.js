import mongoose from "mongoose";

const successStorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    shortStory: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    //ali addition
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SuccessStory", successStorySchema);
