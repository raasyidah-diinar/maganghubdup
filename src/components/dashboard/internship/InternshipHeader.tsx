"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Share2, Bookmark, MapPin, Globe, Briefcase, Landmark, Star } from "lucide-react";

interface InternshipHeaderProps {
    data: {
        role: string;
        company: string;
        logo: string;
        banner: string;
        isVerified?: boolean;
        rating: number;
        reviewsCount: number;
        tags: {
            location: string;
            website: string;
            type: string;
        };
    };
}

export default function InternshipHeader({ data }: InternshipHeaderProps) {
    return (
        <div className="mb-10">
            <div className="bg-white dark:bg-gray-800 rounded-[32px] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Banner */}
                <div className="relative h-48 md:h-64 w-full">
                    <Image
                        src={data.banner}
                        alt="Company Banner"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Profile Info Section */}
                <div className="px-6 md:px-10 pb-10 relative">
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-8">
                        {/* Logo - Overlapping Banner */}
                        <div className="-mt-20 md:-mt-24 w-32 h-32 md:w-44 md:h-44 bg-white dark:bg-gray-700 rounded-[32px] p-1.5 shadow-xl border-4 border-white dark:border-gray-800 flex items-center justify-center flex-shrink-0 relative z-10 transition-transform hover:scale-[1.02] duration-500">
                            <div className="relative w-full h-full rounded-[26px] overflow-hidden flex items-center justify-center bg-gray-50 dark:bg-gray-600">
                                <Image
                                    src={data.logo}
                                    alt={data.company}
                                    width={140}
                                    height={140}
                                    className="object-contain p-4"
                                />
                            </div>
                        </div>

                        {/* Title Section - Now next to logo on desktop */}
                        <div className="flex-1 space-y-4 pb-2">
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl md:text-[32px] font-black text-[#1e293b] dark:text-white tracking-tight leading-none translate-y-1">
                                    {data.role}
                                </h1>
                                {data.isVerified && (
                                    <div className="flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full shadow-sm">
                                        <CheckCircle2 size={12} className="text-white fill-current" />
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center flex-wrap justify-between gap-6">
                                <div className="flex items-center gap-5 text-[14px] font-bold">
                                    <div className="flex items-center gap-1.5 text-[#E8532F]">
                                        <Landmark size={18} />
                                        <span>{data.company}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-gray-400">
                                        <Star size={18} className="text-orange-500 fill-current" />
                                        <span className="text-[#1e293b] dark:text-gray-200 font-black">{data.rating}</span>
                                        <span className="font-bold text-gray-400">({data.reviewsCount} Ulasan)</span>
                                    </div>
                                </div>

                                {/* Quick Actions - Pushed to the right */}
                                <div className="flex items-center gap-2">
                                    <button className="p-3.5 rounded-2xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm group">
                                        <Share2 size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                                    </button>
                                    <button className="p-3.5 rounded-2xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm group">
                                        <Bookmark size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Meta Tags - Now inside the card at the bottom */}
                    <div className="mt-10 pt-8 border-t border-gray-100/60 dark:border-gray-700 flex flex-wrap items-center gap-8 md:gap-14">
                        <div className="flex items-center gap-2.5 text-[13px] font-bold text-gray-400/80 dark:text-gray-500">
                            <MapPin size={20} className="text-[#E8532F]" />
                            <span className="tracking-tight">{data.tags.location}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[13px] font-bold text-gray-400/80 dark:text-gray-500">
                            <Globe size={20} className="text-blue-500" />
                            <span className="tracking-tight">Website Perusahaan</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[13px] font-bold text-gray-400/80 dark:text-gray-500">
                            <Briefcase size={20} className="text-emerald-500" />
                            <span className="tracking-tight">{data.tags.type}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
