import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        {/* TOP */}
        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">

          {/* BRAND */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/maganghublogo.webp"
                alt="MagangHub Logo"
                width={32}
                height={32}
                priority
              />
              <h2 className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-xl font-extrabold text-transparent">
                MagangHub
              </h2>
            </div>

            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Platform magang terintegrasi. Menghubungkan talenta muda dengan
              industri untuk pengalaman magang yang nyata dan terverifikasi.
            </p>
          </div>

          {/* PRODUK */}
          <div>
            <h3 className="mb-4 text-base font-semibold">Produk</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
                >
                  Platform Magang
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
                >
                  Jurnal Absensi Online
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
                >
                  Cari Lowongan
                </Link>
              </li>
            </ul>
          </div>

          {/* PENGGUNA */}
          <div>
            <h3 className="mb-4 text-base font-semibold">Pengguna</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
                >
                  Siswa & Mahasiswa
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
                >
                  Umum & Career Switcher
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
                >
                  Sekolah & Kampus
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
                >
                  Perusahaan
                </Link>
              </li>
            </ul>
          </div>

          {/* DUKUNGAN */}
          <div>
            <h3 className="mb-4 text-base font-semibold">Dukungan</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
                >
                  Pusat Bantuan
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
                >
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
                >
                  Kontak Kami
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t pt-6 text-center text-sm text-muted-foreground">
          © 2024 MagangHub. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
