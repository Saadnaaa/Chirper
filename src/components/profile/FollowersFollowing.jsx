"use client";

import { useState } from "react";
import Link from "next/link";

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
        const isOpen = openList === key;

        return (
          <section key={key} aria-label={label} className="min-w-0">
            <button
              type="button"
              onClick={() => setOpenList(isOpen ? null : key)}
              aria-expanded={isOpen}
              className="mb-3 flex w-full items-baseline gap-2 rounded-lg px-2 py-1 text-left text-sm font-bold text-neutral-100 hover:bg-neutral-900"
            >
              {label}
              <span className="font-extrabold text-neutral-100">
                {people.length}
              </span>
            </button>
            {isOpen &&
              (people.length > 0 ? (
                <ul className="max-h-48 space-y-1 overflow-y-auto px-1">
                  {people.map((person) => (
                    <li key={person._id}>
                      <Link
                        href={`/profile/${encodeURIComponent(person.username)}`}
                        className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-neutral-900"
                      >
                        <ProfileAvatar user={person} size={32} />
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
                  ))}
                </ul>
              ) : (
                <p className="px-2 text-sm text-neutral-500">
                  No {label.toLowerCase()} yet.
                </p>
              ))}
          </section>
        );
      })}
    </div>
  );
}
