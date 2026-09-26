"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import DeleteTweetButton from "./DeleteTweetButton";
import LikeButton from "./LikeButton";
import RepostButton from "./RepostButton";

export default function TweetCard({ tweet, currentUser }) {
  if (!tweet || !tweet.author) return null;

  const currentUserId = currentUser?._id ? currentUser._id.toString() : null;
  const authorId = tweet.author?._id
    ? tweet.author._id.toString()
    : tweet.author.toString();

  const isAuthor = currentUserId && currentUserId === authorId;

  const isLiked =
    currentUserId &&
    tweet.likes?.some(
      (id) => (id?._id || id).toString() === currentUserId,
    );

  const isReposted =
    currentUserId &&
    tweet.reposts?.some(
      (id) => (id?._id || id).toString() === currentUserId,
    );

  const tweetId = (tweet._id?._id || tweet._id).toString();

  return (
    <article className="p-4 hover:bg-neutral-900/30 transition-colors duration-150 flex gap-3 cursor-pointer group">
      {/* Author Avatar */}
      <div className="shrink-0 pt-0.5">
        <Link href={`/profile/${tweet.author.username}`}>
          <ProfileAvatar user={tweet.author} size={42} />
        </Link>
      </div>

      {/* Main Tweet Body */}
      <div className="flex-1 min-w-0">
        {/* Header: Name, Handle, Delete */}
        <div className="flex items-center justify-between gap-1 leading-snug">
          <div className="flex items-center gap-1.5 min-w-0 truncate">
            <Link
              href={`/profile/${tweet.author.username}`}
              className="font-bold text-sm text-neutral-100 hover:underline truncate"
            >
              {tweet.author.name}
            </Link>
            <Link
              href={`/profile/${tweet.author.username}`}
              className="text-xs text-neutral-500 truncate"
            >
              @{tweet.author.username}
            </Link>
          </div>

          {/* Delete Button (Only author) */}
          {isAuthor && <DeleteTweetButton tweetId={tweetId} />}
        </div>

        {/* Tweet Text Content */}
        <Link href={`/tweet/${tweetId}`} className="block mt-1">
          <p className="text-[15px] text-neutral-200 whitespace-pre-wrap leading-normal break-words">
            {tweet.text}
          </p>
        </Link>

        {/* Tweet Image Attachment */}
        {tweet.image && (
          <Link href={`/tweet/${tweetId}`} className="block mt-3">
            <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 max-h-96">
              <img
                src={tweet.image}
                alt="Tweet media"
                className="w-full h-auto object-cover max-h-96 hover:opacity-95 transition-opacity"
              />
            </div>
          </Link>
        )}

        {/* Action Row */}
        <div className="flex items-center justify-between text-neutral-500 mt-3 max-w-xs">
          {/* Reply / Comments */}
          <Link
            href={`/tweet/${tweetId}`}
            className="flex items-center gap-1.5 hover:text-sky-400 group/btn transition-colors text-xs"
            title="Reply"
          >
            <div className="p-2 rounded-full group-hover/btn:bg-sky-500/10 transition-colors">
              <MessageCircle className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
            </div>
            <span>{tweet.comments?.length || 0}</span>
          </Link>

          {/* Repost Button */}
          <RepostButton
            tweetId={tweetId}
            repostsCount={tweet.reposts?.length || 0}
            initialReposted={isReposted}
          />

          {/* Like Button */}
          <LikeButton
            tweetId={tweetId}
            likesCount={tweet.likes?.length || 0}
            initialLiked={isLiked}
          />
        </div>
      </div>
    </article>
  );
}
