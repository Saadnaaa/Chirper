"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, Palette } from "lucide-react";

const themes = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "valentine", label: "Valentine" },
  { value: "dim", label: "Dim" },
  { value: "cupcake", label: "Cupcake" },
  { value: "dracula", label: "Dracula" },
];

export default function ThemeToggle({ compact = false, iconOnly = false }) {
  const [theme, setTheme] = useState("dark");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem("chirper-theme");

      if (themes.some((option) => option.value === savedTheme)) {
        setTheme(savedTheme);
        document.documentElement.dataset.theme = savedTheme;
      }
    } catch {
      // Theme changes still work for this session when storage is unavailable.
    }
  }, []);

  function applyTheme(nextTheme) {
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;

    try {
      window.localStorage.setItem("chirper-theme", nextTheme);
    } catch {
      // Keep the active theme even if the browser blocks local storage.
    }
  }

  return (
    <div className={`relative ${iconOnly ? "" : "w-full"}`}>
      <button
        type="button"
        aria-label={`Choose theme, currently ${theme}`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((open) => !open)}
        className={`flex items-center gap-3 transition-colors hover:bg-base-200 ${
          iconOnly
            ? "h-11 w-11 justify-center rounded-full text-base-content"
            : "w-full rounded-lg px-3 py-2 text-base-content"
        } ${compact ? "border border-base-300 bg-base-100" : ""}`}
        title={iconOnly ? `Theme: ${theme}` : undefined}
      >
        <Palette className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        {!iconOnly && (
          <>
            <span className="flex-1 text-left text-sm font-medium">Theme</span>
            <span className="text-sm text-base-content/70">
              {themes.find((option) => option.value === theme)?.label}
            </span>
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="Choose color theme"
          className={`z-50 rounded-lg border border-base-300 bg-base-100 p-2 text-base-content shadow-xl ${
            iconOnly
              ? "absolute left-full top-0 ml-2 w-44"
              : compact
                ? "mt-2 w-full"
                : "absolute left-0 top-full mt-2 w-full min-w-48"
          }`}
        >
          {themes.map((option) => (
            <button
              key={option.value}
              type="button"
              role="menuitemradio"
              aria-checked={theme === option.value}
              onClick={() => {
                applyTheme(option.value);
                setIsOpen(false);
              }}
              className="flex min-h-10 w-full items-center justify-between rounded-md px-2 text-left text-sm hover:bg-base-200"
            >
              {option.label}
              {theme === option.value && (
                <Check className="h-4 w-4 text-primary" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
