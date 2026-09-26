"use client";

import { useState } from "react";
import TweetCard from "@/components/tweets/TweetCard";

export default function FeedTabs({
  followingTweets,
  forYouTweets,
  currentUser,
}) {
  const [activeFeed, setActiveFeed] = useState("for-you");
  const tweets = activeFeed === "following" ? followingTweets : forYouTweets;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Tweet feeds"
        className="sticky top-14 z-10 grid grid-cols-2 border-b border-neutral-800 bg-black/80 backdrop-blur-md"
      >
        <button
          id="following-feed-tab"
          type="button"
          role="tab"
          aria-selected={activeFeed === "following"}
          aria-controls="tweet-feed-panel"
          onClick={() => setActiveFeed("following")}
          className={`relative min-h-14 px-4 text-sm font-semibold transition-colors hover:bg-neutral-900/70 ${
            activeFeed === "following"
              ? "text-neutral-100 after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-14 after:-translate-x-1/2 after:rounded-full after:bg-sky-400"
              : "text-neutral-500"
          }`}
        >
          Following
        </button>
        <button
          id="for-you-feed-tab"
          type="button"
          role="tab"
          aria-selected={activeFeed === "for-you"}
          aria-controls="tweet-feed-panel"
          onClick={() => setActiveFeed("for-you")}
          className={`relative min-h-14 px-4 text-sm font-semibold transition-colors hover:bg-neutral-900/70 ${
            activeFeed === "for-you"
              ? "text-neutral-100 after:absolute after:bottom-0 after:left-1/2 after:h-1 after:w-14 after:-translate-x-1/2 after:rounded-full after:bg-sky-400"
              : "text-neutral-500"
          }`}
        >
          For You
        </button>
      </div>

      <section
        id="tweet-feed-panel"
        role="tabpanel"
        aria-labelledby={
          activeFeed === "following" ? "following-feed-tab" : "for-you-feed-tab"
        }
        className="divide-y divide-neutral-800/80"
      >
        {tweets.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-lg font-bold text-neutral-200 mb-1">
              {activeFeed === "following"
                ? "Your following feed is quiet"
                : "No tweets yet"}
            </p>
            {activeFeed === "following" && (
              <p className="text-sm text-neutral-500">
                Posts from people you follow will appear here.
              </p>
            )}
          </div>
        ) : (
          tweets.map((tweet) => (
            <TweetCard
              key={tweet._id}
              tweet={tweet}
              currentUser={currentUser}
            />
          ))
        )}
      </section>
    </div>
  );
}
