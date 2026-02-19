import { GraduationCap, Sparkles, User, FileText, BookOpen, ClipboardList, BadgeCheck, Building2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-start pt-12 sm:pt-20 px-6 text-center dark:bg-gray-900">

        {/* BADGE */}
        <div className="mb-4">
          <span
            className="
              inline-block rounded-full
              border border-[#FFE8E0]
              bg-[#FFF8F5]
              px-5 py-1.5
              text-[13px] font-medium
              text-[#FF6B35]
              transition-all duration-300
              hover:bg-[#FFF1EB]
              hover:border-[#FFD7C9]
              hover:text-[#E8532F]
              cursor-pointer
              dark:border-orange-800/30
              dark:bg-orange-950/20
              dark:text-orange-400
              dark:hover:bg-orange-900/30
              dark:hover:text-orange-300"
          >
            #1 Platform Magang Terintegrasi & Terpercaya
          </span>
        </div>

        {/* HEADING */}
        <h1 className="max-w-4xl text-[32px] sm:text-4xl md:text-5xl lg:text-[64px] font-extrabold leading-[1.15] tracking-tight text-[#0F172A] dark:text-white">
          Temukan Magang Impian
          <br />
          Bersama <span className="bg-gradient-to-r from-orange-600 to-amber-500 dark:to-amber-300 bg-clip-text text-transparent">MagangHub</span>
        </h1>

        {/* BUTTONS */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link href="id/signin" className="rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 dark:to-amber-300 px-10 py-4 text-base font-bold text-white shadow-[0_10px_20px_-5px_rgba(234,88,12,0.3)] transition-all hover:scale-105 hover:opacity-90">
            Mulai Magang Sekarang
          </Link>

          <Link href="/id/signup" className="rounded-xl border border-gray-200 bg-white px-10 py-4 text-base font-semibold text-gray-700 transition-all hover:scale-105 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
            Daftar Akun Gratis
          </Link>
        </div>

        {/* USER ROLES */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <div className="flex cursor-default items-center gap-2 rounded-full bg-[#F1F5F9] px-5 py-2 text-[13px] font-semibold text-gray-500 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400">
            <GraduationCap className="h-4 w-4" />
            <span>Siswa/Mahasiswa</span>
          </div>

          <div className="flex cursor-default items-center gap-2 rounded-full bg-[#F1F5F9] px-5 py-2 text-[13px] font-semibold text-gray-500 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400">
            <Sparkles className="h-4 w-4" />
            <span>Fresh Graduate</span>
          </div>

          <div className="flex cursor-default items-center gap-2 rounded-full bg-[#F1F5F9] px-5 py-2 text-[13px] font-semibold text-gray-500 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400">
            <User className="h-4 w-4" />
            <span>Career Switcher</span>
          </div>
        </div>
      </section>

      {/* PLATFORM MAGANG SECTION */}
      <section className="bg-gray-50 py-16 sm:py-20 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            Platform Magang End-to-End
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 dark:text-gray-400">
            Kelola seluruh proses magang mulai dari pengajuan, administrasi,
            hingga penilaian kinerja dalam satu dashboard terintegrasi.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <Card className="min-h-[380px] rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
              <CardContent className="flex h-full flex-col px-6 py-12 text-left">
                {/* ICON */}
                <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm dark:bg-blue-950 dark:text-blue-400">
                  <FileText className="h-7 w-7" />
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold leading-snug text-gray-900 dark:text-white">
                  Administrasi Fleksibel
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                  Mendukung jalur akademik (MoU Sekolah/Kampus) maupun jalur umum
                  (Kontrak Mandiri) secara otomatis.
                </p>

                {/* PUSH SPACE KE BAWAH */}
                <div className="flex-1" />
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="min-h-[380px] rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
              <CardContent className="flex h-full flex-col px-6 py-12 text-left">
                {/* ICON */}
                <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 shadow-sm dark:bg-red-950 dark:text-red-400">
                  <BookOpen className="h-6 w-6" />
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold leading-snug text-gray-900 dark:text-white">
                  Jurnal Harian & Portofolio
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                  Catat aktivitas harianmu dan konversi menjadi portofolio pengalaman
                  magang yang terverifikasi.
                </p>

                {/* PUSH SPACE KE BAWAH */}
                <div className="flex-1" />
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="min-h-[380px] rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
              <CardContent className="flex h-full flex-col px-6 py-12 text-left">
                {/* ICON */}
                <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 shadow-sm dark:bg-green-950 dark:text-green-400">
                  <ClipboardList className="h-6 w-6" />
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold leading-snug text-gray-900 dark:text-white">
                  Manajemen Task Real-time
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                  Rasakan pengalaman magang sesungguhnya dengan sistem
                  manajemen tugas (To-Do) dari mentor industri.
                </p>

                {/* PUSH SPACE KE BAWAH */}
                <div className="flex-1" />
              </CardContent>
            </Card>

            {/* Card 4 */}
            <Card className="min-h-[380px] rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
              <CardContent className="flex h-full flex-col px-6 py-12 text-left">
                {/* ICON */}
                <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 shadow-sm dark:bg-purple-950 dark:text-purple-400">
                  <BadgeCheck className="h-6 w-6" />
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold leading-snug text-gray-900 dark:text-white">
                  Sertifikat Digital Valid
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
                  Dapatkan bukti pengalaman magang resmi yang diakui industri
                  untuk mengajukan magang di masa depan.
                </p>

                {/* PUSH SPACE KE BAWAH */}
                <div className="flex-1" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* EKOSISTEM INKLUSIF SECTION */}
      <section className="bg-white py-16 md:py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:gap-12 lg:grid-cols-2 items-start">

          {/* KIRI - KONTEN UTAMA */}
          <div className="space-y-8">
            {/* JUDUL */}
            <div>
              <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-[32px] dark:text-white">
                Ekosistem Inklusif untuk
              </h2>
              <h2 className="text-2xl font-bold leading-tight text-orange-500 sm:text-3xl md:text-[32px] dark:text-orange-400">
                Semua Kalangan
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base sm:mt-4 dark:text-gray-400">
                Kami memfasilitasi kebutuhan administrasi sekolah sekaligus memberikan ruang
                bagi individu umum untuk berkembang.
              </p>
            </div>

            {/* LIST TARGET */}
            <div className="space-y-5">

              {/* ITEM 1 */}
              <div className="flex items-start gap-4 p-3 rounded-xl transition-all hover:bg-gray-50 sm:p-4 dark:hover:bg-gray-800">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 sm:w-12 sm:h-12 sm:rounded-xl dark:bg-blue-950">
                  <GraduationCap className="w-5 h-5 text-blue-600 sm:w-6 sm:h-6 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
                    Siswa & Mahasiswa (Akademik)
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600 sm:mt-2 dark:text-gray-400">
                    Terintegrasi dengan guru pembimbing. Laporan PKL/Magang otomatis, absensi,
                    dan penilaian sesuai standar sekolah.
                  </p>
                </div>
              </div>

              {/* ITEM 2 */}
              <div className="flex items-start gap-4 p-3 rounded-xl transition-all hover:bg-gray-50 sm:p-4 dark:hover:bg-gray-800">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center shrink-0 sm:w-12 sm:h-12 sm:rounded-xl dark:bg-orange-950">
                  <User className="w-5 h-5 text-orange-600 sm:w-6 sm:h-6 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
                    Umum, Fresh Graduate & Career Switcher
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600 sm:mt-2 dark:text-gray-400">
                    Ajukan tanpa sekolah. Cari pengalaman riil, bangun portofolio terverifikasi,
                    dan dapatkan sertifikat untuk mengajukan magang.
                  </p>
                </div>
              </div>

              {/* ITEM 3 */}
              <div className="flex items-start gap-4 p-3 rounded-xl transition-all hover:bg-gray-50 sm:p-4 dark:hover:bg-gray-800">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0 sm:w-12 sm:h-12 sm:rounded-xl dark:bg-green-950">
                  <Building2 className="w-5 h-5 text-green-600 sm:w-6 sm:h-6 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
                    Perusahaan & Industri
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600 sm:mt-2 dark:text-gray-400">
                    Satu pintu untuk merekrut kandidat muda dari SMK, Kampus, maupun kandidat
                    umum dengan sistem filter skill yang akurat.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* KANAN - CARD EKOSISTEM */}
          <div className="relative mt-8 lg:mt-16">
            {/* SHADOW CARD - DI POJOK KIRI ATAS DENGAN ROTASI */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl shadow-lg transform rotate-3 dark:from-gray-800 dark:to-gray-700" />

            {/* CARD UTAMA */}
            <Card className="relative rounded-2xl border border-gray-100 bg-white shadow-lg sm:rounded-3xl dark:border-gray-800 dark:bg-gray-900">
              <CardContent className="p-5 sm:p-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400 sm:mb-5 sm:text-sm dark:text-gray-500">
                  Aktivitas Terbaru
                </p>

                {/* ITEM 1 */}
                <div className="mb-3 rounded-xl border border-gray-100 bg-gray-50 p-4 transition-all hover:bg-gray-100 sm:mb-4 sm:rounded-2xl sm:p-5 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold shadow-sm sm:h-12 sm:w-12">
                      MHS
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-900 sm:text-base dark:text-white">
                          Budi (Mahasiswa)
                        </p>
                        <span className="text-xs text-green-500 font-medium bg-green-50 px-2 py-1 rounded-full dark:bg-green-950 dark:text-green-400">
                          Verified
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600 sm:mt-2 dark:text-gray-400">
                        Guru pembimbing menyetujui laporan minggu ke-4.
                      </p>
                      <span className="inline-block mt-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                        Jalur Akademik
                      </span>
                    </div>
                  </div>
                </div>

                {/* ITEM 2 */}
                <div className="rounded-xl border border-orange-200 bg-orange-50 p-4 transition-all hover:bg-orange-100 sm:rounded-2xl sm:p-5 dark:border-orange-900 dark:bg-orange-950/50 dark:hover:bg-orange-950">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="h-10 w-10 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold shadow-sm sm:h-12 sm:w-12">
                      UM
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-900 sm:text-base dark:text-white">
                          Sinta (Fresh Grad)
                        </p>
                        <span className="text-xs font-medium text-orange-500 bg-orange-50 px-2 py-1 rounded-full dark:bg-orange-950 dark:text-orange-400">
                          Baru saja
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600 sm:mt-2 dark:text-gray-400">
                        Menyelesaikan project redesign landing page dan mendapatkan
                        sertifikat kompetensi.
                      </p>
                      <span className="inline-block mt-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700 dark:bg-orange-950 dark:text-orange-400">
                        Jalur Mandiri / Umum
                      </span>
                    </div>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-orange-500 cursor-pointer transition-all hover:gap-3 sm:mt-6 dark:text-orange-400">
                  <span>Lihat Semua Aktivitas</span>
                  <span className="transition-transform hover:translate-x-1">→</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1F2937] py-28 dark:from-black dark:via-gray-950 dark:to-gray-900">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">

          {/* HEADING */}
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Tingkatkan Karirmu Sekarang
          </h2>

          {/* DESCRIPTION */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-300 sm:text-lg dark:text-gray-400">
            Tidak harus menunggu lulus untuk mencari pengalaman.
            Baik Anda siswa, mahasiswa, atau fresh graduate, ribuan peluang menunggu Anda.
          </p>

          {/* CTA BUTTON */}
          <div className="mt-12">
            <Link href="/id/signup" className="rounded-full bg-orange-500 px-10 py-4 text-lg font-bold text-white shadow-xl transition-all hover:scale-105 hover:bg-orange-600">
              Daftar Sebagai Member
            </Link>
          </div>
        </div>

        {/* SOFT GLOW */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </section>

    </>
  )
}