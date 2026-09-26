"use client";

import { deleteTweet } from "@/app/actions/tweets/deleteTweet";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const DeleteTweetButton = ({ tweetId }) => {
  const router = useRouter();

  async function handleDelete() {
    const result = await deleteTweet(tweetId);

    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success(result.message);

    router.refresh(); // Refresh the page to reflect the changes);
  }
  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteTweetButton;
