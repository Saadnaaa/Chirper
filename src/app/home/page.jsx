import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import TweetComposer from "../components/tweets/TweetComposer";
import { getTweets } from "../actions/tweets/getTweets";
import TweetCard from "../components/tweets/TweetCard";
import SuggestedUsers from "@/app/components/profile/SuggestedUsers";
import Link from "next/link";

export default async function HomePage() {
  const user = await getCurrentUser();
  const tweets = await getTweets();

  return (
    <main>
      <h1>Welcome to X Clone</h1>

      <SuggestedUsers />

      {user && (
        <>
          <Link href={`/profile/${user.username}`}>
            <p>{user.username}</p>
          </Link>

          <section>
            {tweets.length === 0 ? (
              <p>No tweets yet.</p>
            ) : (
              tweets.map((tweet) => <TweetCard key={tweet._id} tweet={tweet} />)
            )}
          </section>

          <TweetComposer />
        </>
      )}
    </main>
  );
}
