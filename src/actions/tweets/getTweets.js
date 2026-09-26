"use server";

import { connectDB } from "@/lib/database/db";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import Tweet from "@/models/Tweet";

export async function getTweets() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return {
        followingTweets: [],
        forYouTweets: [],
      };
    }

    await connectDB();

    const tweets = await Tweet.find({})
      .populate("author", "name username profilePic")
      .sort({ createdAt: -1 });

    const followingIds = new Set(
      user.following.map((id) => String(id?._id ?? id)),
    );
    const serializedTweets = JSON.parse(JSON.stringify(tweets));

    return {
      followingTweets: serializedTweets.filter((tweet) =>
        followingIds.has(String(tweet.author?._id)),
      ),
      forYouTweets: serializedTweets,
    };
  } catch (error) {
    console.error("Get tweets error:", error);

    return [];
  }
}
