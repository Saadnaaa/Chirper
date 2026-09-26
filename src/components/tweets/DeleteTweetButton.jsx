"use client";

import { deleteTweet } from "@/actions/tweets/deleteTweet";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const DeleteTweetButton = ({ tweetId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete this chirp?")) {
      return;
    }

    try {
      setLoading(true);
      const result = await deleteTweet(tweetId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message || "Chirp deleted");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete chirp");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center text-neutral-500 hover:text-red-500 group transition-colors"
      title="Delete chirp"
    >
      <div className="p-2 rounded-full group-hover:bg-red-500/10 transition-colors">
        <Trash2 className="w-4 h-4" />
      </div>
    </button>
  );
};

export default DeleteTweetButton;
