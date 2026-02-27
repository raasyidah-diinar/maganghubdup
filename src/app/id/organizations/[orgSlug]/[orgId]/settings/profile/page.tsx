"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
    MapPin,
    Globe,
    Star,
    Plus,
    Upload,
    Save,
    Briefcase,
    Clock,
    User,
    ShieldCheck,
    GraduationCap,
    Trash2,
    X,
    ChevronLeft,
    ChevronRight,
    MessageCircle,
    Loader2,
} from "lucide-react";

export default function OrganizationProfilePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("tentang");

    const [locations, setLocations] = useState([
        { id: 1, name: "Kampus Sawojajar", address: "Jl. Danau Ranau, Sawojajar, Malang" }
    ]);

    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const [galleryImages, setGalleryImages] = useState([
        { url: "/pemandangan.png", name: "pemandangan.png" },
        { url: "/pemandangan1.png", name: "pemandangan1.png" }
    ]);

    const [policies, setPolicies] = useState([
        { label: "SISTEM KERJA", value: "Onsite" },
        { label: "JAM KERJA", value: "Fleksibel (8 Jam/hari)" },
        { label: "DRESS CODE", value: "Casual / Bebas Rapi" },
        { label: "SERTIFIKAT", value: "Ya, Sertifikat Industri" },
    ]);

    const [bannerUrl, setBannerUrl] = useState<string | null>(null);
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
            </div>
        );
    }

    const addLocation = () => {
        const newLocation = {
            id: Date.now(),
            name: "",
            address: ""
        };
        setLocations([...locations, newLocation]);
    };

    const removeLocation = (id: number) => {
        setLocations(locations.filter(loc => loc.id !== id));
    };

    const updateLocation = (id: number, field: "name" | "address", value: string) => {
        setLocations(locations.map(loc =>
            loc.id === id ? { ...loc, [field]: value } : loc
        ));
    };

    const addPolicy = () => {
        setPolicies([...policies, { label: "KEBIJAKAN BARU", value: "" }]);
    };

    const removePolicy = (index: number) => {
        setPolicies(policies.filter((_, i) => i !== index));
    };

    const updatePolicy = (index: number, field: "label" | "value", value: string) => {
        setPolicies(policies.map((p, i) => i === index ? { ...p, [field]: value } : p));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setGalleryImages([...galleryImages, { url: imageUrl, name: file.name }]);
        }
    };

    const removeGalleryImage = (index: number) => {
        setGalleryImages(galleryImages.filter((_, i) => i !== index));
    };

    const nextImage = () => {
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
        }
    };

    const prevImage = () => {
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
        }
    };

    const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setBannerUrl(imageUrl);
        }
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setLogoUrl(imageUrl);
        }
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            window.alert("Profil Berhasil Disimpan!");
        }, 1500);
    };

    const tabs = [
        { id: "tentang", label: "Tentang Kami" },
        { id: "anggota", label: "Anggota", count: 1 },
        { id: "ulasan", label: "Ulasan", count: 1 },
    ];

    return (
        <div className="pb-12 animate-in fade-in duration-700 relative">
            {/* Hero Section: Banner & Logo */}
            <div className="relative mb-6 bg-white dark:bg-gray-800 rounded-b-[32px] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                {/* Banner */}
                <div className="h-64 sm:h-72 w-full relative bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
                    {bannerUrl && (
                        <Image
                            src={bannerUrl}
                            alt="Organization Banner"
                            fill
                            className="object-cover"
                        />
                    )}
                    <div className="absolute top-4 left-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/50 px-2 py-0.5 rounded">Banner</div>
                    <label className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleBannerUpload}
                            accept="image/*"
                        />
                        <div className="bg-white/90 dark:bg-gray-800/90 p-3 rounded-full shadow-xl transform transition-all active:scale-90">
                            <Upload size={20} className="text-gray-700 dark:text-gray-200" />
                        </div>
                    </label>
                </div>

                {/* Logo & Info Bar Container */}
                <div className="px-8 pb-8 flex flex-col pt-0">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                        {/* Logo Overlay */}
                        <div className="relative -mt-20 z-10 w-44 h-44 bg-white dark:bg-gray-800 rounded-[32px] p-4 shadow-xl border-4 border-white dark:border-gray-900 group shrink-0">
                            <div className="w-full h-full relative rounded-2xl overflow-hidden bg-white flex flex-col items-center justify-center border border-gray-50">
                                <div className="relative w-16 h-16 mb-2">
                                    <Image
                                        src={logoUrl || "/smktelkom.png"}
                                        alt="Organization Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-[10px] font-black text-gray-400 tracking-tighter uppercase">COMPANY</span>
                            </div>
                            <label className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[32px] cursor-pointer">
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleLogoUpload}
                                    accept="image/*"
                                />
                                <Upload size={20} className="text-white" />
                            </label>
                        </div>

                        {/* Info Area */}
                        <div className="w-full mt-2 md:mt-0 flex-1 pt-8">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="space-y-4">
                                    <h1 className="text-3xl font-bold text-[#001D35] dark:text-white leading-tight">
                                        SMK Telkom 20 Malang
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <GraduationCap size={18} className="text-gray-400" />
                                            <span>Sekolah Menenga...</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Star size={18} className="text-[#FA7A2E] fill-[#FA7A2E]" />
                                            <span className="text-[#FA7A2E] font-semibold">4.8 (1 Ulasan)</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold shadow-sm border-0 self-start md:self-center"
                                >
                                    <Save className="size-4" />
                                    <span>{isSaving ? "Menyimpan.." : "Simpan"}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Links Row */}
                    <div className="flex flex-col sm:flex-row gap-8 mt-8">
                        <div className="flex items-center gap-2.5 group cursor-pointer">
                            <MapPin size={18} className="text-[#FA7A2E]" />
                            <span className="text-[14px] font-semibold text-gray-500 hover:text-[#FA7A2E] transition-colors border-b border-dotted border-gray-400 group-hover:border-[#FA7A2E]">
                                Jl. Danau Ranau, Sawojajar, Malang
                            </span>
                        </div>
                        <div className="flex items-center gap-2.5 group cursor-pointer">
                            <Globe size={18} className="text-blue-500" />
                            <span className="text-[14px] font-semibold text-gray-500 hover:text-blue-600 transition-colors">
                                https://smktelkom-mlg.sch.id
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-0 px-8">
                {/* Left Column: Tabs & Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Tabs */}
                    <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[20px] shadow-sm overflow-hidden p-1.5 gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-2 transition-all font-semibold text-[14px] rounded-[16px] ${activeTab === tab.id
                                    ? "bg-[#FFF9F3] dark:bg-orange-950/20 text-[#FA7A2E] !font-bold"
                                    : "text-[#001D35] dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                    }`}
                            >
                                <span className="truncate">{tab.label}</span>
                                {tab.count !== undefined && (
                                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-[11px] font-bold shrink-0 ${tab.id === "anggota"
                                        ? "bg-[#FA7A2E] text-white"
                                        : "bg-[#E2E8F0] dark:bg-gray-700 text-[#94A3B8]"
                                        }`}>
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {activeTab === "tentang" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Deskripsi */}
                            <div className="bg-white dark:bg-gray-800 rounded-[28px] p-8 border border-gray-100 dark:border-gray-700 shadow-sm relative group">
                                <h2 className="text-[20px] font-bold text-[#001D35] dark:text-white mb-6">Deskripsi</h2>
                                <p className="text-[15px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                    Sekolah kejuruan terbaik di bidang IT dan Telekomunikasi.
                                </p>
                            </div>

                            {/* Lokasi Kantor */}
                            <div className="bg-white dark:bg-gray-800 rounded-[28px] p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-[20px] font-bold text-[#001D35] dark:text-white">Lokasi Kantor</h2>
                                    <button
                                        onClick={addLocation}
                                        className="flex items-center gap-1 text-[13px] font-semibold text-[#FA7A2E] hover:underline px-4 py-2 rounded-xl bg-orange-50/30 dark:bg-orange-950/10 transition-colors"
                                    >
                                        <Plus size={16} />
                                        <span>Tambah</span>
                                    </button>
                                </div>

                                {locations.length > 0 ? (
                                    <div className="space-y-4">
                                        {locations.map((loc) => (
                                            <div key={loc.id} className="flex gap-4 group">
                                                {/* Map Placeholder with Delete Button */}
                                                <div className="relative w-48 aspect-[3/2] bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-center shrink-0">
                                                    <MapPin size={32} className="text-gray-200" />
                                                    <button
                                                        onClick={() => removeLocation(loc.id)}
                                                        className="absolute top-3 right-3 p-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>

                                                {/* Form Fields */}
                                                <div className="flex-1 space-y-2 py-2">
                                                    <input
                                                        type="text"
                                                        value={loc.name}
                                                        onChange={(e) => updateLocation(loc.id, "name", e.target.value)}
                                                        placeholder="Nama Kantor"
                                                        className="w-full text-[15px] font-bold text-[#001D35] dark:text-white bg-transparent border-none p-0 focus:ring-0 placeholder:text-gray-400 placeholder:font-bold"
                                                    />
                                                    <textarea
                                                        value={loc.address}
                                                        onChange={(e) => updateLocation(loc.id, "address", e.target.value)}
                                                        placeholder="Alamat lengkap..."
                                                        rows={2}
                                                        className="w-full text-[14px] font-semibold text-gray-500 dark:text-gray-400 bg-transparent border-none p-0 focus:ring-0 resize-none placeholder:text-gray-300"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-gray-50/30 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-100 dark:border-gray-800 p-10 flex flex-col items-center justify-center text-center">
                                        <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-50 dark:border-gray-700">
                                            <MapPin size={24} className="text-gray-200" />
                                        </div>
                                        <p className="text-[11px] font-semibold text-gray-300 uppercase tracking-widest">Belum ada lokasi kantor tambahan</p>
                                    </div>
                                )}
                            </div>

                            {/* Galeri */}
                            <div className="bg-white dark:bg-gray-800 rounded-[28px] p-8 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-[20px] font-bold text-[#001D35] dark:text-white">Galeri</h2>
                                    <div>
                                        <input
                                            type="file"
                                            id="gallery-upload"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                        <button
                                            onClick={() => document.getElementById("gallery-upload")?.click()}
                                            className="flex items-center gap-1 text-[13px] font-semibold text-[#FA7A2E] hover:underline px-4 py-2 rounded-xl bg-orange-50/30 dark:bg-orange-950/10 transition-colors"
                                        >
                                            <Upload size={16} />
                                            <span>Upload</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                    {galleryImages.map((image, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer border border-gray-100"
                                        >
                                            <Image
                                                src={image.url}
                                                alt={`Gallery Image ${index + 1}`}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeGalleryImage(index);
                                                    }}
                                                    className="w-8 h-8 bg-[#FF3B30] hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300 pointer-events-auto"
                                                >
                                                    <X size={16} strokeWidth={2.5} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "anggota" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold text-[#001D35] dark:text-white">Manajemen Anggota</h1>
                                <button className="flex items-center gap-2 px-4 py-1.5 border border-[#FA7A2E] text-[#FA7A2E] font-semibold rounded-[14px] hover:bg-orange-50 transition-colors active:scale-95 text-[14px]">
                                    <Plus size={16} />
                                    <span>Kelola</span>
                                </button>
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="group flex items-center justify-between py-3 px-4 w-fit min-w-[250px] rounded-xl border border-slate-100 bg-white hover:border-orange-500 hover:shadow-sm transition-all duration-200 dark:bg-slate-900 dark:border-gray-800 cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-orange-100 p-0.5 group-hover:border-orange-200 transition-colors">
                                            <Image
                                                src="/hyein.png"
                                                alt="Raasyidah Diinar"
                                                fill
                                                className="object-cover rounded-full"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[14px] font-bold text-[#001D35] dark:text-white group-hover:text-[#FA7A2E] transition-colors line-clamp-1">Raasyidah Diinar</span>
                                            <span className="text-[12px] font-medium text-gray-400 group-hover:text-gray-500 transition-colors">@raasyidah</span>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-300 group-hover:text-[#FA7A2E] group-hover:translate-x-1 transition-all ml-8" />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "ulasan" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Rating Summary Card */}
                            <div className="bg-[#FFF9F3] dark:bg-orange-950/10 rounded-[28px] py-6 px-10 border border-orange-50 dark:border-orange-900/20 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="text-center md:text-left">
                                    <h2 className="text-[18px] font-semibold text-[#001D35] dark:text-white mb-2">Rating Organisasi</h2>
                                    <p className="text-[13px] text-gray-400 font-medium">Dilihat oleh calon pemagang</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <span className="text-[56px] font-semibold text-[#FA7A2E]">4.8</span>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={20} fill="#FA7A2E" className="text-[#FA7A2E]" />
                                            ))}
                                        </div>
                                        <span className="text-[12px] font-medium text-gray-400 text-center md:text-left">1 Ulasan</span>
                                    </div>
                                </div>
                            </div>

                            {/* Reviews List */}
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-[28px] border border-gray-100 dark:border-gray-700 shadow-sm relative group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center border border-gray-50 dark:border-gray-600">
                                            <span className="text-[16px] font-semibold text-gray-500 dark:text-gray-400">BS</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[15px] font-semibold text-[#001D35] dark:text-white">Budi Santoso</span>
                                            <span className="text-[12px] font-medium text-gray-400">Frontend Intern</span>
                                        </div>
                                    </div>
                                    <button className="flex items-center gap-2 text-[#FA7A2E] hover:underline font-semibold text-[13px]">
                                        <MessageCircle size={18} />
                                        <span>Balas</span>
                                    </button>
                                </div>
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill="#FA7A2E" className="text-[#FA7A2E]" />
                                    ))}
                                </div>
                                <p className="text-[14px] font-medium text-[#001D35] dark:text-gray-300">
                                    Mentor sangat suportif.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Policies Side Card */}
                <div className="h-fit">
                    <div className="bg-white dark:bg-gray-800 rounded-[28px] p-8 border border-gray-100 dark:border-gray-700 shadow-sm sticky top-4">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-[20px] font-bold text-[#001D35] dark:text-white">Kebijakan</h2>
                            <button
                                onClick={addPolicy}
                                className="flex items-center gap-1 text-[13px] font-semibold text-[#FA7A2E] hover:underline"
                            >
                                <Plus size={14} />
                                Tambah
                            </button>
                        </div>

                        <div className="h-[1px] bg-gray-100 dark:bg-gray-800 -mx-8 mb-10" />

                        <div className="space-y-2">
                            {policies.map((item, idx) => (
                                <div key={idx} className="flex flex-col items-start gap-1 group/policy relative">
                                    <div className="w-full flex items-center justify-between pl-4">
                                        <input
                                            type="text"
                                            value={item.label}
                                            onChange={(e) => updatePolicy(idx, "label", e.target.value)}
                                            placeholder="NAMA KEBIJAKAN"
                                            className="bg-transparent border-none p-0 focus:ring-0 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.1em] text-left w-full"
                                        />
                                        <button
                                            onClick={() => removePolicy(idx)}
                                            className="opacity-0 group-hover/policy:opacity-100 transition-opacity p-0.5 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg text-red-400 transition-colors shrink-0"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                    <div className="w-full py-1.5 px-4 bg-gray-50/50 dark:bg-gray-900/40 rounded-[18px] border border-gray-50 dark:border-gray-800/60 text-left">
                                        <input
                                            type="text"
                                            value={item.value}
                                            onChange={(e) => updatePolicy(idx, "value", e.target.value)}
                                            placeholder="Isi kebijakan..."
                                            className="w-full bg-transparent border-none p-0 focus:ring-0 text-[14px] font-medium text-[#001D35] dark:text-white placeholder:text-gray-300"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Lightbox Overlay */}
            {selectedImageIndex !== null && galleryImages[selectedImageIndex] && (
                <div
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 animate-in fade-in duration-300"
                    onClick={() => setSelectedImageIndex(null)}
                >
                    {/* Top Bar Navigation */}
                    <div className="absolute top-0 inset-x-0 h-24 px-8 flex items-center justify-between text-white bg-gradient-to-b from-black/80 to-transparent z-10">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black text-white/40 tracking-[0.2em] uppercase">
                                {selectedImageIndex + 1} / {galleryImages.length} PHOTOS
                            </span>
                            <span className="text-xl font-bold tracking-tight">
                                {galleryImages[selectedImageIndex].name}
                            </span>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(null); }}
                            className="p-3.5 bg-white/10 hover:bg-white/20 rounded-2xl transition-all shadow-2xl backdrop-blur-xl border border-white/10 group active:scale-90"
                        >
                            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>

                    {/* Left/Right Navigation */}
                    <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-10 p-5 bg-white/5 hover:bg-white/15 rounded-3xl text-white transition-all backdrop-blur-md border border-white/5 z-20 group active:scale-90"
                    >
                        <ChevronLeft size={44} className="group-hover:-translate-x-1 transition-transform" />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-10 p-5 bg-white/5 hover:bg-white/15 rounded-3xl text-white transition-all backdrop-blur-md border border-white/5 z-20 group active:scale-90"
                    >
                        <ChevronRight size={44} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Image Viewer */}
                    <div
                        className="relative w-full h-[70vh] flex items-center justify-center p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full max-w-7xl rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                            <Image
                                src={galleryImages[selectedImageIndex].url}
                                alt="Preview"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
