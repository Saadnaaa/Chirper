import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Link as LinkIcon, MapPin } from "lucide-react";

import { getUserProfile } from "@/actions/users/getUserProfile";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

import FollowButton from "@/components/profile/FollowButton";
import FollowersFollowing from "@/components/profile/FollowersFollowing";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import TweetCard from "@/components/tweets/TweetCard";

function normalizeUsername(username) {
  return String(username ?? "")
    .trim()
    .replace(/^(?:@|%40)+/gi, "");
}

export default async function ProfilePage({ params }) {
  const { username } = await params;
  const cleanUsername = normalizeUsername(username);

  const profile = await getUserProfile(cleanUsername);

  if (!profile) {
    notFound();
  }

  const currentUser = await getCurrentUser();

  const isFollowing = currentUser
    ? profile.user.followers?.some(
        (follower) =>
          String(follower._id ?? follower) === currentUser._id.toString(),
      )
    : false;

  const isOwnProfile =
    currentUser && currentUser._id.toString() === profile.user._id.toString();

  return (
    <div>
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-black/75 border-b border-neutral-800 px-4 py-3 flex items-center gap-4">
        <Link
          href="/"
          className="p-2 -ml-2 rounded-full hover:bg-neutral-900 text-neutral-200 transition"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex min-w-0 flex-col">
          <h1 className="truncate text-xl font-bold text-neutral-100 leading-tight">
            {profile.user.name}
          </h1>
          <span className="text-xs text-neutral-500">
            {profile.tweets?.length || 0} Chirps
          </span>
        </div>
      </header>

      {/* Cover Image Banner */}
      <div className="h-44 sm:h-52 w-full bg-neutral-900 relative">
        {profile.user.coverImage && (
          <img
            src={profile.user.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Profile Header Info */}
      <section className="px-4 pb-4 border-b border-neutral-800">
        {/* Avatar & Action Button row */}
        <div className="flex justify-between items-end mt-4 mb-4">
          <div className="shrink-0 rounded-full ring-4 ring-black overflow-hidden bg-neutral-900">
            <ProfileAvatar user={profile.user} size={112} />
          </div>

          <div>
            {isOwnProfile ? (
              <Link
                href={`/profile/${cleanUsername}/edit`}
                className="btn btn-outline btn-sm rounded-full text-neutral-100"
              >
                Edit profile
              </Link>
            ) : currentUser ? (
              <FollowButton
                userId={profile.user._id.toString()}
                isFollowing={isFollowing}
              />
            ) : null}
          </div>
        </div>

        {/* User Names */}
        <div className="mb-3">
          <h2 className="text-2xl font-extrabold text-neutral-100">
            {profile.user.name}
          </h2>
          <p className="text-neutral-500 text-sm">@{cleanUsername}</p>
        </div>

        {/* Bio */}
        {profile.user.bio && (
          <p className="text-neutral-200 text-sm whitespace-pre-wrap leading-relaxed mb-3">
            {profile.user.bio}
          </p>
        )}

        {/* Metadata (Location, Website) */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-neutral-500 mb-3">
          {profile.user.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{profile.user.location}</span>
            </div>
          )}
          {profile.user.website && (
            <div className="flex items-center gap-1">
              <LinkIcon className="w-4 h-4 text-sky-400" />
              <a
                href={
                  profile.user.website.startsWith("http")
                    ? profile.user.website
                    : `https://${profile.user.website}`
                }
                target="_blank"
                rel="noreferrer"
                className="text-sky-400 hover:underline"
              >
                {profile.user.website}
              </a>
            </div>
          )}
        </div>

        <FollowersFollowing
          following={profile.user.following || []}
          followers={profile.user.followers || []}
        />
      </section>

      {/* Posts Section */}
      <section
        aria-label="User Chirps"
        className="divide-y divide-neutral-800/80"
      >
        {!profile.tweets || profile.tweets.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="text-lg font-bold text-neutral-200 mb-1">
              No posts yet
            </h3>
          </div>
        ) : (
          profile.tweets.map((tweet) => (
            <TweetCard
              key={tweet._id.toString()}
              tweet={tweet}
              currentUser={currentUser}
            />
          ))
        )}
      </section>
    </div>
  );
}
