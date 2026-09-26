import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
      required: true,
    },

    text: {
      type: String,
      required: true,
      maxlength: 280,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
