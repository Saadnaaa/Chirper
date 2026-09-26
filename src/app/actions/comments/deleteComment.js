"use server";

import { connectDB } from "@/lib/database/db";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import Comment from "@/models/Comment";

export async function deleteComment(commentId) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        success: false,
        message: "You must be logged in",
        status: 401,
      };
    }

    await connectDB();

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return {
        success: false,
        message: "Comment not found",
        status: 404,
      };
    }

    if (comment.author.toString() !== user._id.toString()) {
      return {
        success: false,
        message: "You can only delete your own comments",
        status: 403,
      };
    }

    await Comment.findByIdAndDelete(commentId);

    return {
      success: true,
      message: "Comment deleted",
      status: 200,
    };
  } catch (error) {
    console.error("Delete comment error:", error);

    return {
      success: false,
      message: "Failed to delete comment",
    };
  }
}
