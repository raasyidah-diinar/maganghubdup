"use client";

import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BlogFilters from "@/components/dashboard/blog/BlogFilters";
import BlogCard from "@/components/dashboard/blog/BlogCard";
import { FileX, Loader2 } from "lucide-react";

export default function BlogPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Semua");

    // Filter State
    const [search, setSearch] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<string>("Semua Bulan");
    const [selectedYear, setSelectedYear] = useState<string>("Semua Tahun");
    const [selectedSort, setSelectedSort] = useState<string>("Terbaru");

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

    // Simulated loading delay
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Mock Article Data
    const mockArticles = [
        {
            id: 1,
            image: "/arsitektur.png",
            date: "24 Des 2025",
            title: "Membangun Game VR Pertama Anda di Unity",
            description: "Langkah awal memahami environment 3D dan interaksi Virtual Reality.",
            tags: ["#GAME DEV", "Engineering"],
            views: 120,
            status: "AKTIF" as const
        },
        {
            id: 2,
            image: "/teknologi.png", // Using existing image as placeholder
            date: "10 Jan 2025",
            title: "Tips Karir: Menjadi Web Developer Handal",
            description: "Panduan lengkap untuk memulai karir di bidang web development.",
            tags: ["#CAREER"],
            views: 85,
            status: "AKTIF" as const
        },
        {
            id: 3,
            image: "/uiux.png", // Using existing image as placeholder
            date: "05 Feb 2024",
            title: "Analisis Data dengan Python untuk Pemula",
            description: "Belajar dasar-dasar data science menggunakan library Python populer.",
            tags: ["#DATA"],
            views: 200,
            status: "AKTIF" as const
        }
    ];

    const tabs = ["Semua", "Aktif", "Nonaktif", "Dalam Review", "Draft"];

    // Filter Logic
    const filteredArticles = mockArticles.filter(article => {
        // Tab Filter
        if (activeTab !== "Semua" && activeTab.toUpperCase() !== article.status) return false;

        // Search Filter
        if (search && !article.title.toLowerCase().includes(search.toLowerCase())) return false;

        // Category Filter
        if (selectedCategories.length > 0) {
            const hasCategory = selectedCategories.some(cat =>
                article.tags.some(tag => tag.toUpperCase().includes(cat.toUpperCase()))
            );
            if (!hasCategory) return false;
        }

        // Parse Date: "24 Des 2025" -> Month/Year check
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const [day, monthStr, year] = article.date.split(" ");
        const monthIndex = months.findIndex(m => m.toLowerCase().startsWith(monthStr.toLowerCase().slice(0, 3))); // Approximate match "Des" -> "Desember"
        const fullMonthName = months[monthIndex]; // This might be loose, but works for "Des" -> can match "Desember" if logic is right.

        // Month Filter
        // Actual data is "Des", "Jan", "Feb". Dropdowns are full names.
        // Let's make a map or just check includes
        if (selectedMonth !== "Semua Bulan") {
            if (!selectedMonth.startsWith(monthStr)) return false; // "Desember".startsWith("Des") is true
        }

        // Year Filter
        if (selectedYear !== "Semua Tahun" && year !== selectedYear) return false;

        return true;
    }).sort((a, b) => {
        // Sort Logic
        const dateA = new Date(a.date).getTime(); // JS handles "24 Dec 2025" logic well often, but "Des" might fail in English env.
        // Better manual parse for ID locale if needed, but for now assuming simple string sort or robust date lib (not installed).
        // Let's do simple ID map replacement for standard Date parsing
        const parseDate = (dateStr: string) => {
            const map: { [key: string]: string } = { "Des": "Dec", "Mei": "May", "Agu": "Aug", "Okt": "Oct" };
            let enDate = dateStr;
            Object.keys(map).forEach(k => {
                enDate = enDate.replace(k, map[k]);
            });
            return new Date(enDate).getTime();
        };

        const timeA = parseDate(a.date);
        const timeB = parseDate(b.date);

        return selectedSort === "Terbaru" ? timeB - timeA : timeA - timeB;
    });

    const showContent = filteredArticles.length > 0;

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <DashboardSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="max-w-7xl mx-auto">

                        {/* Filters */}
                        <BlogFilters
                            search={search}
                            onSearchChange={setSearch}
                            selectedCategories={selectedCategories}
                            onCategoryChange={(cat) => setSelectedCategories(prev =>
                                prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                            )}
                            selectedMonth={selectedMonth}
                            onMonthChange={setSelectedMonth}
                            selectedYear={selectedYear}
                            onYearChange={setSelectedYear}
                            selectedSort={selectedSort}
                            onSortChange={setSelectedSort}
                        />

                        {/* Tabs */}
                        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                            <div className="flex gap-6 overflow-x-auto">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab
                                            ? "border-[#E8532F] text-[#E8532F]"
                                            : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                            {isLoading ? (
                                <div className="w-full flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 py-20">
                                    <div className="flex flex-col items-center gap-3">
                                        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">
                                            memuat blog anda...
                                        </p>
                                    </div>
                                </div>
                            ) : showContent ? (
                                filteredArticles.map(article => (
                                    <BlogCard key={article.id} {...article} />
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                        <FileX className="text-gray-400" size={32} />
                                    </div>
                                    <h3 className="text-gray-900 dark:text-white font-bold mb-1">Data tidak ditemukan</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Belum ada artikel di kategori ini.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}