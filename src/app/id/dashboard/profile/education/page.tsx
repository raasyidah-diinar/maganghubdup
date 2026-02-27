"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Loader2,
    Pencil,
    Plus,
    X,
    GraduationCap,
    Calendar,
    ChevronDown
} from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function EducationPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddEducationModal, setShowAddEducationModal] = useState(false);
    const [editingEducationIndex, setEditingEducationIndex] = useState<number | null>(null);

    // Education form states
    const [eduSchool, setEduSchool] = useState("");
    const [eduDegree, setEduDegree] = useState("");
    const [eduPeriod, setEduPeriod] = useState("");
    const [eduDescription, setEduDescription] = useState("");

    const [educationList, setEducationList] = useState([
        {
            school: "Institut Teknologi Bandung",
            degree: "S1 Sekolah Teknik Elektro dan Informatika (STEI)",
            period: "2027 - 2030 (Expected)",
            description: "Focusing on Advanced Computer Science and Systems Architecture."
        },
        {
            school: "Digital Academy by GoTo, Gojek, Traveloka",
            degree: "Mobile Development Path",
            period: "2023 - 2024",
            description: "Intensive training in modern mobile app architecture and ecosystem."
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
                                        <GraduationCap size={22} className="text-orange-500" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0F172A] dark:text-white">Education</h3>
                                </div>
                                <button
                                    onClick={() => {
                                        setEduSchool("");
                                        setEduDegree("");
                                        setEduPeriod("");
                                        setEduDescription("");
                                        setShowAddEducationModal(true);
                                    }}
                                    className="w-10 h-10 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors shadow-sm"
                                >
                                    <Plus size={22} />
                                </button>
                            </div>

                            <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
                                {educationList.map((edu, idx) => (
                                    <div key={idx} className="flex gap-6 px-8 py-10 group hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors relative">
                                        <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:border-orange-200 transition-colors">
                                            <GraduationCap size={26} className="text-orange-500" />
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <h4 className="text-[18px] font-bold text-[#0F172A] dark:text-white group-hover:text-orange-600 transition-colors">{edu.school}</h4>
                                                <p className="text-orange-600 dark:text-orange-400 font-bold text-[15px] mt-1.5">
                                                    {edu.degree}
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700/50 rounded-xl text-gray-500 dark:text-gray-400">
                                                <Calendar size={14} />
                                                <span className="text-[12px] font-bold tracking-tight">{edu.period}</span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 text-[14px] leading-relaxed max-w-2xl">
                                                {edu.description}
                                            </p>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-8 right-8">
                                            <button
                                                onClick={() => {
                                                    setEditingEducationIndex(idx);
                                                    setEduSchool(edu.school);
                                                    setEduDegree(edu.degree);
                                                    setEduPeriod(edu.period);
                                                    setEduDescription(edu.description);
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

            {/* Tambah Education Modal */}
            {showAddEducationModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setShowAddEducationModal(false)} />
                    <div className="relative bg-white dark:bg-gray-800 rounded-[24px] shadow-2xl w-full max-w-md mx-4 p-8 overflow-hidden">
                        <button
                            onClick={() => setShowAddEducationModal(false)}
                            className="absolute top-6 right-6 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-1 h-6 bg-orange-600 rounded-full" />
                            <h2 className="text-xl font-bold text-[#0F172A] dark:text-white">Tambah Education</h2>
                        </div>

                        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Nama Institusi / Sekolah</label>
                                <input
                                    type="text"
                                    value={eduSchool}
                                    onChange={(e) => setEduSchool(e.target.value)}
                                    placeholder="Contoh: Universitas Amikom Yogyakarta"
                                    className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:border-orange-500 outline-none transition-all shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Gelar / Bidang Studi</label>
                                <input
                                    type="text"
                                    value={eduDegree}
                                    onChange={(e) => setEduDegree(e.target.value)}
                                    placeholder="Contoh: S1 Teknik Informatika"
                                    className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:border-orange-500 outline-none transition-all shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Periode</label>
                                <input
                                    type="text"
                                    value={eduPeriod}
                                    onChange={(e) => setEduPeriod(e.target.value)}
                                    placeholder="Contoh: 2022 - 2026 (Expected)"
                                    className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:border-orange-500 outline-none transition-all shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Deskripsi / Pencapaian (Opsional)</label>
                                <textarea
                                    value={eduDescription}
                                    onChange={(e) => setEduDescription(e.target.value)}
                                    placeholder="Jelaskan fokus studi atau pencapaian Anda..."
                                    rows={4}
                                    className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:border-orange-500 outline-none transition-all shadow-sm resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end mt-8">
                            <button
                                onClick={() => {
                                    if (eduSchool && eduDegree && eduPeriod) {
                                        setEducationList(prev => [{
                                            school: eduSchool,
                                            degree: eduDegree,
                                            period: eduPeriod,
                                            description: eduDescription
                                        }, ...prev]);
                                        setShowAddEducationModal(false);
                                    }
                                }}
                                disabled={!eduSchool || !eduDegree || !eduPeriod}
                                className="w-full py-3.5 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Simpan Data
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Education Modal */}
            {editingEducationIndex !== null && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setEditingEducationIndex(null)} />
                    <div className="relative bg-white dark:bg-gray-800 rounded-[24px] shadow-2xl w-full max-w-md mx-4 p-8 overflow-hidden">
                        <button
                            onClick={() => setEditingEducationIndex(null)}
                            className="absolute top-6 right-6 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-1 h-6 bg-orange-600 rounded-full" />
                            <h2 className="text-xl font-bold text-[#0F172A] dark:text-white">Edit Education</h2>
                        </div>

                        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Nama Institusi / Sekolah</label>
                                <input
                                    type="text"
                                    value={eduSchool}
                                    onChange={(e) => setEduSchool(e.target.value)}
                                    placeholder="Contoh: Universitas Amikom Yogyakarta"
                                    className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:border-orange-500 outline-none transition-all shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Gelar / Bidang Studi</label>
                                <input
                                    type="text"
                                    value={eduDegree}
                                    onChange={(e) => setEduDegree(e.target.value)}
                                    placeholder="Contoh: S1 Teknik Informatika"
                                    className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:border-orange-500 outline-none transition-all shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Periode</label>
                                <input
                                    type="text"
                                    value={eduPeriod}
                                    onChange={(e) => setEduPeriod(e.target.value)}
                                    placeholder="Contoh: 2022 - 2026 (Expected)"
                                    className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:border-orange-500 outline-none transition-all shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#0F172A] dark:text-white mb-2.5">Deskripsi / Pencapaian (Opsional)</label>
                                <textarea
                                    value={eduDescription}
                                    onChange={(e) => setEduDescription(e.target.value)}
                                    placeholder="Jelaskan fokus studi atau pencapaian Anda..."
                                    rows={4}
                                    className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-[14px] text-[#0F172A] dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:border-orange-500 outline-none transition-all shadow-sm resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-8">
                            <button
                                onClick={() => {
                                    setEducationList(prev => prev.filter((_, i) => i !== editingEducationIndex));
                                    setEditingEducationIndex(null);
                                }}
                                className="px-8 py-3 text-sm font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-all border border-gray-200 dark:border-gray-700"
                            >
                                Hapus
                            </button>
                            <button
                                onClick={() => {
                                    if (eduSchool && eduDegree && eduPeriod) {
                                        setEducationList(prev => prev.map((item, i) =>
                                            i === editingEducationIndex
                                                ? { school: eduSchool, degree: eduDegree, period: eduPeriod, description: eduDescription }
                                                : item
                                        ));
                                        setEditingEducationIndex(null);
                                    }
                                }}
                                disabled={!eduSchool || !eduDegree || !eduPeriod}
                                className="px-10 py-3.5 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Simpan Data
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
