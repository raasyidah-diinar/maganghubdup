"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import MemberHeader from "@/components/members/MemberHeader";
import MemberSidebar from "@/components/members/MemberSidebar";
import { MEMBERS_DUMMY } from "@/lib/constants/members";

const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
        <p className="text-gray-500 dark:text-gray-400 font-medium">Memuat profil anggota...</p>
    </div>
);

export default function MemberDetailPage() {
    const [isLoading, setIsLoading] = useState(true);
    const member = MEMBERS_DUMMY.find((m) => m.slug === "indah-permata") || MEMBERS_DUMMY[3];

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return <LoadingSkeleton />;

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 pb-20">
            <div className="mx-auto max-w-7xl px-6 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white dark:bg-gray-800 rounded-[32px] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden divide-y divide-gray-100 dark:divide-gray-700 relative">
                            <MemberHeader member={member} />
                            <div className="p-8 md:p-12 space-y-14">
                                {member.summary && (
                                    <div className="space-y-4">
                                        <div className="border-l-4 border-orange-500 pl-5">
                                            <h3 className="text-xs font-extrabold text-[#94A3B8] uppercase tracking-[0.2em]">Summary</h3>
                                        </div>
                                        <div className="pl-6">
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[13px] font-medium">
                                                {member.summary}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <MemberSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
}
