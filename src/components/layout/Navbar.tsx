"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setMounted(true), [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  if (!mounted) return null

  // Helper function untuk check active menu
  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900 shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-6">

          {/* KIRI + TENGAH */}
          <div className="flex items-center gap-10">

            {/* LOGO */}
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8">
                <Image
                  src="/maganghublogo.webp"
                  alt="MagangHub Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <span className="text-lg font-bold tracking-tight">
                <span className="bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500] bg-clip-text text-transparent">
                  MagangHub
                </span>
              </span>
            </div>

            {/* MENU DESKTOP */}
            <div className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wide">
              <Link
                href="/id/jobs"
                className={`transition-colors ${isActive('/id/jobs')
                  ? 'text-[#FF6B35]'
                  : 'hover:text-[#FF6B35]'
                  }`}
              >
                LOWONGAN
              </Link>
              <Link
                href="/id/magang"
                className={`transition-colors ${isActive('/id/magang')
                  ? 'text-[#FF6B35]'
                  : 'hover:text-[#FF6B35]'
                  }`}
              >
                TEMPAT MAGANG
              </Link>
              <Link
                href="/id/pendidikan"
                className={`transition-colors ${isActive('/id/pendidikan')
                  ? 'text-[#FF6B35]'
                  : 'hover:text-[#FF6B35]'
                  }`}
              >
                INSTANSI PENDIDIKAN
              </Link>
              <Link
                href="/id/members"
                className={`transition-colors ${isActive('/id/members')
                  ? 'text-[#FF6B35]'
                  : 'hover:text-[#FF6B35]'
                  }`}
              >
                ANGGOTA
              </Link>
              <Link
                href="/id/blogs"
                className={`transition-colors ${isActive('/id/blogs')
                  ? 'text-[#FF6B35]'
                  : 'hover:text-[#FF6B35]'
                  }`}
              >
                BLOG
              </Link>
            </div>
          </div>

          {/* KANAN */}
          <div className="ml-auto flex items-center gap-4">
            {/* Desktop Auth Links */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              </Button>

              <Link
                href="/id/signup"
                className="text-xs font-bold tracking-wide transition-colors hover:text-[#FF6B35]"
              >
                DAFTAR
              </Link>

              <span className="text-gray-400 text-xs">|</span>

              <Link
                href="/id/signin"
                className="text-xs font-bold tracking-wide transition-colors hover:text-[#FF6B35]"
              >
                MASUK
              </Link>
            </div>


            {/* Mobile Hamburger Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* MOBILE MENU DROPDOWN */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 w-full bg-white dark:bg-[#1a2332] shadow-xl border-b border-gray-100 dark:border-gray-800 transform transition-all duration-300 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
          }`}
      >
        <div className="flex flex-col max-h-[90vh] overflow-y-auto">
          {/* Header in Dropdown */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 text-orange-600">
                <Image
                  src="/maganghublogo.webp"
                  alt="MagangHub Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-lg font-bold tracking-tight">
                <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                  MagangHub
                </span>
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <X size={24} />
            </Button>
          </div>

          {/* Menu Links */}
          <div className="flex flex-col gap-1 p-4">
            <Link
              href="/id/jobs"
              className={`flex items-center px-4 py-3.5 text-[13px] font-bold tracking-wider rounded-xl transition-all ${isActive('/id/jobs')
                ? 'bg-[#F8FAFC] dark:bg-gray-800/50 text-[#FF6B35]'
                : 'text-gray-600 dark:text-gray-300 hover:bg-[#F8FAFC] dark:hover:bg-gray-800/30 hover:text-[#FF6B35]'
                }`}
            >
              LOWONGAN
            </Link>
            <Link
              href="/id/magang"
              className={`flex items-center px-4 py-3.5 text-[13px] font-bold tracking-wider rounded-xl transition-all ${isActive('/id/magang')
                ? 'bg-[#F8FAFC] dark:bg-gray-800/50 text-[#FF6B35]'
                : 'text-gray-600 dark:text-gray-300 hover:bg-[#F8FAFC] dark:hover:bg-gray-800/30 hover:text-[#FF6B35]'
                }`}
            >
              TEMPAT MAGANG
            </Link>
            <Link
              href="/id/pendidikan"
              className={`flex items-center px-4 py-3.5 text-[13px] font-bold tracking-wider rounded-xl transition-all ${isActive('/id/pendidikan')
                ? 'bg-[#F8FAFC] dark:bg-gray-800/50 text-[#FF6B35]'
                : 'text-gray-600 dark:text-gray-300 hover:bg-[#F8FAFC] dark:hover:bg-gray-800/30 hover:text-[#FF6B35]'
                }`}
            >
              INSTANSI PENDIDIKAN
            </Link>
            <Link
              href="/id/members"
              className={`flex items-center px-4 py-3.5 text-[13px] font-bold tracking-wider rounded-xl transition-all ${isActive('/id/members')
                ? 'bg-[#F8FAFC] dark:bg-gray-800/50 text-[#FF6B35]'
                : 'text-gray-600 dark:text-gray-300 hover:bg-[#F8FAFC] dark:hover:bg-gray-800/30 hover:text-[#FF6B35]'
                }`}
            >
              ANGGOTA
            </Link>
            <Link
              href="/id/blogs"
              className={`flex items-center px-4 py-3.5 text-[13px] font-bold tracking-wider rounded-xl transition-all ${isActive('/id/blogs')
                ? 'bg-[#F8FAFC] dark:bg-gray-800/50 text-[#FF6B35]'
                : 'text-gray-600 dark:text-gray-300 hover:bg-[#F8FAFC] dark:hover:bg-gray-800/30 hover:text-[#FF6B35]'
                }`}
            >
              BLOG
            </Link>
          </div>

          {/* Mode & Flag Section */}
          <div className="mx-4 my-2 p-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-4 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              </div>
              <span className="text-[13px] font-bold tracking-widest text-[#64748B] dark:text-gray-400">MODE</span>
            </div>

            <div className="relative w-6 h-6 overflow-hidden rounded-full border border-gray-100 shadow-sm">
              <Image
                src="https://flagcdn.com/id.svg"
                alt="Indonesia Flag"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="grid grid-cols-2 gap-4 p-6 bg-white dark:bg-[#1a2332]">
            <Link
              href="/id/signin"
              className="flex items-center justify-center py-4 text-[13px] font-bold tracking-widest text-[#64748B] dark:text-gray-300 bg-[#F8FAFC] dark:bg-gray-800 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              MASUK
            </Link>
            <Link
              href="/id/signup"
              className="flex items-center justify-center py-4 text-[13px] font-bold tracking-widest text-white bg-gradient-to-r from-orange-600 to-amber-500 rounded-2xl shadow-[0_8px_16px_-4px_rgba(255,107,53,0.3)] hover:opacity-90 transition-all"
            >
              DAFTAR
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}