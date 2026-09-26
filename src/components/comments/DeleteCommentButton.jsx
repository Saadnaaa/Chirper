"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { deleteComment } from "@/actions/comments/deleteComment";
import { useState } from "react";

export default function DeleteCommentButton({ commentId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this reply?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      const result = await deleteComment(commentId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message || "Reply deleted");
      router.refresh();
    } catch (err) {
      toast.error("Failed to delete reply");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-1 rounded-full text-neutral-500 hover:text-red-500 hover:bg-red-500/10 transition-colors"
      title="Delete reply"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}
