"use server";

import { generateTokenAndSetCookie } from "@/lib/auth";
import { connectDB } from "@/lib/database/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export const loginUser = async (username, password) => {
  try {
    await connectDB();
    if (!username || !password) {
      return {
        success: false,
        message: "Email and password are required",
        status: 400,
      };
    }

    const user = await User.findOne({ username });

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
