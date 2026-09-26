"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { toggleLike } from "@/app/actions/tweets/toggleLike";

export default function LikeButton({ tweetId, likesCount }) {
  const router = useRouter();

  async function handleLike() {
    const result = await toggleLike(tweetId);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    router.refresh();
  }

  return <button onClick={handleLike}>Like ({likesCount})</button>;
}
