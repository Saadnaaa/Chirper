"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { loginUser } from "@/actions/auth/login";
import toast from "react-hot-toast";
import { User, Lock, LogIn, Eye, EyeOff, Sparkles } from "lucide-react";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const result = await loginUser(formData.username, formData.password);

      if (!result.success) {
        toast.error(result.message);
      } else {
        toast.success(result.message || "Logged in successfully");
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      toast.error("Failed to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 sm:p-6 lg:p-12">
      <div className="w-full max-w-5xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-base-300 grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        {/* Left Side: Brand Hero Section */}
        <div className="lg:col-span-5 bg-gradient-to-br from-primary/10 via-primary/5 to-base-100 p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-base-300 relative overflow-hidden">
          {/* Ambient Background Glows */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Logo & Branding */}
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div className="btn btn-primary btn-circle btn-lg shadow-md group-hover:scale-105 transition-transform duration-200">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-7 h-7 fill-current text-primary-content"
                >
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.107-.803.164-1.227.164-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-base-content">
                Chirper
              </span>
            </Link>

            <div className="mt-8 lg:mt-16 space-y-3">
              <span className="badge badge-primary badge-outline gap-1 font-medium px-3 py-1">
                <Sparkles className="w-3.5 h-3.5" /> Welcome Back
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-base-content leading-tight">
                See what's happening right now.
              </h1>
              <p className="text-base-content/70 text-sm sm:text-base leading-relaxed">
                Log in to catch up on trending posts, check your messages, and
                reconnect with your community.
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="relative z-10 hidden lg:block pt-8 border-t border-base-300/50">
            <p className="text-xs text-base-content/50">
              © {new Date().getFullYear()} Chirper Inc. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-base-100">
          <div className="max-w-md w-full mx-auto space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-base-content">
                Sign in to Chirper
              </h2>
              <p className="text-sm text-base-content/60 mt-1">
                Enter your details to access your account.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username Input */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-semibold text-xs uppercase tracking-wider text-base-content/70">
                    Username
                  </span>
                </label>
                <label className="input input-bordered focus-within:input-primary flex items-center gap-3 w-full bg-base-200/50 focus-within:bg-base-100 transition-colors">
                  <User className="w-4 h-4 text-base-content/50 shrink-0" />
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="grow bg-transparent text-sm placeholder:text-base-content/30 outline-none"
                  />
                </label>
              </div>

              {/* Password Input */}
              <div className="form-control">
                <label className="label py-1">
                  <span className="label-text font-semibold text-xs uppercase tracking-wider text-base-content/70">
                    Password
                  </span>
                </label>
                <label className="input input-bordered focus-within:input-primary flex items-center gap-3 w-full bg-base-200/50 focus-within:bg-base-100 transition-colors">
                  <Lock className="w-4 h-4 text-base-content/50 shrink-0" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="grow bg-transparent text-sm placeholder:text-base-content/30 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-base-content/50 hover:text-base-content transition-colors p-1"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-block text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 mr-1" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Switch to Register */}
            <div className="text-center text-sm text-base-content/70 pt-2">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="link link-primary font-bold no-underline hover:underline ml-1"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
