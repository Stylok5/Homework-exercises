import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const characterSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    house: { type: String },
    quotes: { type: String },
    hasHouse: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    comments: [commentSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Character", characterSchema);
