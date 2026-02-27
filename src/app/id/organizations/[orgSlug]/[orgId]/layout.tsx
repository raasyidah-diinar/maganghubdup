"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OrganizationSidebar from "@/components/dashboard/OrganizationSidebar";
import { useParams, usePathname } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function OrganizationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const params = useParams();
    const pathname = usePathname();
    const orgSlug = params?.orgSlug as string;
    const orgId = params?.orgId as string;

    const isPostJobPage = pathname?.endsWith("/industri/jobs/tambah");
    const isProjectBoard = pathname?.includes("/internal/projects/") && pathname?.split("/").length > 7;

    return (
        <SidebarProvider>
            <OrganizationSidebar
                orgSlug={orgSlug}
                orgId={orgId}
            />
            <SidebarInset>
                <div className={`flex flex-col h-screen bg-[#f8fafc] dark:bg-gray-900 ${isPostJobPage ? "overflow-y-auto" : ""}`}>
                    {/* Header - sticky conditional */}
                    {!isProjectBoard && (
                        <div className={`${isPostJobPage ? "relative" : "sticky top-0"} z-50 flex-shrink-0`}>
                            <DashboardHeader showSidebarTrigger={true} />
                        </div>
                    )}

                    {/* Content Area - scrollable */}
                    <main className={`flex-1 ${isProjectBoard ? "p-0 overflow-hidden" : "p-4 lg:p-6 overflow-y-auto"} ${isPostJobPage ? "" : ""}`}>
                        <div className={`h-full ${isProjectBoard ? "max-w-full" : "max-w-[1600px] mx-auto"}`}>
                            {children}
                        </div>
                    </main>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
