"use client";

import { logoutUser } from "@/actions/auth/logout";
import React, { useState } from "react";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

const LogoutButton = ({ className = "", showText = true }) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to log out");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`flex items-center gap-3 text-neutral-300 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-150 rounded-full py-2.5 px-3 w-full text-left font-medium text-sm disabled:opacity-50 ${className}`}
      title="Log out"
    >
      <LogOut className="w-5 h-5 text-neutral-400 group-hover:text-red-400 shrink-0" />
      {showText && <span>{loading ? "Logging out..." : "Log out"}</span>}
    </button>
  );
};

export default LogoutButton;
