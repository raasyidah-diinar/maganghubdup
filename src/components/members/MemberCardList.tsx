"use client";

import Image from "next/image";
import { MapPin, Clock, Bookmark, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

type MemberCardListProps = {
  id: number;
  name: string;
  avatar: string;
  educationLevel: string;
  institution: string;
  city: string;
  subdistrict: string;
  skills: string[];
  interests: string[];
  internshipStatus: string;
  currentCompany: string | null;
  rating: number;
  completedProjects: number;
  isVerified: boolean;
  timePosted?: string;
  role?: string;
  isLoading?: boolean;
};

export default function MemberCardList({
  id,
  name,
  avatar,
  educationLevel,
  institution,
  city,
  subdistrict,
  skills,
  interests,
  internshipStatus,
  timePosted = "1 jam lalu",
  role = "Software Developer",
  isLoading = false,
}: MemberCardListProps) {
  const router = useRouter();

  if (isLoading) return null;

  // Ekstrak badge jenjang pendidikan
  const educationBadge = educationLevel.split(" - ")[0];
  const educationMajor = educationLevel.split(" - ")[1] || "";

  // Ekstrak semester/kelas dari institution
  const institutionParts = institution.split("•");
  const institutionName = institutionParts[0]?.trim() || institution;
  const semester = institutionParts[1]?.trim() || "";

  // Tentukan label jenjang
  const getEducationLabel = (level: string) => {
    if (level.startsWith("S")) return "MAHASISWA";
    if (level.startsWith("D")) return "MAHASISWA";
    if (level.startsWith("SMK")) return "SISWA";
    return "UMUM";
  };

  const handleNameClick = () => {
    router.push(`/anggota/${id}`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden">
      <span className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-orange-500 to-amber-400" />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="font-medium uppercase tracking-wide">
              {getEducationLabel(educationBadge)}
            </span>
          </div>
          <span className="px-3 py-1 bg-orange-500/20 dark:bg-orange-600/20 text-orange-600 dark:text-orange-500 rounded-full text-xs font-semibold">
            {internshipStatus}
          </span>
        </div>

        {/* Main Content */}
        <div className="flex gap-4 mb-4">
          {/* Avatar - Wrapper untuk memastikan bulat sempurna */}
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-slate-800 flex-shrink-0">
            <Image
              src={avatar}
              alt={name}
              width={70}
              height={70}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info Section */}
          <div className="flex-1 min-w-0">
            <h3
              onClick={handleNameClick}
              className="font-bold text-gray-900 dark:text-gray-100 text-lg leading-tight mb-1.5 hover:text-orange-500 dark:hover:text-orange-400 transition-colors cursor-pointer"
            >
              {name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-normal leading-tight mb-1.5">
              {role}
            </p>
            <div className="flex items-start gap-1.5 text-xs text-orange-600 dark:text-orange-400 leading-tight">
              <GraduationCap className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <span>{institutionName} - {educationMajor}</span>
                {semester && (
                  <>
                    <span className="text-gray-400 mx-1">•</span>
                    <span>{semester}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 items-center">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 rounded text-xs font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
            <MapPin className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400" />
            <span>{subdistrict}, {city}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{timePosted}</span>
            </div>
            <button className="text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}