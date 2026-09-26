"use server";

import { connectDB } from "@/lib/database/db";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import Comment from "@/models/Comment";
import Tweet from "@/models/Tweet";

export async function createComment(tweetId, text) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        success: false,
        message: "You must be logged in",
        status: 401,
      };
    }

    if (!text?.trim()) {
      return {
        success: false,
        message: "Comment cannot be empty",
        status: 400,
      };
    }

    if (text.length > 280) {
      return {
        success: false,
        message: "Comment cannot exceed 280 characters",
        status: 400,
      };
    }

    await connectDB();

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return {
        success: false,
        message: "Tweet not found",
        status: 404,
      };
    }

    const comment = await Comment.create({
      author: user._id,
      tweet: tweetId,
      text: text.trim(),
    });

    return {
      success: true,
      message: "Comment added",
      comment: JSON.parse(JSON.stringify(comment)),
      status: 201,
    };
  } catch (error) {
    console.error("Create comment error:", error);

    return {
      success: false,
      message: "Failed to create comment",
      status: 500,
    };
  }
}
