"use server";

import { generateTokenAndSetCookie } from "@/lib/auth";
import { connectDB } from "@/lib/database/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

function normalizeUsername(username) {
  return String(username ?? "")
    .trim()
    .replace(/^(?:@|%40)+/gi, "");
}

export const loginUser = async (username, password) => {
  try {
    await connectDB();
    const normalizedUsername = normalizeUsername(username);

    if (!normalizedUsername || !password) {
      return {
        success: false,
        message: "Email and password are required",
        status: 400,
      };
    }

    const user = await User.findOne({
      username: { $in: [normalizedUsername, `@${normalizedUsername}`] },
    });

    if (!user || !user.password) {
      return {
        success: false,
        message: "Invalid username or password",
        status: 400,
      };
    }

    const isPassCorrect = await bcrypt.compare(
      String(password),
      String(user.password),
    );

    if (!isPassCorrect) {
      return {
        success: false,
        message: "Invalid username or password",
        status: 400,
      };
    }

    const cookieStore = await cookies();

    generateTokenAndSetCookie(user._id.toString(), cookieStore);

    return {
      success: true,
      message: "Logged in successfully",
      status: 200,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Internal server error",
      status: 500,
    };
  }
};
