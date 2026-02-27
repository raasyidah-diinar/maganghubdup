"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ExternalLink, X, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
    id: number;
    url: string;
    title: string;
}

interface CompanyAboutProps {
    description: string;
    companyName: string;
    address: string;
}

export default function CompanyAbout({ description, companyName, address }: CompanyAboutProps) {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    const gallery: GalleryImage[] = [
        { id: 1, url: "/pemandangan.png", title: "Kolaborasi Tim" },
        { id: 2, url: "/pemandangan.png", title: "Lingkungan Kerja" },
        { id: 3, url: "/pemandangan.png", title: "Meeting Mingguan" },
        { id: 4, url: "/pemandangan.png", title: "Acara Kantor" },
        { id: 5, url: "/pemandangan.png", title: "Ruang Bersantai" },
    ];

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (!selectedImage) return;
        const currentIndex = gallery.findIndex(img => img.id === selectedImage.id);
        const nextIndex = (currentIndex + 1) % gallery.length;
        setSelectedImage(gallery[nextIndex]);
    };

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (!selectedImage) return;
        const currentIndex = gallery.findIndex(img => img.id === selectedImage.id);
        const prevIndex = (currentIndex - 1 + gallery.length) % gallery.length;
        setSelectedImage(gallery[prevIndex]);
    };

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedImage) return;
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "Escape") setSelectedImage(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImage]);

    return (
        <div className="space-y-6">
            {/* Deskripsi Section */}
            <div className="bg-white dark:bg-gray-800 rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Deskripsi</h2>
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                    <p>{description}</p>
                </div>
            </div>

            {/* Lokasi Kantor Section */}
            <div className="bg-white dark:bg-gray-800 rounded-[32px] p-5 md:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-5">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Lokasi Kantor</h2>
                    <span className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full text-xs font-bold border border-gray-100 dark:border-gray-600">
                        1 Cabang
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start relative">
                    <a
                        href="https://www.google.com/maps/search/Menara+Standard+Chartered,+Jl.+Prof.+Dr.+Satrio+No.164,+Jakarta+Selatan/@-6.217976,106.818408,15z"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="md:col-span-3 relative group cursor-pointer overflow-hidden rounded-2xl aspect-[3/2] bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-700"
                    >
                        <Image
                            src="/static-map.png"
                            alt="Map Location"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold text-blue-600">
                                <span className="underline">Lihat peta</span>
                                <ExternalLink size={12} />
                            </div>
                        </div>
                    </a>

                    <div className="md:col-span-9 pt-1">
                        <div className="flex flex-col gap-1">
                            <h3 className="font-bold text-gray-900 dark:text-white pr-20 text-base">Head Office Jakarta</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg">
                                {address}
                            </p>
                        </div>
                    </div>

                    {/* Badge Utama at top-right of the content area */}
                    <div className="absolute top-0 right-0">
                        <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md text-[10px] font-bold">
                            Utama
                        </span>
                    </div>
                </div>
            </div>

            {/* Galeri Kegiatan Section */}
            <div className="bg-white dark:bg-gray-800 rounded-[32px] p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Galeri Kegiatan</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {gallery.map((img) => (
                        <div
                            key={img.id}
                            onClick={() => setSelectedImage(img)}
                            className="relative group cursor-pointer aspect-[1.5/1] overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-700"
                        >
                            <Image
                                src={img.url}
                                alt={img.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <span className="text-white text-sm font-bold transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    {img.title}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fullscreen Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
                    onClick={() => setSelectedImage(null)}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-2.5 rounded-full z-[110]"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(null);
                        }}
                    >
                        <X size={24} />
                    </button>

                    {/* Navigation Buttons */}
                    <div className="absolute left-4 md:left-10 z-[110]">
                        <button
                            className="text-white/70 hover:text-white transition-all bg-white/10 hover:bg-white/20 p-4 rounded-full"
                            onClick={handlePrev}
                        >
                            <ChevronLeft size={32} />
                        </button>
                    </div>

                    <div className="absolute right-4 md:right-10 z-[110]">
                        <button
                            className="text-white/70 hover:text-white transition-all bg-white/10 hover:bg-white/20 p-4 rounded-full"
                            onClick={handleNext}
                        >
                            <ChevronRight size={32} />
                        </button>
                    </div>

                    {/* Image Container */}
                    <div className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
                        <div className="relative w-full flex-1">
                            <Image
                                src={selectedImage.url}
                                alt={selectedImage.title}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="mt-6 text-white text-center">
                            <h3 className="text-xl font-bold tracking-tight">{selectedImage.title}</h3>
                            <p className="text-white/50 text-sm mt-1">
                                {gallery.findIndex(img => img.id === selectedImage.id) + 1} / {gallery.length}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
