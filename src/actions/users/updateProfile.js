"use server";

import { connectDB } from "@/lib/database/db";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

import User from "@/models/User";
import cloudinary from "@/lib/cloudinary";

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
      };
    }

    if (!name?.trim()) {
      return {
        success: false,
        message: "Name is required",
      };
    }

    if (name.length > 50) {
      return {
        success: false,
        message: "Name cannot exceed 50 characters",
      };
    }

    if (bio && bio.length > 160) {
      return {
        success: false,
        message: "Bio cannot exceed 160 characters",
      };
    }

    await connectDB();

    const user = await User.findById(currentUser._id);

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    user.name = name.trim();
    user.bio = bio?.trim() || "";
    user.location = location?.trim() || "";
    user.website = website?.trim() || "";

    if (profilePic) {
      const oldProfilePicPublicId = user.profilePicPublicId;

      const uploadResult = await cloudinary.uploader.upload(profilePic, {
        folder: "x-clone/profile-pictures",
      });

      user.profilePic = uploadResult.secure_url;

      user.profilePicPublicId = uploadResult.public_id;

      if (oldProfilePicPublicId) {
        await cloudinary.uploader.destroy(oldProfilePicPublicId);
      }
    }

    if (coverImage) {
      const oldCoverImagePublicId = user.coverImagePublicId;

      const uploadResult = await cloudinary.uploader.upload(coverImage, {
        folder: "x-clone/cover-images",
      });

      user.coverImage = uploadResult.secure_url;

      user.coverImagePublicId = uploadResult.public_id;

      if (oldCoverImagePublicId) {
        await cloudinary.uploader.destroy(oldCoverImagePublicId);
      }
    }

    await user.save();

    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {
    console.error("Update profile error:", error);

    return {
      success: false,
      message: "Failed to update profile",
    };
  }
}
