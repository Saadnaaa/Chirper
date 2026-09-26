"use server";

import { connectDB } from "@/lib/database/db";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import Tweet from "@/models/Tweet";
import Notification from "@/models/Notification";

export async function toggleRepost(tweetId) {
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

    const userId = user._id.toString();

    const alreadyReposted = tweet.reposts.some(
      (id) => id.toString() === userId,
    );

    if (alreadyReposted) {
      tweet.reposts = tweet.reposts.filter((id) => id.toString() !== userId);
    } else {
      tweet.reposts.push(user._id);
    }

    await tweet.save();

    if (!alreadyReposted) {
      if (tweet.author.toString() !== user._id.toString()) {
        await Notification.create({
          recipient: tweet.author,
          sender: user._id,
          type: "repost",
          tweet: tweet._id,
        });
      }
    }

    return {
      success: true,
      reposted: !alreadyReposted,
      repostsCount: tweet.reposts.length,
    };
  } catch (error) {
    console.error("Toggle repost error:", error);

    return {
      success: false,
      message: "Failed to update repost",
    };
  }
}
