"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Search, Calendar, ChevronLeft, ChevronRight, ChevronDown, Building2, Check, Loader2 } from "lucide-react";
import AdminLogBookTable, { AdminLogEntry } from "@/components/dashboard/logbook/AdminLogBookTable";
import LogBookDetailModal from "@/components/dashboard/logbook/LogBookDetailModal";

const INDUSTRY_OPTIONS = [
    "Semua Industri",
    "Glints",
    "Tokopedia",
    "Gojek",
    "Bukalapak",
    "AWS Indonesia",
    "Indosat Ooredoo",
    "Telkom Indonesia",
    "Agate Studio",
    "Traveloka",
    "Flip",
    "BCA",
    "Shopee",
    "Tiket.com",
    "KG Media",
    "Sociolla",
    "Vidio"
];

const GROUP_OPTIONS = [
    "Semua Grup",
    "Front-end",
    "Back-end",
    "UI/UX",
    "QA"
];

// --- Helper to parse date string to Date object ---
const parseDate = (dateStr: string) => {
    const months: { [key: string]: number } = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
    const parts = dateStr.split(' ');
    if (parts.length < 3) return new Date();
    return new Date(parseInt(parts[2]), months[parts[1]], parseInt(parts[0]));
};

// --- Simple Calendar Component ---
function CalendarPicker({ onSelect, selectedDate }: { onSelect: (date: string) => void; selectedDate: string }) {
    const days = Array.from({ length: 28 }, (_, i) => i + 1);
    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    // Extract day number for highlighting
    const currentDay = parseInt(selectedDate.split(' ')[0]);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 w-[280px] border border-gray-100 dark:border-gray-700 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-4 px-1">
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <ChevronLeft size={16} className="text-gray-500" />
                </button>
                <h3 className="text-[14px] font-bold text-gray-800 dark:text-gray-200">February 2026</h3>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <ChevronRight size={16} className="text-gray-500" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-y-1 mb-2">
                {dayNames.map(d => (
                    <div key={d} className="text-center text-[12px] font-medium text-gray-400 py-1">{d}</div>
                ))}
                {days.map(d => (
                    <button
                        key={d}
                        onClick={() => onSelect(`${d} Feb 2026`)}
                        className={`text-center text-[13px] font-medium py-1.5 rounded-lg transition-all hover:bg-orange-50 dark:hover:bg-orange-900/20 ${d === currentDay ? 'bg-blue-50 text-blue-600 font-bold dark:bg-blue-900/30' : 'text-gray-700 dark:text-gray-300'}`}
                    >
                        {d}
                    </button>
                ))}
            </div>
        </div>
    );
}

const MOCK_ADMIN_DATA: AdminLogEntry[] = Array.from({ length: 19 }, (_, i) => ({
    id: (i + 1).toString(),
    tglLaporan: `${(i % 28) + 1} Feb 2026`,
    periode: `${(i % 28) + 1} Feb 2026`,
    proyek: i % 2 === 0 ? "Chamber Dashboard" : "Glints",
    uraian: i % 2 === 0
        ? "Eksport project Unity ke format WebGL dan melakukan testing performa di Chrome..."
        : "Menambahkan index pada kolom email dan created_at untuk mempercepat filtering...",
    industri: true,
    pendidikan: true,
    industryName: INDUSTRY_OPTIONS[(i % (INDUSTRY_OPTIONS.length - 1)) + 1],
    group: GROUP_OPTIONS[(i % (GROUP_OPTIONS.length - 1)) + 1],
    memberName: "Raasyidah Diinar",
    memberAvatar: "/hyein.png",
    tasks: i % 2 === 0 ? ["Build WebGL", "Testing on Browser"] : ["Database Optimization", "Index Creation"],
    attachments: i % 3 === 0 ? [{ name: `File ${i + 1}`, url: "#" }] : []
}));


