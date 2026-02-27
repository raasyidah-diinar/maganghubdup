"use client";

import React from "react";
import { MapPin, Image as ImageIcon } from "lucide-react";

export default function CompanyAbout() {
    return (
        <div className="space-y-6">
            {/* Deskripsi */}
            <div className="bg-white dark:bg-gray-800 rounded-[32px] p-10 border border-gray-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-[18px] font-bold text-[#1e293b] dark:text-white mb-6">Deskripsi</h3>
                <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                    Gojek adalah Super App terdepan di Asia Tenggara yang menyediakan berbagai layanan mulai dari transportasi, pesan antar makanan, logistik, dan pembayaran digital. Kami berkomitmen untuk menciptakan dampak sosial yang positif bagi jutaan mitra pengemudi, merchant, dan pengguna di seluruh wilayah operasional kami.
                </p>
            </div>

            {/* Lokasi Kantor */}
            <div className="bg-white dark:bg-gray-800 rounded-[32px] p-10 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                    <h3 className="text-[18px] font-bold text-[#1e293b] dark:text-white">Lokasi Kantor</h3>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-400 text-[10px] font-bold rounded-full uppercase">1 Cabang</span>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-8">
                    {/* Map Preview Simulation */}
                    <div className="w-full md:w-[220px] h-[140px] bg-gray-100 dark:bg-gray-700 rounded-[24px] overflow-hidden relative border border-gray-100 dark:border-gray-600 flex-shrink-0 group">
                        <img
                            src="/pemandangan.png"
                            alt="Map Placeholder"
                            className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg transform -translate-y-2">
                                <MapPin size={20} className="text-[#E8532F]" fill="#E8532F" fillOpacity={0.2} />
                            </div>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl text-center shadow-sm">
                            <span className="text-[10px] font-black text-[#E8532F]">Lihat peta lebih besar</span>
                        </div>
                    </div>

                    <div className="flex-1 pt-2">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-[16px] font-black text-[#1e293b] dark:text-white">Headquarters (Pasaraya)</h4>
                            <span className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-blue-100 dark:border-blue-800 shadow-sm shadow-blue-50/50">Utama</span>
                        </div>
                        <p className="text-[14px] text-gray-400 dark:text-gray-500 font-medium leading-relaxed max-w-[400px]">
                            Pasaraya Blok M Gedung B, Jl. Iskandarsyah II No.2, Jakarta Selatan
                        </p>
                    </div>
                </div>
            </div>

            {/* Galeri Kegiatan */}
            <div className="bg-white dark:bg-gray-800 rounded-[32px] p-10 border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                    <h3 className="text-[18px] font-bold text-[#1e293b] dark:text-white">Galeri Kegiatan</h3>
                    <div className="w-6 h-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center text-[#E8532F]">
                        <ImageIcon size={14} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-[4/3] rounded-[24px] overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm group">
                            <img
                                src="/pemandangan.png"
                                alt={`Activity ${i}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
