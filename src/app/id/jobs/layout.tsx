"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

function JobsLayoutContent({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const isDashboardView = searchParams.get("view") === "dashboard";
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (isDashboardView) {
        return (
            <div className="flex h-screen bg-[#F8FAFC] dark:bg-gray-900 overflow-hidden">
                <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <div className="flex-1 flex flex-col min-w-0">
                    <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {children}
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

export default function JobsLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={null}>
            <JobsLayoutContent>{children}</JobsLayoutContent>
        </Suspense>
    );
}
