"use client";

import React from "react";
import { Zap, Landmark, Clock, Monitor, Calendar, Shirt, ShieldCheck, Briefcase } from "lucide-react";

interface InfoCardProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

const InfoCard = ({ title, icon, children }: InfoCardProps) => (
    <div className="bg-white dark:bg-gray-800 rounded-[28px] p-7 border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
        <h3 className="text-[14px] font-black text-[#1e293b] dark:text-white mb-6 flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-50 dark:bg-orange-900/20 rounded-[12px] flex items-center justify-center text-[#E8532F]">
                {icon}
            </div>
            {title}
        </h3>
        <div className="space-y-6">
            {children}
        </div>
    </div>
);

interface InfoItemProps {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
    color?: string;
}

const InfoItem = ({ icon, label, value, color = "bg-blue-50 text-blue-600" }: InfoItemProps) => (
    <div className="flex items-start gap-4">
        <div className={`w-9 h-9 rounded-[12px] flex items-center justify-center flex-shrink-0 ${color} dark:bg-gray-700 dark:text-gray-300`}>
            {icon}
        </div>
        <div>
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-wider mb-1">{label}</p>
            <div className="text-[14px] font-black text-[#1e293b] dark:text-gray-200">{value}</div>
        </div>
    </div>
);

export default function InternshipSidebar() {
    return (
        <aside className="space-y-6">
            {/* Informasi Magang Saya */}
            <InfoCard
                title="Informasi Magang Saya"
                icon={<Calendar size={20} />}
            >
                <div className="grid grid-cols-3 gap-2">
                    {/* Mulai */}
                    <div className="bg-[#eff6ff] dark:bg-blue-900/20 px-3 py-5 rounded-[18px] text-center">
                        <p className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">MULAI</p>
                        <p className="text-[12px] font-black text-[#1e293b] dark:text-blue-200 leading-tight">5 Mar 2025</p>
                    </div>
                    {/* Selesai */}
                    <div className="bg-[#fff7f5] dark:bg-orange-900/20 px-3 py-5 rounded-[18px] text-center">
                        <p className="text-[9px] font-black text-[#E8532F] dark:text-orange-400 uppercase tracking-widest mb-3">SELESAI</p>
                        <p className="text-[12px] font-black text-[#1e293b] dark:text-orange-200 leading-tight">6 Sep 2025</p>
                    </div>
                    {/* Durasi */}
                    <div className="bg-[#e9fbf4] dark:bg-emerald-900/20 px-3 py-5 rounded-[18px] text-center">
                        <p className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">DURASI</p>
                        <p className="text-[12px] font-black text-[#1e293b] dark:text-emerald-200 leading-tight">7 Bulan</p>
                    </div>
                </div>

                <div className="bg-gray-50/50 dark:bg-gray-800/40 px-6 py-5 rounded-[22px] flex items-center justify-between border border-gray-100/50 dark:border-gray-700">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">STATUS KEAKTIFAN</p>
                    <span className="px-5 py-1.5 bg-[#ff9f1a] text-white text-[10px] font-black rounded-full shadow-sm">Selesai</span>
                </div>
            </InfoCard>

            {/* Ketentuan Kerja */}
            <InfoCard
                title="Ketentuan Kerja"
                icon={<Briefcase size={20} />}
            >
                <InfoItem
                    icon={<Monitor size={18} />}
                    label="Sistem Kerja"
                    value="Onsite / WFO"
                    color="bg-blue-50 text-blue-600"
                />
                <InfoItem
                    icon={<Calendar size={18} />}
                    label="Batas Melamar"
                    value="24 Oktober 2024"
                    color="bg-orange-50 text-[#CC2D08]"
                />
                <InfoItem
                    icon={<Shirt size={18} />}
                    label="Dress Code"
                    value="Casual / Bebas Rapi"
                    color="bg-pink-50 text-pink-600"
                />
                <InfoItem
                    icon={<ShieldCheck size={18} />}
                    label="Sertifikat"
                    value="Sertifikat Industri"
                    color="bg-yellow-50 text-yellow-600"
                />
            </InfoCard>

            {/* Help Card */}
            <div className="bg-[#E8532F] rounded-[32px] p-10 text-center text-white relative overflow-hidden group shadow-lg shadow-orange-100 dark:shadow-none">
                <div className="relative z-10">
                    <h4 className="text-[22px] font-black mb-3">Butuh Bantuan?</h4>
                    <p className="text-[13px] leading-relaxed text-orange-50/90 mb-8 font-medium">
                        Hubungi tim helpdesk kami jika mengalami kendala pendaftaran.
                    </p>
                    <button className="w-full py-4 bg-white text-[#E8532F] rounded-[18px] font-black text-[14px] hover:bg-orange-50 transition-colors shadow-sm">
                        Pusat Bantuan
                    </button>
                </div>
            </div>
        </aside>
    );
}
