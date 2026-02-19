"use client";
import { useState, useCallback, useEffect } from "react";
import { Grid2X2, List, Loader2 } from "lucide-react";
import SidebarFilter, { FilterItem } from "@/components/layout/FilterSidebar";
import MemberCard from "@/components/members/MemberCard";
import MemberCardList from "@/components/members/MemberCardList";
import JobSearchFilter from "@/components/jobs/JobsSearchFilter";

const MEMBERS_DUMMY = [
  {
    id: 1,
    name: "Vernon Chwe",
    avatar: "/vernon.jpg",
    educationLevel: "S1 - Teknik Informatika",
    institution: "Universitas Indonesia",
    city: "Jakarta Selatan",
    subdistrict: "Cilandak",
    skills: ["React", "Node.js", "Python"],
    interests: ["Web Development", "AI/ML"],
    internshipStatus: "Sedang Magang",
    currentCompany: "Tokopedia",
    rating: 4.8,
    completedProjects: 12,
    isVerified: true,
    role: "Full Stack Developer",
    timePosted: "1 jam lalu",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    avatar: "/hyein.png",
    educationLevel: "D3 - Desain Grafis",
    institution: "Politeknik Negeri Bandung",
    city: "Bandung",
    subdistrict: "Coblong",
    skills: ["Figma", "Adobe XD", "Illustrator"],
    interests: ["UI/UX Design", "Product Design"],
    internshipStatus: "Mencari Magang",
    currentCompany: null,
    rating: 4.5,
    completedProjects: 8,
    isVerified: true,
    role: "UX Researcher",
    timePosted: "30 menit lalu",
  },
  {
    id: 3,
    name: "Ahmad Fauzi",
    avatar: "/joshua.png",
    educationLevel: "S1 - Sistem Informasi",
    institution: "Institut Teknologi Bandung",
    city: "Bandung",
    subdistrict: "Coblong",
    skills: ["JavaScript", "Vue.js", "PHP"],
    interests: ["Web Development", "Backend Development"],
    internshipStatus: "Mencari Magang",
    currentCompany: null,
    rating: 4.6,
    completedProjects: 5,
    isVerified: false,
    role: "Backend Developer",
    timePosted: "2 jam lalu",
  },
  {
    id: 4,
    name: "Dewi Lestari",
    avatar: "/rei.png",
    educationLevel: "SMK - Rekayasa Perangkat Lunak",
    institution: "SMK Telkom Malang",
    city: "Malang",
    subdistrict: "Lowokwaru",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    interests: ["Frontend Development", "Mobile Development"],
    internshipStatus: "Sedang Magang",
    currentCompany: "Gojek",
    rating: 4.9,
    completedProjects: 15,
    isVerified: true,
    role: "Frontend Developer",
    timePosted: "45 menit lalu",
  },
  {
    id: 5,
    name: "Rizky Pratama",
    avatar: "/martin.png",
    educationLevel: "S1 - Teknik Komputer",
    institution: "Universitas Brawijaya",
    city: "Malang",
    subdistrict: "Sukun",
    skills: ["Java", "Spring Boot", "MySQL"],
    interests: ["Backend Development", "DevOps"],
    internshipStatus: "Selesai Magang",
    currentCompany: null,
    rating: 4.7,
    completedProjects: 20,
    isVerified: true,
    role: "DevOps Engineer",
    timePosted: "3 jam lalu",
  },
  {
    id: 6,
    name: "Putri Ayu",
    avatar: "/kazuha.png",
    educationLevel: "D4 - Teknologi Informasi",
    institution: "Politeknik Negeri Malang",
    city: "Malang",
    subdistrict: "Lowokwaru",
    skills: ["Python", "Django", "PostgreSQL"],
    interests: ["Backend Development", "Data Science"],
    internshipStatus: "Mencari Magang",
    currentCompany: null,
    rating: 4.4,
    completedProjects: 6,
    isVerified: false,
    role: "Data Scientist",
    timePosted: "1 jam lalu",
  },
];

export default function MembersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
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
        />

        {/* Member Cards */}
        <div className="flex-1 min-h-[400px] relative">
          {isLoading ? (
            <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 py-12">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">
                memuat data kandidat...
              </p>
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
                  <MemberCard key={member.id} {...member} />
                ) : (
                  <MemberCardList key={member.id} {...member} />
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