"use client";

import React from "react";
import { Monitor, Clock, Shirt, Award } from "lucide-react";

interface Policy {
    label: string;
    value: string;
    icon?: any;
    color?: string;
    bgColor?: string;
}

interface CompanyPoliciesProps {
    variant?: "default" | "minimal";
    policies?: Policy[];
}

export default function CompanyPolicies({
    variant = "default",
    policies: customPolicies
}: CompanyPoliciesProps) {
    const defaultPolicies = [
        { label: "Sistem Kerja", value: "Hybrid / Onsite", icon: Monitor, color: "text-blue-500", bgColor: "bg-blue-50/50" },
        { label: "Jam Kerja", value: "Fleksibel (8 Jam/hari)", icon: Clock, color: "text-purple-500", bgColor: "bg-purple-50/50" },
        { label: "Dress Code", value: "Casual / Bebas Rapi", icon: Shirt, color: "text-pink-500", bgColor: "bg-pink-50/50" },
        { label: "Sertifikat", value: "Ya, Sertifikat Industri", icon: Award, color: "text-amber-500", bgColor: "bg-amber-50/50" },
        { label: "Durasi Min", value: "3 - 6 Bulan", icon: Clock, color: "text-green-500", bgColor: "bg-green-50/50" },
    ];

    const policies = customPolicies || defaultPolicies;

    if (variant === "minimal") {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">Kebijakan</h3>

                <div className="space-y-6">
                    {policies.map((policy, idx) => (
                        <div key={idx} className="space-y-1">
                            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">{policy.label}</p>
                            <p className="text-base font-semibold text-gray-900 dark:text-white">{policy.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">Kebijakan</h3>

            <div className="space-y-6">
                {policies.map((policy, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                        {policy.icon && (
                            <div className={`w-10 h-10 ${policy.bgColor} dark:bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0 ${policy.color}`}>
                                <policy.icon size={20} />
                            </div>
                        )}
                        <div>
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">{policy.label}</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{policy.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
