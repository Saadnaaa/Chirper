"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { toggleFollow } from "@/actions/users/toggleFollow";

export default function FollowButton({ userId, isFollowing: initialIsFollowing }) {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  async function handleFollow(e) {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);
      // Optimistic update
      setIsFollowing(!isFollowing);

      const result = await toggleFollow(userId);

      if (!result.success) {
        setIsFollowing(initialIsFollowing);
        toast.error(result.message);
        return;
      }

      router.refresh();
    } catch (error) {
      setIsFollowing(initialIsFollowing);
      toast.error("Failed to update follow status");
    } finally {
      setLoading(false);
    }
  }

  if (isFollowing) {
    return (
      <button
        onClick={handleFollow}
        disabled={loading}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`px-4 py-1.5 rounded-full font-bold text-sm transition-all duration-150 border shrink-0 ${
          isHovered
            ? "border-red-500/50 bg-red-500/10 text-red-500"
            : "border-neutral-700 bg-transparent text-neutral-100 hover:border-neutral-500"
        } disabled:opacity-50`}
      >
        {isHovered ? "Unfollow" : "Following"}
      </button>
    );
  }

  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className="px-4 py-1.5 rounded-full font-bold text-sm bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:scale-95 transition-all duration-150 shrink-0 disabled:opacity-50"
    >
      Follow
    </button>
  );
}
