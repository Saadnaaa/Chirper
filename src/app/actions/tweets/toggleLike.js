"use server";

import { connectDB } from "@/lib/database/db";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import Tweet from "@/models/Tweet";

export async function toggleLike(tweetId) {
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

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return {
        success: false,
        message: "Tweet not found",
        status: 404,
      };
    }

    const userId = user._id.toString();

    const alreadyLiked = tweet.likes.some((id) => id.toString() === userId);

    if (alreadyLiked) {
      tweet.likes = tweet.likes.filter((id) => id.toString() !== userId);
    } else {
      tweet.likes.push(user._id);
    }

    await tweet.save();

    return {
      success: true,
      liked: !alreadyLiked,
      likesCount: tweet.likes.length,
    };
  } catch (error) {
    console.error("Toggle like error:", error);

    return {
      success: false,
      message: "Failed to update like",
    };
  }
}
