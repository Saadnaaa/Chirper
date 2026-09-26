"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { createTweet } from "@/app/actions/tweets/createTweet";

export default function TweetComposer() {
  const router = useRouter();

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
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    const result = await createTweet(text, image);

    setIsSubmitting(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Tweet posted");

    setText("");
    setImage("");
    setImagePreview("");

    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What is happening?!"
        maxLength={280}
      />

      <input type="file" accept="image/*" onChange={handleImageChange} />

      {imagePreview && (
        <div>
          <img src={imagePreview} alt="Tweet preview" />

          <button type="button" onClick={handleRemoveImage}>
            Remove image
          </button>
        </div>
      )}

      <div>
        <span>{text.length}/280</span>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
}
