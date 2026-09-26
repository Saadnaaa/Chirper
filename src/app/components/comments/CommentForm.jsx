"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { createComment } from "@/app/actions/comments/createComment";

export default function CommentForm({ tweetId }) {
  const router = useRouter();

  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    const result = await createComment(tweetId, text);

    setIsSubmitting(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Comment added");

    setText("");

    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Post your reply"
        maxLength={280}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Replying..." : "Reply"}
      </button>
    </form>
  );
}
