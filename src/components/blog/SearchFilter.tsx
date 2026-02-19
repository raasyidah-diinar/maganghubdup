"use client";

import { Search, Tag, Calendar, CalendarDays, ArrowUpDown, ChevronDown, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Props = {
  onSearchChange?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
  onMonthChange?: (month: string) => void;
  onYearChange?: (year: string) => void;
  onSortChange?: (sort: string) => void;
};

const CATEGORIES = [
  "Career",
  "Design",
  "Engineering",
  "Game Dev",
  "Marketing",
  "Technology",
  "UI/UX",
];

const MONTHS = [
  { value: "Jan", label: "Januari" },
  { value: "Feb", label: "Februari" },
  { value: "Mar", label: "Maret" },
  { value: "Apr", label: "April" },
  { value: "Mei", label: "Mei" },
  { value: "Jun", label: "Juni" },
  { value: "Jul", label: "Juli" },
  { value: "Agu", label: "Agustus" },
  { value: "Sep", label: "September" },
  { value: "Okt", label: "Oktober" },
  { value: "Nov", label: "November" },
  { value: "Des", label: "Desember" },
];

const YEARS = ["2024", "2025", "2026"];

const SORT_OPTIONS = [
  { value: "terbaru", label: "Terbaru" },
  { value: "terlama", label: "Terlama" },
  { value: "az", label: "Judul A-Z" },
];

export default function SearchFilter({
  onSearchChange,
  onCategoryChange,
  onMonthChange,
  onYearChange,
  onSortChange,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("terbaru");

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
      if (monthRef.current && !monthRef.current.contains(event.target as Node)) {
        setIsMonthOpen(false);
      }
      if (yearRef.current && !yearRef.current.contains(event.target as Node)) {
        setIsYearOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (value: string) => {
    setCategory(value);
    setIsCategoryOpen(false);
    onCategoryChange?.(value.toUpperCase());
  };

  const handleMonthSelect = (value: string) => {
    setMonth(value);
    setIsMonthOpen(false);
    onMonthChange?.(value);
  };

  const handleYearSelect = (value: string) => {
    setYear(value);
    setIsYearOpen(false);
    onYearChange?.(value);
  };

  const handleSortSelect = (value: string) => {
    setSort(value);
    setIsSortOpen(false);
    onSortChange?.(value);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap lg:flex-nowrap gap-3 items-center">

        {/* Search */}
        <div className="relative w-full lg:max-w-[26rem]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onSearchChange?.(e.target.value);
            }}
            placeholder="Cari Artikel..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent transition-all"
          />
        </div>

        {/* Kategori Custom Dropdown */}
        <div className="relative w-full sm:w-auto sm:min-w-[160px]" ref={categoryRef}>
          <div
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-all"
          >
            <Tag size={20} className="text-orange-500 dark:text-orange-400 flex-shrink-0" />
            <span className={`flex-1 ${category ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"}`}>
              {category || "Kategori"}
            </span>
            {category && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCategory("");
                  onCategoryChange?.("");
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
              >
                <X size={16} />
              </button>
            )}
            <ChevronDown size={20} className="text-gray-400 dark:text-gray-500 flex-shrink-0" />
          </div>

          {isCategoryOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bulan Custom Dropdown */}
        <div className="relative w-full sm:w-auto sm:min-w-[150px]" ref={monthRef}>
          <div
            onClick={() => setIsMonthOpen(!isMonthOpen)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-all"
          >
            <Calendar size={20} className="text-orange-500 dark:text-orange-400 flex-shrink-0" />
            <span className={`flex-1 ${month ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"}`}>
              {month ? MONTHS.find(m => m.value === month)?.label : "Bulan"}
            </span>
            {month && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMonth("");
                  onMonthChange?.("");
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
              >
                <X size={16} />
              </button>
            )}
            <ChevronDown size={20} className="text-gray-400 dark:text-gray-500 flex-shrink-0" />
          </div>

          {isMonthOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {MONTHS.map((m) => (
                <div
                  key={m.value}
                  onClick={() => handleMonthSelect(m.value)}
                  className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  {m.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tahun Custom Dropdown */}
        <div className="relative w-full sm:w-auto sm:min-w-[130px]" ref={yearRef}>
          <div
            onClick={() => setIsYearOpen(!isYearOpen)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-all"
          >
            <CalendarDays size={20} className="text-orange-500 dark:text-orange-400 flex-shrink-0" />
            <span className={`flex-1 ${year ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"}`}>
              {year || "Tahun"}
            </span>
            {year && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setYear("");
                  onYearChange?.("");
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
              >
                <X size={16} />
              </button>
            )}
            <ChevronDown size={20} className="text-gray-400 dark:text-gray-500 flex-shrink-0" />
          </div>

          {isYearOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {YEARS.map((y) => (
                <div
                  key={y}
                  onClick={() => handleYearSelect(y)}
                  className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  {y}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sort Custom Dropdown */}
        <div className="relative w-full sm:w-auto sm:min-w-[160px]" ref={sortRef}>
          <div
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-all"
          >
            <ArrowUpDown size={20} className="text-orange-500 dark:text-orange-400 flex-shrink-0" />
            <span className="flex-1 text-gray-900 dark:text-gray-100">
              {SORT_OPTIONS.find(s => s.value === sort)?.label}
            </span>
            <ChevronDown size={20} className="text-gray-400 dark:text-gray-500 flex-shrink-0" />
          </div>

          {isSortOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
              {SORT_OPTIONS.map((s) => (
                <div
                  key={s.value}
                  onClick={() => handleSortSelect(s.value)}
                  className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  {s.label}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}