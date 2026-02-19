"use client";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProfileCompletionBanner from "@/components/dashboard/ProfileCompletionBanner";
import StatisticsCard from "@/components/dashboard/StatisticsCard";
import ApplicationStatusList from "@/components/dashboard/ApplicationStatusList";
import AgendaCard from "@/components/dashboard/AgendaCard";
import CareerTips from "@/components/dashboard/CareerTips";
import SearchMagangButton from "@/components/ui/SearchMagangButton";
import { FileText, Eye, Calendar, Briefcase } from "lucide-react";
import { useState, useEffect } from "react";

// Dummy data
const statistics = [
    {
        id: "1",
        icon: <FileText size={24} />,
        value: 14,
        label: "Pengajuan",
        status: {
            text: "2 menunggu lagi",
            type: "warning" as const,
        },
        iconBgColor: "bg-orange-100 dark:bg-orange-900/30",
    },
    {
        id: "2",
        icon: <Eye size={24} />,
        value: 128,
        label: "Profil Dilihat",
        status: {
            text: "Dari 5 Perusahaan",
            type: "info" as const,
        },
        iconBgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
        id: "3",
        icon: <Calendar size={24} />,
        value: 2,
        label: "Undangan Interview",
        status: {
            text: "1 Menunggu respon",
            type: "warning" as const,
        },
        iconBgColor: "bg-orange-100 dark:bg-orange-900/30",
    },
    {
        id: "4",
        icon: <Briefcase size={24} />,
        value: 45,
        label: "Peluang Magang",
        status: {
            text: "Sesuai minatmu",
            type: "success" as const,
        },
        iconBgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    },
];

const applications = [
    {
        id: "1",
        company: "Gojek",
        position: "UI/UX Designer",
        daysAgo: 22,
        status: "INTERVIEW" as const,
    },
    {
        id: "2",
        company: "Traveloka",
        position: "Frontend Dev",
        daysAgo: 20,
        status: "REVIEW" as const,
    },
    {
        id: "3",
        company: "Shopee",
        position: "Product Manager",
        daysAgo: 15,
        status: "DIKIRIM" as const,
    },
];

export default function DashboardPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Close sidebar on mobile by default
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                        {/* Page Title */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Dashboard Member
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Kelola pengajuan magang dan pantau progres karirmu
                                </p>
                            </div>
                            <SearchMagangButton />
                        </div>

                        {/* Profile Completion Banner */}
                        <ProfileCompletionBanner
                            completion={75}
                            incompleteItems={[
                                "Belum ada link Portfolio/Github",
                                "CV wajib dilengkapi"
                            ]}
                        />

                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {statistics.map((stat) => (
                                <StatisticsCard
                                    key={stat.id}
                                    icon={stat.icon}
                                    value={stat.value}
                                    label={stat.label}
                                    status={stat.status}
                                    iconBgColor={stat.iconBgColor}
                                />
                            ))}
                        </div>

                        {/* Bottom Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Application Status List - Takes 2 columns */}
                            <div className="lg:col-span-2">
                                <ApplicationStatusList applications={applications} />
                            </div>

                            {/* Right Column - Agenda and Tips */}
                            <div className="space-y-6">
                                <AgendaCard
                                    type="INTERVIEW USER"
                                    title="UI/UX Designer"
                                    company="Gojek"
                                    dateTime="Rabu, 10:00 WIB"
                                />
                                <CareerTips />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
