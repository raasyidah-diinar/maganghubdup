import { Bookmark, MapPin, Users, Briefcase, Check, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

type JobCardListProps = {
  id: number;
  category?: string;
  title: string;
  salary?: string;
  tags: string[];
  company: string;
  companyLogo?: string;
  location: string;
  applicants: string;
  status?: string;
  postedAt: string;
  isPremium?: boolean;
  workType?: "Onsite" | "Hybrid" | "Remote";
  isInDashboard?: boolean;
  isLoading?: boolean;
};

export default function JobCardList({
  id,
  category = "TECHNOLOGY",
  title,
  salary,
  tags,
  company,
  companyLogo,
  location,
  applicants,
  status = "Aktif",
  postedAt,
  isPremium = false,
  workType,
  isInDashboard = false,
  isLoading = false,
}: JobCardListProps) {
  if (isLoading) {
    return (
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex gap-5 overflow-hidden">
        <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-gray-200 dark:bg-gray-700 rounded-l-2xl" />
        <div className="flex-shrink-0 ml-2 flex flex-col items-center pt-3">
          <Skeleton className="w-16 h-16 rounded-lg mb-2.5" />
          <Skeleton className="h-4 w-20 mb-1" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-4 mb-2">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-7 w-3/4" />
            </div>
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
          <div className="flex gap-2 mb-3">
            <Skeleton className="h-6 w-20 rounded-lg" />
            <Skeleton className="h-6 w-20 rounded-lg" />
          </div>
          <div className="flex-1" />
          <div className="flex justify-between items-center pt-2.5 border-t border-gray-100 dark:border-gray-700">
            <div className="flex gap-2">
              <Skeleton className="h-8 w-16 rounded-lg" />
              <Skeleton className="h-8 w-16 rounded-lg" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    );
  }
  const detailLink = isInDashboard ? `/id/dashboard/jobs/${id}` : `/id/jobs/${id}`;

  return (
    <Link href={detailLink} className="block">
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all hover:shadow-xl hover:-translate-y-0.5 flex gap-5 cursor-pointer overflow-hidden">

        {/* Gradient Border - Left Only (sama seperti JobCard) */}
        <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-500 to-amber-400 rounded-l-2xl" />

        {/* Logo Perusahaan */}
        <div className="flex-shrink-0 ml-2 flex flex-col items-center pt-3">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center overflow-hidden shadow-sm border border-gray-200 dark:border-gray-600">
            {companyLogo ? (
              <Image
                src={companyLogo}
                alt={company}
                width={64}
                height={64}
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <span className="font-bold text-xl text-gray-600 dark:text-gray-300">{company[0]}</span>
            )}
          </div>

          {/* Company Name & Location */}
          <div className="mt-2.5 text-center">
            <p className="font-semibold text-gray-900 dark:text-gray-100 flex items-center justify-center gap-1.5 text-sm mb-1">
              {company}
              <span className="w-[18px] h-[18px] rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <Check size={10} className="text-white stroke-[3]" />
              </span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
              <MapPin size={12} className="flex-shrink-0" />
              <span className="max-w-[120px] truncate">{location}</span>
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start gap-4 mb-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wide mb-1">
                {category}
              </p>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-0">
                {title}
              </h2>
            </div>

            {salary ? (
              <span className="px-3 py-1.5 text-sm rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold whitespace-nowrap">
                {salary}
              </span>

            ) : (
              <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap px-2 py-1">
                Gaji Tidak Ditampilkan
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {isPremium && (
              <span className="px-2.5 py-1 text-xs rounded-lg font-medium bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
                Premium
              </span>
            )}

            {workType === "Onsite" && (
              <span className="px-2.5 py-1 text-xs rounded-lg font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 flex items-center gap-1">
                <Building2 size={11} />
                Onsite
              </span>
            )}

            {workType === "Hybrid" && (
              <span className="px-2.5 py-1 text-xs rounded-lg font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center gap-1">
                <Building2 size={11} />
                Hybrid
              </span>
            )}

            {workType === "Remote" && (
              <span className="px-2.5 py-1 text-xs rounded-lg font-medium bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                <Building2 size={11} />
                Remote
              </span>
            )}

            {tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer */}
          <div className="flex justify-between items-center pt-2.5 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2.5">
              {/* Applicants with Popup Stats - Button Kecil */}
              <div className="relative group">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Handle stats view
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer border border-gray-200 dark:border-gray-600"
                >
                  <Users size={14} className="text-gray-500 dark:text-gray-400" />
                  <span className="font-semibold text-xs text-gray-700 dark:text-gray-300">{applicants}</span>
                </button>

                {/* Popup Statistik */}
                <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-20 w-64">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3">
                      Statistik Kandidat
                    </h3>

                    <div className="space-y-2">
                      {/* Sedang Proses */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users size={14} className="text-blue-500" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">Sedang Proses</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                          {applicants.split('/')[0].trim()}
                        </span>
                      </div>

                      {/* Sudah Diterima */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Check size={14} className="text-green-500" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">Sudah Diterima</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                          {applicants.split('/')[1]?.trim() || '0'}
                        </span>
                      </div>

                      {/* Kuota */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Briefcase size={14} className="text-orange-500" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">Kuota</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                          {applicants.split('/')[2]?.trim() || '0'}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-green-500 h-full rounded-full transition-all"
                          style={{
                            width: `${Math.min((parseInt(applicants.split('/')[1] || '0') / parseInt(applicants.split('/')[2] || '1')) * 100, 100)}%`
                          }}
                        />
                      </div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 text-right mt-1">
                        {applicants.split('/')[1]?.trim() || '0'} kuota terisi
                      </p>
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-4 -mt-1">
                    <div className="border-8 border-transparent border-t-white dark:border-t-gray-800" />
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <span className="px-2.5 py-1 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold flex items-center gap-1 border border-green-200 dark:border-green-800">
                <Briefcase size={11} />
                {status}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{postedAt}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Handle bookmark logic here
                }}
                className="p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
              >
                <Bookmark
                  size={18}
                  className="text-gray-400 dark:text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}