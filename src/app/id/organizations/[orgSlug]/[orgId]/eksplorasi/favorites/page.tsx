"use client";
import FavoritesContent from "@/components/dashboard/FavoritesContent";
export default function FavoritesPageWrapper() {
    return (
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-gray-900">
            <FavoritesContent />
        </main>
    );
}
