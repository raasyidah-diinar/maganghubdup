"use client";

import { MapPin, Briefcase, Users, CheckCircle2, Bookmark, GraduationCap } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

type EducationCardListProps = {
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
};

export default function EducationCardList({
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
}: EducationCardListProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isDashboardView = searchParams.get('view') === 'dashboard';

    const handleInstitutionClick = () => {
        const detailPath = `/id/pendidikan/${id}`;
        const route = isDashboardView ? `${detailPath}?view=dashboard` : detailPath;
        router.push(route);
    };

    return (
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 p-4 md:p-5 flex items-center group">
            {/* Gradient Border - Left Only */}
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-amber-400 rounded-l-2xl" />

            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-transparent dark:from-orange-900/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl -z-10" />

            {/* Main Content Layout */}
            <div className="flex items-center gap-5 w-full">
                {/* Logo Section */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600 p-2.5">
                    <div className="relative w-full h-full">
                        <Image
                            src={institutionLogo}
                            alt={institutionName}
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                            {category}
                        </span>
                        <h3
                            onClick={handleInstitutionClick}
                            className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer truncate"
                        >
                            {institutionName}
                        </h3>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2">
                        {/* Address */}
                        <div className="flex items-center gap-1.5 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                            <MapPin size={14} className="text-orange-500 flex-shrink-0" />
                            <span className="truncate">{address}</span>
                        </div>

                        {/* Work Type Tags */}
                        <div className="flex flex-wrap gap-1.5">
                            {workTypes.map((type) => (
                                <span
                                    key={type}
                                    className="px-2 py-0.5 text-[10px] md:text-xs font-medium bg-gray-50 dark:bg-gray-700/50 text-gray-400 dark:text-gray-400 border border-gray-100 dark:border-gray-600 rounded"
                                >
                                    {type}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats & Actions Section (Right Side) */}
                <div className="hidden lg:flex items-center gap-4 min-w-[180px]">
                    <div className="flex flex-col gap-1.5 items-end flex-1">
                        {/* Lowongan */}
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400">
                            <Briefcase size={14} />
                            <span>{openPositions} Lowongan</span>
                        </div>

                        {/* Aktif */}
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                            <Users size={14} />
                            <span>{activeInterns} Aktif</span>
                        </div>

                        {/* Alumni */}
                        <div className="flex items-center gap-1.5 text-xs text-orange-600 dark:text-orange-500 font-medium">
                            <CheckCircle2 size={14} />
                            <span>{totalAlumni.toLocaleString()} Alumni</span>
                        </div>
                    </div>

                    {/* Bookmark Button */}
                    <button className="p-2 text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20">
                        <Bookmark size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}


