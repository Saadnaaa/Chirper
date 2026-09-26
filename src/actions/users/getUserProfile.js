"use server";

import { connectDB } from "@/lib/database/db";
import User from "@/models/User";
import Tweet from "@/models/Tweet";

function normalizeUsername(username) {
  return String(username ?? "")
    .trim()
    .replace(/^(?:@|%40)+/gi, "");
}

export async function getUserProfile(username) {
  try {
    await connectDB();

    const normalizedUsername = normalizeUsername(username);
    const user = await User.findOne({
      username: { $in: [normalizedUsername, `@${normalizedUsername}`] },
    }).select("-password");

    await user?.populate([
      { path: "followers", select: "name username profilePic" },
      { path: "following", select: "name username profilePic" },
    ]);

    if (!user) {
      return null;
    }

    const tweets = await Tweet.find({
      author: user._id,
    })
      .populate("author", "name username profilePic")
      .sort({ createdAt: -1 });

    return {
      user: JSON.parse(JSON.stringify(user)),
      tweets: JSON.parse(JSON.stringify(tweets)),
    };
  } catch (error) {
    console.error("Get user profile error:", error);

    return null;
  }
}
