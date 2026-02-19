"use client";

import Image from "next/image";
import { Eye, Edit2, Trash2 } from "lucide-react";

interface BlogCardProps {
    image: string;
    date: string;
    title: string;
    description: string;
    tags: string[];
    views: number;
    status: "AKTIF" | "DRAFT" | "NONAKTIF";
}

export default function BlogCard({ image, date, title, description, tags, views, status }: BlogCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
            {/* Image Section */}
            <div className="md:w-64 h-48 md:h-auto relative shrink-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/10 md:hidden"></div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-5 flex flex-col relative">
                {/* Status Badge */}
                <div className="absolute top-5 right-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        status === "AKTIF"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : status === "DRAFT"
                            ? "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                            : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                        {status}
                    </span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 mb-2">
                    <CalendarIcon className="text-[#E8532F]" size={14} />
                    <span className="text-xs font-bold text-[#E8532F]">{date}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight pr-12">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                    {description}
                </p>

                {/* Footer: Tags, Views, Actions */}
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {/* Tags */}
                        <div className="flex items-center gap-1.5">
                            <TagIcon className="text-[#E8532F]" size={16} />
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{tags.join(", ")}</span>
                        </div>

                        {/* Views */}
                        <div className="flex items-center gap-1.5">
                            <Eye size={16} className="text-gray-300" />
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{views} VIEWS</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors uppercase">
                            <Edit2 size={12} />
                            EDIT
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 rounded-lg text-xs font-bold text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors uppercase">
                            <Trash2 size={12} />
                            HAPUS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CalendarIcon({ className, size }: { className?: string, size?: number }) {
    return (
        <svg width={size || "18"} height={size || "18"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function TagIcon({ className, size }: { className?: string, size?: number }) {
    return (
        <svg width={size || "18"} height={size || "18"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="7" cy="7" r="1.5" fill="currentColor"/>
        </svg>
    )
}