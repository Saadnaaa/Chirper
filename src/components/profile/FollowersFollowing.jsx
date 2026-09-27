"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

import ProfileAvatar from "./ProfileAvatar";

export default function FollowersFollowing({ following = [], followers = [] }) {
  const [openList, setOpenList] = useState(null);

  const lists = [
    { key: "following", label: "Following", people: following },
    { key: "followers", label: "Followers", people: followers },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {lists.map(({ key, label, people }) => {
        return (
          <section key={key} aria-label={label} className="min-w-0">
            <button
              type="button"
              onClick={() => setOpenList(key)}
              aria-expanded={openList === key}
              className="mb-3 flex w-full items-baseline gap-2 rounded-lg px-2 py-1 text-left text-sm font-bold text-neutral-100 hover:bg-neutral-900"
            >
              {label}
              <span className="font-extrabold text-neutral-100">
                {people.length}
              </span>
            </button>
          </section>
        );
      })}

      {openList && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpenList(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="followers-following-title"
            className="flex max-h-[80vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-center gap-4 border-b border-neutral-800 px-4 py-3">
              <button
                type="button"
                onClick={() => setOpenList(null)}
                aria-label="Close"
                className="rounded-full p-2 text-neutral-200 hover:bg-neutral-900"
              >
                <X className="h-5 w-5" />
              </button>
              <h2
                id="followers-following-title"
                className="text-xl font-bold text-neutral-100"
              >
                {lists.find(({ key }) => key === openList).label}
              </h2>
            </header>

            <ul className="min-h-0 space-y-1 overflow-y-auto p-2">
              {lists.find(({ key }) => key === openList).people.length > 0 ? (
                lists
                  .find(({ key }) => key === openList)
                  .people.map((person) => (
                    <li key={person._id}>
                      <Link
                        href={`/profile/${encodeURIComponent(person.username)}`}
                        onClick={() => setOpenList(null)}
                        className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-neutral-900"
                      >
                        <ProfileAvatar user={person} size={40} />
                        <span className="flex min-w-0 flex-col">
                          <span className="truncate text-sm font-medium text-neutral-100">
                            {person.name}
                          </span>
                          <span className="truncate text-xs text-neutral-500">
                            @{person.username}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))
              ) : (
                <li className="px-3 py-8 text-center text-sm text-neutral-500">
                  No{" "}
                  {lists
                    .find(({ key }) => key === openList)
                    .label.toLowerCase()}{" "}
                  yet.
                </li>
              )}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
