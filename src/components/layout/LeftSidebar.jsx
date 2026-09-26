"use client";

import Link from "next/link";
import Image from "next/image";
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
          <Image
            src="/chirper.svg"
            alt=""
            aria-hidden="true"
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 transition-transform group-hover:scale-105"
          />
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
