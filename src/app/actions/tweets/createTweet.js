"use server";

import { connectDB } from "@/lib/database/db";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

import Tweet from "@/models/Tweet";
import cloudinary from "@/lib/cloudinary";

export async function createTweet(text, image = "") {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        success: false,
        message: "You must be logged in",
      };
    }

    if (!text?.trim() && !image) {
      return {
        success: false,
        message: "Tweet cannot be empty",
      };
    }

    if (text && text.length > 280) {
      return {
        success: false,
        message: "Tweet cannot exceed 280 characters",
      };
    }

    let imageUrl = "";
    let imagePublicId = "";

    if (image) {
      const uploadResult = await cloudinary.uploader.upload(image, {
        folder: "x-clone/tweets",
      });

      imageUrl = uploadResult.secure_url;

      imagePublicId = uploadResult.public_id;
    }

    await connectDB();

    const tweet = await Tweet.create({
      author: user._id,
      text: text?.trim() || "",
      image: imageUrl,
      imagePublicId,
    });

    return {
      success: true,
      message: "Tweet created successfully",
      tweet: JSON.parse(JSON.stringify(tweet)),
    };
  } catch (error) {
    console.error("Create tweet error:", error);

    return {
      success: false,
      message: "Failed to create tweet",
    };
  }
}
