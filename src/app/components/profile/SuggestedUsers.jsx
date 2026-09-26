import Link from "next/link";

import { getSuggestedUsers } from "@/app/actions/users/getSuggestedUsers";

import FollowButton from "./FollowButton";

export default async function SuggestedUsers() {
  const users = await getSuggestedUsers();

  if (users.length === 0) {
    return null;
  }

  return (
    <section>
      <h2>Who to follow</h2>

      {users.map((user) => (
        <article key={user._id}>
          <Link href={`/profile/${user.username}`}>
            <strong>{user.name}</strong>

            <span>@{user.username}</span>
          </Link>

          <FollowButton userId={user._id} isFollowing={false} />
        </article>
      ))}
    </section>
  );
}
