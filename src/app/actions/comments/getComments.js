"use server";

import { connectDB } from "@/lib/database/db";
import Comment from "@/models/Comment";

export async function getComments(tweetId) {
  try {
    await connectDB();

    const comments = await Comment.find({
      tweet: tweetId,
    })
      .populate("author", "name username profilePic")
      .sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(comments));
  } catch (error) {
    console.error("Get comments error:", error);

    return [];
  }
}
