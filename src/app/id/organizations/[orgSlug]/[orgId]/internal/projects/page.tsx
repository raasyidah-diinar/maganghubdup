"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loader2, Plus } from "lucide-react";
import InternalProjectCard from "./_components/InternalProjectCard";

export default function InternalProjectsPage() {
    const params = useParams();
    const orgSlug = params?.orgSlug as string;
    const orgId = params?.orgId as string;
    const basePath = `/id/organizations/${orgSlug}/${orgId}`;

    const [isLoading, setIsLoading] = useState(true);

    // Simulated loading delay
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const projects = [
        { id: "magang-hub", title: "Magang Hub", image: "/pemandangan.png" },
        { id: "chamber-dashboard", title: "Chamber Dashboard", image: "/pemandangan1.png" },
        { id: "finance-report-2024", title: "Finance Report 2024", image: "/pemandangan.png" },
        { id: "logistic-system", title: "Logistic System", image: "/pemandangan1.png" },
    ];

    return (
        <div className="max-w-[1200px] mx-auto px-6 py-10 space-y-8">
            {/* Header Section */}
            <div className="flex items-center justify-between pb-4">
                <h1 className="text-[13px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                    YOUR PROJECTS
                </h1>

                <button className="flex items-center gap-2 px-4 py-2 bg-[#F1F5F9] dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 dark:text-gray-400 text-[13px] font-bold rounded-lg transition-all border border-transparent">
                    <Plus size={16} />
                    New Board
                </button>
            </div>

            {/* Project Grid */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                    <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                    <p className="text-[12px] font-bold text-gray-400 tracking-widest uppercase">Loading...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {projects.map((project) => (
                        <InternalProjectCard
                            key={project.id}
                            {...project}
                            basePath={basePath}
                        />
                    ))}
                    
                    {/* Create New Board Placeholder */}
                    <button className="group flex flex-col items-center justify-center h-full min-h-[180px] bg-[#F1F5F9]/50 dark:bg-gray-800/30 rounded-[20px] border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300">
                        <span className="text-[13px] font-bold text-gray-400 dark:text-gray-500 group-hover:text-gray-500 transition-colors">
                            Create new board
                        </span>
                    </button>
                </div>
            )}
        </div>
    );
}
