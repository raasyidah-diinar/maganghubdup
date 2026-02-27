"use client";

import { Check, ClipboardList, Loader2, Building2 } from "lucide-react";
import Image from "next/image";
import { LogEntry } from "./LogBookTable";

export interface AdminLogEntry extends LogEntry {
    memberName: string;
    memberAvatar?: string;
    group: string;
}

interface AdminLogBookTableProps {
    data: AdminLogEntry[];
    isLoading?: boolean;
    onShowDetail?: (entry: AdminLogEntry) => void;
    selectedIds: string[];
    onToggleSelect: (id: string) => void;
    onToggleSelectAll: () => void;
}

export default function AdminLogBookTable({
    data,
    isLoading,
    onShowDetail,
    selectedIds,
    onToggleSelect,
    onToggleSelectAll
}: AdminLogBookTableProps) {
    const isAllSelected = data.length > 0 && selectedIds.length === data.length;

    return (
        <div className="relative group min-h-[400px]">
            {isLoading && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-[1px] rounded-xl">
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-8 h-8 text-[#E8532F] animate-spin" />
                        <span className="text-xs font-bold text-gray-500">Memuat Data...</span>
                    </div>
                </div>
            )}

            {data.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 py-24 px-4 shadow-sm h-full flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-3 text-center">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-300 dark:text-gray-500">
                            <ClipboardList size={32} />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium text-[13px]">
                            Tidak ada laporan ditemukan dalam rentang ini.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1200px]">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
                                <th className="px-4 py-3.5 w-10">
                                    <div
                                        onClick={(e) => { e.stopPropagation(); onToggleSelectAll(); }}
                                        className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${isAllSelected ? 'bg-[#E8532F] border-[#E8532F]' : 'bg-white border-gray-300 hover:border-orange-500'}`}
                                    >
                                        {isAllSelected && <Check size={10} className="text-white" strokeWidth={4} />}
                                    </div>
                                </th>
                                <th className="px-4 py-3.5 text-[11px] font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight">Tgl Lapor</th>
                                <th className="px-4 py-3.5 text-[11px] font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight">Anggota</th>
                                <th className="px-4 py-3.5 text-[11px] font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight">Periode</th>
                                <th className="px-4 py-3.5 text-[11px] font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight">Industri</th>
                                <th className="px-4 py-3.5 text-[11px] font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight text-center">Grup</th>
                                <th className="px-4 py-3.5 text-[11px] font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight w-[30%]">Uraian</th>
                                <th className="px-4 py-3.5 text-[11px] font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight text-center">Industri</th>
                                <th className="px-4 py-3.5 text-[11px] font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight text-center">Pendidikan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {data.map((row) => (
                                <tr
                                    key={row.id}
                                    onClick={() => onShowDetail?.(row)}
                                    className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors cursor-pointer group"
                                >
                                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                                        <div
                                            onClick={() => onToggleSelect(row.id)}
                                            className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${selectedIds.includes(row.id) ? 'bg-[#E8532F] border-[#E8532F]' : 'bg-white border-gray-300 group-hover:border-orange-500'}`}
                                        >
                                            {selectedIds.includes(row.id) && <Check size={10} className="text-white" strokeWidth={4} />}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-[11.5px] text-gray-600 dark:text-gray-400 font-medium">{row.tglLaporan}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gray-100">
                                                <Image
                                                    src={row.memberAvatar || "/hyein.png"}
                                                    alt={row.memberName}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <span className="text-[11.5px] font-bold text-gray-900 dark:text-white truncate max-w-[120px]">
                                                {row.memberName}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-[11.5px] text-gray-600 dark:text-gray-400 font-medium">{row.periode}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100">
                                            <Building2 size={13} className="text-orange-500" />
                                            <span className="text-[11.5px] font-bold text-gray-600 dark:text-gray-400">
                                                {row.industryName || "Glints"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="text-[11px] font-bold text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-2 py-0.5 rounded-md">
                                            {row.group}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-[11.5px] text-gray-500 dark:text-gray-400 truncate max-w-[280px]" title={row.uraian}>
                                        {row.uraian}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center mx-auto border ${row.industri
                                            ? "bg-white border-emerald-500 text-emerald-500"
                                            : "bg-white border-gray-100 text-gray-100"
                                            }`}>
                                            <Check size={11} strokeWidth={3} />
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center mx-auto border ${row.pendidikan
                                            ? "bg-white border-emerald-500 text-emerald-500"
                                            : "bg-white border-gray-100 text-gray-100"
                                            }`}>
                                            <Check size={11} strokeWidth={3} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
