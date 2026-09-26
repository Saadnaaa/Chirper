"use client";

import { useRouter } from "next/navigation";

import { markNotificationRead } from "@/app/actions/notifications/markNotificationRead";

export default function NotificationItem({ notification }) {
  const router = useRouter();

  async function handleClick() {
    if (notification.isRead) {
      return;
    }

    await markNotificationRead(notification._id);

    router.refresh();
  }

  function getMessage() {
    if (notification.type === "like") {
      return "liked your post";
    }

    if (notification.type === "repost") {
      return "reposted your post";
    }

    if (notification.type === "comment") {
      return "commented on your post";
    }

    if (notification.type === "follow") {
      return "followed you";
    }

    return "interacted with you";
  }

  return (
    <article onClick={handleClick}>
      <strong>{notification.sender.name}</strong>

      <span>@{notification.sender.username}</span>

      <p>{getMessage()}</p>

      {!notification.isRead && <span>New</span>}
    </article>
  );
}
