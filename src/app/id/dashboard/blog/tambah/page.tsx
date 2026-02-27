"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Image from "next/image";
import { Image as ImageIcon, Upload, X, AlertCircle } from "lucide-react";

export default function TambahArtikelPage() {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isKategoriOpen, setIsKategoriOpen] = useState(false);
    const [gambar, setGambar] = useState<string | null>(null);
    const [judul, setJudul] = useState("");
    const [kategori, setKategori] = useState<string>("");
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [deskripsi, setDeskripsi] = useState("");
    const [konten, setKonten] = useState("");
    const [showErrors, setShowErrors] = useState(false);
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const ValidationTooltip = ({ show }: { show: boolean }) => {
        if (!show) return null;
        return (
            <div className="absolute z-[60] left-1/2 -translate-x-1/2 top-full mt-1 animate-in fade-in slide-in-from-top-1 duration-200 pointer-events-none">
                {/* Arrow */}
                <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white dark:bg-gray-900 border-t border-l border-gray-200 dark:border-gray-700 rotate-45" />

                {/* Box */}
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-4 py-3 flex items-center gap-3 whitespace-nowrap">
                    <div className="w-6 h-6 bg-[#FF8A00] rounded flex items-center justify-center shadow-inner">
                        <AlertCircle size={14} className="text-white" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-gray-800 dark:text-gray-200 font-medium tracking-tight">Please fill out this field.</span>
                </div>
            </div>
        );
    };

    const kategoriOptions = ["Engineering", "Design", "Personal", "Business"];

    // Click outside dropdown handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsKategoriOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

    const errors = {
        gambar: !gambar,
        judul: !judul.trim(),
        deskripsi: !deskripsi.trim(),
        kategori: !kategori,
        konten: !konten.trim()
    };

    const firstErrorKey = Object.keys(errors).find(key => errors[key as keyof typeof errors]);

    const isFormValid = !firstErrorKey;

    const handlePublishClick = () => {
        if (!isFormValid) {
            setShowErrors(true);
            return;
        }
        setIsPublishModalOpen(true);
    };

    const confirmPublish = () => {
        // Handle actual publish action
        setIsPublishModalOpen(false);
        alert('Artikel berhasil dikirim untuk ditinjau!');
        router.push('/id/dashboard/blog');
    };

    return (
        <div className="flex h-screen bg-white dark:bg-gray-900">
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
                                <span className="text-gray-900 dark:text-white">Tulis Artikel Baru</span>
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Bagikan pengetahuan dan pengalaman Anda dengan komunitas</p>
                        </div>

                        {/* Form */}
                        <div className="space-y-6">
                            {/* Gambar Utama */}
                            <div className="space-y-3 relative">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                    <ImageIcon size={18} className="text-[#E8532F]" />
                                    Gambar Utama
                                </label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`relative w-full h-64 bg-white dark:bg-gray-800 border-2 border-dashed rounded-2xl flex items-center justify-center cursor-pointer transition-all group ${showErrors && errors.gambar
                                        ? "border-red-400 bg-red-50 dark:bg-red-900/10"
                                        : "border-gray-200 dark:border-gray-700 hover:border-[#E8532F] hover:bg-orange-50 dark:hover:bg-orange-900/10"
                                        }`}
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
                                                    <Upload size={32} className="text-white mx-auto mb-2" />
                                                    <p className="text-white text-sm font-bold">Ubah Gambar</p>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center">
                                            <Upload size={32} className={showErrors && errors.gambar ? "text-red-400 mx-auto mb-2" : "text-[#E8532F] mx-auto mb-2"} />
                                            <p className={`text-sm font-bold ${showErrors && errors.gambar ? "text-red-500" : "text-gray-600 dark:text-gray-400"}`}>Pilih Gambar Sampul</p>
                                        </div>
                                    )}
                                </div>
                                <ValidationTooltip show={showErrors && firstErrorKey === 'gambar'} />
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </div>

                            {/* Judul Artikel */}
                            <div className="space-y-0 relative">
                                <input
                                    type="text"
                                    value={judul}
                                    onChange={(e) => setJudul(e.target.value)}
                                    placeholder="Judul Artikel..."
                                    className={`w-full px-0 py-2 bg-transparent border-b rounded-none text-sm md:text-base font-bold text-gray-900 dark:text-white focus:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-600 transition-colors ${showErrors && errors.judul ? "border-red-400" : "border-gray-100 dark:border-gray-800"
                                        }`}
                                />
                                <ValidationTooltip show={showErrors && firstErrorKey === 'judul'} />
                            </div>

                            {/* Deskripsi Singkat */}
                            <div className="space-y-0 relative">
                                <textarea
                                    value={deskripsi}
                                    onChange={(e) => setDeskripsi(e.target.value)}
                                    placeholder="Tulis deskripsi singkat..."
                                    rows={2}
                                    className={`w-full px-0 py-1 bg-transparent border-none rounded-none text-sm italic focus:outline-none resize-none transition-colors ${showErrors && errors.deskripsi ? "text-red-400 placeholder:text-red-300" : "text-gray-400 dark:text-gray-500 placeholder:text-gray-300 dark:placeholder:text-gray-700"
                                        }`}
                                />
                                <ValidationTooltip show={showErrors && firstErrorKey === 'deskripsi'} />
                            </div>

                            {/* Kategori & Tag Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                                {/* Kategori */}
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-[#E8532F] uppercase tracking-wider block">
                                        Kategori
                                    </label>
                                    <div className="relative" ref={dropdownRef}>
                                        <button
                                            type="button"
                                            onClick={() => setIsKategoriOpen(!isKategoriOpen)}
                                            className={`w-full h-[46px] px-4 flex items-center justify-between bg-white dark:bg-gray-800 border rounded-xl text-sm focus:outline-none transition-all cursor-pointer group ${showErrors && errors.kategori ? "border-red-400" : "border-gray-100 dark:border-gray-700"
                                                }`}
                                        >
                                            <span className={kategori ? "text-gray-900 dark:text-gray-100" : (showErrors && errors.kategori ? "text-red-300" : "text-gray-400")}>
                                                {kategori || "Pilih Kategori"}
                                            </span>
                                            <svg
                                                className={`w-4 h-4 transition-transform ${isKategoriOpen ? "rotate-180" : ""} ${showErrors && errors.kategori ? "text-red-400" : "text-gray-400"}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <ValidationTooltip show={showErrors && firstErrorKey === 'kategori'} />

                                        {isKategoriOpen && (
                                            <div className="absolute top-full left-0 w-full mt-2 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 z-50">
                                                {kategoriOptions.map((kat) => (
                                                    <button
                                                        key={kat}
                                                        type="button"
                                                        onClick={() => {
                                                            setKategori(kat);
                                                            setIsKategoriOpen(false);
                                                        }}
                                                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                                    >
                                                        {kat}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Tag */}
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-[#E8532F] uppercase tracking-wider block">
                                        Tags
                                    </label>
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            value={tag}
                                            onChange={(e) => setTag(e.target.value)}
                                            onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                                            placeholder="Tag lalu Enter..."
                                            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-500 focus:outline-none focus:border-gray-300 transition-all"
                                        />
                                        {tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {tags.map((t, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium border border-gray-100 dark:border-gray-700"
                                                    >
                                                        {t}
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveTag(idx)}
                                                            className="hover:text-red-500 transition-colors"
                                                        >
                                                            <X size={10} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-50 dark:border-gray-800" />

                            {/* Konten */}
                            <div className="space-y-2 pt-4 relative">
                                <textarea
                                    value={konten}
                                    onChange={(e) => setKonten(e.target.value)}
                                    placeholder="Mulai menulis konten di sini..."
                                    rows={15}
                                    className={`w-full px-0 py-2 bg-transparent border-none rounded-none text-base focus:outline-none resize-none transition-colors ${showErrors && errors.konten ? "text-red-400 placeholder:text-red-300" : "text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-600"
                                        }`}
                                />
                                <ValidationTooltip show={showErrors && firstErrorKey === 'konten'} />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={() => router.back()}
                                    className="px-6 py-3 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                                    BATAL
                                </button>
                                <button
                                    onClick={handlePublishClick}
                                    className="px-8 py-3 rounded-xl text-sm font-bold text-white shadow-lg bg-[#E8532F] hover:bg-[#d64522] active:scale-95 transition-all"
                                >
                                    TERBITKAN
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Confirmation Modal */}
            {isPublishModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-[500px] rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full border-2 border-orange-100 dark:border-orange-900/30 flex items-center justify-center flex-shrink-0">
                                <AlertCircle className="text-[#E8532F] w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Cek Kembali Artikel</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                    Pastikan judul, gambar, dan isi konten sudah lengkap dan benar.
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 mb-8">
                            <p className="text-xs leading-relaxed text-blue-600 dark:text-blue-400">
                                <span className="font-bold">Catatan:</span>{' '}
                                <span className="font-medium">
                                    Artikel Anda akan masuk ke status <span className="font-bold">"Pending"</span> untuk ditinjau oleh Admin. Akan otomatis dipublikasikan jika sudah disetujui.
                                </span>
                            </p>
                        </div>

                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => setIsPublishModalOpen(false)}
                                className="px-6 py-3 rounded-2xl text-sm font-bold border border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                Periksa Lagi
                            </button>
                            <button
                                onClick={confirmPublish}
                                className="px-6 py-3 rounded-2xl text-sm font-bold bg-[#E8532F] hover:bg-[#d64522] text-white shadow-lg shadow-orange-200 dark:shadow-none transition-all active:scale-95"
                            >
                                Ya, Terbitkan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
