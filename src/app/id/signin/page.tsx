"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { ArrowRight } from "lucide-react";

export default function SigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Hardcoded credentials for demonstration
  const VALID_EMAIL = "Diinar@gmail.com";
  const VALID_PASSWORD = "password123";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate credentials
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      // Successful login - redirect to dashboard
      setTimeout(() => {
        router.push("/id/dashboard");
      }, 500);
    } else {
      // Failed login - show error
      setIsLoading(false);
      setError("Email atau password salah. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4
      bg-gray-50 dark:bg-neutral-900">

      {/* LOGO */}
      <Link href="/id" className="mb-8 flex items-center gap-2">
        <div className="relative h-10 w-10">
          <Image
            src="/maganghublogo.webp"
            alt="MagangHub"
            fill
            className="object-contain"
            priority
          />
        </div>
        <span className="text-2xl font-extrabold tracking-tight
          bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500]
          bg-clip-text text-transparent">
          MagangHub
        </span>
      </Link>

      {/* CARD */}
      <div className="w-full max-w-md rounded-3xl px-6 py-8
        bg-white dark:bg-neutral-800
        shadow-xl dark:shadow-black/40">

        {/* TITLE */}
        <h1 className="mb-6 text-center text-2xl font-extrabold
          text-gray-900 dark:text-white">
          Masuk ke akun Anda
        </h1>

        {/* GOOGLE */}
        <button className="mb-6 flex w-full items-center justify-center gap-3
          rounded-xl border
          border-gray-200 dark:border-neutral-700
          bg-white dark:bg-neutral-900
          py-3 text-sm font-semibold
          text-gray-700 dark:text-gray-200
          transition hover:bg-gray-50 dark:hover:bg-neutral-700">
          <FcGoogle className="text-xl" />
          Masuk dengan Google
        </button>

        {/* DIVIDER */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-700" />
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
            ATAU
          </span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-700" />
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMAIL */}
          <div>
            <label className="mb-1 block text-sm font-bold
              text-gray-900 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl
                border border-gray-200 dark:border-neutral-700
                bg-white dark:bg-neutral-900
                px-4 py-3 text-sm
                text-gray-900 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                focus:border-orange-500 focus:outline-none
                focus:ring-2 focus:ring-orange-200
                dark:focus:ring-orange-500/30"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="block text-sm font-bold
                text-gray-900 dark:text-gray-200">
                Password
              </label>
              <Link
                href="/id/forgot-password"
                className="text-sm font-medium text-orange-500 hover:underline">
                Lupa password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl
                border border-gray-200 dark:border-neutral-700
                bg-white dark:bg-neutral-900
                px-4 py-3 text-sm
                text-gray-900 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                focus:border-orange-500 focus:outline-none
                focus:ring-2 focus:ring-orange-200
                dark:focus:ring-orange-500/30"
            />
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="text-sm text-red-500 dark:text-red-400 text-center">
              {error}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-xl
              bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500]
              py-3 text-base font-bold text-white
              shadow-lg transition hover:opacity-90
              flex items-center justify-center gap-2
              disabled:opacity-50 disabled:cursor-not-allowed">
            <ArrowRight size={20} />
            {isLoading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="mt-6 text-center text-sm
          text-gray-600 dark:text-gray-400">
          Belum punya akun?{" "}
          <Link href="/id/signup"
            className="font-semibold text-orange-500 hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}