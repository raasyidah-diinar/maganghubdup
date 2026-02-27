"use client";

import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import InternshipHeader from "@/components/dashboard/internship/InternshipHeader";
import GradeTranscript from "@/components/dashboard/internship/GradeTranscript";
import InternshipSidebar from "@/components/dashboard/internship/InternshipSidebar";
import CompanyAbout from "@/components/dashboard/internship/CompanyAbout";

export default function InternshipDetailPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("Detail Lowongan");

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

    const internshipData = {
        role: "Frontend Developer Intern",
        company: "Tokopedia",
        logo: "/shopee.png", // I will keep this as shopper.png for now as it's the green bag logo in my assets
        banner: "/pemandangan.png", // I will keep this as placeholder but the layout will be updated
        isVerified: true,
        rating: 4.8,
        reviewsCount: 12,
        tags: {
            location: "Lokasi tidak spesifik",
            website: "Website Perusahaan",
            type: "Full-time Internship"
        }
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC] dark:bg-gray-900 overflow-hidden font-sans">
            {/* Sidebar */}
            <DashboardSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-10">

                        {/* Internship Header */}
                        <InternshipHeader data={internshipData} />

                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                            {/* Main Detail Content */}
                            <div className="lg:col-span-8 space-y-10">
                                {/* Tabs Navigation - Moved here for alignment */}
                                <div className="flex items-center gap-1 bg-white dark:bg-gray-800 p-1.5 rounded-[22px] w-full border border-gray-100 dark:border-gray-700 shadow-sm transition-all">
                                    {["Detail Lowongan", "Tentang Perusahaan"].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-6 py-4 rounded-[18px] text-[15px] font-bold transition-all flex-1 ${activeTab === tab
                                                ? "bg-[#fff7f5] dark:bg-orange-900/40 text-[#E8532F] shadow-sm shadow-orange-100 dark:shadow-none"
                                                : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                {activeTab === "Detail Lowongan" ? (
                                    <GradeTranscript />
                                ) : (
                                    <CompanyAbout />
                                )}
                            </div>

                            {/* Sidebar Info */}
                            <div className="lg:col-span-4">
                                <InternshipSidebar />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
