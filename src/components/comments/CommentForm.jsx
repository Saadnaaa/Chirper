"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { createComment } from "@/actions/comments/createComment";

export default function CommentForm({ tweetId }) {
  const router = useRouter();

  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!text.trim()) {
      toast.error("Please enter a reply");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createComment(tweetId, text);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success("Reply posted!");
      setText("");
      router.refresh();
    } catch (error) {
      toast.error("Failed to post reply");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Post your reply"
        maxLength={280}
        className="flex-1 bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 text-sm text-neutral-100 placeholder-neutral-500 outline-none focus:border-sky-500 transition-colors"
      />

      <button
        type="submit"
        disabled={isSubmitting || !text.trim()}
        className="px-5 py-2 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm shadow-md transition disabled:opacity-50"
      >
        {isSubmitting ? "Replying..." : "Reply"}
      </button>
    </form>
  );
}
