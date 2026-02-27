"use client";

import { X, Plus, Calendar, ChevronDown, Paperclip, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface LogBookModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LogBookModal({ isOpen, onClose }: LogBookModalProps) {
    const [industri, setIndustri] = useState("Glints");
    const [proyek, setProyek] = useState("Magang Hub");
    const [mulai, setMulai] = useState("2026-02-15");
    const [selesai, setSelesai] = useState("2026-02-15");
    const [deskripsi, setDeskripsi] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

    const [isIndustriOpen, setIsIndustriOpen] = useState(false);
    const [isProyekOpen, setIsProyekOpen] = useState(false);

    const industriRef = useRef<HTMLDivElement>(null);
    const proyekRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const industriOptions = ["Glints", "Tokopedia", "Gojek"];
    const proyekOptions: Record<string, string[]> = {
        "Glints": ["Magang Hub", "Chamber Dashboard", "Finance Report 2024", "Logistic System"],
        "Tokopedia": ["Logistic System", "Finance Report 2024"],
        "Gojek": ["Super App", "Driver Dashboard"]
    };

    const taskOptions = [
        "Slicing Landing Page",
        "Integrasi API Login",
        "Testing Smart Contract",
        "Refactor Navbar Component",
        "Old Smart Contract POC",
        "Setup Database Class",
        "Fixing Auth Bug",
        "Migration to PostgreSQL",
        "Implementation of Redis Cache",
        "Legacy PHP Auth Logic",
        "Membuat Design System",
        "Wireframing Dashboard",
        "Mobile App Mockup",
        "User Testing Feedback Session 1",
        "Draft Proposal Redesign 2023"
    ];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (industriRef.current && !industriRef.current.contains(event.target as Node)) {
                setIsIndustriOpen(false);
            }
            if (proyekRef.current && !proyekRef.current.contains(event.target as Node)) {
                setIsProyekOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!isOpen) return null;

    const isFormValid = industri !== "" && proyek !== "" && deskripsi.trim() !== "";

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles([...files, ...Array.from(e.target.files)]);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
            <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-100 dark:border-gray-800">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full border-2 border-[#E8532F] flex items-center justify-center text-[#E8532F]">
                            <Plus size={12} strokeWidth={3} />
                        </div>
                        <h2 className="text-lg font-bold">
                            <span className="text-gray-900 dark:text-white uppercase tracking-tight">Tambah </span>
                            <span className="text-[#E8532F] uppercase tracking-tight">Logbook</span>
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <X size={18} className="text-gray-400" />
                    </button>
                </div>

                <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    {/* Top Row: Industri, Proyek, Mulai, Selesai */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Industri */}
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Industri</label>
                            <div className="relative" ref={industriRef}>
                                <div
                                    onClick={() => setIsIndustriOpen(!isIndustriOpen)}
                                    className="flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-lg cursor-pointer select-none"
                                >
                                    <span className={`text-[12.5px] ${industri ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400'}`}>
                                        {industri || "Pilih Industri"}
                                    </span>
                                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${isIndustriOpen ? 'rotate-180' : ''}`} />
                                </div>
                                {isIndustriOpen && (
                                    <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-lg shadow-xl z-[110] max-h-40 overflow-y-auto p-1.5 space-y-0.5">
                                        {industriOptions.map(opt => (
                                            <div
                                                key={opt}
                                                onClick={() => {
                                                    setIndustri(opt);
                                                    setProyek("");
                                                    setIsIndustriOpen(false);
                                                }}
                                                className={`flex items-center justify-between px-3 py-2 text-xs rounded-md cursor-pointer transition-colors ${industri === opt
                                                    ? "bg-[#F0F7FF] text-[#0066FF] font-semibold dark:bg-blue-900/20"
                                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                    }`}
                                            >
                                                <span>{opt}</span>
                                                {industri === opt && <Check size={14} className="text-[#0066FF]" />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Proyek */}
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Proyek</label>
                            <div className="relative" ref={proyekRef}>
                                <div
                                    onClick={() => industri && setIsProyekOpen(!isProyekOpen)}
                                    className={`flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-lg select-none transition-all ${industri ? 'cursor-pointer hover:border-gray-300' : 'cursor-not-allowed opacity-50'}`}
                                >
                                    <span className={`text-[12.5px] ${proyek ? 'text-gray-900 dark:text-gray-100 font-medium' : 'text-gray-400'}`}>
                                        {proyek || "Pilih Proyek"}
                                    </span>
                                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${isProyekOpen ? 'rotate-180' : ''}`} />
                                </div>
                                {isProyekOpen && industri && (
                                    <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-lg shadow-xl z-[110] max-h-40 overflow-y-auto p-1.5 space-y-0.5">
                                        {proyekOptions[industri]?.map(opt => (
                                            <div
                                                key={opt}
                                                onClick={() => {
                                                    setProyek(opt);
                                                    setIsProyekOpen(false);
                                                }}
                                                className={`flex items-center justify-between px-3 py-2 text-xs rounded-md cursor-pointer transition-colors ${proyek === opt
                                                    ? "bg-[#F0F7FF] text-[#0066FF] font-semibold dark:bg-blue-900/20"
                                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                                                    }`}
                                            >
                                                <span>{opt}</span>
                                                {proyek === opt && <Check size={14} className="text-[#0066FF]" />}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mulai */}
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Mulai</label>
                            <div className="relative">
                                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E8532F]" />
                                <input
                                    type="date"
                                    value={mulai}
                                    onChange={(e) => setMulai(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-lg text-[12.5px] focus:outline-none focus:ring-2 focus:ring-[#E8532F]/10 outline-none h-[38px]"
                                />
                            </div>
                        </div>

                        {/* Selesai */}
                        <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Selesai</label>
                            <div className="relative">
                                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E8532F]" />
                                <input
                                    type="date"
                                    value={selesai}
                                    onChange={(e) => setSelesai(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-lg text-[12.5px] focus:outline-none focus:ring-2 focus:ring-[#E8532F]/10 outline-none h-[38px]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Rincian Tugas */}
                    <div className="space-y-2">
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Rincian Tugas</label>
                        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-xl p-3.5">
                            <div className="max-h-[140px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                                    {taskOptions.map((task) => (
                                        <div key={task} className="flex items-center gap-2.5 group">
                                            <input
                                                type="checkbox"
                                                id={task}
                                                checked={selectedTasks.includes(task)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedTasks([...selectedTasks, task]);
                                                    } else {
                                                        setSelectedTasks(selectedTasks.filter(t => t !== task));
                                                    }
                                                }}
                                                className="w-3.5 h-3.5 rounded border-gray-300 text-[#E8532F] cursor-pointer accent-[#E8532F] transition-all"
                                            />
                                            <label htmlFor={task} className="text-[11.5px] font-semibold text-gray-600 dark:text-gray-300 cursor-pointer select-none group-hover:text-[#E8532F] transition-colors leading-tight">
                                                {task}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Deskripsi Aktivitas */}
                    <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Deskripsi Aktivitas</label>
                        <textarea
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            placeholder="Tulis detail aktivitas..."
                            className="w-full min-h-[80px] p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-lg text-[12.5px] focus:outline-none focus:ring-2 focus:ring-[#E8532F]/10 resize-none outline-none"
                        />
                    </div>

                    {/* Lampiran */}
                    <div className="space-y-2">
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Lampiran</label>
                        <div className="flex flex-wrap gap-2">
                            {files.map((f, i) => (
                                <div key={i} className="flex items-center gap-2 px-2.5 py-1 bg-gray-50 dark:bg-gray-800 rounded-lg text-[10px] text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700">
                                    <Paperclip size={10} />
                                    <span className="truncate max-w-[120px]">{f.name}</span>
                                    <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="hover:text-red-500">
                                        <X size={10} />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-100 dark:border-gray-800 rounded-lg text-[10px] font-bold text-gray-400 hover:border-[#E8532F] hover:text-[#E8532F] transition-all"
                            >
                                <Paperclip size={12} />
                                <span>TAMBAH FILE</span>
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                multiple
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-3.5 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 shrink-0">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-[11px] font-bold text-[#4B6584] hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                        BATAL
                    </button>
                    <button
                        disabled={!isFormValid}
                        className={`px-8 py-2 rounded-lg text-xs font-bold text-white shadow-md transition-all ${isFormValid
                            ? "bg-[#F39C12] hover:bg-[#E67E22] active:scale-95"
                            : "bg-[#FAD390] cursor-not-allowed"
                            }`}
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
}
