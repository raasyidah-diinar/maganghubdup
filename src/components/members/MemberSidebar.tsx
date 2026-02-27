"use client";

import React from "react";
import Image from "next/image";
import { UserPlus, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import MemberListModal from "./MemberListModal";

const CONNECTIONS_DUMMY = [
    { id: 1, name: "Vernon Chwe", role: "Unity Game Developer", avatar: "/vernon.jpg" },
    { id: 2, name: "Siti Nurhaliza", role: "UX Researcher @ Gojek", avatar: "/hyein.png" },
    { id: 3, name: "Andi Saputra", role: "Android Developer", avatar: "/vernon.jpg" },
];

const ALL_CONNECTIONS_DUMMY = [
    { id: 1, name: "Vernon Chwe", role: "Unity Game Developer", avatar: "/vernon.jpg" },
    { id: 2, name: "Siti Nurhaliza", role: "UX Researcher @ Gojek", avatar: "/hyein.png" },
    { id: 3, name: "Andi Saputra", role: "Android Developer", avatar: "/vernon.jpg" },
    { id: 4, name: "Indah Permata", role: "Fullstack Web Developer", avatar: "/hyein.png" },
    { id: 5, name: "Budi Santoso", role: "Data Analyst @ Gojek", avatar: "/vernon.jpg" },
    { id: 6, name: "Maya Sari", role: "Product Manager", avatar: "/hyein.png" },
    { id: 1, name: "Aditya Pratama", role: "DevOps & Cloud Engineer", avatar: "/vernon.jpg" },
];

const SUGGESTIONS_DUMMY = [
    { id: 4, name: "Indah Permata", role: "Fullstack Web Developer", avatar: "/hyein.png" },
    { id: 5, name: "Budi Santoso", role: "Data Analyst", avatar: "/vernon.jpg" },
    { id: 6, name: "Maya Sari", role: "Product Manager", avatar: "/hyein.png" },
];

export default function MemberSidebar() {
    const router = useRouter();
    const [showAllConnections, setShowAllConnections] = React.useState(false);

    const handleMemberClick = (id: number) => {
        router.push(`/id/members/${id}`);
    };

    return (
        <div className="space-y-8">
            {/* Koneksi Card */}
            <div className="bg-white dark:bg-gray-800 rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Koneksi</h3>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal size={20} />
                    </button>
                </div>

                <div className="space-y-6">
                    {CONNECTIONS_DUMMY.map((person, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={() => handleMemberClick(person.id)}
                        >
                            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 relative border border-gray-100 dark:border-gray-700 group-hover:border-orange-300 transition-colors">
                                <Image
                                    src={person.avatar}
                                    alt={person.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-gray-900 dark:text-white truncate text-sm group-hover:text-orange-600 transition-colors">{person.name}</p>
                                <p className="text-[10px] text-gray-500 truncate">{person.role}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setShowAllConnections(true)}
                    className="w-full mt-6 pt-6 border-t border-gray-50 dark:border-gray-700 text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors text-center"
                >
                    Lihat semua ({ALL_CONNECTIONS_DUMMY.length})
                </button>
            </div>

            {/* Rekomendasi Member Card */}
            <div className="bg-white dark:bg-gray-800 rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Rekomendasi Member</h3>
                </div>

                <div className="space-y-6">
                    {SUGGESTIONS_DUMMY.map((person, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <div
                                className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 relative border border-gray-100 dark:border-gray-700 cursor-pointer group-hover:border-orange-300 transition-colors"
                                onClick={() => handleMemberClick(person.id)}
                            >
                                <Image
                                    src={person.avatar}
                                    alt={person.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p
                                    className="font-bold text-gray-900 dark:text-white truncate text-sm cursor-pointer hover:text-orange-600 transition-colors"
                                    onClick={() => handleMemberClick(person.id)}
                                >
                                    {person.name}
                                </p>
                                <p className="text-[10px] text-gray-500 truncate">{person.role}</p>
                            </div>
                            <button className="p-2 text-orange-500 hover:bg-orange-50 rounded-full transition-colors">
                                <UserPlus size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                <button className="w-full mt-6 pt-6 border-t border-gray-50 dark:border-gray-700 text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors text-center">
                    Temukan Lebih Banyak
                </button>
            </div>

            {/* Modal - Lihat Semua Koneksi */}
            <MemberListModal
                isOpen={showAllConnections}
                onClose={() => setShowAllConnections(false)}
                title="Semua Koneksi"
                members={ALL_CONNECTIONS_DUMMY}
                onMemberClick={(id) => {
                    setShowAllConnections(false);
                    handleMemberClick(id);
                }}
            />
        </div>
    );
}
