import DeleteTweetButton from "./DeleteTweetButton";
import LikeButton from "./LikeButton";
import RepostButton from "./RepostButton";
import Link from "next/link";

export default function TweetCard({ tweet }) {
  return (
    <article>
      <div>
        <strong>{tweet.author.name}</strong>
        <span>@{tweet.author.username}</span>
      </div>

      <Link href={`/tweet/${tweet._id}`}>
        <p>{tweet.text}</p>
      </Link>

      {tweet.image && <img src={tweet.image} alt="Tweet image" />}

      <LikeButton tweetId={tweet._id} likesCount={tweet.likes.length} />

      <RepostButton tweetId={tweet._id} repostsCount={tweet.reposts.length} />

      <DeleteTweetButton tweetId={tweet._id} />
    </article>
  );
}
