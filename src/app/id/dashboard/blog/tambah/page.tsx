"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Image from "next/image";
import { ArrowUp, X } from "lucide-react";

export default function TambahArtikelPage() {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [gambar, setGambar] = useState<string | null>(null);
    const [judul, setJudul] = useState("");
    const [kategori, setKategori] = useState<string>("");
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [konten, setKonten] = useState("");
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const kategoriOptions = ["Engineering", "Design", "Personal", "Business"];

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setGambar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddTag = () => {
        if (tag.trim() && !tags.includes(tag.trim())) {
            setTags([...tags, tag.trim()]);
            setTag("");
        }
    };

    const handleRemoveTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const isFormValid = gambar && judul.trim() && kategori && konten.trim();

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <DashboardSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                <span className="text-[#E8532F]">Tulis </span>
                                <span className="text-gray-900 dark:text-white">Artikel Baru</span>
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Bagikan pengetahuan dan pengalaman Anda dengan komunitas</p>
                        </div>

                        {/* Form */}
                        <div className="space-y-6">
                            {/* Gambar Utama */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Gambar Utama
                                </label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="relative w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl flex items-center justify-center cursor-pointer hover:border-[#E8532F] hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-all group"
                                >
                                    {gambar ? (
                                        <>
                                            <Image
                                                src={gambar}
                                                alt="Preview"
                                                fill
                                                className="object-cover rounded-2xl"
                                            />
                                            <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="text-center">
                                                    <ArrowUp size={32} className="text-white mx-auto mb-2" />
                                                    <p className="text-white text-sm font-bold">Ubah Gambar</p>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center">
                                            <ArrowUp size={32} className="text-gray-400 mx-auto mb-2" />
                                            <p className="text-gray-600 dark:text-gray-400 text-sm font-bold">Pilih Gambar Sampul</p>
                                            <p className="text-gray-400 text-xs mt-1">PNG, JPG, GIF (Max. 5MB)</p>
                                        </div>
                                    )}
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </div>

                            {/* Judul Artikel */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Judul Artikel
                                </label>
                                <input
                                    type="text"
                                    value={judul}
                                    onChange={(e) => setJudul(e.target.value)}
                                    placeholder="Masukkan judul artikel..."
                                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E8532F]/20 focus:border-[#E8532F] transition-all"
                                />
                            </div>

                            {/* Kategori & Tag Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Kategori */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Kategori
                                    </label>
                                    <select
                                        value={kategori}
                                        onChange={(e) => setKategori(e.target.value)}
                                        className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E8532F]/20 focus:border-[#E8532F] transition-all cursor-pointer"
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {kategoriOptions.map((kat) => (
                                            <option key={kat} value={kat}>
                                                {kat}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Tag */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                        Tag
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={tag}
                                            onChange={(e) => setTag(e.target.value)}
                                            onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                                            placeholder="Tambah tag..."
                                            className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E8532F]/20 focus:border-[#E8532F] transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddTag}
                                            className="px-4 py-3 bg-[#E8532F] hover:bg-[#d64522] text-white rounded-xl font-bold text-sm transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                    {tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {tags.map((t, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center gap-2 px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-bold"
                                                >
                                                    #{t}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveTag(idx)}
                                                        className="hover:text-orange-700 dark:hover:text-orange-300"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Konten */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    Konten Artikel
                                </label>
                                <textarea
                                    value={konten}
                                    onChange={(e) => setKonten(e.target.value)}
                                    placeholder="Tulis konten artikel Anda di sini..."
                                    rows={12}
                                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E8532F]/20 focus:border-[#E8532F] transition-all resize-none"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <button 
                                    onClick={() => router.back()}
                                    className="px-6 py-3 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                                    BATAL
                                </button>
                                <button
                                    disabled={!isFormValid}
                                    onClick={() => {
                                        // Handle publish action here
                                        alert('Artikel berhasil diterbitkan!');
                                        router.back();
                                    }}
                                    className={`px-8 py-3 rounded-xl text-sm font-bold text-white shadow-lg transition-all ${
                                        isFormValid
                                            ? "bg-[#E8532F] hover:bg-[#d64522] active:scale-95"
                                            : "bg-[#FAD390] cursor-not-allowed"
                                    }`}
                                >
                                    TERBITKAN
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
