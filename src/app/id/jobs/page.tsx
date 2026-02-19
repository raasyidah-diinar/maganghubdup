"use client";
import { useState, useCallback, useEffect } from "react";
import { Grid2X2, List, Briefcase, Loader2 } from "lucide-react";
import SidebarFilter, { FilterItem } from "@/components/layout/FilterSidebar";
import JobCard from "@/components/jobs/JobCard";
import JobCardList from "@/components/jobs/JobCardList";
import JobSearchFilter from "@/components/jobs/JobsSearchFilter";
import { JOBS_DUMMY } from "@/lib/constants/jobs";
import { usePathname } from "next/navigation";

export default function JobsPage() {
  const pathname = usePathname();
  const isInDashboard = pathname?.includes("/dashboard");

  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  const [selectedBusinessField, setSelectedBusinessField] = useState<string>("Semua Bidang");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedSubdistricts, setSelectedSubdistricts] = useState<string[]>([]);
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);
  const [selectedUpdated, setSelectedUpdated] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [locationQuery, setLocationQuery] = useState<string>("");

  // Data kecamatan untuk setiap kota (lengkap)
  const subdistrictsByCity: Record<string, string[]> = {
    "Bandung": ["Andir", "Antapani", "Arcamanik", "Astana Anyar", "Babakan Ciparay", "Bandung Kidul", "Bandung Kulon", "Bandung Wetan", "Batununggal", "Bojongloa Kaler", "Bojongloa Kidul", "Buahbatu", "Cibeunying Kaler", "Cibeunying Kidul", "Cibiru", "Cicendo", "Cidadap", "Cinambo", "Coblong", "Gedebage", "Kiaracondong", "Lengkong", "Mandalajati", "Panyileukan", "Rancasari", "Regol", "Sukajadi", "Sukasari", "Sumur Bandung", "Ujung Berung"],
    "Jakarta": ["Cakung", "Cipayung", "Ciracas", "Duren Sawit", "Jatinegara", "Kramat Jati", "Makasar", "Matraman", "Pasar Rebo", "Pulo Gadung"],
    "Jakarta Pusat": ["Cempaka Putih", "Gambir", "Johar Baru", "Kemayoran", "Menteng", "Sawah Besar", "Senen", "Tanah Abang"],
    "Jakarta Selatan": ["Cilandak", "Jagakarsa", "Kebayoran Baru", "Kebayoran Lama", "Mampang Prapatan", "Pancoran", "Pasar Minggu", "Pesanggrahan", "Setiabudi", "Tebet"],
    "Malang": ["Blimbing", "Kedungkandang", "Klojen", "Lowokwaru", "Sukun"],
    "Surabaya": ["Asemrowo", "Benowo", "Bubutan", "Bulak", "Dukuh Pakis", "Gayungan", "Genteng", "Gubeng", "Gunung Anyar", "Jambangan", "Karang Pilang", "Kenjeran", "Krembangan", "Lakarsantri", "Mulyorejo", "Pabean Cantian", "Pakal", "Rungkut", "Sambikerep", "Sawahan", "Semampir", "Simokerto", "Sukolilo", "Sukomanunggal", "Tambaksari", "Tandes", "Tegalsari", "Tenggilis Mejoyo", "Wiyung"]
  };

  const cities = Object.keys(subdistrictsByCity);

  const [selectedSort, setSelectedSort] = useState<string>("Paling Relevan");

  const filterConfigs: FilterItem[] = [
    {
      label: "Urutkan",
      type: "button",
      options: ["Paling Relevan", "Baru Ditambahkan"],
      selected: selectedSort,
    },
    {
      label: "Bidang Usaha",
      type: "dropdown",
      options: ["Semua Bidang", "Business", "Data", "Design", "Education Tech", "Finance", "Technology"],
      selected: selectedBusinessField,
    },
    {
      label: "Kecamatan",
      type: selectedCity ? "checkbox" : "info",
      options: selectedCity
        ? subdistrictsByCity[selectedCity]
        : ["Pilih Kota/Kabupaten di pencarian atas untuk melihat kecamatan."],
      selected: selectedSubdistricts,
    },
    {
      label: "Terakhir Diperbarui",
      type: "radio",
      options: ["24 Jam Terakhir", "Seminggu Terakhir", "Sebulan Terakhir", "Kapan pun"],
      selected: selectedUpdated,
    },
    {
      label: "Kebijakan Magang",
      type: "checkbox",
      options: ["Magang di kantor (WFO)", "Hybrid", "Magang dari rumah (WFA)"],
      selected: selectedPolicies.map(p => {
        if (p === "Onsite") return "Magang di kantor (WFO)";
        if (p === "Remote") return "Magang dari rumah (WFA)";
        return p;
      }),
    },
  ];

  const handleFilterChange = (label: string, value: any) => {
    switch (label) {
      case "Urutkan": setSelectedSort(value); break;
      case "Bidang Usaha": setSelectedBusinessField(value); break;
      case "Kota":
        setSelectedCity(value);
        setSelectedSubdistricts([]);
        break;
      case "Kecamatan":
        const [subdistrict, isChecked] = Object.entries(value)[0] as [string, boolean];
        setSelectedSubdistricts(prev =>
          isChecked
            ? [...prev, subdistrict]
            : prev.filter(s => s !== subdistrict)
        );
        break;
      case "Kebijakan Magang":
        const [policyLabel, checked] = Object.entries(value)[0] as [string, boolean];
        let policyValue = policyLabel;
        if (policyLabel === "Magang di kantor (WFO)") policyValue = "Onsite";
        if (policyLabel === "Magang dari rumah (WFA)") policyValue = "Remote";

        setSelectedPolicies(prev =>
          checked
            ? [...prev, policyValue]
            : prev.filter(p => p !== policyValue)
        );
        break;
      case "Terakhir Diperbarui": setSelectedUpdated(value); break;
    }
  };

  const handleResetFilter = useCallback(() => {
    setSelectedBusinessField("Semua Bidang");
    setSelectedCity("");
    setSelectedSubdistricts([]);
    setSelectedPolicies([]);
    setSelectedUpdated("Kapanpun");
    setSearchQuery("");
    setLocationQuery("");
  }, []);

  const filteredJobs = JOBS_DUMMY.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !locationQuery || job.city === locationQuery || job.location.includes(locationQuery);
    const matchesBusiness = selectedBusinessField === "Semua Bidang" || job.businessField === selectedBusinessField;
    const matchesCity = !selectedCity || job.city === selectedCity;
    const matchesSubdistrict = selectedSubdistricts.length === 0 || selectedSubdistricts.includes(job.subdistrict);
    const matchesPolicy = selectedPolicies.length === 0 || selectedPolicies.includes(job.workType as string);

    return matchesSearch && matchesLocation && matchesBusiness && matchesCity && matchesSubdistrict && matchesPolicy;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Filter */}
        <div className="mb-8">
          <JobSearchFilter
            onSearchChange={setSearchQuery}
            onLocationChange={(value) => {
              setLocationQuery(value);
              handleFilterChange("Kota", value);
            }}
          />
        </div>

        {/* Header dengan Judul dan Toggle */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <span className="text-gray-900 dark:text-white">Lowongan Magang di </span>
            <span className="text-orange-600 dark:text-orange-400">Indonesia</span>
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg border transition-all ${viewMode === "grid" ? "bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-900/20 dark:border-orange-700" : "bg-white border-gray-200 text-gray-400 dark:bg-gray-800 dark:border-gray-700"}`}
            >
              <Grid2X2 size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg border transition-all ${viewMode === "list" ? "bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-900/20 dark:border-orange-700" : "bg-white border-gray-200 text-gray-400 dark:bg-gray-800 dark:border-gray-700"}`}
            >
              <List size={18} />
            </button>

          </div>
        </div>

        {/* Main Layout: Sidebar + Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <SidebarFilter
              filters={filterConfigs}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilter}
            />
          </div>

          <div className="lg:w-3/4">
            {/* Jobs Grid or List View */}
            {isLoading ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : "flex flex-col gap-4"}>
                {Array.from({ length: viewMode === "grid" ? 4 : 3 }).map((_, i) => (
                  viewMode === "grid" ? (
                    <JobCard
                      key={i}
                      id={0}
                      title=""
                      company=""
                      location=""
                      applicants=""
                      tags={[]}
                      postedAt=""
                      isLoading={true}
                    />
                  ) : (
                    <JobCardList
                      key={i}
                      id={0}
                      title=""
                      company=""
                      location=""
                      applicants=""
                      tags={[]}
                      postedAt=""
                      isLoading={true}
                    />
                  )
                ))}
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} {...job} isInDashboard={isInDashboard} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredJobs.map((job) => (
                  <JobCardList key={job.id} {...job} isInDashboard={isInDashboard} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredJobs.length === 0 && (
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="text-gray-300 dark:text-gray-600" size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Tidak ada lowongan</h3>
                <p className="text-gray-500 dark:text-gray-400">Coba ubah kata kunci atau filter pencarian Anda</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}