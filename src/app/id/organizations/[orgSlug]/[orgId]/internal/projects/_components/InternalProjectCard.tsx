"use client";

import Image from "next/image";
import Link from "next/link";

interface InternalProjectCardProps {
    id: string;
    title: string;
    image: string;
    basePath: string;
}

export default function InternalProjectCard({ id, title, image, basePath }: InternalProjectCardProps) {
    return (
        <Link
            href={`${basePath}/internal/projects/${id}`}
            className="group bg-white dark:bg-gray-800 rounded-[20px] overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
        >
            {/* Image Cover */}
            <div className="h-32 w-full relative">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
            </div>

            {/* Title Section */}
            <div className="px-5 py-4 bg-white dark:bg-gray-800">
                <h3 className="font-bold text-gray-900 dark:text-white text-[14px] leading-tight truncate">
                    {title}
                </h3>
            </div>
        </Link>
    );
}
