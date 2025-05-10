// models/resourceModel.js
import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["مقال", "فيديو", "عرض", "PDF"], required: true },
  description: String,
  fileUrl: String, // رابط التحميل أو العرض
  thumbnail: String, // صورة مصغرة في حال كانت فيديو أو عرض
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Resource", resourceSchema);
