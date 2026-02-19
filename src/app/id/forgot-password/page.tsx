"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SigninPage() {
  return (
    <div
      className="
        min-h-screen flex flex-col items-center justify-center px-4
        bg-gray-50 dark:bg-neutral-900
      "
    >
      {/* LOGO */}
      <Link href="/home" className="mb-8 flex items-center gap-2">
        <div className="relative h-10 w-10">
          <Image
            src="/maganghublogo.webp"
            alt="MagangHub"
            fill
            priority
            className="object-contain"
          />
        </div>

        <span
          className="
            text-2xl font-extrabold tracking-tight
            bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500]
            bg-clip-text text-transparent
          "
        >
          MagangHub
        </span>
      </Link>

      {/* CARD */}
      <div
        className="
          w-full max-w-md rounded-3xl px-6 py-8
          bg-white dark:bg-neutral-800
          shadow-xl dark:shadow-black/40
        "
      >
        {/* TITLE */}
        <div className="text-center">
          <h1
            className="
              mb-4 text-2xl font-extrabold
              text-gray-900 dark:text-white
            "
          >
            Lupa Password?
          </h1>

          <p className="text-sm text-gray-500 dark:text-slate-400">
            Masukkan email Anda dan kami akan mengirimkan tautan untuk
            mengatur ulang password Anda.
          </p>
        </div>

        {/* FORM */}
        <form className="mt-6 space-y-4">
          {/* EMAIL */}
          <div>
            <label
              htmlFor="email"
              className="
                mb-1 block text-sm font-bold
                text-gray-900 dark:text-gray-200
              "
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="email@example.com"
              className="
                w-full rounded-xl px-4 py-3 text-sm
                border border-gray-200 dark:border-neutral-700
                bg-white dark:bg-neutral-900
                text-gray-900 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                focus:border-orange-500 focus:outline-none
                focus:ring-2 focus:ring-orange-200
                dark:focus:ring-orange-500/30
              "
            />
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            className="
              mt-2 w-full rounded-xl py-3
              flex items-center justify-center gap-2
              bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500]
              text-base font-bold text-white
              shadow-lg transition hover:opacity-90
            "
          >
            <Mail className="h-5 w-5" />
            Kirim
          </Button>
        </form>
      </div>
    </div>
  );
}
