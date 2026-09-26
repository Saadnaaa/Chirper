"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

import { createTweet } from "@/app/actions/tweets/createTweet";

export default function TweetComposer() {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    const result = await createTweet(text);

    setIsSubmitting(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Tweet posted");
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="What is happening?!"
        maxLength={280}
      />

      <div>
        <span>{text.length}/280</span>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
}
