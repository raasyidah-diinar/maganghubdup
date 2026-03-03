"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, CheckCircle2, FileText, Calendar, Building2, Briefcase, Check } from "lucide-react";
import { LogEntry } from "./LogBookTable";
import { AdminLogEntry } from "./AdminLogBookTable";

interface LogBookDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    entry: (LogEntry & Partial<AdminLogEntry>) | null;
    onVerify?: (id: string) => void;
}

export default function LogBookDetailModal({ isOpen, onClose, entry, onVerify }: LogBookDetailModalProps) {
    const [mounted, setMounted] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleEscape);
        }

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !entry || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 pt-16 md:pt-4">
            <div className="bg-white dark:bg-gray-900 w-full max-w-[640px] rounded-[16px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800 shrink-0">
                    <div className="flex items-center gap-2">
                        <h2 className="text-[14px] font-black tracking-tight">
                            <span className="text-gray-900 dark:text-white uppercase">DETAIL </span>
                            <span className="text-[#E8532F] uppercase">LOGBOOK</span>
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <X size={14} className="text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 pb-8 overflow-y-auto space-y-5 scrollbar-hide relative">
                    {/* Periode */}
                    <div className="space-y-2">
                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">PERIODE</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm">
                            <Calendar size={14} className="text-[#E8532F]" />
                            <span className="text-[11px] font-bold text-gray-700 dark:text-gray-200">{entry.periode}</span>
                        </div>
                    </div>

                    {/* Verification Status */}
                    <div className="space-y-2">
                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">VERIFIKASI</p>
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                {entry.industri || entry.verified ? (
                                    <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                                        <Check size={10} className="text-white" strokeWidth={4} />
                                    </div>
                                ) : (
                                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                        <Check size={10} className="text-gray-300" strokeWidth={4} />
                                    </div>
                                )}
                                <span className="text-[10px] font-black text-gray-700 dark:text-gray-300 uppercase letter tracking-wider">INDUSTRI</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {entry.pendidikan || entry.verified ? (
                                    <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                                        <Check size={10} className="text-white" strokeWidth={4} />
                                    </div>
                                ) : (
                                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                                        <Check size={10} className="text-gray-300" strokeWidth={4} />
                                    </div>
                                )}
                                <span className="text-[10px] font-black text-gray-700 dark:text-gray-300 uppercase letter tracking-wider">PENDIDIKAN</span>
                            </div>
                        </div>
                    </div>

                    {/* Rincian Tugas */}
                    <div className="space-y-2">
                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">RINCIAN TUGAS</p>
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 min-h-[80px]">
                            <div className="space-y-3">
                                {(entry.tasks && entry.tasks.length > 0) ? entry.tasks.map((task, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <span className="text-[12px] text-gray-600 dark:text-gray-300 leading-relaxed font-semibold">- {task}</span>
                                    </div>
                                )) : (
                                    <span className="text-[12px] text-gray-400 italic">Tidak ada rincian tugas.</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Deskripsi Aktivitas */}
                    <div className="space-y-2">
                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">DESKRIPSI AKTIVITAS</p>
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 min-h-[60px]">
                            <p className="text-[12px] text-gray-600 dark:text-gray-300 leading-relaxed font-semibold">
                                {entry.uraian}
                            </p>
                        </div>
                    </div>

                    {/* Lampiran */}
                    <div className="space-y-2">
                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">LAMPIRAN</p>
                        <div className="flex flex-wrap gap-3">
                            {entry.attachments && entry.attachments.length > 0 ? entry.attachments.map((file, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <button
                                        onClick={() => setPreviewUrl(previewUrl === file.url ? null : file.url)}
                                        className={`flex items-center gap-2 px-3 py-2 border rounded-xl transition-all group ${previewUrl === file.url ? 'border-[#E8532F] bg-orange-50 dark:bg-orange-950/20' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                                    >
                                        <FileText size={16} className="text-[#E8532F]" />
                                        <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400 group-hover:text-[#E8532F]">File {i + 1}</span>
                                        <div className="text-gray-400">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                        </div>
                                    </button>

                                    {previewUrl === file.url && createPortal(
                                        <div
                                            className="fixed inset-0 z-[10000] bg-black/90 flex items-center justify-center animate-in fade-in duration-300"
                                            onClick={() => setPreviewUrl(null)}
                                        >
                                            <div className="relative max-w-[90vw] max-h-[90vh]">
                                                <img
                                                    src={file.url}
                                                    alt="Preview"
                                                    className="w-full h-full object-contain animate-in zoom-in-95 duration-300 rounded-lg"
                                                />
                                                <button
                                                    onClick={() => setPreviewUrl(null)}
                                                    className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
                                                >
                                                    <X size={24} />
                                                </button>
                                            </div>
                                        </div>,
                                        document.body
                                    )}
                                </div>
                            )) : (
                                <div className="text-[11px] text-gray-400 italic">Tidak ada lampiran.</div>
                            )}
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Calendar size={12} className="text-[#E8532F]" />
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">TGL LAPOR : {entry.tglLaporan}</span>
                        </div>
                        <div className="flex items-center gap-3 self-end md:self-auto">
                            {!entry.verified && (
                                <button
                                    onClick={() => onVerify?.(entry.id)}
                                    className="px-8 py-2.5 bg-[#E8532F] hover:bg-[#d44a29] text-white rounded-xl text-[12px] font-bold transition-all shadow-sm hover:shadow-md"
                                >
                                    Verifikasi
                                </button>
                            )}
                            <button
                                onClick={onClose}
                                className="px-8 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-xl text-[12px] font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
