import mongoose from "mongoose";

const UploadedImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.uploadedImage ||
  mongoose.model("uploadedImage", UploadedImageSchema);
