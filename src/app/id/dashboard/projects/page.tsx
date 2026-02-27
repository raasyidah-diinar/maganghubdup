"use client";

import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProjectCard from "@/components/dashboard/projects/ProjectCard";
import { Loader2 } from "lucide-react";

export default function ProjectListPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

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
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const projects = [
        { id: "magang-hub", title: "Magang Hub", image: "/pemandangan.png" },
        { id: "chamber-dashboard", title: "Chamber Dashboard", image: "/pemandangan1.png" },
        { id: "finance-report-2024", title: "Finance Report 2024", image: "/pemandangan.png" },
        { id: "logistic-system", title: "Logistic System", image: "/pemandangan1.png" },
    ];

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

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-xl font-bold text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-wider">PROJECT SAYA</h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {isLoading ? (
                                <div className="col-span-full flex flex-col items-center justify-center py-20">
                                    <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                                </div>
                            ) : (
                                projects.map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        {...project}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
