import jwt from "jsonwebtoken";
import { connectDB } from "../database/db";
import { cookies } from "next/headers";
import User from "@/models/User";

export const getCurrentUser = async () => {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId.toString())
      .select("-password")
      .lean();

    if (!user) {
      return null;
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    if (error?.digest === "DYNAMIC_SERVER_USAGE") {
      throw error;
    }
    console.error("Get current user error:", error);

    return null;
  }
};
