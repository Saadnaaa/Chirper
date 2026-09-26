"use server";

import { connectDB } from "@/lib/database/db";
import Tweet from "@/models/Tweet";

export async function getTweet(tweetId) {
  try {
    await connectDB();

    const tweet = await Tweet.findById(tweetId)
      .populate("author", "name username profilePic")
      .populate("likes", "name username profilePic");

    if (!tweet) {
      return null;
    }

    return JSON.parse(JSON.stringify(tweet));
  } catch (error) {
    console.error("Get tweet error:", error);

    return null;
  }
}
