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

export const registerUser = async (name, username, email, password) => {
  try {
    await connectDB();
    const normalizedUsername = normalizeUsername(username);

    if (!name || !normalizedUsername || !email || !password) {
      return {
        success: false,
        message: "All fields are required",
        status: 400,
      };
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Please put a valid email",
        status: 400,
      };
    }

    if (password.length < 8) {
      return {
        success: false,
        message: "Password must be at least 8 characters long",
        status: 400,
      };
    }

    const existingUser = await User.findOne({
      $or: [
        { email },
        { username: normalizedUsername },
        { username: `@${normalizedUsername}` },
      ],
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email or username already exists",
        status: 400,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username: normalizedUsername,
      email,
      password: hashedPassword,
    });

    const cookieStore = await cookies();

    generateTokenAndSetCookie(user._id.toString(), cookieStore);

    return {
      success: true,
      message: "User created successfully",
      status: 201,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "Internal server error",
      status: 500,
    };
  }
};
