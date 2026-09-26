"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Heart } from "lucide-react";

import { toggleLike } from "@/actions/tweets/toggleLike";

export default function LikeButton({ tweetId, likesCount, initialLiked = false }) {
  const router = useRouter();
  const [likes, setLikes] = useState(likesCount);
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);

  async function handleLike(e) {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);
      // Optimistic update
      setLiked(!liked);
      setLikes(liked ? Math.max(0, likes - 1) : likes + 1);

      const result = await toggleLike(tweetId);

      if (!result.success) {
        setLiked(liked);
        setLikes(likesCount);
        toast.error(result.message);
        return;
      }

      router.refresh();
    } catch (error) {
      setLiked(liked);
      setLikes(likesCount);
      toast.error("Failed to like chirp");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className="flex items-center gap-1.5 text-neutral-500 hover:text-pink-500 group transition-colors text-xs"
      title="Like"
    >
      <div className="p-2 rounded-full group-hover:bg-pink-500/10 transition-colors">
        <Heart
          className={`w-4 h-4 transition-transform group-hover:scale-110 ${
            liked ? "fill-pink-500 text-pink-500" : ""
          }`}
        />
      </div>
      <span>{likes > 0 ? likes : ""}</span>
    </button>
  );
}
