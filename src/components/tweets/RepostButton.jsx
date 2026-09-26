"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Repeat2 } from "lucide-react";

import { toggleRepost } from "@/actions/tweets/toggleRepost";

export default function RepostButton({ tweetId, repostsCount, initialReposted = false }) {
  const router = useRouter();
  const [reposts, setReposts] = useState(repostsCount);
  const [reposted, setReposted] = useState(initialReposted);
  const [loading, setLoading] = useState(false);

  async function handleRepost(e) {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);
      // Optimistic update
      setReposted(!reposted);
      setReposts(reposted ? Math.max(0, reposts - 1) : reposts + 1);

      const result = await toggleRepost(tweetId);

      if (!result.success) {
        setReposted(reposted);
        setReposts(repostsCount);
        toast.error(result.message);
        return;
      }

      router.refresh();
    } catch (error) {
      setReposted(reposted);
      setReposts(repostsCount);
      toast.error("Failed to repost chirp");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleRepost}
      disabled={loading}
      className="flex items-center gap-1.5 text-neutral-500 hover:text-emerald-500 group transition-colors text-xs"
      title="Repost"
    >
      <div className="p-2 rounded-full group-hover:bg-emerald-500/10 transition-colors">
        <Repeat2
          className={`w-4 h-4 transition-transform group-hover:scale-110 ${
            reposted ? "text-emerald-500 stroke-[2.5]" : ""
          }`}
        />
      </div>
      <span>{reposts > 0 ? reposts : ""}</span>
    </button>
  );
}
