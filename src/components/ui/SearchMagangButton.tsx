"use client";

import Link from "next/link";
import { Search } from "lucide-react";

interface SearchMagangButtonProps {
    href?: string;
    className?: string;
}

export default function SearchMagangButton({
    href = "/id/jobs",
    className = ""
}: SearchMagangButtonProps) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center gap-2 bg-gradient-to-r from-[#E8532F] via-[#FF6B35] to-[#FFA500] text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-lg ${className}`}
        >
            <Search size={20} />
            <span>Cari Magang</span>
        </Link>
    );
}
