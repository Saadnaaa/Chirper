import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import EditProfileForm from "@/app/components/profile/EditProfileForm";

export default async function EditProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Edit Profile</h1>

      <EditProfileForm user={JSON.parse(JSON.stringify(user))} />
    </main>
  );
}
