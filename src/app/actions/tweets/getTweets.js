"use server";

import { connectDB } from "@/lib/database/db";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import Tweet from "@/models/Tweet";

export async function getTweets() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return [];
    }

    await connectDB();

    const userIds = [user._id, ...user.following];

    const tweets = await Tweet.find({
      author: {
        $in: userIds,
      },
    })
      .populate("author", "name username profilePic")
      .sort({
        createdAt: -1,
      });

    return JSON.parse(JSON.stringify(tweets));
  } catch (error) {
    console.error("Get tweets error:", error);

    return [];
  }
}
