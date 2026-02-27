"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, Star } from "lucide-react";
import CompanyHeader from "@/components/company/CompanyHeader";
import CompanyTabs from "@/components/company/CompanyTabs";
import CompanyRiwayat from "@/components/company/CompanyRiwayat";
import CompanyPolicies from "@/components/company/CompanyPolicies";
import CompanyAbout from "@/components/company/CompanyAbout";
import CompanyReviews from "@/components/company/CompanyReviews";
import JobCardList from "@/components/jobs/JobCardList";
import { JOBS_DUMMY } from "@/lib/constants/jobs";
import { PLACES_DUMMY } from "@/lib/constants/places";

const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
        <p className="text-gray-500 dark:text-gray-400 font-medium">Memuat data organisasi...</p>
    </div>
);

export default function MagangDetailPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("lowongan");

    const view = searchParams.get("view");
    const isDashboardView = view === "dashboard";

    const placeId = parseInt(params.id as string);
    const place = PLACES_DUMMY.find((p) => p.id === placeId) || PLACES_DUMMY[0];

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return <LoadingSkeleton />;

    const companyJobs = JOBS_DUMMY.filter(j => j.company.toLowerCase() === place.companyName.toLowerCase());

    const pageContent = (
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 pb-20">
                {/* Header - Full Width */}
                <div className="w-full">
                    <CompanyHeader
                        name={place.companyName}
                        logo={place.companyLogo}
                        banner="/pemandangan1.png"
                        category={place.category}
                        rating={4.8}
                        reviewsCount={12}
                        location={place.address}
                        website={`${place.companyName.toLowerCase().replace(/\s+/g, "")}.com`}
                        isVerified={place.isVerified}
                    />
                </div>

                {/* Content Section - Aligned with Navbar */}
                <div className="mx-auto max-w-7xl px-6 space-y-8 mt-10">
                    {/* Main Content Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Main Area */}
                        <div className="lg:col-span-2 space-y-8">
                            <CompanyTabs
                                tabs={[
                                    { id: "tentang-kami", label: "Tentang Kami" },
                                    { id: "lowongan", label: "Lowongan", count: companyJobs.length },
                                    { id: "ulasan", label: "Ulasan", count: 12 },
                                ]}
                                activeTab={activeTab}
                                onTabChange={setActiveTab}
                            />

                            {/* Tab content */}
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {activeTab === "tentang-kami" && (
                                    <CompanyAbout
                                        description={place.description || ""}
                                        companyName={place.companyName}
                                        address={place.address || ""}
                                    />
                                )}

                                {activeTab === "lowongan" && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white px-2">Lowongan Tersedia</h2>
                                        {companyJobs.length > 0 ? (
                                            <div className="space-y-4">
                                                {companyJobs.map((job) => (
                                                    <JobCardList key={job.id} {...job} />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="bg-white dark:bg-gray-800 rounded-[32px] p-10 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                                                <p className="text-gray-500 dark:text-gray-400">Belum ada lowongan aktif saat ini.</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === "ulasan" && (
                                    <CompanyReviews />
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <CompanyRiwayat />
                            <CompanyPolicies />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={isDashboardView ? "" : "min-h-screen bg-[#F8FAFC] dark:bg-gray-900"}>
            {pageContent}
        </div>
    );
}