export default function AdminLogBookPage() {
    const [selectedEntry, setSelectedEntry] = useState<AdminLogEntry | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState("10");
    const [isRowsDropdownOpen, setIsRowsDropdownOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isTableLoading, setIsTableLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState("Semua Industri");
    const [isIndustryDropdownOpen, setIsIndustryDropdownOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState("Semua Grup");
    const [isGroupDropdownOpen, setIsGroupDropdownOpen] = useState(false);
    const [startDate, setStartDate] = useState("25 Jan 2026");
    const [endDate, setEndDate] = useState("24 Feb 2026");
    const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
    const [isEndCalendarOpen, setIsEndCalendarOpen] = useState(false);
    const [memberSearch, setMemberSearch] = useState("");

    // --- Filtering Logic ---
    const filteredData = useMemo(() => {
        return MOCK_ADMIN_DATA.filter(entry => {
            // Member Search
            if (memberSearch && !entry.memberName.toLowerCase().includes(memberSearch.toLowerCase())) return false;

            // Industry Filter
            if (selectedIndustry !== "Semua Industri" && entry.industryName !== selectedIndustry) return false;

            // Group Filter
            if (selectedGroup !== "Semua Grup" && entry.group !== selectedGroup) return false;

            // Date Filter
            const entryDate = parseDate(entry.tglLaporan);
            const startLimit = parseDate(startDate);
            const endLimit = parseDate(endDate);
            if (entryDate < startLimit || entryDate > endLimit) return false;

            return true;
        });
    }, [memberSearch, selectedIndustry, selectedGroup, startDate, endDate]);

    // --- Pagination Logic ---
    const paginatedData = useMemo(() => {
        const rows = parseInt(rowsPerPage);
        const startIndex = (currentPage - 1) * rows;
        return filteredData.slice(startIndex, startIndex + rows);
    }, [filteredData, currentPage, rowsPerPage]);

    useEffect(() => {
        // Stage 1: Initial Page Load (1s)
        const pageTimer = setTimeout(() => {
            setIsPageLoading(false);
            // Stage 2: Initial Table Load (1s)
            setIsTableLoading(true);
            const tableTimer = setTimeout(() => {
                setIsTableLoading(false);
            }, 1000);
            return () => clearTimeout(tableTimer);
        }, 1000);

        return () => clearTimeout(pageTimer);
    }, []);

    const handleShowDetail = (entry: AdminLogEntry) => {
        setSelectedEntry(entry);
        setIsDetailModalOpen(true);
    };

    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        setSelectedIds(prev =>
            prev.length === filteredData.length ? [] : filteredData.map(d => d.id)
        );
    };

    const handlePageChange = (page: number) => {
        if (page < 1 || page > 3) return;
        setIsLoading(true);
        setCurrentPage(page);
        // Simulate API loading
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleRowsPerPageChange = (value: string) => {
        setIsLoading(true);
        setRowsPerPage(value);
        setIsRowsDropdownOpen(false);
        setCurrentPage(1);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleTampilkan = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleIndustryChange = (industry: string) => {
        setSelectedIndustry(industry);
        setIsIndustryDropdownOpen(false);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleGroupChange = (group: string) => {
        setSelectedGroup(group);
        setIsGroupDropdownOpen(false);
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleDateChange = (type: 'start' | 'end', date: string) => {
        if (type === 'start') {
            setStartDate(date);
            setIsStartCalendarOpen(false);
        } else {
            setEndDate(date);
            setIsEndCalendarOpen(false);
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    if (isPageLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-[#E8532F] animate-spin mb-4" />
                <p className="text-gray-500 font-medium tracking-wide">Memuat Halaman Logbook...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-10 animate-slide-up">
            {/* Header with Title & Filters */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">LogBook</h1>

                <div className="flex flex-wrap items-center gap-2">
                    {/* Search Member */}
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={15} />
                        <input
                            type="text"
                            placeholder="Cari anggota..."
                            value={memberSearch}
                            onChange={(e) => {
                                setMemberSearch(e.target.value);
                                setIsLoading(true);
                                setTimeout(() => setIsLoading(false), 500);
                            }}
                            className="pl-9 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all w-full md:w-[180px]"
                        />
                    </div>

                    {/* Industry Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsIndustryDropdownOpen(!isIndustryDropdownOpen)}
                            className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all min-w-[130px] justify-between"
                        >
                            <div className="flex items-center gap-2">
                                <Building2 size={13} className="text-gray-400" />
                                <span>{selectedIndustry.length > 12 ? selectedIndustry.substring(0, 10) + '...' : selectedIndustry}</span>
                            </div>
                            <ChevronDown size={13} className={`text-gray-400 transition-transform ${isIndustryDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isIndustryDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-20" onClick={() => setIsIndustryDropdownOpen(false)} />
                                <div className="absolute top-full left-0 mt-1.5 w-max min-w-[180px] bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl z-30 py-1 overflow-hidden animate-in fade-in zoom-in duration-200">
                                    <div className="max-h-[300px] overflow-y-auto">
                                        {INDUSTRY_OPTIONS.map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => handleIndustryChange(opt)}
                                                className={`w-full flex items-center justify-between px-4 py-2.5 text-[11px] font-bold transition-colors ${selectedIndustry === opt
                                                    ? "bg-gray-50 dark:bg-gray-700 text-[#E8532F]"
                                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                                    }`}
                                            >
                                                <span>{opt}</span>
                                                {selectedIndustry === opt && <Check size={14} className="text-[#E8532F]" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Group Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsGroupDropdownOpen(!isGroupDropdownOpen)}
                            className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all min-w-[130px] justify-between"
                        >
                            <div className="flex items-center gap-2">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                <span>{selectedGroup}</span>
                            </div>
                            <ChevronDown size={13} className={`text-gray-400 transition-transform ${isGroupDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isGroupDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-20" onClick={() => setIsGroupDropdownOpen(false)} />
                                <div className="absolute top-full left-0 mt-1.5 w-max min-w-[180px] bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl z-30 py-1 overflow-hidden animate-in fade-in zoom-in duration-200">
                                    <div className="max-h-[300px] overflow-y-auto">
                                        {GROUP_OPTIONS.map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => handleGroupChange(opt)}
                                                className={`w-full flex items-center justify-between px-4 py-2.5 text-[11px] font-bold transition-colors ${selectedGroup === opt
                                                    ? "bg-gray-50 dark:bg-gray-700 text-[#E8532F]"
                                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                                    }`}
                                            >
                                                <span>{opt}</span>
                                                {selectedGroup === opt && <Check size={14} className="text-[#E8532F]" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Date Range */}
                    <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 gap-3 relative">
                        <div
                            className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors relative"
                            onClick={() => setIsStartCalendarOpen(!isStartCalendarOpen)}
                        >
                            <Calendar size={13} className="text-gray-400" />
                            <span className="text-[10px] font-bold dark:text-gray-300 whitespace-nowrap">{startDate}</span>

                            {isStartCalendarOpen && (
                                <>
                                    <div className="fixed inset-0 z-20 cursor-default" onClick={(e) => { e.stopPropagation(); setIsStartCalendarOpen(false); }} />
                                    <div className="absolute top-full left-[-12px] mt-3 z-30" onClick={(e) => e.stopPropagation()}>
                                        <CalendarPicker selectedDate={startDate} onSelect={(d) => handleDateChange('start', d)} />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="h-3 w-px bg-gray-200 dark:bg-gray-700" />

                        <div
                            className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors relative"
                            onClick={() => setIsEndCalendarOpen(!isEndCalendarOpen)}
                        >
                            <span className="text-[10px] font-bold dark:text-gray-300 whitespace-nowrap">{endDate}</span>

                            {isEndCalendarOpen && (
                                <>
                                    <div className="fixed inset-0 z-20 cursor-default" onClick={(e) => { e.stopPropagation(); setIsEndCalendarOpen(false); }} />
                                    <div className="absolute top-full right-[-12px] mt-3 z-30" onClick={(e) => e.stopPropagation()}>
                                        <CalendarPicker selectedDate={endDate} onSelect={(d) => handleDateChange('end', d)} />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={handleTampilkan}
                        className="px-5 py-2 bg-[#E8532F] hover:bg-[#d04a29] text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                    >
                        Tampilkan
                    </button>
                </div>
            </div>

            {/* Table */}
            <AdminLogBookTable
                data={paginatedData}
                isLoading={isTableLoading || isLoading}
                onShowDetail={handleShowDetail}
                selectedIds={selectedIds}
                onToggleSelect={toggleSelect}
                onToggleSelectAll={toggleSelectAll}
            />

            {/* Pagination Container */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
                <div className="flex items-center gap-6">
                    <p className="text-[11px] font-medium text-gray-500">
                        Menampilkan <span className="text-gray-900 dark:text-white font-bold">{paginatedData.length}</span> dari <span className="text-gray-900 dark:text-white font-bold">{filteredData.length}</span> data
                    </p>

                    <div className="flex items-center gap-2.5">
                        <span className="text-[11px] font-medium text-gray-400">Baris:</span>
                        <div className="relative">
                            <button
                                onClick={() => setIsRowsDropdownOpen(!isRowsDropdownOpen)}
                                className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl px-4 py-2 text-[11px] font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 shadow-sm transition-all focus:outline-none min-w-[70px] justify-between"
                            >
                                <span>{rowsPerPage}</span>
                                <ChevronDown size={14} className={`text-gray-400 transition-transform ${isRowsDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Custom Dropdown Menu */}
                            {isRowsDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-20" onClick={() => setIsRowsDropdownOpen(false)} />
                                    <div className="absolute bottom-full left-0 mb-2 w-full min-w-[90px] bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-gray-700 overflow-hidden z-30 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                        {["10", "25", "50", "100"].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => handleRowsPerPageChange(option)}
                                                className={`w-full flex items-center justify-between px-4 py-2.5 text-[11px] font-bold transition-colors ${rowsPerPage === option
                                                    ? "bg-[#F3F4FB] dark:bg-gray-700 text-gray-800 dark:text-white"
                                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                                    }`}
                                            >
                                                <span>{option}</span>
                                                {rowsPerPage === option && (
                                                    <Check size={12} className="text-[#7E84A3]" strokeWidth={3} />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1.5">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`w-9 h-9 flex items-center justify-center rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-90 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <ChevronLeft size={16} />
                    </button>
                    {Array.from({ length: Math.ceil(filteredData.length / parseInt(rowsPerPage)) }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all font-bold text-xs active:scale-90 ${currentPage === page
                                ? "bg-[#E8532F] text-white shadow-lg shadow-orange-500/20"
                                : "border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        disabled={currentPage === Math.ceil(filteredData.length / parseInt(rowsPerPage)) || filteredData.length === 0}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`w-9 h-9 flex items-center justify-center rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all active:scale-90 ${(currentPage === Math.ceil(filteredData.length / parseInt(rowsPerPage)) || filteredData.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Modal */}
            {selectedEntry && (
                <LogBookDetailModal
                    isOpen={isDetailModalOpen}
                    onClose={() => setIsDetailModalOpen(false)}
                    entry={selectedEntry}
                />
            )}
        </div>
    );
}
