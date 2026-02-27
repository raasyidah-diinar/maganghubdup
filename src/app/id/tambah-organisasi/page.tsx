"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Building2,
    Mail,
    MapPin,
    Upload,
    ChevronDown,
    Check,
    Phone,
    ArrowLeft,
    Search,
    Camera,
    ChevronsUpDown
} from "lucide-react";

interface Province { id: string; name: string; }
interface Regency { id: string; province_id: string; name: string; }
interface District { id: string; regency_id: string; name: string; }

export default function RegistrasiOrganisasi() {
    const [status, setStatus] = useState<("INDUSTRI" | "PENDIDIKAN")[]>([]);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [searchType, setSearchType] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [namaResmi, setNamaResmi] = useState("");
    const [namaBrand, setNamaBrand] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [email, setEmail] = useState("Diinar@gmail.com");
    const [noTelepon, setNoTelepon] = useState("");
    const [alamatLengkap, setAlamatLengkap] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const typeRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Regional State
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [regencies, setRegencies] = useState<Regency[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedRegency, setSelectedRegency] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [isLoadingRegions, setIsLoadingRegions] = useState({ provinces: false, regencies: false, districts: false });

    // Custom Dropdown States
    const [searchProvince, setSearchProvince] = useState("");
    const [searchRegency, setSearchRegency] = useState("");
    const [searchDistrict, setSearchDistrict] = useState("");

    const provRef = useRef<HTMLDivElement>(null);
    const regRef = useRef<HTMLDivElement>(null);
    const distRef = useRef<HTMLDivElement>(null);

    // Fetch Provinces on Load
    useEffect(() => {
        const fetchProvinces = async () => {
            setIsLoadingRegions(prev => ({ ...prev, provinces: true }));
            try {
                const response = await fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
                const data = await response.json();
                setProvinces(data);
            } catch (error) {
                console.error("Error fetching provinces:", error);
            } finally {
                setIsLoadingRegions(prev => ({ ...prev, provinces: false }));
            }
        };
        fetchProvinces();
    }, []);

    // Fetch Regencies when Province changes
    useEffect(() => {
        if (!selectedProvince) {
            setRegencies([]);
            return;
        }
        const fetchRegencies = async () => {
            setIsLoadingRegions(prev => ({ ...prev, regencies: true }));
            try {
                const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`);
                const data = await response.json();
                setRegencies(data);
            } catch (error) {
                console.error("Error fetching regencies:", error);
            } finally {
                setIsLoadingRegions(prev => ({ ...prev, regencies: false }));
            }
        };
        fetchRegencies();
    }, [selectedProvince]);

    // Fetch Districts when Regency changes
    useEffect(() => {
        if (!selectedRegency) {
            setDistricts([]);
            return;
        }
        const fetchDistricts = async () => {
            setIsLoadingRegions(prev => ({ ...prev, districts: true }));
            try {
                const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegency}.json`);
                const data = await response.json();
                setDistricts(data);
            } catch (error) {
                console.error("Error fetching districts:", error);
            } finally {
                setIsLoadingRegions(prev => ({ ...prev, districts: false }));
            }
        };
        fetchDistricts();
    }, [selectedRegency]);

    // Handle click outside for dropdowns
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (typeRef.current && !typeRef.current.contains(event.target as Node) &&
                provRef.current && !provRef.current.contains(event.target as Node) &&
                regRef.current && !regRef.current.contains(event.target as Node) &&
                distRef.current && !distRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setLogoPreview(url);
        }
    };

    const toggleStatus = (type: "INDUSTRI" | "PENDIDIKAN") => {
        setStatus(prev => {
            const newStatus = prev.includes(type)
                ? prev.filter(s => s !== type)
                : [...prev, type];

            if (newStatus.length === 0) setSelectedType("");
            return newStatus;
        });
    };

    const isFormValid =
        namaResmi.trim() !== "" &&
        namaBrand.trim() !== "" &&
        status.length > 0 &&
        selectedType !== "" &&
        deskripsi.trim() !== "" &&
        email.trim() !== "" &&
        noTelepon.trim() !== "" &&
        selectedProvince !== "" &&
        selectedRegency !== "" &&
        selectedDistrict !== "" &&
        alamatLengkap.trim() !== "" &&
        logoPreview !== null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid || isSubmitting) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
    };

    const industryTypes = [
        "Finansial",
        "Kesehatan",
        "Konstruksi",
        "Kreatif",
        "Logistik",
        "Manufaktur",
        "Pertambangan",
        "Teknologi"
    ];

    const educationTypes = [
        "Kursus",
        "Lembaga Pelatihan",
        "Perguruan Tinggi",
        "Pesantren",
        "SMA",
        "SMK",
        "Yayasan Pendidikan"
    ];

    const currentTypes = Array.from(new Set([
        ...(status.includes("INDUSTRI") ? industryTypes : []),
        ...(status.includes("PENDIDIKAN") ? educationTypes : [])
    ])).sort();

    const filteredTypes = currentTypes.filter(type =>
        type.toLowerCase().includes(searchType.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#E8532F] to-[#FFA500] p-8 sm:p-10 text-white">
                        <h1 className="text-3xl font-bold mb-2">Registrasi Organisasi</h1>
                        <p className="text-orange-50/80 text-sm font-medium">
                            Lengkapi profil untuk verifikasi sistem.
                        </p>
                    </div>

                    <div className="p-8 sm:p-10 space-y-10">
                        {/* Section: Informasi Dasar */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
                                <Building2 size={20} className="text-[#E8532F]" />
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Informasi Dasar</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                {/* Logo Upload */}
                                <div className="md:col-span-4 flex flex-col items-center">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 w-full text-left">Logo</label>
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full aspect-square rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-orange-300 dark:hover:border-orange-500 transition-all bg-gray-50 dark:bg-gray-900/50 group overflow-hidden relative"
                                    >
                                        {logoPreview ? (
                                            <Image
                                                src={logoPreview}
                                                alt="Logo Preview"
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <Camera size={32} className="text-gray-300 group-hover:text-orange-400 transition-colors" />
                                        )}
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleLogoChange}
                                        />
                                    </div>
                                </div>

                                {/* Names */}
                                <div className="md:col-span-8 space-y-5">
                                    <div className="space-y-2 text-left">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Nama Resmi</label>
                                        <input
                                            type="text"
                                            value={namaResmi}
                                            onChange={(e) => {
                                                setNamaResmi(e.target.value);
                                                setNamaBrand(e.target.value);
                                            }}
                                            placeholder="PT / Yayasan / CV..."
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2 text-left">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Nama Brand</label>
                                        <input
                                            type="text"
                                            value={namaBrand}
                                            onChange={(e) => setNamaBrand(e.target.value)}
                                            placeholder="Nama populer..."
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Status & Tipe */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                                <div className="space-y-3 text-left">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Status Organisasi</label>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => toggleStatus("INDUSTRI")}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-bold transition-all border ${status.includes("INDUSTRI") ? "bg-[#E8532F] text-white border-[#E8532F] shadow-lg shadow-orange-500/30" : "bg-white dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700 hover:border-orange-200"}`}
                                        >
                                            {status.includes("INDUSTRI") && <Check size={14} />}
                                            INDUSTRI
                                        </button>
                                        <button
                                            onClick={() => toggleStatus("PENDIDIKAN")}
                                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-bold transition-all border ${status.includes("PENDIDIKAN") ? "bg-[#E8532F] text-white border-[#E8532F] shadow-lg shadow-orange-500/30" : "bg-white dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700 hover:border-orange-200"}`}
                                        >
                                            {status.includes("PENDIDIKAN") && <Check size={14} />}
                                            PENDIDIKAN
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-3 relative text-left" ref={typeRef}>
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tipe Organisasi</label>
                                    <button
                                        disabled={status.length === 0}
                                        onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm outline-none transition-all text-sm ${status.length === 0 ? "bg-gray-50/50 dark:bg-gray-800/30 text-gray-300 cursor-not-allowed opacity-60" : "bg-white dark:bg-gray-900 focus:ring-2 focus:ring-orange-500 text-gray-500 hover:border-orange-200"}`}
                                    >
                                        <span className={selectedType ? "text-gray-900 dark:text-white font-medium" : ""}>
                                            {selectedType || "Pilih Tipe"}
                                        </span>
                                        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${openDropdown === 'type' ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Custom Searchable Dropdown */}
                                    {openDropdown === 'type' && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                                                <div className="relative">
                                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        autoFocus
                                                        type="text"
                                                        placeholder="Cari tipe..."
                                                        value={searchType}
                                                        onChange={(e) => setSearchType(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-orange-500 transition-all font-medium"
                                                    />
                                                </div>
                                            </div>
                                            <div className="max-h-52 overflow-y-auto custom-scrollbar p-1">
                                                {filteredTypes.length > 0 ? (
                                                    filteredTypes.map((type) => (
                                                        <button
                                                            key={type}
                                                            onClick={() => {
                                                                setSelectedType(type);
                                                                setOpenDropdown(null);
                                                                setSearchType("");
                                                            }}
                                                            className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-910/10 text-sm text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-all font-medium"
                                                        >
                                                            {type}
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-8 text-center text-sm text-gray-400 italic">
                                                        Tipe tidak ditemukan
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2 text-left">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Deskripsi</label>
                                <textarea
                                    rows={4}
                                    value={deskripsi}
                                    onChange={(e) => setDeskripsi(e.target.value)}
                                    placeholder="Jelaskan fokus organisasi..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm resize-none"
                                />
                            </div>
                        </section>

                        {/* Section: Kontak */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
                                <Mail size={20} className="text-[#E8532F]" />
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Kontak</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">No. Telepon</label>
                                    <input
                                        type="tel"
                                        value={noTelepon}
                                        onChange={(e) => setNoTelepon(e.target.value)}
                                        placeholder=" "
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Section: Lokasi */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
                                <MapPin size={20} className="text-[#E8532F]" />
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Lokasi</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                                {/* Provinsi */}
                                <div className="space-y-2 relative" ref={provRef}>
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Provinsi</label>
                                    <button
                                        onClick={() => setOpenDropdown(openDropdown === 'province' ? null : 'province')}
                                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 shadow-sm outline-none transition-all text-sm group hover:border-orange-200"
                                    >
                                        <span className={selectedProvince ? "text-gray-900 dark:text-white font-medium truncate" : "text-gray-400"}>
                                            {provinces.find(p => p.id === selectedProvince)?.name || (isLoadingRegions.provinces ? "Memuat..." : "Pilih Provinsi")}
                                        </span>
                                        <ChevronsUpDown size={14} className="text-gray-400" />
                                    </button>

                                    {openDropdown === 'province' && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="p-2 border-b border-gray-100 dark:border-gray-700">
                                                <div className="relative">
                                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        autoFocus
                                                        type="text"
                                                        placeholder="Cari..."
                                                        value={searchProvince}
                                                        onChange={(e) => setSearchProvince(e.target.value)}
                                                        className="w-full pl-9 pr-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-lg text-xs outline-none focus:border-orange-500 transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div className="max-h-52 overflow-y-auto custom-scrollbar p-1">
                                                {provinces.filter(p => p.name.toLowerCase().includes(searchProvince.toLowerCase())).map(p => (
                                                    <button
                                                        key={p.id}
                                                        onClick={() => {
                                                            setSelectedProvince(p.id);
                                                            setSelectedRegency("");
                                                            setSelectedDistrict("");
                                                            setOpenDropdown(null);
                                                            setSearchProvince("");
                                                        }}
                                                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/10 text-xs text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-all"
                                                    >
                                                        {p.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Kota */}
                                <div className="space-y-2 relative" ref={regRef}>
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Kota</label>
                                    <button
                                        disabled={!selectedProvince}
                                        onClick={() => setOpenDropdown(openDropdown === 'regency' ? null : 'regency')}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm outline-none transition-all text-sm ${!selectedProvince ? "bg-gray-100 dark:bg-gray-800/50 text-gray-300 cursor-not-allowed" : "bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-white hover:border-orange-200"}`}
                                    >
                                        <span className={selectedRegency ? "text-gray-900 dark:text-white font-medium truncate" : "text-gray-400"}>
                                            {regencies.find(r => r.id === selectedRegency)?.name || (isLoadingRegions.regencies ? "Memuat..." : "Pilih Kota")}
                                        </span>
                                        <ChevronsUpDown size={14} className="text-gray-400" />
                                    </button>

                                    {openDropdown === 'regency' && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="p-2 border-b border-gray-100 dark:border-gray-700">
                                                <div className="relative">
                                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        autoFocus
                                                        type="text"
                                                        placeholder="Cari..."
                                                        value={searchRegency}
                                                        onChange={(e) => setSearchRegency(e.target.value)}
                                                        className="w-full pl-9 pr-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-lg text-xs outline-none focus:border-orange-500 transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div className="max-h-52 overflow-y-auto custom-scrollbar p-1">
                                                {regencies.filter(r => r.name.toLowerCase().includes(searchRegency.toLowerCase())).map(r => (
                                                    <button
                                                        key={r.id}
                                                        onClick={() => {
                                                            setSelectedRegency(r.id);
                                                            setSelectedDistrict("");
                                                            setOpenDropdown(null);
                                                            setSearchRegency("");
                                                        }}
                                                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/10 text-xs text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-all"
                                                    >
                                                        {r.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Kecamatan */}
                                <div className="space-y-2 relative" ref={distRef}>
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Kecamatan</label>
                                    <button
                                        disabled={!selectedRegency}
                                        onClick={() => setOpenDropdown(openDropdown === 'district' ? null : 'district')}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm outline-none transition-all text-sm ${!selectedRegency ? "bg-gray-100 dark:bg-gray-800/50 text-gray-300 cursor-not-allowed" : "bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-white hover:border-orange-200"}`}
                                    >
                                        <span className={selectedDistrict ? "text-gray-900 dark:text-white font-medium truncate" : "text-gray-400"}>
                                            {districts.find(d => d.id === selectedDistrict)?.name || (isLoadingRegions.districts ? "Memuat..." : "Pilih Kecamatan")}
                                        </span>
                                        <ChevronsUpDown size={14} className="text-gray-400" />
                                    </button>

                                    {openDropdown === 'district' && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="p-2 border-b border-gray-100 dark:border-gray-700">
                                                <div className="relative">
                                                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        autoFocus
                                                        type="text"
                                                        placeholder="Cari..."
                                                        value={searchDistrict}
                                                        onChange={(e) => setSearchDistrict(e.target.value)}
                                                        className="w-full pl-9 pr-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-lg text-xs outline-none focus:border-orange-500 transition-all"
                                                    />
                                                </div>
                                            </div>
                                            <div className="max-h-52 overflow-y-auto custom-scrollbar p-1">
                                                {districts.filter(d => d.name.toLowerCase().includes(searchDistrict.toLowerCase())).map(d => (
                                                    <button
                                                        key={d.id}
                                                        onClick={() => {
                                                            setSelectedDistrict(d.id);
                                                            setOpenDropdown(null);
                                                            setSearchDistrict("");
                                                        }}
                                                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/10 text-xs text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-all"
                                                    >
                                                        {d.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2 text-left">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Alamat Lengkap</label>
                                <textarea
                                    rows={3}
                                    value={alamatLengkap}
                                    onChange={(e) => setAlamatLengkap(e.target.value)}
                                    placeholder="Nama jalan, RT/RW, gedung..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm resize-none"
                                />
                            </div>
                        </section>

                        {/* Submit Button */}
                        <button
                            disabled={!isFormValid || isSubmitting}
                            onClick={handleSubmit}
                            className={`w-full py-4 px-6 rounded-2xl font-bold text-base shadow-lg transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2 ${!isFormValid || isSubmitting ? "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed shadow-none" : "bg-[#E8532F] hover:bg-[#D44726] text-white shadow-orange-500/30"}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Proses...
                                </>
                            ) : (
                                "Daftarkan Organisasi Sekarang"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
