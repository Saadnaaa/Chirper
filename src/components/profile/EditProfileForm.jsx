"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Camera, Loader2 } from "lucide-react";

import { updateProfile } from "@/actions/users/updateProfile";

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
    if (!file) return;

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

    try {
      const result = await updateProfile(
        name,
        bio,
        location,
        website,
        profilePic,
        coverImage,
      );

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message || "Profile updated successfully!");
      router.push(`/profile/${user.username}`);
      router.refresh();
    } catch (err) {
      toast.error("An error occurred while saving profile");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* Cover Image Upload Area */}
      <div className="relative h-44 sm:h-48 w-full bg-neutral-900 border-b border-neutral-800 flex items-center justify-center overflow-hidden group">
        {coverImagePreview && (
          <img
            src={coverImagePreview}
            alt="Cover preview"
            className="w-full h-full object-cover"
          />
        )}
        <label
          htmlFor="cover-upload"
          className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors"
        >
          <div className="p-3 rounded-full bg-black/60 text-white backdrop-blur">
            <Camera className="w-6 h-6" />
          </div>
          <input
            id="cover-upload"
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            className="hidden"
          />
        </label>
      </div>

      <div className="px-5 pb-6">
        {/* Profile Picture Upload Area */}
        <div className="relative -mt-16 mb-6 inline-block">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full ring-4 ring-black overflow-hidden bg-neutral-800 relative group flex items-center justify-center">
            {profilePicPreview ? (
              <img
                src={profilePicPreview}
                alt="Profile avatar preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-neutral-400">
                {name?.[0] || "?"}
              </span>
            )}
            <label
              htmlFor="avatar-upload"
              className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors"
            >
              <div className="p-2 rounded-full bg-black/60 text-white backdrop-blur">
                <Camera className="w-5 h-5" />
              </div>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-5">
          {/* Name Input */}
          <div className="border border-neutral-800 focus-within:border-sky-500 rounded-xl px-4 py-2 bg-neutral-950/60 transition-colors">
            <label className="block text-xs font-medium text-neutral-500">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Display name"
              maxLength={50}
              required
              className="w-full bg-transparent text-neutral-100 outline-none text-base font-medium mt-1"
            />
          </div>

          {/* Bio Input */}
          <div className="border border-neutral-800 focus-within:border-sky-500 rounded-xl px-4 py-2 bg-neutral-950/60 transition-colors">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-medium text-neutral-500">
                Bio
              </label>
              <span className="text-[11px] text-neutral-500">
                {bio.length}/160
              </span>
            </div>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell the world about yourself"
              maxLength={160}
              rows={3}
              className="w-full bg-transparent text-neutral-100 outline-none text-base resize-none mt-1 leading-relaxed"
            />
          </div>

          {/* Location Input */}
          <div className="border border-neutral-800 focus-within:border-sky-500 rounded-xl px-4 py-2 bg-neutral-950/60 transition-colors">
            <label className="block text-xs font-medium text-neutral-500">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country"
              maxLength={100}
              className="w-full bg-transparent text-neutral-100 outline-none text-base font-medium mt-1"
            />
          </div>

          {/* Website Input */}
          <div className="border border-neutral-800 focus-within:border-sky-500 rounded-xl px-4 py-2 bg-neutral-950/60 transition-colors">
            <label className="block text-xs font-medium text-neutral-500">
              Website
            </label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full bg-transparent text-neutral-100 outline-none text-base font-medium mt-1"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-950 font-bold text-sm shadow-md transition disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{isSubmitting ? "Saving..." : "Save changes"}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
