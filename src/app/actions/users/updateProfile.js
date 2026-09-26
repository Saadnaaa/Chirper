"use server";

import { connectDB } from "@/lib/database/db";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import User from "@/models/User";

export async function updateProfile(
  name,
  bio,
  location,
  website,
  profilePic,
  coverImage,
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        message: "You must be logged in",
        status: 401,
      };
    }

    if (!name?.trim()) {
      return {
        success: false,
        message: "Name is required",
        status: 400,
      };
    }

    if (name.length > 50) {
      return {
        success: false,
        message: "Name cannot exceed 50 characters",
        status: 400,
      };
    }

    if (bio && bio.length > 160) {
      return {
        success: false,
        message: "Bio cannot exceed 160 characters",
        status: 400,
      };
    }

    await connectDB();

    const user = await User.findById(currentUser._id);

    if (!user) {
      return {
        success: false,
        message: "User not found",
        status: 404,
      };
    }

    user.name = name.trim();
    user.bio = bio?.trim() || "";
    user.location = location?.trim() || "";
    user.website = website?.trim() || "";
    user.profilePic = profilePic?.trim() || "";
    user.coverImage = coverImage?.trim() || "";

    await user.save();

    return {
      success: true,
      message: "Profile updated successfully",
      status: 200,
    };
  } catch (error) {
    console.error("Update profile error:", error);

    return {
      success: false,
      message: "Failed to update profile",
      status: 500,
    };
  }
}
