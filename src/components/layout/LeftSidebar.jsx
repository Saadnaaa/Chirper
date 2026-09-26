"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bell, User, Settings, LogIn, UserPlus } from "lucide-react";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import LogoutButton from "@/components/auth/LogoutButton";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function LeftSidebar({ user, unreadNotificationCount = 0 }) {
  const pathname = usePathname();

  const profileHref = user ? `/profile/${user.username}` : "/login";
  const editProfileHref = user ? `/profile/${user.username}/edit` : "/login";

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: Bell,
      isActive: pathname.startsWith("/notifications"),
    },
    {
      label: "Profile",
      href: profileHref,
      icon: User,
      isActive:
        user &&
        (pathname === `/profile/${user.username}` ||
          pathname === `/profile/${encodeURIComponent(user.username)}`),
    },
    {
      label: "Edit Profile",
      href: editProfileHref,
      icon: Settings,
      isActive: pathname.includes("/edit"),
    },
  ];

  return (
    <aside className="hidden sm:flex flex-col justify-between h-screen sticky top-0 px-2 sm:px-4 py-3 border-r border-neutral-800/80 w-16 xl:w-64 shrink-0 select-none z-30">
      {/* Top Section: Logo & Nav Links */}
      <div className="flex flex-col gap-1 items-center xl:items-start w-full">
        {/* Chirper Logo */}
        <Link
          href="/"
          className="p-3 rounded-full hover:bg-neutral-900 transition-colors duration-150 flex items-center gap-3 text-sky-400 group mb-2"
          aria-label="Chirper Home"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-8 h-8 fill-current text-sky-400 group-hover:scale-105 transition-transform"
          >
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.107-.803.164-1.227.164-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
          </svg>
          <span className="hidden xl:inline font-bold text-2xl tracking-tight text-neutral-100">
            Chirper
          </span>
        </Link>

        {/* Navigation Items */}
        <nav
          className="flex flex-col gap-1 w-full"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 px-3.5 py-3 rounded-full hover:bg-neutral-900 transition-colors duration-150 group ${
                  item.isActive
                    ? "font-bold text-neutral-100"
                    : "font-normal text-neutral-300 hover:text-neutral-100"
                }`}
              >
                <span className="relative shrink-0">
                  <Icon
                    className={`w-6 h-6 transition-transform group-hover:scale-105 ${
                      item.isActive
                        ? "text-sky-400 stroke-[2.5]"
                        : "text-neutral-300"
                    }`}
                  />
                  {item.label === "Notifications" &&
                    unreadNotificationCount > 0 && (
                      <span className="absolute -right-2 -top-1 min-w-5 h-5 px-1 rounded-full bg-sky-500 text-[11px] font-bold leading-5 text-center text-white">
                        {unreadNotificationCount > 99
                          ? "99+"
                          : unreadNotificationCount}
                      </span>
                    )}
                </span>
                <span className="hidden xl:inline text-xl tracking-wide">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-3 flex w-full justify-center xl:justify-start">
          <div className="hidden w-full xl:block">
            <ThemeToggle />
          </div>
          <div className="xl:hidden">
            <ThemeToggle iconOnly />
          </div>
        </div>
      </div>

      {/* Bottom Section: User Card & Logout Button */}
      <div className="w-full pt-3 border-t border-neutral-800/80">
        {user ? (
          <div className="flex flex-col gap-2">
            <Link
              href={`/profile/${user.username}`}
              className="flex items-center gap-3 p-2 rounded-full hover:bg-neutral-900 transition-colors duration-150 group"
              title={`Logged in as @${user.username}`}
            >
              <ProfileAvatar user={user} size={40} />
              <div className="hidden xl:flex flex-col min-w-0 flex-1 leading-snug">
                <span className="font-bold text-sm text-neutral-100 truncate group-hover:underline">
                  {user.name}
                </span>
                <span className="text-xs text-neutral-500 truncate">
                  @{user.username}
                </span>
              </div>
            </Link>

            <div className="w-full">
              <LogoutButton
                className="justify-center xl:justify-start"
                showText={true}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="hidden xl:flex flex-col gap-2">
              <Link
                href="/login"
                className="btn btn-outline btn-sm btn-block text-neutral-100"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="btn btn-primary btn-sm btn-block"
              >
                Sign up
              </Link>
            </div>
            <div className="flex xl:hidden justify-center gap-2">
              <Link
                href="/login"
                className="btn btn-ghost btn-circle btn-sm"
                title="Log in"
              >
                <LogIn className="w-4 h-4" />
              </Link>
              <Link
                href="/register"
                className="btn btn-ghost btn-circle btn-sm text-primary"
                title="Sign up"
              >
                <UserPlus className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
