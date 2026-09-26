import DeleteCommentButton from "./DeleteCommentButton";

export default function CommentList({ comments }) {
  if (comments.length === 0) {
    return <p>No replies yet.</p>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <article key={comment._id}>
          <strong>{comment.author.name}</strong>

          <span>@{comment.author.username}</span>

          <p>{comment.text}</p>

          <DeleteCommentButton commentId={comment._id} />
        </article>
      ))}
    </div>
  );
}
