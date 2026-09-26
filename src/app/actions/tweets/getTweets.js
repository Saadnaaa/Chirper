"use server";

import { connectDB } from "@/lib/database/db";
import Tweet from "@/models/Tweet";

export const getTweets = async () => {
  try {
    await connectDB();

    const tweets = await Tweet.find()
      .populate("author", "name username profilePic")
      .sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify(tweets));
  } catch (error) {
    console.error("Get tweets error:", error);

    return [];
  }
};
