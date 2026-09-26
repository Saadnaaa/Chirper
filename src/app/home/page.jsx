import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import TweetComposer from "../components/tweets/TweetComposer";
import { getTweets } from "../actions/tweets/getTweets";
import TweetCard from "../components/tweets/TweetCard";

export default async function HomePage() {
  const user = await getCurrentUser();
  const tweets = await getTweets();

  return (
    <main>
      <h1>Welcome to X Clone</h1>

      {user && (
        <>
          <p>{user.username}</p>

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
