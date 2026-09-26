import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import EditProfileForm from "@/components/profile/EditProfileForm";

export default async function EditProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      {/* Sticky Header with Back Button */}
      <div className="sticky top-0 z-20 backdrop-blur-md bg-black/75 border-b border-neutral-800 px-4 py-3 flex items-center gap-6">
        <Link
          href={`/profile/${user.username}`}
          className="p-2 -ml-2 rounded-full hover:bg-neutral-900 text-neutral-200 transition"
          aria-label="Back to profile"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-neutral-100 leading-tight">
            Edit profile
          </h1>
          <span className="text-xs text-neutral-500">@{user.username}</span>
        </div>
      </div>

      <EditProfileForm user={JSON.parse(JSON.stringify(user))} />
    </div>
  );
}
