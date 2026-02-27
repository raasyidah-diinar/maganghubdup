"use client";
import { useState, useCallback, useEffect } from "react";
import { Grid2X2, List, Loader2, Filter } from "lucide-react";
import SidebarFilter, { FilterItem, useSidebarFilter } from "@/components/layout/FilterSidebar";
import PlaceCard from "@/components/magang/PlaceCard";
import PlaceCardList from "@/components/magang/PlaceCardList";
import JobSearchFilter from "@/components/jobs/JobsSearchFilter";

import { PLACES_DUMMY } from "@/lib/constants/places";


import { usePathname, useSearchParams } from "next/navigation";

export default function PlacesPage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const isDashboardView = view === "dashboard";

  const isInDashboard = pathname?.includes("/dashboard") || isDashboardView;

  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { mobileOpen, openMobile, closeMobile } = useSidebarFilter();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua Bidang");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedSubdistricts, setSelectedSubdistricts] = useState<string[]>([]);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterKey, setFilterKey] = useState<number>(0);

  // Data categories (bidang usaha)
  const categories = [
    "Semua Bidang",
    "BUMN (Energi)",
    "BUMN (Penerbangan)",
    "BUMN (Telekomunikasi)",
    "Konglomerat",
    "Perusahaan Digital Creative",
    "Perusahaan E-Commerce",
    "Perusahaan E-Commerce (Beauty)",
    "Perusahaan F&B",
    "Perusahaan FMCG",
    "Perusahaan Fintech",
  ];

  // Data kota dan kecamatan
  const subdistrictsByCity: Record<string, string[]> = {
    "Jakarta Selatan": ["Setiabudi", "Kebayoran Baru", "Cilandak"],
    "Jakarta": ["Jakarta"],
    "Jakarta Pusat": ["Menteng", "Kemayoran"],
    "Tangerang": ["Tangerang"],
    "Bandung": ["Coblong"],
  };

  const currentSubdistricts = selectedCity && selectedCity !== ""
    ? subdistrictsByCity[selectedCity] || []
    : [];

  // Konfigurasi filters untuk SidebarFilter
  const filters: FilterItem[] = [
    {
      label: "Bidang Usaha",
      type: "dropdown",
      options: categories,
      selected: selectedCategory,
    },
    // Ubah dari type "info" menjadi "checkbox" jika ada kota yang dipilih
    currentSubdistricts.length > 0
      ? {
        label: "Kecamatan",
        type: "checkbox",
        options: currentSubdistricts,
        selected: selectedSubdistricts,
      }
      : {
        label: "Kecamatan",
        type: "info",
        options: ["Pilih Kota/Kabupaten di pencarian atas untuk melihat kecamatan."],
      },
    {
      label: "Kebijakan Magang",
      type: "checkbox",
      options: ["Onsite", "Hybrid", "Remote"],
      selected: selectedWorkTypes,
    },
  ];

  const handleFilterChange = useCallback((label: string, value: any) => {
    if (label === "Bidang Usaha") {
      setSelectedCategory(value);
    } else if (label === "Kecamatan") {
      // Handle checkbox kecamatan
      const subdistrictKey = Object.keys(value)[0];
      const isChecked = value[subdistrictKey];

      setSelectedSubdistricts(prev =>
        isChecked
          ? [...prev, subdistrictKey]
          : prev.filter(s => s !== subdistrictKey)
      );
    } else if (label === "Kebijakan Magang") {
      const workTypeKey = Object.keys(value)[0];
      const isChecked = value[workTypeKey];

      setSelectedWorkTypes(prev =>
        isChecked
          ? [...prev, workTypeKey]
          : prev.filter(w => w !== workTypeKey)
      );
    }
  }, []);

  const handleLocationChange = useCallback((location: string) => {
    setSelectedCity(location);
    // Reset kecamatan ketika kota berubah
    setSelectedSubdistricts([]);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleReset = useCallback(() => {
    setSelectedCategory("Semua Bidang");
    setSelectedCity("");
    setSelectedSubdistricts([]);
    setSelectedWorkTypes([]);
    setSearchQuery("");
    setFilterKey(prev => prev + 1); // Force re-render
  }, []);

  // Filter places berdasarkan semua kriteria
  const filteredPlaces = PLACES_DUMMY.filter((place) => {
    // Filter berdasarkan search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchCompany = place.companyName.toLowerCase().includes(query);
      const matchCategory = place.category.toLowerCase().includes(query);
      const matchAddress = place.address.toLowerCase().includes(query);

      if (!matchCompany && !matchCategory && !matchAddress) {
        return false;
      }
    }

    // Filter berdasarkan category (bidang usaha)
    if (selectedCategory && selectedCategory !== "Semua Bidang" && place.category !== selectedCategory) {
      return false;
    }

    // Filter berdasarkan kota
    if (selectedCity && place.city !== selectedCity) {
      return false;
    }

    // Filter berdasarkan kecamatan
    if (selectedSubdistricts.length > 0 && !selectedSubdistricts.includes(place.subdistrict)) {
      return false;
    }

    // Filter berdasarkan work type
    if (selectedWorkTypes.length > 0) {
      const hasMatchingType = selectedWorkTypes.some(type =>
        place.workTypes.includes(type)
      );
      if (!hasMatchingType) {
        return false;
      }
    }

    return true;
  });

  const pageContent = (
    <main className={`flex-1 ${isDashboardView ? "overflow-y-auto" : ""}`}>
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
              Tempat Magang <span className="text-orange-500 dark:text-orange-400">Terverifikasi</span>
            </h1>
            {(selectedCategory !== "Semua Bidang" || searchQuery || selectedCity || selectedSubdistricts.length > 0) && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Menampilkan {filteredPlaces.length} tempat magang
                {searchQuery && <span> untuk "{searchQuery}"</span>}
                {selectedCategory !== "Semua Bidang" && <span> di bidang {selectedCategory}</span>}
                {selectedCity && <span> ({selectedCity}</span>}
                {selectedSubdistricts.length > 0 && <span>, {selectedSubdistricts.join(", ")}</span>}
                {selectedCity && <span>)</span>}
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
          {/* SIDEBAR - Pakai SidebarFilter baru */}
          <SidebarFilter
            key={filterKey}
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            mobileOpen={mobileOpen}
            onMobileClose={closeMobile}
          />

          {/* Place Cards */}
          <div className="flex-1 min-h-[400px]">
            {/* Mobile trigger button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={openMobile}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold text-sm hover:border-orange-300 hover:text-orange-500 transition-all"
              >
                <Filter size={16} />
                Filter Lowongan
              </button>
            </div>

            {isLoading ? (
              <div className="w-full flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 py-12">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">
                    memuat data organisasi...
                  </p>
                </div>
              </div>
            ) : filteredPlaces.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "columns-1 md:columns-2 gap-4 space-y-4"
                    : "flex flex-col gap-4"
                }
              >
                {filteredPlaces.map((place) =>
                  viewMode === "grid" ? (
                    <PlaceCard
                      key={place.id}
                      id={place.id}
                      companyName={place.companyName}
                      companyLogo={place.companyLogo}
                      category={place.category}
                      address={place.address}
                      workTypes={place.workTypes}
                      openPositions={place.openPositions}
                      activeInterns={place.activeInterns}
                      totalAlumni={place.totalAlumni}
                      isVerified={place.isVerified}
                      isInDashboard={isInDashboard}
                    />
                  ) : (
                    <PlaceCardList
                      key={place.id}
                      id={place.id}
                      companyName={place.companyName}
                      companyLogo={place.companyLogo}
                      category={place.category}
                      address={place.address}
                      workTypes={place.workTypes}
                      openPositions={place.openPositions}
                      activeInterns={place.activeInterns}
                      totalAlumni={place.totalAlumni}
                      isVerified={place.isVerified}
                      isInDashboard={isInDashboard}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="flex items-start justify-center pt-12">
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {searchQuery
                      ? `Tidak ada tempat magang untuk "${searchQuery}". Coba kata kunci lain.`
                      : selectedCategory !== "Semua Bidang"
                        ? `Tidak ada tempat magang di bidang ${selectedCategory}.`
                        : "Tidak ada tempat magang ditemukan sesuai filter."}
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
    </main>
  );

  return (
    <div className={isDashboardView ? "" : "bg-white dark:bg-gray-900"}>
      {pageContent}
    </div>
  );
}
