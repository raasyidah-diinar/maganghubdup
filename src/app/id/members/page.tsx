"use client";
import { useState, useCallback, useEffect } from "react";
import { Grid2X2, List, Loader2, Filter } from "lucide-react";
import SidebarFilter, { FilterItem, useSidebarFilter } from "@/components/layout/FilterSidebar";
import MemberCard from "@/components/members/MemberCard";
import MemberCardList from "@/components/members/MemberCardList";
import JobSearchFilter from "@/components/jobs/JobsSearchFilter";

import { MEMBERS_DUMMY } from "@/lib/constants/members";

export default function MembersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { mobileOpen, openMobile, closeMobile } = useSidebarFilter();
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedSubdistricts, setSelectedSubdistricts] = useState<string[]>([]);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState<string>("Semua Jenjang");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterKey, setFilterKey] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Data kota dan kecamatan
  const subdistrictsByCity: Record<string, string[]> = {
    "Jakarta Selatan": ["Cilandak"],
    "Bandung": ["Coblong"],
    "Malang": ["Lowokwaru", "Sukun"],
  };

  const currentSubdistricts = selectedCity && selectedCity !== ""
    ? subdistrictsByCity[selectedCity] || []
    : [];

  // Data jenjang pendidikan
  const educationLevels = [
    "Semua Jenjang",
    "Siswa",
    "Mahasiswa",
    "Umum",
  ];

  // Data skill/minat
  const skillsOptions = [
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
    "Backend Development",
    "Frontend Development",
    "DevOps",
    "AI/ML",
    "Data Science",
    "Product Design",
  ];

  // Status magang
  const internshipStatuses = [
    "Mencari Magang",
    "Sedang Magang",
    "Selesai Magang",
  ];

  // Konfigurasi filters untuk SidebarFilter
  const filters: FilterItem[] = [
    {
      label: "Jenjang Pendidikan",
      type: "dropdown",
      options: educationLevels,
      selected: selectedEducationLevel,
      isLoading: isLoading,
      loadingText: "Memuat data pendidikan...",
    },
    // Tampilkan filter Kecamatan sebagai checkbox jika ada kota yang dipilih
    ...(currentSubdistricts.length > 0 ? [{
      label: "Kecamatan",
      type: "checkbox" as const,
      options: currentSubdistricts,
      selected: selectedSubdistricts,
    }] : [{
      label: "Kecamatan",
      type: "info" as const,
      options: ["Pilih Kota/Kabupaten di pencarian atas untuk melihat kecamatan."],
    }]),
    {
      label: "Skill & Minat",
      type: "checkbox",
      options: skillsOptions,
      selected: selectedSkills,
      isLoading: isLoading,
      loadingText: "Memuat data...",
    },
    {
      label: "Status Magang",
      type: "checkbox",
      options: internshipStatuses,
      selected: selectedStatuses,
    },
  ];

  const handleFilterChange = useCallback((label: string, value: any) => {
    if (label === "Jenjang Pendidikan") {
      setSelectedEducationLevel(value);
    } else if (label === "Kecamatan") {
      const subdistrictKey = Object.keys(value)[0];
      const isChecked = value[subdistrictKey];

      setSelectedSubdistricts(prev =>
        isChecked
          ? [...prev, subdistrictKey]
          : prev.filter(s => s !== subdistrictKey)
      );
    } else if (label === "Skill & Minat") {
      const key = Object.keys(value)[0];
      const isChecked = value[key];

      setSelectedSkills(prev =>
        isChecked
          ? [...prev, key]
          : prev.filter(s => s !== key)
      );
    } else if (label === "Status Magang") {
      const key = Object.keys(value)[0];
      const isChecked = value[key];

      setSelectedStatuses(prev =>
        isChecked
          ? [...prev, key]
          : prev.filter(s => s !== key)
      );
    }
  }, []);

  const handleLocationChange = useCallback((location: string) => {
    setSelectedCity(location);
    setSelectedSubdistricts([]);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleReset = useCallback(() => {
    setSelectedCity("");
    setSelectedSubdistricts([]);
    setSelectedEducationLevel("Semua Jenjang");
    setSelectedSkills([]);
    setSelectedStatuses([]);
    setSearchQuery("");
    setFilterKey(prev => prev + 1); // Force re-render
  }, []);

  // Filter members berdasarkan semua kriteria
  const filteredMembers = MEMBERS_DUMMY.filter((member) => {
    // Filter berdasarkan search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchName = member.name.toLowerCase().includes(query);
      const matchInstitution = member.institution.toLowerCase().includes(query);
      const matchSkills = member.skills.some(skill => skill.toLowerCase().includes(query));

      if (!matchName && !matchInstitution && !matchSkills) {
        return false;
      }
    }

    // Filter berdasarkan kota
    if (selectedCity && member.city !== selectedCity) {
      return false;
    }

    // Filter berdasarkan kecamatan
    if (selectedSubdistricts.length > 0 && !selectedSubdistricts.includes(member.subdistrict)) {
      return false;
    }

    // Filter berdasarkan jenjang pendidikan
    if (selectedEducationLevel && selectedEducationLevel !== "Semua Jenjang") {
      const hasMatchingLevel = member.educationLevel.startsWith(selectedEducationLevel);
      if (!hasMatchingLevel) {
        return false;
      }
    }

    // Filter berdasarkan skill & minat
    if (selectedSkills.length > 0) {
      const hasMatchingSkill = selectedSkills.some(skill =>
        member.skills.includes(skill) || member.interests.includes(skill)
      );
      if (!hasMatchingSkill) {
        return false;
      }
    }

    // Filter berdasarkan status magang
    if (selectedStatuses.length > 0 && !selectedStatuses.includes(member.internshipStatus)) {
      return false;
    }

    return true;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      {/* Search Bar */}
      <JobSearchFilter
        onLocationChange={handleLocationChange}
        onSearchChange={handleSearchChange}
      />

      {/* Header dengan View Mode Toggle */}
      <div className="flex justify-between items-center mt-6 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Kandidat & Talent <span className="text-orange-500 dark:text-orange-400">Siap Magang</span>
          </h1>
          {(selectedCity || searchQuery || selectedEducationLevel !== "Semua Jenjang" || selectedSkills.length > 0 || selectedStatuses.length > 0) && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Menampilkan {filteredMembers.length} kandidat
              {searchQuery && <span> untuk "{searchQuery}"</span>}
              {selectedCity && <span> di {selectedCity}</span>}
              {selectedSubdistricts.length > 0 && (
                <span> ({selectedSubdistricts.join(", ")})</span>
              )}
            </p>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 border dark:border-gray-600 rounded-lg p-1 bg-white dark:bg-gray-700 shadow-sm transition-colors">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded transition ${viewMode === "grid"
              ? "bg-orange-500 dark:bg-orange-600 text-white"
              : "text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              }`}
            title="Grid View"
          >
            <Grid2X2 size={18} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded transition ${viewMode === "list"
              ? "bg-orange-500 dark:bg-orange-600 text-white"
              : "text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              }`}
            title="List View"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
        {/* SIDEBAR - Pakai SidebarFilter */}
        <SidebarFilter
          key={filterKey}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          mobileOpen={mobileOpen}
          onMobileClose={closeMobile}
        />

        {/* Member Cards */}
        <div className="flex-1 min-h-[400px] relative">
          {/* Mobile trigger button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={openMobile}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold text-sm hover:border-orange-300 hover:text-orange-500 transition-all"
            >
              <Filter size={16} />
              Filter Member
            </button>
          </div>

          {isLoading ? (
            <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-start bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 pt-12 pb-24">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">
                  Memuat data kandidat...
                </p>
              </div>
            </div>
          ) : filteredMembers.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                  : "flex flex-col gap-4"
              }
            >
              {filteredMembers.map((member) =>
                viewMode === "grid" ? (
                  <MemberCard key={member.id} {...member} slug={member.slug} />
                ) : (
                  <MemberCardList key={member.id} {...member} slug={member.slug} />
                )
              )}
            </div>
          ) : (
            <div className="flex items-start justify-center pt-12">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchQuery
                    ? `Tidak ada kandidat untuk "${searchQuery}". Coba kata kunci lain.`
                    : selectedSubdistricts.length > 0
                      ? `Tidak ada kandidat di ${selectedSubdistricts.join(", ")}. Coba pilih kecamatan lain.`
                      : selectedCity
                        ? `Tidak ada kandidat di ${selectedCity}. Coba pilih kota lain.`
                        : "Tidak ada kandidat ditemukan sesuai filter."}
                </p>
                <button
                  onClick={handleReset}
                  className="text-orange-500 dark:text-orange-400 font-medium hover:underline"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}