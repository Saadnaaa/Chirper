"use server";

import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { connectDB } from "@/lib/database/db";
import Tweet from "@/models/Tweet";

export const deleteTweet = async (tweetId) => {
  try {
    await connectDB();
    const user = await getCurrentUser();

    if (!user) {
      return {
        success: false,
        message: "You must be logged in",
        status: 401,
      };
    }

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return {
        success: false,
        message: "Tweet not found",
        status: 404,
      };
    }

    if (tweet.author.toString() !== user._id.toString()) {
      return {
        success: false,
        message: "You can only delete your own tweets",
        status: 403,
      };
    }

    await Tweet.findByIdAndDelete(tweetId);

    return {
      success: true,
      message: "Tweet deleted successfully",
      status: 200,
    };
  } catch (error) {
    console.error("Delete tweet error:", error);

    return {
      success: false,
      message: "Failed to delete tweet",
    };
  }
};
