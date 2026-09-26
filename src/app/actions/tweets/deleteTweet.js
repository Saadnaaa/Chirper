"use server";

import { connectDB } from "@/lib/database/db";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

import Tweet from "@/models/Tweet";
import cloudinary from "@/lib/cloudinary";

export async function deleteTweet(tweetId) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        success: false,
        message: "You must be logged in",
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

    if (tweet.author.toString() !== user._id.toString()) {
      return {
        success: false,
        message: "You can only delete your own tweets",
      };
    }

    if (tweet.imagePublicId) {
      await cloudinary.uploader.destroy(tweet.imagePublicId);
    }

    await Tweet.findByIdAndDelete(tweetId);

    return {
      success: true,
      message: "Tweet deleted successfully",
    };
  } catch (error) {
    console.error("Delete tweet error:", error);

    return {
      success: false,
      message: "Failed to delete tweet",
    };
  }
}
