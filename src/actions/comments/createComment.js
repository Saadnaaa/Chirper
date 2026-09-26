"use server";

import { connectDB } from "@/lib/database/db";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import Comment from "@/models/Comment";
import Tweet from "@/models/Tweet";
import Notification from "@/models/Notification";

export async function createComment(tweetId, text) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        success: false,
        message: "You must be logged in",
      };
    }

    if (!text?.trim()) {
      return {
        success: false,
        message: "Comment cannot be empty",
      };
    }

    if (text.length > 280) {
      return {
        success: false,
        message: "Comment cannot exceed 280 characters",
      };
    }

    await connectDB();

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return {
        success: false,
        message: "Tweet not found",
      };
    }

    const comment = await Comment.create({
      author: user._id,
      tweet: tweetId,
      text: text.trim(),
    });

    if (tweet.author.toString() !== user._id.toString()) {
      await Notification.create({
        recipient: tweet.author,
        sender: user._id,
        type: "comment",
        tweet: tweet._id,
        comment: comment._id,
      });
    }

    return {
      success: true,
      message: "Comment added",
      comment: JSON.parse(JSON.stringify(comment)),
    };
  } catch (error) {
    console.error("Create comment error:", error);

    return {
      success: false,
      message: "Failed to create comment",
    };
  }
}
