"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, CheckCircle2, FileText, Calendar, Building2, Briefcase } from "lucide-react";
import { LogEntry } from "./LogBookTable";

interface LogBookDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    entry: LogEntry | null;
}

export default function LogBookDetailModal({ isOpen, onClose, entry }: LogBookDetailModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isOpen || !entry || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 pt-16 md:pt-4">
            <div className="bg-white dark:bg-gray-900 w-full max-w-[640px] rounded-[16px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
                    <div className="flex items-center gap-2">
                        <h2 className="text-[13px] font-black tracking-tight">
                            <span className="text-gray-900 dark:text-white uppercase">DETAIL </span>
                            <span className="text-[#E8532F] uppercase">LOGBOOK</span>
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <X size={13} className="text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 pb-8 overflow-y-auto space-y-5 scrollbar-hide relative min-h-[300px]">
                    {/* Top Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                        <div className="bg-white dark:bg-gray-800 p-2.5 rounded-xl border border-gray-100 dark:border-gray-700">
                            <p className="text-[7.5px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">INDUSTRI</p>
                            <div className="flex items-center gap-2">
                                <Building2 size={13} className="text-orange-500" />
                                <span className="text-[10.5px] font-bold text-gray-700 dark:text-gray-200">{entry.industryName || "Glints"}</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-2.5 rounded-xl border border-gray-100 dark:border-gray-700">
                            <p className="text-[7.5px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">PROYEK</p>
                            <div className="flex items-center gap-2">
                                <Briefcase size={13} className="text-orange-500" />
                                <span className="text-[10.5px] font-bold text-gray-700 dark:text-gray-200">{entry.proyek}</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-2.5 rounded-xl border border-gray-100 dark:border-gray-700">
                            <p className="text-[7.5px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">PERIODE</p>
                            <div className="flex items-center gap-2">
                                <Calendar size={13} className="text-orange-500" />
                                <span className="text-[10.5px] font-bold text-gray-700 dark:text-gray-200">{entry.periode}</span>
                            </div>
                        </div>
                    </div>

                    {/* Verification Status */}
                    <div className="space-y-1.5">
                        <p className="text-[7.5px] font-bold text-gray-400 uppercase tracking-widest">VERIFIKASI</p>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={15} className={entry.industri ? 'text-emerald-500' : 'text-gray-300'} strokeWidth={2.5} />
                                <span className="text-[8.5px] font-bold text-gray-600 dark:text-gray-400 uppercase">INDUSTRI</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={15} className={entry.pendidikan ? 'text-emerald-500' : 'text-gray-300'} strokeWidth={2.5} />
                                <span className="text-[8.5px] font-bold text-gray-600 dark:text-gray-400 uppercase">PENDIDIKAN</span>
                            </div>
                        </div>
                    </div>

                    {/* Rincian Tugas */}
                    <div className="space-y-1.5">
                        <p className="text-[7.5px] font-bold text-gray-400 uppercase tracking-widest">RINCIAN TUGAS</p>
                        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 space-y-2 min-h-[60px]">
                            {(entry.tasks && entry.tasks.length > 0) ? entry.tasks.map((task, i) => (
                                <div key={i} className="flex items-start">
                                    <span className="text-[10.5px] text-gray-600 dark:text-gray-300 leading-relaxed font-semibold">{task}</span>
                                </div>
                            )) : (
                                <span className="text-[10.5px] text-gray-400">Tidak ada rincian tugas.</span>
                            )}
                        </div>
                    </div>

                    {/* Deskripsi Aktivitas */}
                    <div className="space-y-1.5">
                        <p className="text-[7.5px] font-bold text-gray-400 uppercase tracking-widest">DESKRIPSI AKTIVITAS</p>
                        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 min-h-[50px]">
                            <p className="text-[10.5px] text-gray-600 dark:text-gray-300 leading-relaxed font-semibold">
                                {entry.uraian}
                            </p>
                        </div>
                    </div>

                    {/* Lampiran */}
                    <div className="space-y-1.5">
                        <p className="text-[7.5px] font-bold text-gray-400 uppercase tracking-widest">LAMPIRAN</p>
                        <div className="flex flex-wrap gap-2">
                            {entry.attachments && entry.attachments.length > 0 ? entry.attachments.map((file, i) => (
                                <a
                                    key={i}
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-2.5 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                                >
                                    <FileText size={13} className="text-orange-500" />
                                    <span className="text-[9.5px] font-bold text-gray-600 dark:text-gray-400 group-hover:text-orange-600">{file.name}</span>
                                    <div className="text-gray-300">
                                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                    </div>
                                </a>
                            )) : (
                                <div className="text-[10.5px] text-gray-400">Tidak ada lampiran.</div>
                            )}
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="pt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 opacity-80">
                            <div className="w-3 h-3 rounded-full border border-orange-500 flex items-center justify-center text-orange-500">
                                <Calendar size={6} strokeWidth={3} />
                            </div>
                            <span className="text-[7.5px] font-bold text-gray-400 uppercase tracking-widest">TGL LAPOR : {entry.tglLaporan}</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-[10.5px] font-bold text-gray-500 hover:text-gray-900 transition-colors px-3 py-1.5"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
