"use client";

import { MapPin, Briefcase, Users, CheckCircle2, Bookmark } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

type PlaceCardListProps = {
  id: number;
  companyName: string;
  companyLogo: string;
  category: string;
  address: string;
  workTypes: string[];
  openPositions: number;
  activeInterns: number;
  totalAlumni: number;
  isVerified?: boolean;
  isLoading?: boolean;
  isInDashboard?: boolean;
};

export default function PlaceCardList({
  id,
  companyName,
  companyLogo,
  category,
  address,
  workTypes,
  openPositions,
  activeInterns,
  totalAlumni,
  isVerified = false,
  isLoading = false,
  isInDashboard = false,
}: PlaceCardListProps) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const isDashboardView = searchParams.get('view') === 'dashboard' || isInDashboard;

  const handleCompanyClick = () => {
    const detailPath = `/id/magang/${id}`;
    const route = isDashboardView ? `${detailPath}?view=dashboard` : detailPath;
    router.push(route);
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden p-5">
      {/* Gradient Border - Left Only (sama seperti PlaceCard) */}
      <span className="absolute left-0 top-0 bottom-0 w-[6px] bg-gradient-to-b from-orange-500 to-amber-400 rounded-l-2xl" />

      <div className="flex items-start gap-4">
        {/* Logo with shadow */}
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700 shadow-md">
          <Image
            src={companyLogo}
            alt={companyName}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">
                {category}
              </p>
              <h3
                onClick={handleCompanyClick}
                className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1 hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer"
              >
                {companyName}
              </h3>

              {/* Address - Moved here */}
              <div className="flex items-start gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-orange-500" />
                <span>{address}</span>
              </div>
            </div>

            {/* Bookmark */}
            <button className="text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors ml-4">
              <Bookmark size={22} />
            </button>
          </div>

          {/* Work Types */}
          <div className="flex flex-wrap gap-2 mb-4">
            {workTypes.map((type) => (
              <span
                key={type}
                className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md"
              >
                {type}
              </span>
            ))}
          </div>

          {/* Stats - Horizontal Layout */}
          <div className="flex items-center gap-4 text-xs">
            {/* Lowongan */}
            <div className="flex items-center gap-1.5">
              <Briefcase size={14} className="text-orange-600 dark:text-orange-500 flex-shrink-0" />
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
      </div>
    </div>
  );
}