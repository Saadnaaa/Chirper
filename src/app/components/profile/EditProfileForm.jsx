"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { updateProfile } from "@/app/actions/users/updateProfile";

export default function EditProfileForm({ user }) {
  const router = useRouter();

  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [location, setLocation] = useState(user.location || "");
  const [website, setWebsite] = useState(user.website || "");
  const [profilePic, setProfilePic] = useState(user.profilePic || "");
  const [coverImage, setCoverImage] = useState(user.coverImage || "");

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    const result = await updateProfile(
      name,
      bio,
      location,
      website,
      profilePic,
      coverImage,
    );

    setIsSubmitting(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Name"
        maxLength={50}
      />

      <textarea
        value={bio}
        onChange={(event) => setBio(event.target.value)}
        placeholder="Bio"
        maxLength={160}
      />

      <input
        type="text"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        placeholder="Location"
        maxLength={100}
      />

      <input
        type="text"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        placeholder="Website"
      />

      <input
        type="url"
        value={profilePic}
        onChange={(event) => setProfilePic(event.target.value)}
        placeholder="Profile picture URL"
      />

      <input
        type="url"
        value={coverImage}
        onChange={(event) => setCoverImage(event.target.value)}
        placeholder="Cover image URL"
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
