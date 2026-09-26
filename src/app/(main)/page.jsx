import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { getTweets } from "@/actions/tweets/getTweets";
import { redirect } from "next/navigation";
import TweetComposer from "@/components/tweets/TweetComposer";
import FeedTabs from "@/components/tweets/FeedTabs";
import Link from "next/link";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/register");
  }

  const { followingTweets, forYouTweets } = await getTweets();

  return (
    <div>
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-black/75 border-b border-neutral-800 px-4 py-3">
        <h1 className="text-xl font-bold text-neutral-100 tracking-tight">
          Home
        </h1>
      </header>

      {/* Tweet Composer */}
      {user ? (
        <TweetComposer user={user} />
      ) : (
        <div className="p-6 border-b border-neutral-800 text-center bg-neutral-950/40">
          <p className="text-neutral-300 text-sm mb-3">
            Join Chirper today to post chirps and follow friends!
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/login"
              className="btn btn-outline btn-sm text-neutral-100"
            >
              Log in
            </Link>
            <Link href="/register" className="btn btn-primary btn-sm">
              Sign up
            </Link>
          </div>
        </div>
      )}

      <FeedTabs
        followingTweets={followingTweets}
        forYouTweets={forYouTweets}
        currentUser={user}
      />
    </div>
  );
}
