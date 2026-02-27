"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Loader2,
    Pencil,
    Plus,
    X,
    Briefcase,
    Calendar,
    ChevronDown
} from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function ExperiencePage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddExperienceModal, setShowAddExperienceModal] = useState(false);
    const [editingExperienceIndex, setEditingExperienceIndex] = useState<number | null>(null);

    // Experience form states
    const [expTitle, setExpTitle] = useState("");
    const [expCompany, setExpCompany] = useState("");
    const [expPeriod, setExpPeriod] = useState("");
    const [expLocation, setExpLocation] = useState("");
    const [expDescription, setExpDescription] = useState("");

    const [experienceList, setExperienceList] = useState([
        {
            title: "Unity Game Programmer Intern",
            company: "PT Orbit Nasional Edukasi (Indibiz)",
            period: "Februari 2025 - Juli 2025",
            location: "Jakarta Selatan",
            description: "Membangun fitur-fitur gameplay utama, integrasi API, serta melakukan optimalisasi performa pada sistem Android guna mendukung kelancaran game."
        },
        {
            title: "Technical Game Developer Mentor",
            company: "AMIKOM COMPUTER CLUB",
            period: "Oktober 2024 - Februari 2025",
            location: "Sleman, Yogyakarta",
            description: "Membimbing anggota dalam mempelajari pembuatan game menggunakan Unity, C#, serta pembuatan aset 2D/3D yang digunakan dalam pengembangan game."
        }
    ]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
                        <p className="text-gray-500 font-medium">Memuat data...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <DashboardSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 font-sans">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                                        <Briefcase size={22} className="text-orange-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0F172A] dark:text-white">Experience</h3>
                                </div>
                                <button
                                    onClick={() => {
                                        setExpTitle("");
                                        setExpCompany("");
                                        setExpPeriod("");
                                        setExpLocation("");
                                        setExpDescription("");
                                        setShowAddExperienceModal(true);
                                    }}
                                    className="w-10 h-10 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors shadow-sm"
                                >
                                    <Plus size={22} />
                                </button>
                            </div>

                            <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
                                {experienceList.map((exp, idx) => (
                                    <div key={idx} className="flex gap-6 px-8 py-10 group hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors relative">
                                        <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:border-orange-200 transition-colors">
                                            <Briefcase size={26} className="text-orange-500" />
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <h4 className="text-[18px] font-bold text-[#0F172A] dark:text-white group-hover:text-orange-600 transition-colors">{exp.title}</h4>
                                                <div className="flex items-center gap-2 mt-1.5">
                                                    <span className="text-gray-400 dark:text-gray-500"><Briefcase size={14} /></span>
                                                    <p className="text-orange-600 dark:text-orange-400 font-bold text-[15px]">
                                                        {exp.company} <span className="text-gray-400 font-medium ml-1">• {exp.location}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700/50 rounded-xl text-gray-500 dark:text-gray-400">
                                                <Calendar size={14} />
                                                <span className="text-[12px] font-bold tracking-tight">{exp.period}</span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 text-[14px] leading-relaxed max-w-2xl">
                                                {exp.description}
                                            </p>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-8 right-8">
                                            <button
                                                onClick={() => {
                                                    setEditingExperienceIndex(idx);
                                                    setExpTitle(exp.title);
                                                    setExpCompany(exp.company);
                                                    setExpPeriod(exp.period);
                                                    setExpLocation(exp.location);
                                                    setExpDescription(exp.description);
                                                }}
                                                className="p-2.5 bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 rounded-xl transition-all"
                                            >
                                                <Pencil size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="px-8 py-6 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700">
                                <Link
                                    href="/id/dashboard/profile"
                                    className="text-[14px] font-bold text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-2"
                                >
                                    ← Kembali ke Profil
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Tambah Pengalaman Kerja Modal */}
            {showAddExperienceModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setShowAddExperienceModal(false)} />
                    <div className="relative bg-white dark:bg-gray-800 rounded-[32px] shadow-2xl w-full max-w-md mx-4 p-8 overflow-hidden">
                        <button
                            onClick={() => setShowAddExperienceModal(false)}
                            className="absolute top-6 right-6 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-8">Tambah Pengalaman Kerja</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Posisi / Jabatan</label>
                                <input
                                    type="text"
                                    value={expTitle}
                                    onChange={(e) => setExpTitle(e.target.value)}
                                    placeholder="Contoh: Senior Web Developer"
                                    className="w-full px-5 py-4 border-2 border-gray-100 dark:border-gray-700 rounded-2xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-300 focus:border-orange-500 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Nama Perusahaan</label>
                                <input
                                    type="text"
                                    value={expCompany}
                                    onChange={(e) => setExpCompany(e.target.value)}
                                    placeholder="Contoh: PT. Teknologi Maju"
                                    className="w-full px-5 py-4 border-2 border-gray-100 dark:border-gray-700 rounded-2xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-300 focus:border-orange-500 outline-none transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Periode</label>
                                    <input
                                        type="text"
                                        value={expPeriod}
                                        onChange={(e) => setExpPeriod(e.target.value)}
                                        placeholder="2020 - 2023"
                                        className="w-full px-5 py-4 border-2 border-gray-100 dark:border-gray-700 rounded-2xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-300 focus:border-orange-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Lokasi</label>
                                    <input
                                        type="text"
                                        value={expLocation}
                                        onChange={(e) => setExpLocation(e.target.value)}
                                        placeholder="Jakarta (Opsional)"
                                        className="w-full px-5 py-4 border-2 border-gray-100 dark:border-gray-700 rounded-2xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-300 focus:border-orange-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Deskripsi Pekerjaan</label>
                                <textarea
                                    value={expDescription}
                                    onChange={(e) => setExpDescription(e.target.value)}
                                    placeholder="Jelaskan tugas dan pencapaian Anda..."
                                    rows={4}
                                    className="w-full px-5 py-4 border-2 border-gray-100 dark:border-gray-700 rounded-2xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-300 focus:border-orange-500 outline-none transition-all resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-10">
                            <button
                                onClick={() => setShowAddExperienceModal(false)}
                                className="px-10 py-3.5 text-sm font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-2xl transition-all border-2 border-gray-100 dark:border-gray-700"
                            >
                                Hapus
                            </button>
                            <button
                                onClick={() => {
                                    if (expTitle && expCompany && expPeriod) {
                                        setExperienceList(prev => [{
                                            title: expTitle,
                                            company: expCompany,
                                            period: expPeriod,
                                            location: expLocation,
                                            description: expDescription
                                        }, ...prev]);
                                        setShowAddExperienceModal(false);
                                    }
                                }}
                                disabled={!expTitle || !expCompany || !expPeriod}
                                className="px-12 py-3.5 text-sm font-bold text-white bg-orange-400 hover:bg-orange-500 rounded-2xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Pengalaman Kerja Modal */}
            {editingExperienceIndex !== null && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setEditingExperienceIndex(null)} />
                    <div className="relative bg-white dark:bg-gray-800 rounded-[32px] shadow-2xl w-full max-w-md mx-4 p-8 overflow-hidden">
                        <button
                            onClick={() => setEditingExperienceIndex(null)}
                            className="absolute top-6 right-6 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-8">Edit Pengalaman Kerja</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Posisi / Jabatan</label>
                                <input
                                    type="text"
                                    value={expTitle}
                                    onChange={(e) => setExpTitle(e.target.value)}
                                    placeholder="Contoh: Senior Web Developer"
                                    className="w-full px-5 py-4 border-2 border-gray-100 dark:border-gray-700 rounded-2xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-300 focus:border-orange-500 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Nama Perusahaan</label>
                                <input
                                    type="text"
                                    value={expCompany}
                                    onChange={(e) => setExpCompany(e.target.value)}
                                    placeholder="Contoh: PT. Teknologi Maju"
                                    className="w-full px-5 py-4 border-2 border-gray-100 dark:border-gray-700 rounded-2xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-300 focus:border-orange-500 outline-none transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Periode</label>
                                    <input
                                        type="text"
                                        value={expPeriod}
                                        onChange={(e) => setExpPeriod(e.target.value)}
                                        placeholder="2020 - 2023"
                                        className="w-full px-5 py-4 border-2 border-gray-100 dark:border-gray-700 rounded-2xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-300 focus:border-orange-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Lokasi</label>
                                    <input
                                        type="text"
                                        value={expLocation}
                                        onChange={(e) => setExpLocation(e.target.value)}
                                        placeholder="Jakarta (Opsional)"
                                        className="w-full px-5 py-4 border-2 border-gray-100 dark:border-gray-700 rounded-2xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-300 focus:border-orange-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Deskripsi Pekerjaan</label>
                                <textarea
                                    value={expDescription}
                                    onChange={(e) => setExpDescription(e.target.value)}
                                    placeholder="Jelaskan tugas dan pencapaian Anda..."
                                    rows={4}
                                    className="w-full px-5 py-4 border-2 border-gray-100 dark:border-gray-700 rounded-2xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-300 focus:border-orange-500 outline-none transition-all resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-10">
                            <button
                                onClick={() => {
                                    setExperienceList(prev => prev.filter((_, i) => i !== editingExperienceIndex));
                                    setEditingExperienceIndex(null);
                                }}
                                className="px-10 py-3.5 text-sm font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-2xl transition-all border-2 border-gray-100 dark:border-gray-700"
                            >
                                Hapus
                            </button>
                            <button
                                onClick={() => {
                                    if (expTitle && expCompany && expPeriod) {
                                        setExperienceList(prev => prev.map((item, i) =>
                                            i === editingExperienceIndex
                                                ? { title: expTitle, company: expCompany, period: expPeriod, location: expLocation, description: expDescription }
                                                : item
                                        ));
                                        setEditingExperienceIndex(null);
                                    }
                                }}
                                disabled={!expTitle || !expCompany || !expPeriod}
                                className="px-12 py-3.5 text-sm font-bold text-white bg-orange-600 rounded-2xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
