import { Toaster } from "react-hot-toast";
import "./globals.css";

const themeBootstrap = `try {
  const theme = localStorage.getItem("chirper-theme");
  if (["dark", "light", "valentine", "dim", "cupcake", "dracula"].includes(theme)) {
    document.documentElement.dataset.theme = theme;
  }
} catch {}`;

export const metadata = {
  title: "Chirper / Microblogging",
  description:
    "It's what's happening. Join Chirper to see what people are talking about right now.",
  icons: {
    icon: "/chirper.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="bg-black text-neutral-100 min-h-screen antialiased selection:bg-sky-500/30 selection:text-sky-200">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3500,
            style: {
              background: "var(--color-base-200)",
              color: "var(--color-base-content)",
              border: "1px solid var(--color-base-300)",
              borderRadius: "9999px",
              padding: "10px 18px",
              fontSize: "14px",
              fontWeight: 500,
            },
          }}
        />
      </body>
    </html>
  );
}
