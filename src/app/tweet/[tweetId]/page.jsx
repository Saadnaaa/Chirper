import { notFound } from "next/navigation";

import { getTweet } from "@/app/actions/tweets/getTweet";
import { getComments } from "@/app/actions/comments/getComments";

import CommentForm from "@/app/components/comments/CommentForm";
import CommentList from "@/app/components/comments/CommentList";

export default async function TweetPage({ params }) {
  const { tweetId } = await params;

  const tweet = await getTweet(tweetId);

  if (!tweet) {
    notFound();
  }

  const comments = await getComments(tweetId);

  return (
    <main>
      <h1>Tweet</h1>

      <article>
        <div>
          <strong>{tweet.author.name}</strong>
          <span>@{tweet.author.username}</span>
        </div>

        <p>{tweet.text}</p>

        {tweet.image && <img src={tweet.image} alt="Tweet image" />}

        <p>Likes: {tweet.likes.length}</p>

        <p>Reposts: {tweet.reposts.length}</p>
      </article>

      <section>
        <h2>Replies</h2>

        <CommentForm tweetId={tweet._id} />

        <CommentList comments={comments} />
      </section>
    </main>
  );
}
