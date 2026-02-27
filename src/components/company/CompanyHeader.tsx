"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Star, Share2, Bookmark, MapPin, Globe, MessageCircle } from "lucide-react";
import ContactModal from "./ContactModal";

interface CompanyHeaderProps {
    name: string;
    logo: string;
    banner: string;
    category: string;
    rating: number;
    reviewsCount: number;
    location: string;
    website: string;
    isVerified?: boolean;
}

export default function CompanyHeader({
    name,
    logo,
    banner,
    category,
    rating,
    reviewsCount,
    location,
    website,
    isVerified = false,
}: CompanyHeaderProps) {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
        <div className="bg-white dark:bg-gray-800 w-full overflow-hidden border-b border-gray-100 dark:border-gray-700">
            {/* Banner */}
            <div className="h-48 md:h-64 relative bg-gray-200 dark:bg-gray-700">
                <Image
                    src={banner}
                    alt={name}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-6 pb-8 relative pt-16 md:pt-0">
                {/* Overlapping Logo */}
                <div className="absolute -top-16 left-6 w-32 h-32 md:w-36 md:h-36 bg-white dark:bg-gray-800 rounded-[28px] p-4 shadow-xl border border-gray-100 dark:border-gray-700 flex items-center justify-center z-10">
                    <div className="relative w-full h-full">
                        <Image
                            src={logo}
                            alt={name}
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Main Info Row */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:pl-44 pt-4 md:pt-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{name}</h1>
                            {isVerified && <CheckCircle2 className="w-6 h-6 text-blue-500 fill-blue-500 text-white" />}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base font-medium">
                            <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                                <Globe size={18} className="text-gray-400" />
                                {category}
                            </span>
                            <div className="flex items-center gap-1">
                                <Star size={18} className="text-orange-500 fill-orange-500" />
                                <span className="text-gray-900 dark:text-white">{rating}</span>
                                <span className="text-gray-500 dark:text-gray-400">({reviewsCount} Ulasan)</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="p-3 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-700">
                            <Share2 size={20} />
                        </button>
                        <button className="p-3 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-700">
                            <Bookmark size={20} />
                        </button>
                        <button
                            onClick={() => setIsContactModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-orange-200 dark:shadow-none"
                        >
                            <MessageCircle size={20} />
                            Hubungi Kami
                        </button>
                    </div>
                </div>

                {/* Bottom Info Bar */}
                <div className="mt-8 pt-6 border-t border-gray-50 dark:border-gray-700 flex flex-col md:flex-row md:items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-orange-500" />
                        <span>{location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe size={18} className="text-blue-500" />
                        <a href={`https://${website}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                            Website Resmi
                        </a>
                    </div>
                </div>
            </div>

            <ContactModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
                companyName={name}
            />
        </div>
    );
}
