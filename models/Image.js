import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},
  {
    timestamps:true,
  }
);

export default mongoose.models.Image || mongoose.model("Image", imageSchema);
