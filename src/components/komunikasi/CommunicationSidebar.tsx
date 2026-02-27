"use client";

import { Plus, Inbox, Send } from "lucide-react";

interface NavItem {
    label: string;
    icon: React.ReactNode;
    id: string;
}

interface CommunicationSidebarProps {
    activeTab: string;
    onTabChange: (id: string) => void;
    onCompose: () => void;
}

export default function CommunicationSidebar({
    activeTab,
    onTabChange,
    onCompose
}: CommunicationSidebarProps) {
    const navItems: NavItem[] = [
        { id: "inbox", label: "Kotak Masuk", icon: <Inbox size={18} /> },
        { id: "outbox", label: "Terkirim", icon: <Send size={18} /> },
    ];

    return (
        <div className="w-64 flex flex-col gap-4 pt-2 shrink-0">
            {/* Compose Button */}
            <button
                onClick={onCompose}
                className="flex items-center gap-3 px-4 py-4 bg-[#C2E7FF] hover:bg-[#B3D7EF] text-[#001D35] rounded-2xl transition-all shadow-sm group"
            >
                <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-semibold text-[15px]">Tulis</span>
            </button>

            {/* Navigation Items */}
            <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`flex items-center gap-4 px-6 py-2.5 rounded-full transition-all duration-200 group ${isActive
                                ? "bg-[#D3E3FD] text-[#041E49] font-bold"
                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`}
                        >
                            <div className={`${isActive ? "text-[#041E49]" : "text-gray-500Group-hover:text-gray-700"}`}>
                                {item.icon}
                            </div>
                            <span className="text-[14px]">{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}
