"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { deleteComment } from "@/app/actions/comments/deleteComment";

export default function DeleteCommentButton({ commentId }) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?",
    );

    if (!confirmed) {
      return;
    }

    const result = await deleteComment(commentId);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    router.refresh();
  }

  return <button onClick={handleDelete}>Delete</button>;
}
