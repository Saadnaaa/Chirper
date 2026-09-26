import { notFound } from "next/navigation";

import { getUserProfile } from "@/app/actions/users/getUserProfile";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

import FollowButton from "@/app/components/profile/FollowButton";
import TweetCard from "@/app/components/tweets/TweetCard";

function normalizeUsername(username) {
  return String(username ?? "")
    .trim()
    .replace(/^(?:@|%40)+/gi, "");
}

export default async function ProfilePage({ params }) {
  const { username } = await params;

  const profile = await getUserProfile(username);

  if (!profile) {
    notFound();
  }

  const currentUser = await getCurrentUser();

  const isFollowing = currentUser
    ? profile.user.followers.some(
        (id) => id.toString() === currentUser._id.toString(),
      )
    : false;

  const isOwnProfile =
    currentUser && currentUser._id.toString() === profile.user._id.toString();

  return (
    <main>
      <section>
        {profile.user.coverImage && (
          <img src={profile.user.coverImage} alt="Cover" />
        )}

        {profile.user.profilePic && (
          <img src={profile.user.profilePic} alt={profile.user.name} />
        )}

        <h1>{profile.user.name}</h1>

        <p>@{normalizeUsername(profile.user.username)}</p>

        {profile.user.bio && <p>{profile.user.bio}</p>}

        {profile.user.location && <p>{profile.user.location}</p>}

        {profile.user.website && <p>{profile.user.website}</p>}

        <p>Followers: {profile.user.followers.length}</p>

        <p>Following: {profile.user.following.length}</p>

        {!isOwnProfile && currentUser && (
          <FollowButton userId={profile.user._id} isFollowing={isFollowing} />
        )}
      </section>

      <section>
        <h2>Posts</h2>

        {profile.tweets.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          profile.tweets.map((tweet) => (
            <TweetCard key={tweet._id} tweet={tweet} />
          ))
        )}
      </section>
    </main>
  );
}
