import Link from "next/link";
import DeleteCommentButton from "./DeleteCommentButton";
import ProfileAvatar from "@/components/profile/ProfileAvatar";

export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return (
      <div className="p-8 text-center text-neutral-500 text-sm">
        No replies yet. Be the first to reply!
      </div>
    );
  }

  return (
    <div className="divide-y divide-neutral-800/80">
      {comments.map((comment) => (
        <article
          key={comment._id.toString()}
          className="p-4 hover:bg-neutral-900/20 transition-colors flex gap-3"
        >
          <Link
            href={`/profile/${comment.author.username}`}
            className="shrink-0 pt-0.5"
          >
            <ProfileAvatar user={comment.author} size={36} />
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1 leading-snug">
              <div className="flex items-center gap-1.5 min-w-0">
                <Link
                  href={`/profile/${comment.author.username}`}
                  className="font-bold text-sm text-neutral-100 hover:underline truncate"
                >
                  {comment.author.name}
                </Link>
                <span className="text-xs text-neutral-500 truncate">
                  @{comment.author.username}
                </span>
              </div>

              <DeleteCommentButton commentId={comment._id.toString()} />
            </div>

            <p className="text-sm text-neutral-200 mt-1 whitespace-pre-wrap leading-relaxed">
              {comment.text}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
