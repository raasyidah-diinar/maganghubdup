"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Search, MapPin, Calendar, Building2, ChevronRight, Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data based on user request
const internships = [
    {
        id: "1",
        role: "Frontend Developer Intern",
        company: "Tokopedia",
        location: "Jakarta Selatan, DKI Jakarta",
        date: "5 Mar 2025",
        status: "SELESAI",
        logo: "/gambar2.png", // Assuming gambar1 is Tokopedia based on common usage or placeholder
        color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
    },
    {
        id: "2",
        role: "Backend Developer Intern (Microservices)",
        company: "Gojek",
        location: "Jakarta Selatan, DKI Jakarta",
        date: "15 Feb 2025",
        status: "SELESAI",
        logo: "/gambar3.png", // Assuming gambar2 is Gojek
        color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
    },
    // SMK Raden Umar 30 appears in Direview, Seleksi, and Aktif
    {
        id: "3-review",
        role: "IT Support Intern",
        company: "SMK Raden Umar 30",
        location: "Jakarta Timur",
        date: "5 Sep 2025",
        status: "DIREVIEW",
        logo: "/smktelkom.png", // Using a school-like logo or placeholder
        color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
    },
];

const tabs = [
    "Semua",
    "Pengajuan",
    "Direview",
    "Seleksi",
    "Aktif",
    "Ditolak",
    "Selesai"
];

const InternshipSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gray-100 dark:bg-gray-700 rounded-l-xl" />
        <div className="flex items-start gap-4">
            <div className="ml-2 w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                    </div>
                    <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <div className="flex gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                </div>
            </div>
        </div>
    </div>
);

export default function InternshipPage() {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Semua"); // Default to Semua
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Close sidebar on mobile by default
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case "SELESAI":
                return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
            case "AKTIF":
                return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400";
            case "DIREVIEW":
                return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
            case "SELEKSI":
                return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
            case "DITOLAK":
                return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
            default:
                return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400";
        }
    };

    const filteredInternships = internships.filter(internship => {
        const matchesTab = activeTab === "Semua" || internship.status.toUpperCase() === activeTab.toUpperCase();
        const matchesSearch = internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            internship.role.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <DashboardSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        {/* Page Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Lamaran Saya
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Daftar peran dan progres magang Anda.
                                </p>
                            </div>

                            {/* Search Bar */}
                            <div className="relative w-full md:w-96">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari berdasarkan Perusahaan atau Posisi..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
                            <div className="flex space-x-6 min-w-max px-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === tab
                                            ? "text-[#E8532F] dark:text-orange-400"
                                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                            }`}
                                    >
                                        {tab}
                                        {activeTab === tab && (
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E8532F] dark:bg-orange-400 rounded-t-full" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        {isLoading ? (
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <InternshipSkeleton key={i} />
                                ))}
                            </div>
                        ) : filteredInternships.length > 0 ? (
                            <div className="space-y-4">
                                {filteredInternships.map((internship, index) => (
                                    <div
                                        key={internship.id}
                                        onClick={() => router.push(`/id/dashboard/internship/${internship.id}`)}
                                        className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-900/50 transition-all group shadow-sm hover:shadow-md cursor-pointer relative overflow-hidden animate-slide-up opacity-0"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Left Accent Border */}
                                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${internship.status === "SELESAI" || internship.status === "AKTIF"
                                                ? "bg-orange-500"
                                                : "bg-orange-400"
                                                } rounded-l-xl`} />

                                            {/* Company Logo/Icon */}
                                            <div className="ml-2 w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 border border-gray-100 dark:border-gray-600 overflow-hidden relative">
                                                {internship.logo ? (
                                                    <Image
                                                        src={internship.logo}
                                                        alt={internship.company}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <Building2 className="text-gray-400 dark:text-gray-500" size={24} />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#E8532F] transition-colors leading-tight mb-1">
                                                            {internship.role}
                                                        </h3>
                                                        <p className="text-sm font-medium text-[#E8532F] dark:text-orange-400 mb-3">
                                                            {internship.company}
                                                        </p>

                                                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                                            <div className="flex items-center gap-1.5">
                                                                <MapPin size={14} className="text-gray-400" />
                                                                {internship.location}
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <Calendar size={14} className="text-gray-400" />
                                                                {internship.date}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col items-end gap-8">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusBadgeColor(internship.status)}`}>
                                                            {internship.status}
                                                        </span>
                                                        <ChevronRight className="text-gray-300 group-hover:text-[#E8532F] transition-colors" size={20} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Empty State
                            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 border-dashed">
                                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                    <Filter className="text-gray-400 dark:text-gray-500" size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                    Tidak ada data ditemukan
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
                                    Coba ganti filter atau kata kunci pencarian Anda.
                                </p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
