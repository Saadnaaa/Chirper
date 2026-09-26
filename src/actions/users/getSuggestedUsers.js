"use server";

import { connectDB } from "@/lib/database/db";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import User from "@/models/User";

export async function getSuggestedUsers() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    await connectDB();

    const users = await User.find({
      _id: {
        $ne: currentUser._id,
        $nin: currentUser.following,
      },
    })
      .select("name username profilePic bio followers")
      .limit(5);

    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error("Get suggested users error:", error);

    return [];
  }
}
