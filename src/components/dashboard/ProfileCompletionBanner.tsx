"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface ProfileCompletionBannerProps {
    completion: number;
    incompleteItems: string[];
}

export default function ProfileCompletionBanner({
    completion = 75,
    incompleteItems = [
        "Belum ada link Portfolio/Github",
        "CV wajib dilengkapi"
    ]
}: ProfileCompletionBannerProps) {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500] p-8 text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold mb-4">
                <AlertCircle size={16} />
                <span>SIAGA PROFIL: {completion}%</span>
            </div>

            {/* Content */}
            <div className="flex items-start justify-between gap-8">
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">
                        Lengkapi Profilmu untuk Menarik Perhatian Rekruter
                    </h2>
                    <p className="text-white/90 text-sm mb-6">
                        Member dengan profil lengkap memiliki peluang 3x lebih besar untuk mendapatkan panggilan interview pertama mereka.
                    </p>
                    <Link
                        href="/id/dashboard/profile"
                        className="inline-block bg-white text-orange-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Perbarui Profil
                    </Link>
                </div>

                {/* Progress Section */}
                <div className="w-64 flex-shrink-0">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-lg font-bold">{completion}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-white/30 rounded-full mb-4">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-500"
                            style={{ width: `${completion}%` }}
                        ></div>
                    </div>

                    {/* Checklist */}
                    <div className="space-y-2">
                        {incompleteItems.map((item, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </div>
                        ))}
                        <div className="flex items-start gap-2 text-sm">
                            <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" />
                            <span>CV wajib dilengkapi</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
