"use client";

import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

interface ProjectCardProps {
    id: string;
    title: string;
    image: string;
}

export default function ProjectCard({ id, title, image }: ProjectCardProps) {
    return (
        <Link
            href={`/id/dashboard/projects/${id}`}
            className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
        >
            {/* Image Cover */}
            <div className="h-32 w-full relative">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-4 flex items-center justify-between">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm truncate pr-2">
                    {title}
                </h3>
            </div>
        </Link>
    );
}
