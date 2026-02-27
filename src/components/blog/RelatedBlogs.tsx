"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Grid } from "lucide-react";

interface RelatedBlog {
    id: number;
    title: string;
    date: string;
    image: string;
    slug: string;
}

interface RelatedBlogsProps {
    blogs: RelatedBlog[];
}

export default function RelatedBlogs({ blogs }: RelatedBlogsProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-6">
                <Grid size={18} className="text-orange-500" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Blog Terkait</p>
            </div>

            <div className="space-y-6">
                {blogs.map((blog) => (
                    <Link
                        key={blog.id}
                        href={`/id/blogs/${blog.slug}`}
                        className="flex gap-4 group cursor-pointer"
                    >
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-orange-500 transition-colors leading-tight mb-1">
                                {blog.title}
                            </h4>
                            <p className="text-[10px] text-gray-400 font-medium">
                                {blog.date}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
