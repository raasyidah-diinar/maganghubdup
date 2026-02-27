"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Search, ChevronLeft, ChevronRight, ChevronDown, Check, Loader2, Filter, Upload, Download, Plus, X } from "lucide-react";
import GradingTable, { GradingEntry } from "@/components/dashboard/grading/GradingTable";

const CATEGORY_OPTIONS = [
    "Semua Kategori",
    "Kinerja",
    "Kedisiplinan",
    "Sikap",
];

const MODAL_CATEGORY_OPTIONS = ["Kinerja", "Kedisiplinan", "Sikap"];

const MEMBER_OPTIONS = [
    { name: "Daffa Aziz Ghiffari", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daffa" },
    { name: "Fatkul Amri", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatkul" },
    { name: "Fajar Wati", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fajar" },
    { name: "Salsabila Putri", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Salsabila" },
    { name: "Aditya Pratama", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya" },
    { name: "Dian Sastro", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dian" },
    { name: "Bagas Kara", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bagas" },
    { name: "Fitriani", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fitriani" },
    { name: "Eko Prasetyo", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eko" },
    { name: "Maya Sari", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya" },
    { name: "Rizky Ramadhan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rizky" },
];

function calculateGrade(score: number): string {
    if (score >= 85) return "A";
    if (score >= 75) return "B";
    if (score >= 65) return "C";
    if (score >= 50) return "D";
    return "E";
}

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
    const [displayData, setDisplayData] = useState<GradingEntry[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isFirstRender = useRef(true);

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const [formMember, setFormMember] = useState("");
    const [formCategory, setFormCategory] = useState("Kinerja");
    const [formScore, setFormScore] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [formRecommendation, setFormRecommendation] = useState("");
    const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState(false);
    const [isModalCategoryDropdownOpen, setIsModalCategoryDropdownOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // ---- Helper: parse "26 Feb 2026" -> Date ----
    const parseDate = (str: string) => {
        const months: Record<string, number> = {
            Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
            Jul: 6, Aug: 7, Sep: 8, Okt: 9, Nov: 10, Des: 11,
        };
        const [d, m, y] = str.split(' ');
        return new Date(parseInt(y), months[m] ?? 0, parseInt(d));
    };

    // ---- Compute filtered result ----
    const applyFilter = (source: GradingEntry[]) => {
        const q = searchQuery.toLowerCase();
        return source.filter((item) => {
            if (q && ![item.memberName, item.penilai, item.deskripsi, item.kategori]
                .some(f => f.toLowerCase().includes(q))) return false;
            if (selectedCategory !== "Semua Kategori" && item.kategori !== selectedCategory) return false;
            const itemDate = parseDate(item.tglPenilaian);
            if (itemDate < parseDate(startDate) || itemDate > parseDate(endDate)) return false;
            return true;
        });
    };

    // ---- Initial data load ----
    useEffect(() => {
        setMounted(true);
        const timer = setTimeout(() => {
            const initial: GradingEntry[] = [
                {
                    id: "demo-1",
                    tglPenilaian: "26 Feb 2026",
                    memberName: "Daffa Aziz Ghiffari",
                    memberAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daffa",
                    kategori: "Kinerja",
                    penilai: "Fajar Wati",
                    deskripsi: "Evaluasi Triwulan I",
                    nilai: 90,
                    rekomendasi: "Sangat memuaskan",
                },
                {
                    id: "demo-2",
                    tglPenilaian: "25 Feb 2026",
                    memberName: "Daffa Aziz Ghiffari",
                    memberAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daffa",
                    kategori: "Kedisiplinan",
                    penilai: "Fatkul Amri",
                    deskripsi: "Review Absensi",
                    nilai: 75,
                    rekomendasi: "Perlu ditingkatkan konsistensinya",
                },
            ];
            setData(initial);
            setDisplayData(initial);
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    // ---- Filter with 1s spinner whenever filter values change ----
    useEffect(() => {
        if (isFirstRender.current) { isFirstRender.current = false; return; }
        setIsLoading(true);
        const t = setTimeout(() => {
            setDisplayData(applyFilter(data));
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery, selectedCategory, startDate, endDate]);

    const handleTampilkan = () => {
        setIsLoading(true);
        setTimeout(() => {
            setDisplayData(applyFilter(data));
            setIsLoading(false);
        }, 1000);
    };

    const handleDateChange = (type: 'start' | 'end', date: string) => {
        if (type === 'start') { setStartDate(date); setIsStartCalendarOpen(false); }
        else { setEndDate(date); setIsEndCalendarOpen(false); }
    };

    const handleImportClick = () => fileInputRef.current?.click();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                window.alert(`Berhasil mengimpor file: ${file.name}`);
                if (fileInputRef.current) fileInputRef.current.value = "";
            }, 2000);
        }
    };

    const handleExport = () => {
        if (data.length === 0) { window.alert("Tidak ada data yang bisa di export"); return; }
        setIsLoading(true);
        setTimeout(() => { setIsLoading(false); window.alert("Berhasil mengekspor data penilaian."); }, 1000);
    };

    const handleOpenModal = () => {
        setFormMember("");
        setFormCategory("Kinerja");
        setFormScore("");
        setFormDescription("");
        setFormRecommendation("");
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleScoreChange = (val: string) => {
        if (val === "" || (/^\d+$/.test(val) && parseInt(val) <= 100)) {
            setFormScore(val);
        }
    };

    const handleSave = () => {
        if (!formMember || !formScore || !formDescription) {
            window.alert("Mohon lengkapi data yang wajib diisi (Anggota, Nilai, Deskripsi).");
            return;
        }
        setIsFormSubmitting(true);
        setTimeout(() => {
            const member = MEMBER_OPTIONS.find(m => m.name === formMember);
            const now = new Date();
            const dateStr = `${now.getDate()} ${now.toLocaleString('id-ID', { month: 'short' })} ${now.getFullYear()}`;
            const newEntry: GradingEntry = {
                id: Math.random().toString(36).substr(2, 9),
                tglPenilaian: dateStr,
                memberName: formMember,
                memberAvatar: member?.avatar || "",
                kategori: formCategory,
                penilai: "Admin Institusi",
                deskripsi: formDescription,
                nilai: parseInt(formScore),
            };
            setData(prev => [newEntry, ...prev]);
            setIsFormSubmitting(false);
            setIsModalOpen(false);
        }, 800);
    };

    const currentGrade = formScore ? calculateGrade(parseInt(formScore)) : "–";

    return (
        <div className="space-y-6 pb-10 animate-slide-up">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".xlsx, .xls" className="hidden" />

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
                                            onClick={() => { setSelectedCategory(opt); setIsCategoryDropdownOpen(false); }}
                                            className={`w-full flex items-center justify-between px-4 py-2.5 text-[11px] font-bold transition-colors ${selectedCategory === opt ? "bg-gray-50 dark:bg-gray-700 text-[#E8532F]" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"}`}
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
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors relative" onClick={() => setIsStartCalendarOpen(!isStartCalendarOpen)}>
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
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors relative" onClick={() => setIsEndCalendarOpen(!isEndCalendarOpen)}>
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

                    <button onClick={handleTampilkan} className="px-5 py-2 bg-[#E8532F] hover:bg-[#d04a29] text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-orange-500/20 active:scale-95">
                        Tampilkan
                    </button>
                    <button onClick={handleImportClick} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all active:scale-95">
                        <Upload size={14} className="text-gray-400" />
                        Import
                    </button>
                    <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all active:scale-95">
                        <Download size={14} className="text-gray-400" />
                        Export
                    </button>
                    <button onClick={handleOpenModal} className="flex items-center gap-2 px-4 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-xs font-extrabold rounded-lg transition-all shadow-lg shadow-orange-500/10 active:scale-95">
                        <Plus size={16} />
                        Penilaian
                    </button>
                </div>
            </div>

            {/* Table Area */}
            <GradingTable data={displayData} isLoading={isLoading} />

            {/* ============ TAMBAH PENILAIAN MODAL ============ */}
            {isModalOpen && mounted && createPortal(
                <div className="fixed inset-0 z-[9999] flex justify-center items-start overflow-y-auto py-10 px-4">
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseModal} />

                    {/* Modal Card */}
                    <div className="relative bg-white dark:bg-gray-900 w-full max-w-[680px] rounded-2xl shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>

                        {/* Header */}
                        <div className="px-7 pt-6 pb-5 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                    <Plus className="text-[#FF7A00]" size={16} strokeWidth={3} />
                                </div>
                                <h2 className="text-[17px] font-black text-gray-900 dark:text-white tracking-tight uppercase">
                                    TAMBAH <span className="text-[#FF7A00]">PENILAIAN</span>
                                </h2>
                            </div>
                            <button onClick={handleCloseModal} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-gray-600">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="px-7 py-6 space-y-5">

                            {/* Row 1: Anggota + Kategori */}
                            <div className="grid grid-cols-2 gap-4">

                                {/* Anggota */}
                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <Plus size={11} className="text-[#FF7A00]" /> ANGGOTA
                                    </label>
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsMemberDropdownOpen(v => !v)}
                                            className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-[13px] text-left hover:border-gray-300 transition-all"
                                        >
                                            <span className={formMember ? "text-gray-900 dark:text-white font-medium" : "text-gray-400"}>
                                                {formMember || "Pilih Anggota"}
                                            </span>
                                            <ChevronDown size={14} className={`text-gray-400 transition-transform flex-shrink-0 ${isMemberDropdownOpen ? "rotate-180" : ""}`} />
                                        </button>
                                        {isMemberDropdownOpen && (
                                            <>
                                                <div className="fixed inset-0 z-10" onClick={() => setIsMemberDropdownOpen(false)} />
                                                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl z-20 py-1 max-h-[240px] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
                                                    {MEMBER_OPTIONS.map((m) => (
                                                        <button key={m.name} onClick={() => { setFormMember(m.name); setIsMemberDropdownOpen(false); }}
                                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left">
                                                            <img src={m.avatar} alt={m.name} className="w-6 h-6 rounded-full bg-gray-100 flex-shrink-0" />
                                                            {m.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Kategori */}
                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <Plus size={11} className="text-[#FF7A00]" /> KATEGORI
                                    </label>
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsModalCategoryDropdownOpen(v => !v)}
                                            className="w-full flex items-center justify-between px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-[13px] text-left hover:border-gray-300 transition-all"
                                        >
                                            <span className="text-gray-900 dark:text-white font-medium">{formCategory}</span>
                                            <ChevronDown size={14} className={`text-gray-400 transition-transform flex-shrink-0 ${isModalCategoryDropdownOpen ? "rotate-180" : ""}`} />
                                        </button>
                                        {isModalCategoryDropdownOpen && (
                                            <>
                                                <div className="fixed inset-0 z-10" onClick={() => setIsModalCategoryDropdownOpen(false)} />
                                                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl z-20 py-1 animate-in fade-in zoom-in-95 duration-150">
                                                    {MODAL_CATEGORY_OPTIONS.map((cat) => (
                                                        <button key={cat} onClick={() => { setFormCategory(cat); setIsModalCategoryDropdownOpen(false); }}
                                                            className="w-full flex items-center justify-between px-4 py-2.5 text-[13px] font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left">
                                                            {cat}
                                                            {formCategory === cat && <Check size={13} className="text-[#FF7A00]" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Row 2: Nilai Angka + Grade */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        <Plus size={11} className="text-[#FF7A00]" /> NILAI ANGKA (0-100)
                                    </label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={formScore}
                                        onChange={(e) => handleScoreChange(e.target.value)}
                                        placeholder="Contoh: 85"
                                        className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-[13px] font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                                        GRADE
                                    </label>
                                    <div className="w-full px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl text-[20px] font-black text-[#FF7A00] flex items-center justify-center min-h-[44px]">
                                        {currentGrade}
                                    </div>
                                </div>
                            </div>

                            {/* Deskripsi */}
                            <div className="space-y-1.5">
                                <label className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <Plus size={11} className="text-[#FF7A00]" /> DESKRIPSI EVALUASI
                                </label>
                                <textarea
                                    value={formDescription}
                                    onChange={(e) => setFormDescription(e.target.value)}
                                    placeholder="Tulis detail evaluasi..."
                                    rows={4}
                                    className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-[13px] font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 transition-all resize-none"
                                />
                            </div>

                            {/* Catatan Rekomendasi */}
                            <div className="space-y-1.5">
                                <label className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <Plus size={11} className="text-[#FF7A00]" /> CATATAN REKOMENDASI
                                </label>
                                <input
                                    type="text"
                                    value={formRecommendation}
                                    onChange={(e) => setFormRecommendation(e.target.value)}
                                    placeholder="Saran opsional..."
                                    className="w-full px-3.5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-[13px] font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 transition-all"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-7 py-5 flex items-center justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
                            <button onClick={handleCloseModal} className="px-5 py-2 text-[12px] font-bold text-gray-500 hover:text-gray-700 transition-colors">
                                Batal
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isFormSubmitting}
                                className="px-7 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-[12px] font-bold rounded-lg transition-all shadow-md shadow-orange-500/20 active:scale-95 flex items-center gap-2 disabled:opacity-60"
                            >
                                {isFormSubmitting ? <><Loader2 size={14} className="animate-spin" /> Menyimpan...</> : "Simpan"}
                            </button>
                        </div>
                    </div>
                </div>
                , document.body)}
        </div>
    );
}
