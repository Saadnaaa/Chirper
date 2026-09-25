import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import LogoutButton from "../components/auth/LogoutButton";

export default async function HomePage() {
  const user = await getCurrentUser();
  return (
    <main>
      <h1>Welcome to X Clone</h1>

      {user ? (
        <div>
          <p>You are logged in</p>
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>

          <LogoutButton />
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </main>
  );
}
