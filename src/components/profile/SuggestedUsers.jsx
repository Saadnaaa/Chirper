import Link from "next/link";
import { getSuggestedUsers } from "@/actions/users/getSuggestedUsers";
import FollowButton from "./FollowButton";
import ProfileAvatar from "./ProfileAvatar";

export default async function SuggestedUsers() {
  const users = await getSuggestedUsers();

  if (!users || users.length === 0) {
    return (
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4">
        <h2 className="text-xl font-extrabold text-neutral-100 mb-2">
          Who to follow
        </h2>
        <p className="text-neutral-500 text-sm">
          No suggested users found at this time.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4">
      <h2 className="text-xl font-extrabold text-neutral-100 mb-3 tracking-tight">
        Who to follow
      </h2>

      <div className="flex flex-col divide-y divide-neutral-800/60">
        {users.map((user) => (
          <article
            key={user._id}
            className="flex items-center justify-between py-3 first:pt-1 last:pb-1 group gap-2"
          >
            <Link
              href={`/profile/${user.username}`}
              className="flex items-center gap-3 min-w-0 flex-1"
            >
              <ProfileAvatar user={user} size={42} />
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm text-neutral-100 truncate group-hover:underline">
                  {user.name}
                </span>
                <span className="text-xs text-neutral-500 truncate">
                  @{user.username}
                </span>
              </div>
            </Link>

            <FollowButton userId={user._id.toString()} isFollowing={false} />
          </article>
        ))}
      </div>
    </section>
  );
}
