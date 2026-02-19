"use client";
import { useState, useCallback, useEffect } from "react";
import { Grid2X2, List, Loader2 } from "lucide-react";
import SidebarFilter, { FilterItem } from "@/components/layout/FilterSidebar";
import EducationCard from "@/components/pendidikan/EducationCard";
import EducationCardList from "@/components/pendidikan/EducationCardList";
import JobSearchFilter from "@/components/jobs/JobsSearchFilter";

const EDUCATION_DUMMY = [
  {
    id: 1,
    institutionName: "Ruangguru",
    institutionLogo: "/gambar4.png",
    category: "PERUSAHAAN EDTECH",
    address: "Jl. Dr. Saharjo No.161, Manggarai",
    city: "Jakarta Selatan",
    subdistrict: "Tebet",
    educationLevel: "Perusahaan EdTech",
    workTypes: ["Onsite", "Hybrid"],
    openPositions: 1,
    activeInterns: 25,
    totalAlumni: 300,
    isVerified: true,
  },
  {
    id: 2,
    institutionName: "Dicoding Indonesia",
    institutionLogo: "/dcoding.png",
    category: "INSTITUSI PENDIDIKAN & TECH",
    address: "Jl. Batik Kumeli No.50, Bandung",
    city: "Bandung",
    subdistrict: "Coblong",
    educationLevel: "Institusi Pendidikan & Tech",
    workTypes: ["Remote", "Hybrid"],
    openPositions: 1,
    activeInterns: 8,
    totalAlumni: 80,
    isVerified: true,
  },
  {
    id: 3,
    institutionName: "Universitas Indonesia",
    institutionLogo: "/ui.png",
    category: "UNIVERSITAS NEGERI",
    address: "Kampus UI Depok, Jawa Barat",
    city: "Jakarta",
    subdistrict: "Cilandak",
    educationLevel: "Universitas Negeri",
    workTypes: ["Onsite"],
    openPositions: 0,
    activeInterns: 0,
    totalAlumni: 50000,
    isVerified: true,
  },
  {
    id: 4,
    institutionName: "Institut Teknologi Bandung",
    institutionLogo: "/itb.png",
    category: "INSTITUT NEGERI",
    address: "Jl. Ganesha No.10, Bandung",
    city: "Bandung",
    subdistrict: "Coblong",
    educationLevel: "Institut Negeri",
    workTypes: ["Onsite", "Hybrid"],
    openPositions: 0,
    activeInterns: 0,
    totalAlumni: 45000,
    isVerified: true,
  },
  {
    id: 5,
    institutionName: "Politeknik Negeri Malang",
    institutionLogo: "/poltek.png",
    category: "POLITEKNIK NEGERI",
    address: "Jl. Soekarno Hatta No.9, Malang",
    city: "Malang",
    subdistrict: "Lowokwaru",
    educationLevel: "Politeknik Negeri",
    workTypes: ["Onsite"],
    openPositions: 2,
    activeInterns: 12,
    totalAlumni: 15000,
    isVerified: true,
  },
  {
    id: 6,
    institutionName: "SMK Telkom Malang",
    institutionLogo: "/smktelkom.png",
    category: "SEKOLAH MENENGAH KEJURUAN",
    address: "Jl. Danau Ranau, Malang",
    city: "Malang",
    subdistrict: "Sukun",
    educationLevel: "Sekolah Menengah Kejuruan",
    workTypes: ["Onsite"],
    openPositions: 0,
    activeInterns: 5,
    totalAlumni: 8000,
    isVerified: true,
  },
];

