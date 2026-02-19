"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, Check, Plus, X } from "lucide-react";

interface BlogFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    selectedCategories: string[];
    onCategoryChange: (category: string) => void;
    selectedMonth: string;
    onMonthChange: (month: string) => void;
    selectedYear: string;
    onYearChange: (year: string) => void;
    selectedSort: string;
    onSortChange: (sort: string) => void;
}

export default function BlogFilters({
    search,
    onSearchChange,
    selectedCategories,
    onCategoryChange,
    selectedMonth,
    onMonthChange,
    selectedYear,
    onYearChange,
    selectedSort,
    onSortChange
}: BlogFiltersProps) {
    const router = useRouter();
    
    // State for dropdown visibility
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // State for filters
    const [categorySearch, setCategorySearch] = useState("");

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    // Filter Options
    const categories = [
        "Engineering",
        "Game Dev",
        "Design",
        "Career",
        "Mobile",
        "Data"
    ];

    const months = [
        "Semua Bulan", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const years = ["Semua Tahun", "2025", "2024"];
    const sortOptions = ["Terbaru", "Terlama"];

    // Handlers
    const filteredCategories = categories.filter(c =>
        c.toLowerCase().includes(categorySearch.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-3 w-full">
                {/* Main Search */}
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Cari judul artikel..."
                        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                {/* Kategori Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => toggleDropdown("category")}
                        className={`flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border rounded-lg text-sm font-medium transition-all ${openDropdown === "category" ? "border-orange-500 text-orange-600" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-orange-500 hover:text-orange-600"
                            }`}
                    >
                        <TagIcon className={selectedCategories.length > 0 ? "text-orange-500" : "text-gray-400"} />
                        <span>Kategori</span>
                        {selectedCategories.length > 0 && (
                            <span className="bg-orange-100 text-orange-600 text-xs px-1.5 py-0.5 rounded-full">
                                {selectedCategories.length}
                            </span>
                        )}
                        <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === "category" ? "rotate-180" : ""}`} />
                    </button>

                    {openDropdown === "category" && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)}></div>
                            <div className="absolute top-full mt-2 left-0 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-2 z-20">
                                <div className="relative mb-2 px-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                    <input
                                        type="text"
                                        placeholder="Cari..."
                                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-orange-500"
                                        value={categorySearch}
                                        onChange={(e) => setCategorySearch(e.target.value)}
                                    />
                                </div>
                                <div className="max-h-48 overflow-y-auto custom-scrollbar px-1 space-y-1">
                                    {filteredCategories.map(cat => (
                                        <label key={cat} className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer">
                                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? "bg-orange-500 border-orange-500 text-white" : "border-gray-300 dark:border-gray-600"}`}>
                                                {selectedCategories.includes(cat) && <Check size={10} strokeWidth={3} />}
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={selectedCategories.includes(cat)}
                                                onChange={() => onCategoryChange(cat)}
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-200">{cat}</span>
                                        </label>
                                    ))}
                                    {filteredCategories.length === 0 && (
                                        <div className="px-2 py-2 text-xs text-gray-400 text-center">Tidak ditemukan</div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Date Filters Group */}
                <div className="flex items-center gap-2">
                    {/* Month Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown("month")}
                            className={`flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border rounded-lg text-sm font-medium transition-all ${openDropdown === "month" ? "border-orange-500 text-orange-600" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-orange-500 hover:text-orange-600"
                                }`}
                        >
                            <CalendarIcon className="text-orange-500" />
                            <span>{selectedMonth}</span>
                            <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === "month" ? "rotate-180" : ""}`} />
                        </button>

                        {openDropdown === "month" && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)}></div>
                                <div className="absolute top-full mt-2 left-0 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-1 z-20 max-h-60 overflow-y-auto custom-scrollbar">
                                    {months.map(month => (
                                        <button
                                            key={month}
                                            onClick={() => { onMonthChange(month); setOpenDropdown(null); }}
                                            className="w-full flex items-center justify-between px-3 py-2 text-left text-sm hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-lg group"
                                        >
                                            <span className={`${selectedMonth === month ? "text-orange-600 font-medium" : "text-gray-700 dark:text-gray-300"}`}>{month}</span>
                                            {selectedMonth === month && <Check size={16} className="text-orange-500" />}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Year Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown("year")}
                            className={`flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border rounded-lg text-sm font-medium transition-all ${openDropdown === "year" ? "border-orange-500 text-orange-600" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-orange-500 hover:text-orange-600"
                                }`}
                        >
                            <CalendarIcon className="text-orange-500" />
                            <span>{selectedYear}</span>
                            <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === "year" ? "rotate-180" : ""}`} />
                        </button>

                        {openDropdown === "year" && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)}></div>
                                <div className="absolute top-full mt-2 left-0 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-1 z-20">
                                    {years.map(year => (
                                        <button
                                            key={year}
                                            onClick={() => { onYearChange(year); setOpenDropdown(null); }}
                                            className="w-full flex items-center justify-between px-3 py-2 text-left text-sm hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-lg"
                                        >
                                            <span className={`${selectedYear === year ? "text-orange-600 font-medium" : "text-gray-700 dark:text-gray-300"}`}>{year}</span>
                                            {selectedYear === year && <Check size={16} className="text-orange-500" />}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => toggleDropdown("sort")}
                        className={`flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border rounded-lg text-sm font-medium transition-all ${openDropdown === "sort" ? "border-orange-500 text-orange-600" : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-orange-500 hover:text-orange-600"
                            }`}
                    >
                        <SortIcon className="text-orange-500" />
                        <span>{selectedSort}</span>
                        <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === "sort" ? "rotate-180" : ""}`} />
                    </button>

                    {openDropdown === "sort" && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setOpenDropdown(null)}></div>
                            <div className="absolute top-full mt-2 left-0 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-1 z-20">
                                {sortOptions.map(sort => (
                                    <button
                                        key={sort}
                                        onClick={() => { onSortChange(sort); setOpenDropdown(null); }}
                                        className="w-full flex items-center justify-between px-3 py-2 text-left text-sm hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-lg"
                                    >
                                        <span className={`${selectedSort === sort ? "text-orange-600 font-medium" : "text-gray-700 dark:text-gray-300"}`}>{sort}</span>
                                        {selectedSort === sort && <Check size={16} className="text-orange-500" />}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Add Article Button - Pushed to right */}
                <button 
                    onClick={() => router.push('/id/dashboard/blog/tambah')}
                    className="hidden lg:flex ml-auto items-center gap-2 bg-[#E8532F] hover:bg-[#d64522] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-orange-500/20 transition-all uppercase tracking-wide">
                    <Plus size={18} strokeWidth={3} />
                    TAMBAH ARTIKEL
                </button>
            </div>
            {/* Mobile Add Button */}
            <button 
                onClick={() => router.push('/id/dashboard/blog/tambah')}
                className="lg:hidden w-full flex items-center justify-center gap-2 bg-[#E8532F] hover:bg-[#d64522] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-orange-500/20 transition-all uppercase tracking-wide">
                <Plus size={18} strokeWidth={3} />
                TAMBAH ARTIKEL
            </button>
        </div>
    );
}

// Custom Icons to match image roughly
function TagIcon({ className }: { className?: string }) {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M20.59 13.41L13.42 20.58C12.79 21.21 11.77 21.21 11.14 20.58L2.69 12.13C2.31 11.75 2.09 11.23 2.09 10.68V3.03C2.09 2.51 2.51 2.09 3.03 2.09H10.68C11.23 2.09 11.75 2.31 12.13 2.69L20.58 11.14C21.21 11.77 21.21 12.79 20.59 13.41Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 7H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function CalendarIcon({ className }: { className?: string }) {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function SortIcon({ className }: { className?: string }) {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M16 18L18 20L20 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 10V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 6L6 4L4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 14V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
