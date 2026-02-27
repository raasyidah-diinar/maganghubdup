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
import { EDUCATION_DUMMY } from "@/lib/constants/education";

const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
        <p className="text-gray-500 dark:text-gray-400 font-medium">Memuat data instansi...</p>
    </div>
);

export default function EducationDetailPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("tentang-kami");

    const view = searchParams.get("view");
    const isDashboardView = view === "dashboard";

    const educationId = parseInt(params.id as string);
    const institution = EDUCATION_DUMMY.find((e) => e.id === educationId) || EDUCATION_DUMMY[0];

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            // No-op for now as layout handles it
        };
        handleResize();
    }, []);

    if (isLoading) return <LoadingSkeleton />;

    // For educational institutions, we might want to filter jobs where company matches institutionName
    const institutionJobs = JOBS_DUMMY.filter(j => j.company.toLowerCase() === institution.institutionName.toLowerCase());

    const fullAddress = `${institution.address}${institution.subdistrict ? `, ${institution.subdistrict}` : ""}${institution.city ? `, ${institution.city}` : ""}`;

    const pageContent = (
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 pb-20">
                {/* Header - Full Width */}
                <div className="w-full">
                    <CompanyHeader
                        name={institution.institutionName}
                        logo={institution.institutionLogo}
                        banner={institution.banner || "/pemandangan2.png"}
                        category={institution.category}
                        rating={4.8}
                        reviewsCount={12}
                        location={fullAddress}
                        website={institution.website || `${institution.institutionName.toLowerCase().replace(/\s+/g, "")}.edu`}
                        isVerified={institution.isVerified}
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
                                    { id: "anggota", label: "Anggota", count: 0 },
                                    { id: "ulasan", label: "Ulasan", count: 12 },
                                ]}
                                activeTab={activeTab}
                                onTabChange={setActiveTab}
                            />

                            {/* Tab content */}
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {activeTab === "tentang-kami" && (
                                    <CompanyAbout
                                        description={institution.description || ""}
                                        companyName={institution.institutionName}
                                        address={fullAddress}
                                    />
                                )}

                                {activeTab === "anggota" && (
                                    <div className="bg-white dark:bg-gray-800 rounded-[32px] p-10 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                                        <p className="text-gray-500 dark:text-gray-400">Belum ada anggota.</p>
                                    </div>
                                )}

                                {activeTab === "ulasan" && (
                                    <CompanyReviews />
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <CompanyPolicies variant="minimal" />
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
