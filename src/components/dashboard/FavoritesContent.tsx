"use client";

import React, { useState, useEffect } from "react";
import {
    LayoutGrid,
    Briefcase,
    Building2,
    GraduationCap,
    Users,
    BookMarked,
    Grid2X2,
    List,
    Bookmark,
    Loader2
} from "lucide-react";
import JobCard from "@/components/jobs/JobCard";
import PlaceCard from "@/components/magang/PlaceCard";
import MemberCard from "@/components/members/MemberCard";
import { JOBS_DUMMY } from "@/lib/constants/jobs";

export default function FavoritesContent() {
    const [activeTab, setActiveTab] = useState("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const tabs = [
        { id: "all", label: "Semua", icon: <LayoutGrid size={18} /> },
        { id: "vacancies", label: "Lowongan", icon: <Briefcase size={18} /> },
        { id: "magang", label: "Tempat Magang", icon: <Building2 size={18} /> },
        { id: "pendidikan", label: "Pendidikan", icon: <GraduationCap size={18} /> },
        { id: "members", label: "Anggota", icon: <Users size={18} /> },
        { id: "blog", label: "Blog", icon: <BookMarked size={18} /> },
    ];

    const mockPlaces = [
        {
            id: 1,
            companyName: "Glints",
            companyLogo: "/gambar1.png",
            category: "PERUSAHAAN TEKNOLOGI",
            address: "Menara Standard Chartered, Jl. Pr...",
            city: "Jakarta Selatan",
            subdistrict: "Setiabudi",
            workTypes: ["Hybrid", "Onsite"],
            openPositions: 0,
            activeInterns: 15,
            totalAlumni: 120,
            isVerified: true,
        }
    ];

    const mockMembers = [
        {
            id: 1,
            name: "Raasyidah Diinar Kaamilah",
            avatar: "/hyein.png",
            educationLevel: "MAHASISWA",
            institution: "Universitas Amikom Yogyakarta • Semester 6",
            city: "Sleman",
            subdistrict: "Depok",
            skills: ["Unity 3D/2D", "C# Programming", "Game Physics"],
            interests: ["Game Development"],
            internshipStatus: "Siap Magang",
            currentCompany: null,
            rating: 5.0,
            completedProjects: 5,
            isVerified: true,
            slug: "daffa-aziz-ghiffari",
            role: "Technical Unity Game Developer",
            timePosted: "1 jam lalu",
        }
    ];

    const renderEmptyState = (type: string) => (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-orange-50 dark:bg-orange-900/10 rounded-full flex items-center justify-center mb-6 text-[#E8532F]">
                {type === 'pendidikan' ? <GraduationCap size={40} /> : <BookMarked size={40} />}
            </div>
            <h3 className="text-xl font-bold text-[#1E293B] dark:text-white mb-2">Belum ada yang disimpan</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                Cari dan simpan {type === 'blog' ? 'blogs' : 'pendidikan'} favoritmu sekarang.
            </p>
        </div>
    );

    const renderContent = () => {
        if (activeTab === "pendidikan" || activeTab === "blog") {
            return renderEmptyState(activeTab);
        }

        const items: React.ReactNode[] = [];

        if (activeTab === "all" || activeTab === "vacancies") {
            JOBS_DUMMY.slice(0, 2).forEach(job => items.push(<JobCard key={`job-${job.id}`} {...job} isInDashboard={true} />));
        }

        if (activeTab === "all" || activeTab === "magang") {
            mockPlaces.forEach(place => items.push(<PlaceCard key={`place-${place.id}`} {...place} />));
        }

        if (activeTab === "all" || activeTab === "members") {
            mockMembers.forEach(member => items.push(<MemberCard key={`member-${member.id}`} {...member} />));
        }

        if (items.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <p className="text-gray-500">Belum ada item favorit di kategori ini.</p>
                </div>
            );
        }

        return (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "flex flex-col gap-6"}>
                {items}
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Title Section */}
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-orange-50 dark:bg-orange-950/30 text-[#E8532F] rounded-lg">
                    <Bookmark size={24} fill="currentColor" />
                </div>
                <h1 className="text-3xl font-bold">Favorit</h1>
            </div>

            {/* Controls Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                {/* Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border whitespace-nowrap transition-all text-sm font-semibold shadow-sm ${activeTab === tab.id
                                ? "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-[#1E293B] dark:text-white"
                                : "bg-transparent border-transparent text-gray-500 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                                }`}
                        >
                            <span className={activeTab === tab.id ? "text-[#E8532F]" : "text-gray-400"}>
                                {tab.icon}
                            </span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* View Toggle */}
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-1 rounded-xl self-end">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-lg transition-all ${viewMode === "grid"
                            ? "bg-orange-50 dark:bg-orange-900/20 text-[#E8532F]"
                            : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            }`}
                    >
                        <Grid2X2 size={20} />
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-lg transition-all ${viewMode === "list"
                            ? "bg-orange-50 dark:bg-orange-900/20 text-[#E8532F]"
                            : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            }`}
                    >
                        <List size={20} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[400px]">
                {isLoading ? (
                    <div className="w-full flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 py-12">
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">
                                memuat data...
                            </p>
                        </div>
                    </div>
                ) : (
                    renderContent()
                )}
            </div>
        </div>
    );
}