export default function EducationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedSubdistricts, setSelectedSubdistricts] = useState<string[]>([]);
  const [selectedEducationLevels, setSelectedEducationLevels] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterKey, setFilterKey] = useState<number>(0);

  // Data kota dan kecamatan
  const subdistrictsByCity: Record<string, string[]> = {
    "Jakarta Selatan": ["Tebet"],
    "Bandung": ["Coblong"],
    "Jakarta": ["Cilandak"],
    "Malang": ["Lowokwaru", "Sukun"],
  };

  const currentSubdistricts = selectedCity && selectedCity !== ""
    ? subdistrictsByCity[selectedCity] || []
    : [];

  // Data tingkat pendidikan
  const educationLevels = [
    "Perusahaan EdTech",
    "Institusi Pendidikan & Tech",
    "Universitas Negeri",
    "Institut Negeri",
    "Politeknik Negeri",
    "Sekolah Menengah Kejuruan",
  ];

  // Konfigurasi filters untuk SidebarFilter
  const filters: FilterItem[] = [
    {
      label: "Tingkat Pendidikan",
      type: "checkbox",
      options: educationLevels,
      selected: selectedEducationLevels,
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
  ];

  const handleFilterChange = useCallback((label: string, value: any) => {
    if (label === "Tingkat Pendidikan") {
      const levelKey = Object.keys(value)[0];
      const isChecked = value[levelKey];

      setSelectedEducationLevels(prev =>
        isChecked
          ? [...prev, levelKey]
          : prev.filter(l => l !== levelKey)
      );
    } else if (label === "Kecamatan") {
      const subdistrictKey = Object.keys(value)[0];
      const isChecked = value[subdistrictKey];

      setSelectedSubdistricts(prev =>
        isChecked
          ? [...prev, subdistrictKey]
          : prev.filter(s => s !== subdistrictKey)
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
    setSelectedEducationLevels([]);
    setSearchQuery("");
    setFilterKey(prev => prev + 1); // Force re-render
  }, []);

  // Filter education institutions berdasarkan semua kriteria
  const filteredEducation = EDUCATION_DUMMY.filter((institution) => {
    // Filter berdasarkan search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchName = institution.institutionName.toLowerCase().includes(query);
      const matchCategory = institution.category.toLowerCase().includes(query);
      const matchAddress = institution.address.toLowerCase().includes(query);

      if (!matchName && !matchCategory && !matchAddress) {
        return false;
      }
    }

    // Filter berdasarkan kota
    if (selectedCity && institution.city !== selectedCity) {
      return false;
    }

    // Filter berdasarkan kecamatan
    if (selectedSubdistricts.length > 0 && !selectedSubdistricts.includes(institution.subdistrict)) {
      return false;
    }

    // Filter berdasarkan tingkat pendidikan
    if (selectedEducationLevels.length > 0 && !selectedEducationLevels.includes(institution.educationLevel)) {
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            Instansi Pendidikan <span className="text-orange-500">Terverifikasi</span>
          </h1>

          {(selectedCity || searchQuery || selectedEducationLevels.length > 0) && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Menampilkan {filteredEducation.length} instansi pendidikan
              {searchQuery && <span> untuk "{searchQuery}"</span>}
              {selectedCity && <span> di {selectedCity}</span>}
              {selectedSubdistricts.length > 0 && (
                <span> ({selectedSubdistricts.join(", ")})</span>
              )}
            </p>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 border dark:border-gray-700 rounded-lg p-1 bg-white dark:bg-gray-800 shadow-sm border-gray-200">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-md transition ${viewMode === "grid"
              ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
              : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            title="Grid View"
          >
            <Grid2X2 size={18} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-md transition ${viewMode === "list"
              ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
              : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            title="List View"
          >
            <List size={18} />
          </button>

        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
        {/* SIDEBAR - Pakai SidebarFilter baru */}
        <SidebarFilter
          key={filterKey}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />

        {/* Education Cards */}
        <div className="flex-1 min-h-[400px]">
          {isLoading ? (
            <div className="w-full flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 py-12">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">
                  memuat data organisasi...
                </p>
              </div>
            </div>
          ) : filteredEducation.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {filteredEducation.map((institution) =>
                viewMode === "grid" ? (
                  <EducationCard
                    key={institution.id}
                    id={institution.id}
                    institutionName={institution.institutionName}
                    institutionLogo={institution.institutionLogo}
                    category={institution.category}
                    address={institution.address}
                    workTypes={institution.workTypes}
                    openPositions={institution.openPositions}
                    activeInterns={institution.activeInterns}
                    totalAlumni={institution.totalAlumni}
                    isVerified={institution.isVerified}
                  />
                ) : (
                  <EducationCardList
                    key={institution.id}
                    id={institution.id}
                    institutionName={institution.institutionName}
                    institutionLogo={institution.institutionLogo}
                    category={institution.category}
                    address={institution.address}
                    workTypes={institution.workTypes}
                    openPositions={institution.openPositions}
                    activeInterns={institution.activeInterns}
                    totalAlumni={institution.totalAlumni}
                    isVerified={institution.isVerified}
                  />
                )
              )}
            </div>
          ) : (
            <div className="flex items-start justify-center pt-12">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {searchQuery
                    ? `Tidak ada instansi pendidikan untuk "${searchQuery}". Coba kata kunci lain.`
                    : selectedSubdistricts.length > 0
                      ? `Tidak ada instansi pendidikan di ${selectedSubdistricts.join(", ")}. Coba pilih kecamatan lain.`
                      : selectedCity
                        ? `Tidak ada instansi pendidikan di ${selectedCity}. Coba pilih kota lain.`
                        : "Tidak ada instansi pendidikan ditemukan sesuai filter."}
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
