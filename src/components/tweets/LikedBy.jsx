"use client";

import Link from "next/link";
import { useState } from "react";
import ProfileAvatar from "@/components/profile/ProfileAvatar";

export default function LikedBy({ users }) {
  const [isOpen, setIsOpen] = useState(false);
  const count = users.length;

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        disabled={count === 0}
        aria-expanded={isOpen}
        aria-controls="tweet-liked-by"
        className="text-neutral-500 transition-colors hover:text-pink-400 disabled:cursor-default disabled:hover:text-neutral-500"
      >
        <strong className="font-semibold text-neutral-200">{count}</strong>{" "}
        {count === 1 ? "Like" : "Likes"}
      </button>

      {isOpen && count > 0 && (
        <div
          id="tweet-liked-by"
          className="absolute z-20 mt-2 max-h-64 w-72 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-lg border border-neutral-800 bg-neutral-950 p-2 shadow-xl"
        >
          <h2 className="px-2 py-1 text-xs font-semibold uppercase text-neutral-500">
            Liked by
          </h2>
          <ul className="space-y-1">
            {users.map((user) => (
              <li key={user._id}>
                <Link
                  href={`/profile/${encodeURIComponent(user.username)}`}
                  className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-neutral-900"
                >
                  <ProfileAvatar user={user} size={32} />
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-medium text-neutral-100">
                      {user.name}
                    </span>
                    <span className="truncate text-xs text-neutral-500">
                      @{user.username}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
