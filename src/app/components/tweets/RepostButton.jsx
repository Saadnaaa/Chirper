"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { toggleRepost } from "@/app/actions/tweets/toggleRepost";

export default function RepostButton({ tweetId, repostsCount }) {
  const router = useRouter();

  async function handleRepost() {
    const result = await toggleRepost(tweetId);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    router.refresh();
  }

  return <button onClick={handleRepost}>Repost ({repostsCount})</button>;
}
