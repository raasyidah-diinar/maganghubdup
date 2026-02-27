"use client";

import React from "react";
import { Calendar, Clock, Share2, Bookmark, ChevronRight } from "lucide-react";
import Link from "next/link";

interface ArticleHeaderProps {
    category: string;
    title: string;
    date: string;
    readTime: string;
}

export default function ArticleHeader({ category, title, date, readTime }: ArticleHeaderProps) {
    return (
        <div className="space-y-6 pt-4">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                <Link href="/id/blogs" className="hover:text-orange-500 transition-colors">Blog</Link>
                <ChevronRight size={14} className="text-gray-400" />
                <span className="text-gray-900 dark:text-white line-clamp-1">{title}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4 flex-1">
                    <span className="inline-block px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-[10px] font-bold rounded-md uppercase tracking-widest">
                        {category}
                    </span>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] dark:text-white leading-tight">
                        {title}
                    </h1>

                    <div className="flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-orange-500" />
                            <span>{date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} className="text-orange-500" />
                            <span>{readTime}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="p-3 bg-white dark:bg-gray-800 text-gray-500 rounded-2xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 transition-all">
                        <Bookmark size={20} />
                    </button>
                    <button className="p-3 bg-white dark:bg-gray-800 text-gray-500 rounded-2xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 transition-all">
                        <Share2 size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
