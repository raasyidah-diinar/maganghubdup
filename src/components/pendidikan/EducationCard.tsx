"use client";

import { MapPin, Briefcase, Users, CheckCircle2, Bookmark } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

type EducationCardProps = {
  id: number;
  institutionName: string;
  institutionLogo: string;
  category: string;
  address: string;
  workTypes: string[];
  openPositions: number;
  activeInterns: number;
  totalAlumni: number;
  isVerified?: boolean;
  isLoading?: boolean;
};

export default function EducationCard({
  id,
  institutionName,
  institutionLogo,
  category,
  address,
  workTypes,
  openPositions,
  activeInterns,
  totalAlumni,
  isVerified = false,
  isLoading = false,
}: EducationCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDashboardView = searchParams.get('view') === 'dashboard';

  const handleInstitutionClick = () => {
    const detailPath = `/id/pendidikan/${id}`;
    const route = isDashboardView ? `${detailPath}?view=dashboard` : detailPath;
    router.push(route);
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden break-inside-avoid p-5 group">
      {/* Gradient Border - Left Only */}
      <span className="absolute left-0 top-0 bottom-0 w-[6px] bg-gradient-to-b from-orange-500 to-amber-400 rounded-l-2xl" />

      <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-transparent dark:from-orange-900/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl -z-10" />

      {/* Header dengan Logo dan Info */}
      <div className="flex items-start gap-4 mb-4">
        {/* Logo Besar tanpa card di sisi */}
        <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 shadow-lg">
          <Image
            src={institutionLogo}
            alt={institutionName}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-1">
            {category}
          </p>
          <h3
            onClick={handleInstitutionClick}
            className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors line-clamp-1 cursor-pointer"
          >
            {institutionName}
          </h3>

          {/* Address */}
          <div className="flex items-start gap-1.5 text-sm text-gray-600 dark:text-gray-400 mb-3">
            <MapPin className="w-3.5 h-3.5 text-orange-500 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">{address}</span>
          </div>

          {/* Work Type Tags - Abu-abu tidak bold */}
          <div className="flex flex-wrap gap-2">
            {workTypes.map((type) => (
              <span
                key={type}
                className="px-3 py-1 text-xs font-normal bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Bookmark */}
        <button className="text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
          <Bookmark size={20} />
        </button>
      </div>

      {/* Stats - Horizontal (sama seperti PlaceCard) */}
      <div className="flex items-center gap-4 text-xs">
        {/* Lowongan */}
        <div className="flex items-center gap-1.5">
          <Briefcase size={14} className="text-orange-500 flex-shrink-0" />
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            {openPositions} Lowongan
          </span>
        </div>

        <span className="text-gray-300 dark:text-gray-600">•</span>

        {/* Aktif */}
        <div className="flex items-center gap-1.5">
          <Users size={14} className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            {activeInterns} Aktif
          </span>
        </div>

        <span className="text-gray-300 dark:text-gray-600">•</span>

        {/* Alumni */}
        <div className="flex items-center gap-1.5">
          <CheckCircle2 size={14} className="text-green-600 dark:text-green-500 flex-shrink-0" />
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            {totalAlumni} Alumni
          </span>
        </div>
      </div>
    </div>
  );
}