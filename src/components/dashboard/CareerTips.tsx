"use client";

import Link from "next/link";
import { Lightbulb } from "lucide-react";

interface CareerTip {
    id: number;
    text: string;
}

interface CareerTipsProps {
    tips?: CareerTip[];
}

export default function CareerTips({ tips }: CareerTipsProps) {
    const defaultTips: CareerTip[] = tips || [
        { id: 1, text: "Optimasi LinkedIn dalam 10 Menit" },
        { id: 2, text: "Cara membuat Portfolio menarik" },
        { id: 3, text: "Etika kirim email ke HRD" },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
                <Lightbulb size={20} className="text-orange-500" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Tips Karir
                </h3>
            </div>

            {/* Tips List */}
            <ol className="space-y-3 mb-4">
                {defaultTips.map((tip) => (
                    <li
                        key={tip.id}
                        className="flex gap-3 text-sm text-gray-700 dark:text-gray-300"
                    >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center font-semibold text-xs">
                            {tip.id}
                        </span>
                        <span className="flex-1">{tip.text}</span>
                    </li>
                ))}
            </ol>

            {/* Read More Link */}
            <Link
                href="/id/blogs"
                className="text-sm font-medium text-orange-600 dark:text-orange-400 hover:underline"
            >
                Selengkapnya
            </Link>
        </div>
    );
}
