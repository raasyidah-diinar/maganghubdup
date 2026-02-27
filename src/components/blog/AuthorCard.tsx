"use client";

import React from "react";
import Image from "next/image";
import { User } from "lucide-react";
import Link from "next/link";

interface AuthorCardProps {
    name: string;
    role: string;
    slug: string;
    avatar?: string;
    bio?: string;
}

export default function AuthorCard({ name, role, slug, avatar, bio }: AuthorCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Penulis</p>

            <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-4">
                    <div className="w-full h-full rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center overflow-hidden border-4 border-gray-50 dark:border-gray-700">
                        {avatar ? (
                            <Image src={avatar} alt={name} fill className="object-cover" />
                        ) : (
                            <User size={40} className="text-orange-500" />
                        )}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{name}</h3>
                <p className="text-sm font-medium text-orange-500 mb-4">{role}</p>

                {bio && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                        {bio}
                    </p>
                )}

                <Link
                    href={`/id/members/${slug}`}
                    className="w-full py-3 bg-[#0F172A] hover:bg-slate-800 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                >
                    <User size={18} />
                    Lihat Profil
                </Link>
            </div>
        </div>
    );
}
