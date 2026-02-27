"use client";

import React, { useState, useEffect } from "react";
import {
    ShieldCheck,
    ArrowRight,
    Users,
    GraduationCap,
    Briefcase,
    Building2,
    Calendar,
    Users2,
    Loader2
} from "lucide-react";

export default function OrganizationDashboardPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-[#E8532F] animate-spin mb-4" />
                <p className="text-gray-500 font-medium tracking-wide">Memuat Dashboard...</p>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto px-10 py-5 space-y-10 animate-slide-up">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-[28px] font-black text-[#1e293b] dark:text-white tracking-tight">
                            SMK Telkom 20 Malang
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-[#E8532F] text-[11px] font-black rounded-lg uppercase tracking-wider">
                            Dashboard Utama
                        </span>
                        <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                            ID: 42
                        </span>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-3 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl self-start">
                    <ShieldCheck size={28} className="text-emerald-500 flex-shrink-0" />
                    <div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Status</p>
                        <p className="text-[13px] font-black text-[#1e293b] dark:text-gray-200">Institusi Terverifikasi</p>
                    </div>
                </div>
            </div>

            {/* Orange Banner */}
            <div className="relative w-full h-40 rounded-[32px] overflow-hidden bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500] shadow-xl shadow-orange-200/40 dark:shadow-none">
                {/* Geometric shapes - hollow border only, rotated */}
                <div className="absolute inset-0 overflow-hidden">
                    <div style={{ position: "absolute", right: "-60px", top: "-40px", transform: "rotate(15deg)", display: "flex", gap: "16px", opacity: 0.4 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "30px" }}>
                            <div style={{ width: "110px", height: "110px", border: "20px solid rgba(255,255,255,0.35)", borderRadius: "24px", backgroundColor: "transparent" }}></div>
                            <div style={{ width: "110px", height: "110px", border: "20px solid rgba(255,255,255,0.35)", borderRadius: "24px", backgroundColor: "transparent" }}></div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "-20px" }}>
                            <div style={{ width: "110px", height: "110px", border: "20px solid rgba(255,255,255,0.35)", borderRadius: "24px", backgroundColor: "transparent" }}></div>
                            <div style={{ width: "110px", height: "110px", border: "20px solid rgba(255,255,255,0.35)", borderRadius: "24px", backgroundColor: "transparent" }}></div>
                        </div>
                    </div>
                </div>

                <div className="relative h-full px-10 flex flex-col justify-center text-white">
                    <h2 className="text-[28px] font-black italic uppercase tracking-tight leading-none mb-2">
                        Pusat Kendali SMK Telkom 20 Malang
                    </h2>
                    <p className="text-[13px] font-semibold text-white/80">
                        Manajemen ganda: Industri &amp; Pendidikan.
                    </p>
                </div>
            </div>

            {/* Panels Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Panel Industri */}
                <div className="space-y-4">
                    <h3 className="text-[11px] font-semibold text-[#E8532F] uppercase tracking-[0.2em] px-2">
                        Panel Industri
                    </h3>
                    <div className="bg-white dark:bg-gray-800 rounded-[24px] p-4 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col">
                        <div className="flex-1 flex flex-col justify-center gap-1">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400">Pelamar</p>
                                <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/10 rounded-2xl flex items-center justify-center text-[#E8532F]">
                                    <Users2 size={24} />
                                </div>
                            </div>
                            <p className="text-[28px] font-semibold text-[#1e293b] dark:text-white leading-none">0</p>
                            <p className="text-[12px] font-medium text-gray-400 dark:text-gray-500">Butuh respon</p>
                        </div>

                        <button className="w-full mt-3 py-2.5 bg-gray-50 dark:bg-gray-900/50 hover:bg-orange-50 dark:hover:bg-orange-900/20 text-gray-500 dark:text-gray-400 hover:text-[#E8532F] transition-all rounded-[16px] border border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center gap-2 group">
                            <span className="text-[13px] font-semibold">Manajemen Lowongan</span>
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>

                {/* Panel Akademik */}
                <div className="space-y-4">
                    <h3 className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] px-2">
                        Panel Akademik
                    </h3>
                    <div className="bg-white dark:bg-gray-800 rounded-[24px] p-4 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col">
                        <div className="flex-1 flex flex-col justify-center gap-1">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400">Siswa Magang</p>
                                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/10 rounded-2xl flex items-center justify-center text-blue-600">
                                    <GraduationCap size={24} />
                                </div>
                            </div>
                            <p className="text-[28px] font-semibold text-[#1e293b] dark:text-white leading-none">0</p>
                            <p className="text-[12px] font-medium text-gray-400 dark:text-gray-500">Aktif</p>
                        </div>

                        <button className="w-full mt-3 py-2.5 bg-gray-50 dark:bg-gray-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-all rounded-[16px] border border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center gap-2 group">
                            <span className="text-[13px] font-semibold">Manajemen Pelajar</span>
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
