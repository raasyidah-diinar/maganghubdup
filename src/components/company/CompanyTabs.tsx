"use client";

import React from "react";

interface Tab {
    id: string;
    label: string;
    count?: number;
}

interface CompanyTabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (id: string) => void;
}

export default function CompanyTabs({ tabs, activeTab, onTabChange }: CompanyTabsProps) {
    return (
        <div className="flex items-center justify-center gap-12 bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-sm border border-gray-50 dark:border-gray-700 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                        ? "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900"
                        }`}
                >
                    {tab.label}
                    {tab.count !== undefined && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === tab.id
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                            }`}>
                            {tab.count}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
}
