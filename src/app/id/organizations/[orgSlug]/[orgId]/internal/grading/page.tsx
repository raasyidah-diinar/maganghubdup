"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Calendar, ChevronLeft, ChevronRight, ChevronDown, Check, Loader2, Filter, Upload, Download, Plus } from "lucide-react";
import GradingTable, { GradingEntry } from "@/components/dashboard/grading/GradingTable";

const CATEGORY_OPTIONS = [
    "Semua Kategori",
    "Kinerja",
    "Kedisiplinan",
    "Sikap",
];

// --- Simple Calendar Component ---
function CalendarPicker({ onSelect, selectedDate }: { onSelect: (date: string) => void; selectedDate: string }) {
    const days = Array.from({ length: 28 }, (_, i) => i + 1);
    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
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

export default function InternalGradingPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [startDate, setStartDate] = useState("27 Jan 2026");
    const [endDate, setEndDate] = useState("26 Feb 2026");
    const [isStartCalendarOpen, setIsStartCalendarOpen] = useState(false);
    const [isEndCalendarOpen, setIsEndCalendarOpen] = useState(false);
    const [data, setData] = useState<GradingEntry[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Initial loading simulation
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    const handleTampilkan = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 800);
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
        setTimeout(() => setIsLoading(false), 500);
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsLoading(true);
            // Simulate import process
            setTimeout(() => {
                setIsLoading(false);
                window.alert(`Berhasil mengimpor file: ${file.name}`);
                // Reset input
                if (fileInputRef.current) fileInputRef.current.value = "";
            }, 2000);
        }
    };

    const handleExport = () => {
        if (data.length === 0) {
            window.alert("Tidak ada data yang bisa di export");
        } else {
            setIsLoading(true);
            // Simulate export process
            setTimeout(() => {
                setIsLoading(false);
                window.alert(`Berhasil mengekspor data penilaian.`);
            }, 1000);
        }
    };

    return (
        <div className="space-y-6 pb-10 animate-slide-up">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xlsx, .xls"
                className="hidden"
            />

            {/* Header & Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Penilaian</h1>

                <div className="flex flex-wrap items-center gap-2">
                    {/* Search */}
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={15} />
                        <input
                            type="text"
                            placeholder="Cari..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all w-full md:w-[150px]"
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                            className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all min-w-[130px] justify-between"
                        >
                            <div className="flex items-center gap-2">
                                <Filter size={13} className="text-gray-400" />
                                <span>{selectedCategory}</span>
                            </div>
                            <ChevronDown size={13} className={`text-gray-400 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isCategoryDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-20" onClick={() => setIsCategoryDropdownOpen(false)} />
                                <div className="absolute top-full left-0 mt-1.5 w-max min-w-[180px] bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl z-30 py-1 overflow-hidden animate-in fade-in zoom-in duration-200">
                                    {CATEGORY_OPTIONS.map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => {
                                                setSelectedCategory(opt);
                                                setIsCategoryDropdownOpen(false);
                                            }}
                                            className={`w-full flex items-center justify-between px-4 py-2.5 text-[11px] font-bold transition-colors ${selectedCategory === opt
                                                ? "bg-gray-50 dark:bg-gray-700 text-[#E8532F]"
                                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                                }`}
                                        >
                                            <span>{opt}</span>
                                            {selectedCategory === opt && <Check size={14} className="text-[#E8532F]" />}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Date Range */}
                    <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 gap-3 relative">
                        <div
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors relative"
                            onClick={() => setIsStartCalendarOpen(!isStartCalendarOpen)}
                        >
                            <span className="text-[10px] font-bold whitespace-nowrap">{startDate}</span>
                            {isStartCalendarOpen && (
                                <>
                                    <div className="fixed inset-0 z-10 cursor-default" onClick={(e) => { e.stopPropagation(); setIsStartCalendarOpen(false); }} />
                                    <div className="absolute top-full left-[-12px] mt-3 z-20" onClick={(e) => e.stopPropagation()}>
                                        <CalendarPicker selectedDate={startDate} onSelect={(d) => handleDateChange('start', d)} />
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="h-3 w-px bg-gray-200 dark:bg-gray-700" />
                        <div
                            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors relative"
                            onClick={() => setIsEndCalendarOpen(!isEndCalendarOpen)}
                        >
                            <span className="text-[10px] font-bold whitespace-nowrap">{endDate}</span>
                            {isEndCalendarOpen && (
                                <>
                                    <div className="fixed inset-0 z-10 cursor-default" onClick={(e) => { e.stopPropagation(); setIsEndCalendarOpen(false); }} />
                                    <div className="absolute top-full right-[-12px] mt-3 z-20" onClick={(e) => e.stopPropagation()}>
                                        <CalendarPicker selectedDate={endDate} onSelect={(d) => handleDateChange('end', d)} />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Main Action Buttons */}
                    <button
                        onClick={handleTampilkan}
                        className="px-5 py-2 bg-[#E8532F] hover:bg-[#d04a29] text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                    >
                        Tampilkan
                    </button>

                    <button
                        onClick={handleImportClick}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all active:scale-95"
                    >
                        <Upload size={14} className="text-gray-400" />
                        Import
                    </button>

                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all active:scale-95"
                    >
                        <Download size={14} className="text-gray-400" />
                        Export
                    </button>

                    <button className="flex items-center gap-2 px-4 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-extrabold rounded-lg transition-all shadow-lg shadow-orange-500/10 active:scale-95">
                        <Plus size={16} />
                        Penilaian
                    </button>
                </div>
            </div>

            {/* Table Area */}
            <GradingTable data={data} isLoading={isLoading} />
        </div>
    );
}
