"use client";

import { X, Plus, Calendar, ChevronDown, Paperclip } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface LogBookModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LogBookModal({ isOpen, onClose }: LogBookModalProps) {
    const [industri, setIndustri] = useState("");
    const [proyek, setProyek] = useState("");
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
        "Glints": ["Chamber Dashboard", "Magang Hub"],
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full border-2 border-[#E8532F] flex items-center justify-center text-[#E8532F]">
                            <Plus size={14} strokeWidth={3} />
                        </div>
                        <h2 className="text-xl font-bold">
                            <span className="text-gray-900 dark:text-white uppercase">Tambah </span>
                            <span className="text-[#E8532F] uppercase">Logbook</span>
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <X size={20} className="text-gray-400" />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Top Row: Industri, Proyek, Mulai, Selesai */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Industri */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Industri</label>
                            <div className="relative" ref={industriRef}>
                                <div
                                    onClick={() => setIsIndustriOpen(!isIndustriOpen)}
                                    className="flex items-center justify-between px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer select-none"
                                >
                                    <span className={`text-sm ${industri ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400'}`}>
                                        {industri || "Pilih Industri"}
                                    </span>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${isIndustriOpen ? 'rotate-180' : ''}`} />
                                </div>
                                {isIndustriOpen && (
                                    <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-[110] max-h-48 overflow-y-auto">
                                        {industriOptions.map(opt => (
                                            <div
                                                key={opt}
                                                onClick={() => {
                                                    setIndustri(opt);
                                                    setProyek(""); // Reset proyek when industri changes
                                                    setIsIndustriOpen(false);
                                                }}
                                                className="px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                            >
                                                {opt}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Proyek */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Proyek</label>
                            <div className="relative" ref={proyekRef}>
                                <div
                                    onClick={() => industri && setIsProyekOpen(!isProyekOpen)}
                                    className={`flex items-center justify-between px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl select-none ${industri ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                                >
                                    <span className={`text-sm ${proyek ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400'}`}>
                                        {proyek || "Pilih Proyek"}
                                    </span>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${isProyekOpen ? 'rotate-180' : ''}`} />
                                </div>
                                {isProyekOpen && industri && (
                                    <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-[110] max-h-48 overflow-y-auto">
                                        {proyekOptions[industri]?.map(opt => (
                                            <div
                                                key={opt}
                                                onClick={() => {
                                                    setProyek(opt);
                                                    setIsProyekOpen(false);
                                                }}
                                                className="px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                                            >
                                                {opt}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mulai */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mulai</label>
                            <div className="relative">
                                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E8532F]" />
                                <input
                                    type="date"
                                    value={mulai}
                                    onChange={(e) => setMulai(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E8532F]/20"
                                />
                            </div>
                        </div>

                        {/* Selesai */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Selesai</label>
                            <div className="relative">
                                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E8532F]" />
                                <input
                                    type="date"
                                    value={selesai}
                                    onChange={(e) => setSelesai(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E8532F]/20"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Rincian Tugas */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Rincian Tugas</label>
                        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-2xl p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {taskOptions.map((task) => (
                                    <div key={task} className="flex items-center gap-3">
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
                                            className="w-4 h-4 rounded border-gray-300 text-[#E8532F] cursor-pointer accent-[#E8532F]"
                                        />
                                        <label htmlFor={task} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                                            {task}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Deskripsi Aktivitas */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Deskripsi Aktivitas</label>
                        <textarea
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            placeholder="Tulis detail aktivitas..."
                            className="w-full min-h-[100px] p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E8532F]/20 resize-none"
                        />
                    </div>

                    {/* Lampiran */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Lampiran</label>
                        <div className="flex flex-wrap gap-3">
                            {files.map((f, i) => (
                                <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700">
                                    <Paperclip size={12} />
                                    <span className="truncate max-w-[150px]">{f.name}</span>
                                    <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="hover:text-red-500">
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-500 hover:border-[#E8532F] hover:text-[#E8532F] transition-all"
                            >
                                <Paperclip size={14} />
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
                <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 text-sm font-bold text-[#4B6584] hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                        BATAL
                    </button>
                    <button
                        disabled={!isFormValid}
                        className={`px-10 py-2.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all ${isFormValid
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
