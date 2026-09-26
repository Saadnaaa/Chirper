"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { toggleFollow } from "@/app/actions/users/toggleFollow";

export default function FollowButton({ userId, isFollowing }) {
  const router = useRouter();

  async function handleFollow() {
    const result = await toggleFollow(userId);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    router.refresh();
  }

  return (
    <button onClick={handleFollow}>
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
}
