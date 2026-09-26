"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Image as ImageIcon, X, Loader2 } from "lucide-react";

import { createTweet } from "@/actions/tweets/createTweet";
import ProfileAvatar from "@/components/profile/ProfileAvatar";

export default function TweetComposer({ user }) {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleImageChange(event) {
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
      setImagePreview(base64Image);
    };

    reader.readAsDataURL(file);
  }

  function handleRemoveImage() {
    setImage("");
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!text.trim() && !image) {
      toast.error("Please enter some text or attach an image");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createTweet(text, image);

      if (!result.success) {
        toast.error(result.message || "Failed to post chirp");
        return;
      }

      toast.success("Chirp posted!");

      setText("");
      setImage("");
      setImagePreview("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      router.refresh();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  const charsLeft = 280 - text.length;

  return (
    <div className="p-4 border-b border-neutral-800 flex gap-3">
      <div className="pt-1">
        <ProfileAvatar user={user} size={42} />
      </div>

      <form onSubmit={handleSubmit} className="flex-1 min-w-0">
        <textarea
          id="chirp-composer-textarea"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="What is happening?!"
          maxLength={280}
          rows={3}
          className="w-full bg-transparent text-neutral-100 placeholder-neutral-500 text-lg outline-none resize-none leading-relaxed"
        />

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="tweet-image-input"
        />

        {/* Image Preview */}
        {imagePreview && (
          <div className="relative mb-3 rounded-2xl overflow-hidden border border-neutral-800 max-h-80 bg-neutral-950">
            <img
              src={imagePreview}
              alt="Chirp preview"
              className="w-full h-auto object-cover max-h-80"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              aria-label="Remove image"
              className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/75 hover:bg-black text-white backdrop-blur transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Action Toolbar */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Attach image"
              className="p-2 rounded-full text-sky-400 hover:bg-sky-500/10 transition"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {text.length > 0 && (
              <span
                className={`text-xs ${
                  charsLeft < 20 ? "text-amber-500 font-bold" : "text-neutral-500"
                }`}
              >
                {charsLeft}
              </span>
            )}

            <button
              type="submit"
              disabled={isSubmitting || (!text.trim() && !image)}
              className="px-5 py-2 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{isSubmitting ? "Posting..." : "Chirp"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
