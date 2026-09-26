"use client";

import { useRouter } from "next/navigation";
import { Heart, Repeat2, MessageCircle, UserPlus, Bell } from "lucide-react";
import { markNotificationRead } from "@/actions/notifications/markNotificationRead";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import Link from "next/link";

export default function NotificationItem({ notification }) {
  const router = useRouter();

  async function handleClick() {
    if (!notification.isRead) {
      await markNotificationRead(notification._id);
      router.refresh();
    }
  }

  function getIconAndMessage() {
    if (notification.type === "like") {
      return {
        icon: <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />,
        text: "liked your post",
      };
    }

    if (notification.type === "repost") {
      return {
        icon: <Repeat2 className="w-5 h-5 text-emerald-500" />,
        text: "reposted your chirp",
      };
    }

    if (notification.type === "comment") {
      return {
        icon: <MessageCircle className="w-5 h-5 text-sky-400 fill-sky-400" />,
        text: "replied to your chirp",
      };
    }

    if (notification.type === "follow") {
      return {
        icon: <UserPlus className="w-5 h-5 text-blue-400" />,
        text: "followed you",
      };
    }

    return {
      icon: <Bell className="w-5 h-5 text-neutral-400" />,
      text: "interacted with your content",
    };
  }

  const { icon, text } = getIconAndMessage();

  return (
    <article
      onClick={handleClick}
      className={`p-4 border-b border-neutral-800/80 hover:bg-neutral-900/30 transition-colors flex gap-4 cursor-pointer ${
        !notification.isRead ? "bg-sky-500/5" : ""
      }`}
    >
      <div className="shrink-0 pt-1">{icon}</div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <Link
            href={`/profile/${notification.sender.username}`}
            onClick={(e) => e.stopPropagation()}
          >
            <ProfileAvatar user={notification.sender} size={36} />
          </Link>
          <div className="flex flex-col min-w-0">
            <Link
              href={`/profile/${notification.sender.username}`}
              onClick={(e) => e.stopPropagation()}
              className="font-bold text-sm text-neutral-100 hover:underline truncate"
            >
              {notification.sender.name}
            </Link>
            <span className="text-xs text-neutral-500">
              @{notification.sender.username}
            </span>
          </div>
        </div>

        <p className="text-sm text-neutral-300">
          <span className="font-semibold text-neutral-100">
            {notification.sender.name}
          </span>{" "}
          {text}
        </p>

        {!notification.isRead && (
          <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full">
            New
          </span>
        )}
      </div>
    </article>
  );
}
