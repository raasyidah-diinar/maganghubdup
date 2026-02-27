"use client";

import React from "react";
import { UserCheck, Code, Zap, MessageSquare, Lightbulb, FileText, Quote, Award } from "lucide-react";

interface ScoreItemProps {
    label: string;
    score: number;
}

const ScoreItem = ({ label, score }: ScoreItemProps) => (
    <div className="space-y-2 py-3">
        <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold text-[#1e293b]">{label}</span>
            <div className="flex items-baseline gap-1">
                <span className="text-[15px] font-black text-[#E8532F]">{score}</span>
                <span className="text-[11px] font-bold text-gray-300">/ 5</span>
            </div>
        </div>
        <div className="h-[7px] w-full bg-gray-100 dark:bg-gray-700/50 rounded-full overflow-hidden">
            <div
                className="h-full bg-[#E8532F] rounded-full"
                style={{ width: `${(score / 5) * 100}%` }}
            />
        </div>
    </div>
);

interface CategorySectionProps {
    title: string;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    scores: { label: string; score: number }[];
}

const CategorySection = ({ title, icon, iconBg, iconColor, scores }: CategorySectionProps) => (
    <div className="p-8 border-b border-gray-100 last:border-b-0 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-6">
            <div className={`w-10 h-10 ${iconBg} rounded-[14px] flex items-center justify-center`}>
                <div className={iconColor}>{icon}</div>
            </div>
            <h3 className="text-[16px] font-black text-[#1e293b] dark:text-gray-200">{title}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            {scores.map((s, idx) => (
                <ScoreItem key={idx} label={s.label} score={s.score} />
            ))}
        </div>
    </div>
);

export default function GradeTranscript() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-2xl font-black text-[#1e293b] dark:text-white tracking-tight">Transkrip Nilai Magang</h2>
                <div className="px-4 py-2 bg-[#e9fbf4] dark:bg-emerald-900/30 rounded-full border border-[#d1f5e6] dark:border-emerald-800 shadow-sm">
                    <span className="text-[11px] font-bold text-[#10b981]">Sangat Baik (4.2/5.0)</span>
                </div>
            </div>

            {/* Single Unified Card Wrapper */}
            <div className="bg-white dark:bg-gray-800 rounded-[32px] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 xl:grid-cols-12 divide-y xl:divide-y-0 xl:divide-x divide-gray-100 dark:divide-gray-700">
                    {/* Left side: Categories (8 columns) */}
                    <div className="xl:col-span-8">
                        <CategorySection
                            title="Sikap & Profesionalisme"
                            icon={<UserCheck size={20} />}
                            iconBg="bg-[#fff7f5] dark:bg-orange-900/20"
                            iconColor="text-[#E8532F]"
                            scores={[
                                { label: "Disiplin & Aturan", score: 5 },
                                { label: "Tanggung Jawab", score: 4 },
                                { label: "Etika & Sopan Santun", score: 5 },
                                { label: "Kerja Sama Tim", score: 4 },
                                { label: "Inisiatif & Proaktif", score: 4 },
                            ]}
                        />

                        <CategorySection
                            title="Kompetensi Teknis"
                            icon={<Code size={20} />}
                            iconBg="bg-[#fffcf0] dark:bg-yellow-900/20"
                            iconColor="text-[#E8532F]"
                            scores={[
                                { label: "Kemampuan Teknis/Coding", score: 4 },
                                { label: "Pemahaman Logika", score: 5 },
                                { label: "Kualitas Hasil Kerja", score: 4 },
                                { label: "Penguasaan Tools", score: 5 },
                            ]}
                        />

                        <CategorySection
                            title="Produktivitas & Performa"
                            icon={<Zap size={20} />}
                            iconBg="bg-[#fff7f5] dark:bg-red-900/20"
                            iconColor="text-[#E8532F]"
                            scores={[
                                { label: "Kuantitas Tugas", score: 4 },
                                { label: "Ketepatan Deadline", score: 5 },
                                { label: "Konsistensi Performa", score: 4 },
                            ]}
                        />

                        <CategorySection
                            title="Komunikasi & Interaksi"
                            icon={<MessageSquare size={20} />}
                            iconBg="bg-[#fff7f5] dark:bg-orange-900/20"
                            iconColor="text-[#E8532F]"
                            scores={[
                                { label: "Cara Menerima Feedback", score: 5 },
                                { label: "Kemampuan Menjelaskan", score: 4 },
                                { label: "Responsivitas", score: 5 },
                            ]}
                        />

                        <CategorySection
                            title="Problem Solving"
                            icon={<Lightbulb size={20} />}
                            iconBg="bg-[#fffcf0] dark:bg-yellow-900/20"
                            iconColor="text-[#E8532F]"
                            scores={[
                                { label: "Penyelesaian Masalah", score: 4 },
                                { label: "Kemandirian Mencari Solusi", score: 4 },
                            ]}
                        />

                        <CategorySection
                            title="Laporan & Dokumentasi"
                            icon={<FileText size={20} />}
                            iconBg="bg-[#fff7f5] dark:bg-red-900/20"
                            iconColor="text-[#E8532F]"
                            scores={[
                                { label: "Konsistensi Logbook", score: 5 },
                                { label: "Kerapihan Laporan", score: 4 },
                            ]}
                        />
                    </div>

                    {/* Right side: Final Result & Score Indicators (4 columns) */}
                    <div className="xl:col-span-4 bg-gray-50/50 dark:bg-gray-800/40 p-10 space-y-10">
                        {/* Final Result Section */}
                        <div className="relative">
                            <div className="flex items-center justify-between mb-8">
                                <p className="text-[11px] font-black text-[#E8532F] uppercase tracking-[0.2em]">FINAL RESULT</p>
                                <span className="text-[100px] font-black leading-none text-[#E8532F] tracking-tighter select-none">A</span>
                            </div>

                            <div className="text-center">
                                <div className="flex items-baseline justify-center gap-2 mb-2">
                                    <span className="text-[32px] font-bold text-[#1e293b] dark:text-white leading-none">4.2</span>
                                    <span className="text-[16px] font-medium text-gray-300">/ 5.0</span>
                                </div>
                                <p className="text-[14px] font-medium text-gray-400 italic mb-10">"Sangat Memuaskan"</p>

                                <div className="mt-8 pt-10 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-5 text-left">
                                        <div className="w-12 h-12 bg-[#E8532F] rounded-[18px] flex items-center justify-center text-white shadow-lg shadow-orange-100 dark:shadow-none">
                                            <Award size={24} />
                                        </div>
                                        <div className="space-y-0.5">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">STATUS</p>
                                            <p className="text-[16px] font-bold text-[#1e293b] dark:text-gray-200 leading-tight">Lulus Magang</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Score Indicators Section */}
                        <div className="pt-10 border-t border-gray-100 dark:border-gray-700">
                            <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-8">INDIKATOR SKOR</h4>
                            <div className="space-y-5">
                                {[
                                    { val: 5, label: "Sangat Baik", width: "w-full" },
                                    { val: 4, label: "Baik", width: "w-[80%]" },
                                    { val: 3, label: "Cukup", width: "w-[60%]" },
                                    { val: 2, label: "Kurang", width: "w-[40%]" },
                                    { val: 1, label: "Sangat Kurang", width: "w-[20%]" },
                                ].map((row) => (
                                    <div key={row.val} className="flex items-center gap-5">
                                        <span className="text-[13px] font-black text-gray-600 dark:text-gray-400 w-2">{row.val}</span>
                                        <div className="flex-1 h-[2px] bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div className={`h-full bg-gray-300 ${row.width}`} />
                                        </div>
                                        <span className="text-[11px] font-black text-gray-400 w-28 text-right uppercase tracking-tighter">{row.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Industry Mentor Evaluation Section - Consolidated at bottom */}
                <div className="p-10 bg-[#eff6ff]/30 dark:bg-blue-900/10 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-start gap-6 relative z-10">
                        <div className="w-12 h-12 bg-white dark:bg-blue-800 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
                            <Quote size={24} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-blue-900 dark:text-blue-300 mb-3 uppercase tracking-wider">Evaluasi Pembimbing Industri</h3>
                            <p className="text-[16px] text-blue-700 dark:text-blue-400 italic font-medium leading-[1.6]">
                                "Mahasiswa memiliki disiplin yang sangat tinggi and etika komunikasi yang sangat baik. Secara teknis sudah sangat mumpuni dalam menangani tugas rutin. Kedepannya disarankan untuk lebih berani dalam mengambil keputusan pada masalah kompleks."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
