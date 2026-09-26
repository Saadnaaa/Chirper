import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getTweet } from "@/actions/tweets/getTweet";
import { getComments } from "@/actions/comments/getComments";

import CommentForm from "@/components/comments/CommentForm";
import CommentList from "@/components/comments/CommentList";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import LikedBy from "@/components/tweets/LikedBy";
import LikeButton from "@/components/tweets/LikeButton";
import RepostButton from "@/components/tweets/RepostButton";
import DeleteTweetButton from "@/components/tweets/DeleteTweetButton";

export default async function TweetPage({ params }) {
  const { tweetId } = await params;

  const tweet = await getTweet(tweetId);

  if (!tweet) {
    notFound();
  }

  const comments = await getComments(tweetId);

  return (
    <div>
      {/* Sticky Header with Back Button */}
      <div className="sticky top-0 z-20 backdrop-blur-md bg-black/75 border-b border-neutral-800 px-4 py-3 flex items-center gap-6">
        <Link
          href="/"
          className="p-2 -ml-2 rounded-full hover:bg-neutral-900 text-neutral-200 transition"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-neutral-100">Chirp</h1>
        </div>
      </div>

      {/* Main Tweet Article */}
      <article className="p-4 border-b border-neutral-800">
        <div className="flex items-center gap-3 mb-3">
          <ProfileAvatar user={tweet.author} size={48} />
          <div className="flex flex-col">
            <Link
              href={`/profile/${tweet.author.username}`}
              className="font-bold text-neutral-100 hover:underline leading-snug"
            >
              {tweet.author.name}
            </Link>
            <span className="text-neutral-500 text-sm">
              @{tweet.author.username}
            </span>
          </div>
        </div>

        <p className="text-lg text-neutral-100 whitespace-pre-wrap leading-relaxed mb-4">
          {tweet.text}
        </p>

        {tweet.image && (
          <div className="mb-4 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 max-h-[500px]">
            <img
              src={tweet.image}
              alt="Tweet attachment"
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </div>
        )}

        <div className="py-3 border-y border-neutral-800/80 text-sm text-neutral-500 flex gap-6">
          <LikedBy users={tweet.likes || []} />
          <span>
            <strong className="text-neutral-200 font-semibold">
              {tweet.reposts?.length || 0}
            </strong>{" "}
            Reposts
          </span>
          <span>
            <strong className="text-neutral-200 font-semibold">
              {comments?.length || 0}
            </strong>{" "}
            Comments
          </span>
        </div>

        <div className="pt-3 flex items-center justify-between text-neutral-500">
          <LikeButton
            tweetId={tweet._id.toString()}
            likesCount={tweet.likes?.length || 0}
          />
          <RepostButton
            tweetId={tweet._id.toString()}
            repostsCount={tweet.reposts?.length || 0}
          />
          <DeleteTweetButton tweetId={tweet._id.toString()} />
        </div>
      </article>

      {/* Comments Section */}
      <section className="p-4 border-b border-neutral-800 bg-neutral-950/40">
        <h2 className="text-sm font-semibold text-neutral-400 mb-3 uppercase tracking-wider">
          Reply
        </h2>
        <CommentForm tweetId={tweet._id.toString()} />
      </section>

      <section>
        <CommentList comments={comments} />
      </section>
    </div>
  );
}
