"use client"

import Image from "next/image"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
import { ArrowRight } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 flex flex-col items-center justify-center px-4">

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
        <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500] bg-clip-text text-transparent">
          MagangHub
        </span>
      </Link>

      {/* CARD */}
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-neutral-800 px-6 py-8 shadow-xl dark:shadow-black/40">

        {/* TITLE */}
        <h1 className="mb-6 text-center text-2xl font-extrabold text-gray-900 dark:text-white">
          Buat akun baru
        </h1>

        {/* GOOGLE BUTTON */}
        <button className="mb-6 flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900
          py-3 text-sm font-semibold
          text-gray-700 dark:text-gray-200
          transition hover:bg-gray-50 dark:hover:bg-neutral-700">
          <FcGoogle className="text-xl" />
          Daftar dengan Google
        </button>

        {/* DIVIDER */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-700" />
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500">ATAU</span>
          <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-700" />
        </div>

        {/* FORM */}
        <form className="space-y-4">

          {/* NAMA */}
          <div>
            <label className="mb-1 block text-sm font-bold text-gray-900 dark:text-gray-200">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
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

          {/* EMAIL */}
          <div>
            <label className="mb-1 block text-sm font-bold text-gray-900 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              placeholder="email@example.com"
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
            <label className="mb-1 block text-sm font-bold text-gray-900 dark:text-gray-200">
              Password
            </label>
            <input
              type="password"
              placeholder="Buat password"
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

          {/* SUBMIT */}
          <button
            type="submit"
            className="mt-2 w-full rounded-xl
              bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500]
              py-3 text-base font-bold text-white
              shadow-lg transition hover:opacity-90
              flex items-center justify-center gap-2"
          >
            <ArrowRight size={20} />
            Daftar Sekarang
          </button>
        </form>

        {/* FOOTER */}
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Sudah punya akun?{" "}
          <Link href="/id/signin" className="font-semibold text-orange-500 hover:underline">
            Masuk disini
          </Link>
        </p>
      </div>
    </div>
  )
}