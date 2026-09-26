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

  const [profilePic, setProfilePic] = useState("");

  const [coverImage, setCoverImage] = useState("");

  const [profilePicPreview, setProfilePicPreview] = useState(
    user.profilePic || "",
  );

  const [coverImagePreview, setCoverImagePreview] = useState(
    user.coverImage || "",
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  function readImageFile(event, setImage, setPreview) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB");

      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;

      setImage(base64Image);
      setPreview(base64Image);
    };

    reader.readAsDataURL(file);
  }

  function handleProfilePicChange(event) {
    readImageFile(event, setProfilePic, setProfilePicPreview);
  }

  function handleCoverImageChange(event) {
    readImageFile(event, setCoverImage, setCoverImagePreview);
  }

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
        type="url"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        placeholder="Website"
      />

      <div>
        <label>Profile picture</label>

        <input type="file" accept="image/*" onChange={handleProfilePicChange} />

        {profilePicPreview && (
          <img src={profilePicPreview} alt="Profile picture preview" />
        )}
      </div>

      <div>
        <label>Cover image</label>

        <input type="file" accept="image/*" onChange={handleCoverImageChange} />

        {coverImagePreview && (
          <img src={coverImagePreview} alt="Cover image preview" />
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
