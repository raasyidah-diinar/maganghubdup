"use client";

import { AlertCircle, CheckCircle2, Sparkles } from "lucide-react";
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
                <Sparkles size={16} />
                <span>SKOR PROFIL: {completion}%</span>
            </div>

            {/* Content */}
            <div className="flex items-start justify-between gap-8">
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h2 className="text-[34px] leading-tight font-bold mb-6">
                            Lengkapi Profilmu untuk Menarik <br />
                            Perhatian Rekruter
                        </h2>
                        <p className="text-white/90 text-[15px] leading-relaxed mb-8 max-w-xl">
                            Member dengan profil lengkap memiliki peluang 3x lebih besar untuk <br />
                            mendapatkan panggilan interview pertama mereka.
                        </p>
                    </div>
                    <div>
                        <Link
                            href="/id/dashboard/profile"
                            className="inline-block bg-white text-orange-600 px-5 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors"
                        >
                            Perbarui Profil
                        </Link>
                    </div>
                </div>

                {/* Progress Section */}
                <div className="w-[300px] flex-shrink-0 bg-black/10 backdrop-blur-md rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-base font-semibold">Progress</span>
                        <span className="text-2xl font-bold">{completion}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2.5 bg-white/20 rounded-full mb-6">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            style={{ width: `${completion}%` }}
                        ></div>
                    </div>

                    {/* Checklist */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm">
                            <AlertCircle size={18} className="text-yellow-400 flex-shrink-0" />
                            <span className="text-white/90">Belum ada link Portfolio/Github</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
                            <span className="text-white/90">CV sudah diunggah</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
