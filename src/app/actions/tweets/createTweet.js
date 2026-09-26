"use server";

import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { connectDB } from "@/lib/database/db";
import Tweet from "@/models/Tweet";

export const createTweet = async (text, image = "") => {
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
    if (!text?.trim() && !image) {
      return {
        success: false,
        message: "Tweet cannot be empty",
        status: 400,
      };
    }
    if (text && text.length > 280) {
      return {
        success: false,
        message: "Tweet cannot exceed 280 characters",
      };
    }

    if (text && text.length > 280) {
      return {
        success: false,
        message: "Tweet cannot exceed 280 characters",
      };
    }

    const tweet = await Tweet.create({
      author: user._id,
      text: text?.trim() || "",
      image,
    });

    return {
      success: true,
      message: "Tweet created successfully",
      tweet: JSON.parse(JSON.stringify(tweet)),
      status: 201,
    };
  } catch (error) {
    console.error("Create tweet error:", error);

    return {
      success: false,
      message: "Failed to create tweet",
    };
  }
};
