"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  Home,
  LogIn,
  Menu,
  Settings,
  User,
  UserPlus,
  X,
} from "lucide-react";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import LogoutButton from "@/components/auth/LogoutButton";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function MobileNav({ user, unreadNotificationCount = 0 }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/", icon: Home, isActive: pathname === "/" },
    ...(user
      ? [
          {
            label: "Notifications",
            href: "/notifications",
            icon: Bell,
            isActive: pathname.startsWith("/notifications"),
          },
          {
            label: "Profile",
            href: `/profile/${user.username}`,
            icon: User,
            isActive:
              pathname.startsWith(`/profile/${user.username}`) &&
              !pathname.includes("/edit"),
          },
          {
            label: "Edit Profile",
            href: `/profile/${user.username}/edit`,
            icon: Settings,
            isActive: pathname.includes("/edit"),
          },
        ]
      : [
          {
            label: "Log in",
            href: "/login",
            icon: LogIn,
            isActive: pathname === "/login",
          },
          {
            label: "Sign up",
            href: "/register",
            icon: UserPlus,
            isActive: pathname === "/register",
          },
        ]),
  ];

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="sm:hidden fixed inset-0 z-40 bg-black/60"
          onClick={closeMenu}
        />
      )}

      <div className="sm:hidden fixed bottom-4 left-4 z-50">
        {isOpen && (
          <nav
            id="mobile-navigation-menu"
            aria-label="Mobile Navigation"
            className="absolute bottom-full left-0 mb-3 w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-neutral-800 bg-neutral-950 p-2 shadow-2xl"
          >
            {user && (
              <Link
                href={`/profile/${user.username}`}
                onClick={closeMenu}
                className="mb-2 flex items-center gap-3 border-b border-neutral-800 px-3 py-3"
              >
                <ProfileAvatar user={user} size={40} />
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-bold text-neutral-100">
                    {user.name}
                  </span>
                  <span className="truncate text-xs text-neutral-500">
                    @{user.username}
                  </span>
                </span>
              </Link>
            )}

            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    aria-current={item.isActive ? "page" : undefined}
                    className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors hover:bg-neutral-900 ${
                      item.isActive
                        ? "font-semibold text-sky-400"
                        : "text-neutral-200"
                    }`}
                  >
                    <span className="relative">
                      <Icon className="h-5 w-5" />
                      {item.label === "Notifications" &&
                        unreadNotificationCount > 0 && (
                          <span className="absolute -right-2 -top-2 min-w-4 rounded-full bg-sky-500 px-1 text-center text-[10px] leading-4 text-white">
                            {unreadNotificationCount > 99
                              ? "99+"
                              : unreadNotificationCount}
                          </span>
                        )}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-2 border-t border-neutral-800 pt-2">
              <ThemeToggle compact />
            </div>

            {user && (
              <div className="mt-2 border-t border-neutral-800 pt-2">
                <LogoutButton className="rounded-lg px-3" showText />
              </div>
            )}
          </nav>
        )}

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation-menu"
          onClick={() => setIsOpen((open) => !open)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-700 bg-neutral-950 text-neutral-100 shadow-lg transition-colors hover:bg-neutral-900"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
    </>
  );
}
