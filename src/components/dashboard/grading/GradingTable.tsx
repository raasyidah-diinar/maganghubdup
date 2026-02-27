"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { Loader2, Plus, X, ChevronDown } from "lucide-react";

export interface GradingEntry {
    id: string;
    tglPenilaian: string;
    memberName: string;
    memberAvatar: string;
    kategori: string;
    penilai: string;
    deskripsi: string;
    nilai: number;
    rekomendasi?: string;
}

interface GradingTableProps {
    data: GradingEntry[];
    isLoading: boolean;
}

function getGrade(score: number): string {
    if (score >= 85) return "A";
    if (score >= 75) return "B";
    if (score >= 65) return "C";
    if (score >= 50) return "D";
    return "E";
}

function KategoriBadge({ kategori }: { kategori: string }) {
    const map: Record<string, string> = {
        "Kinerja": "bg-orange-50 text-orange-500 dark:bg-orange-900/20 dark:text-orange-400",
        "Kedisiplinan": "bg-sky-50 text-sky-600 dark:bg-sky-900/20 dark:text-sky-400",
        "Sikap": "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
    };
    const cls = map[kategori] ?? "bg-gray-50 text-gray-500";
    return (
        <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-md ${cls}`}>
            {kategori}
        </span>
    );
}

function DetailModal({ entry, onClose }: { entry: GradingEntry; onClose: () => void }) {
    const grade = getGrade(entry.nilai);
    return createPortal(
        <div className="fixed inset-0 z-[9999] flex justify-center items-start overflow-y-auto py-10 px-4">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            {/* Modal Card */}
            <div className="relative bg-white dark:bg-gray-900 w-full max-w-[600px] rounded-2xl shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="px-7 pt-5 pb-5 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                            <Plus className="text-[#FF7A00]" size={15} strokeWidth={3} />
                        </div>
                        <h2 className="text-[16px] font-black text-gray-900 dark:text-white tracking-tight uppercase">
                            DETAIL <span className="text-[#FF7A00]">PENILAIAN</span>
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-400">
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="px-7 py-6 space-y-5">
                    {/* Row 1: Anggota + Kategori */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                <Plus size={10} className="text-[#FF7A00]" /> ANGGOTA
                            </label>
                            <div className="flex items-center justify-between px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl text-[13px] font-medium text-gray-700 dark:text-gray-200">
                                <span>{entry.memberName}</span>
                                <ChevronDown size={13} className="text-gray-400" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                <Plus size={10} className="text-[#FF7A00]" /> KATEGORI
                            </label>
                            <div className="flex items-center justify-between px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl text-[13px] font-medium text-gray-700 dark:text-gray-200">
                                <span>{entry.kategori}</span>
                                <ChevronDown size={13} className="text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Nilai + Grade */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                <Plus size={10} className="text-[#FF7A00]" /> NILAI ANGKA (0-100)
                            </label>
                            <div className="px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl text-[13px] font-bold text-gray-900 dark:text-white">
                                {entry.nilai}
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                                GRADE
                            </label>
                            <div className="px-3.5 py-2.5 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/40 rounded-xl text-[22px] font-black text-[#FF7A00] flex items-center justify-center">
                                {grade}
                            </div>
                        </div>
                    </div>

                    {/* Deskripsi */}
                    <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            <Plus size={10} className="text-[#FF7A00]" /> DESKRIPSI EVALUASI
                        </label>
                        <div className="px-3.5 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl text-[13px] text-gray-700 dark:text-gray-300 min-h-[90px]">
                            {entry.deskripsi}
                        </div>
                    </div>

                    {/* Rekomendasi */}
                    <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            <Plus size={10} className="text-[#FF7A00]" /> CATATAN REKOMENDASI
                        </label>
                        <div className="px-3.5 py-2.5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-xl text-[13px] text-gray-700 dark:text-gray-300 min-h-[44px]">
                            {entry.rekomendasi || <span className="text-gray-400 italic">Tidak ada catatan</span>}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-7 py-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
                    <p className="text-[11px] text-gray-400">
                        PENILAI <span className="font-black text-gray-700 dark:text-gray-200">{entry.penilai.toUpperCase()}</span>
                    </p>
                    <button onClick={onClose} className="px-5 py-2 text-[11px] font-black text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors uppercase tracking-widest">
                        TUTUP
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default function GradingTable({ data, isLoading }: GradingTableProps) {
    const [selectedEntry, setSelectedEntry] = useState<GradingEntry | null>(null);

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-20 flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-10 h-10 text-[#E8532F] animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Memuat data penilaian...</p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Tgl Penilaian</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Anggota</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Kategori</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Penilai</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Deskripsi</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right whitespace-nowrap">Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-32 text-center text-gray-400">
                                        <p className="text-sm font-medium">Belum ada data penilaian.</p>
                                    </td>
                                </tr>
                            ) : (
                                data.map((item) => {
                                    const grade = getGrade(item.nilai);
                                    return (
                                        <tr
                                            key={item.id}
                                            onClick={() => setSelectedEntry(item)}
                                            className="border-b border-gray-50 dark:border-gray-800/60 hover:bg-orange-50/30 dark:hover:bg-orange-900/5 transition-colors cursor-pointer group"
                                        >
                                            {/* Tgl */}
                                            <td className="px-6 py-4 text-[13px] font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                {item.tglPenilaian}
                                            </td>

                                            {/* Anggota */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-[13px] font-bold text-gray-900 dark:text-white">
                                                    {item.memberName}
                                                </span>
                                            </td>

                                            {/* Kategori */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <KategoriBadge kategori={item.kategori} />
                                            </td>

                                            {/* Penilai */}
                                            <td className="px-6 py-4 text-[13px] text-gray-600 dark:text-gray-300 whitespace-nowrap">
                                                {item.penilai}
                                            </td>

                                            {/* Deskripsi */}
                                            <td className="px-6 py-4 max-w-[260px]">
                                                <p className="text-[13px] text-gray-500 dark:text-gray-400 truncate">
                                                    {item.deskripsi}
                                                </p>
                                            </td>

                                            {/* Nilai + Grade */}
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-[16px] font-black text-[#FF7A00] leading-tight">{item.nilai}</span>
                                                    <span className="text-[11px] font-black text-[#FF7A00]/70">{grade}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedEntry && (
                <DetailModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
            )}
        </>
    );
}
