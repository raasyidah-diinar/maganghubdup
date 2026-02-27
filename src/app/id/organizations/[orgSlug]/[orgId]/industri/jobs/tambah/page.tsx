"use client";

import { useState, useEffect, useRef } from "react";
import {
    ChevronLeft,
    Send,
    Briefcase,
    Users,
    DollarSign,
    FileText,
    Plus,
    X,
    MapPin,
    Building2,
    ChevronDown,
    Check
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function PostJobPage() {
    const params = useParams();
    const router = useRouter();
    const orgSlug = params.orgSlug;
    const orgId = params.orgId;

    const [isHeaderSticky, setIsHeaderSticky] = useState(false);
    const [locationType, setLocationType] = useState<"ONSITE" | "REMOTE" | "HYBRID">("ONSITE");
    const [category, setCategory] = useState("Technology");
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const categoryRef = useRef<HTMLDivElement>(null);
    const [education, setEducation] = useState("");
    const [isEducationOpen, setIsEducationOpen] = useState(false);
    const educationRef = useRef<HTMLDivElement>(null);
    const [genderPreference, setGenderPreference] = useState<"SEMUA" | "LAKI_LAKI" | "PEREMPUAN">("SEMUA");
    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState("");
    const [benefits, setBenefits] = useState<string[]>([]);
    const [benefitInput, setBenefitInput] = useState("");

    const CATEGORIES = ["Technology", "Design", "Marketing", "Business"];
    const EDUCATIONS = ["SMA/SMK", "Diploma (D3)", "Sarjana (S1)"];

    useEffect(() => {
        const handleScroll = () => {
            setIsHeaderSticky(window.scrollY > 20);
        };
        const handleClickOutside = (event: MouseEvent) => {
            if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
                setIsCategoryOpen(false);
            }
            if (educationRef.current && !educationRef.current.contains(event.target as Node)) {
                setIsEducationOpen(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleAddSkill = () => {
        if (skillInput && !skills.includes(skillInput)) {
            setSkills([...skills, skillInput]);
            setSkillInput("");
        }
    };

    const handleRemoveSkill = (skill: string) => {
        setSkills(skills.filter(s => s !== skill));
    };

    const handleAddBenefit = () => {
        if (benefitInput && !benefits.includes(benefitInput)) {
            setBenefits([...benefits, benefitInput]);
            setBenefitInput("");
        }
    };

    const handleRemoveBenefit = (benefit: string) => {
        setBenefits(benefits.filter(b => b !== benefit));
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] dark:bg-gray-950 -ml-4 lg:-ml-6 -mt-6 lg:-mt-8 px-6 pb-20">
            {/* Sticky Header */}
            <div className={`sticky top-0 z-50 transition-all duration-300 pt-3 pb-5 px-6 -mx-6 mb-8 bg-white dark:bg-gray-900 ${isHeaderSticky
                ? "shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border-b border-gray-100 dark:border-gray-800"
                : "border-b border-transparent"
                }`}>
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => router.back()}
                            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                            <ChevronLeft size={22} />
                        </button>
                        <h1 className="text-xl font-bold text-[#001D3D] dark:text-white">Posting Lowongan Baru</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="px-6 py-2 text-sm font-semibold text-[#001D3D] dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm">
                            Simpan Draft
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2 bg-[#FF7A00] hover:bg-[#e66e00] text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-95">
                            <Send size={15} />
                            Publish
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
                {/* 1. DETAIL LOWONGAN */}
                <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm relative z-20">
                    <div className="px-8 py-6 border-b border-gray-50 dark:border-gray-800 flex items-center gap-3">
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <Briefcase size={18} className="text-[#FF7A00]" />
                        </div>
                        <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Detail Lowongan</h2>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Judul Posisi</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Senior UI/UX Designer"
                                    className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-30">
                            <div className="space-y-2 relative">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Bidang Pekerjaan</label>
                                <div className="relative" ref={categoryRef}>
                                    <button
                                        type="button"
                                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                        className={`w-full flex items-center justify-between px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border rounded-2xl transition-all outline-none text-sm text-left ${isCategoryOpen
                                            ? "border-[#FF7A00] ring-4 ring-orange-500/10 shadow-sm"
                                            : "border-gray-100 dark:border-gray-700 hover:border-gray-200"
                                            }`}
                                    >
                                        <span className={`capitalize ${isCategoryOpen ? "text-[#FF7A00] font-bold" : "text-gray-900 dark:text-white"}`}>
                                            {category}
                                        </span>
                                        <ChevronDown size={18} className={`transition-transform duration-200 ${isCategoryOpen ? "rotate-180 text-[#FF7A00]" : "text-gray-400"}`} />
                                    </button>

                                    {isCategoryOpen && (
                                        <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[28px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] z-[100] py-2 animate-in fade-in zoom-in-95 duration-200">
                                            {CATEGORIES.map((item) => (
                                                <div key={item} className="px-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setCategory(item);
                                                            setIsCategoryOpen(false);
                                                        }}
                                                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl transition-all text-sm font-medium ${category === item
                                                            ? "bg-[#EEF2F6] dark:bg-gray-700 text-[#001D3D] font-bold"
                                                            : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                                            }`}
                                                    >
                                                        <span>{item}</span>
                                                        {category === item && <Check size={16} />}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Kuota (Slot)</label>
                                <input
                                    type="number"
                                    defaultValue={1}
                                    className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Tipe Lokasi</label>
                                <div className="flex p-1 bg-[#EEF2F6] dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                                    {(["ONSITE", "REMOTE", "HYBRID"] as const).map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setLocationType(type)}
                                            className={`flex-1 py-2 text-[10px] font-bold rounded-xl transition-all ${locationType === type
                                                ? "bg-white dark:bg-gray-700 text-[#FF7A00] shadow-sm"
                                                : "text-gray-400 dark:text-gray-500 hover:text-gray-600"
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Pilih Alamat Kantor / Cabang</label>
                            <select className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none text-sm text-gray-400">
                                <option>Pilih Alamat Terdaftar Organisasi</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 2. KRITERIA KANDIDAT */}
                <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-50 dark:border-gray-800 flex items-center gap-3">
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <Users size={18} className="text-[#FF7A00]" />
                        </div>
                        <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Kriteria Kandidat</h2>
                    </div>
                    <div className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                            <div className="space-y-2 relative">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Minimal Pendidikan</label>
                                <div className="relative" ref={educationRef}>
                                    <button
                                        type="button"
                                        onClick={() => setIsEducationOpen(!isEducationOpen)}
                                        className={`w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border rounded-xl transition-all outline-none text-sm text-left ${isEducationOpen
                                            ? "border-[#FF7A00] ring-4 ring-orange-500/10 shadow-sm"
                                            : "border-gray-100 dark:border-gray-700 hover:border-gray-200"
                                            }`}
                                    >
                                        <span className={education ? "text-gray-900 dark:text-white" : "text-gray-400 font-medium"}>
                                            {education || "Pilih Pendidikan"}
                                        </span>
                                        <ChevronDown size={16} className={`transition-transform duration-200 ${isEducationOpen ? "rotate-180 text-[#FF7A00]" : "text-gray-400"}`} />
                                    </button>

                                    {isEducationOpen && (
                                        <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[22px] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.12)] z-[100] py-1.5 animate-in fade-in zoom-in-95 duration-200">
                                            {EDUCATIONS.map((item) => (
                                                <div key={item} className="px-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setEducation(item);
                                                            setIsEducationOpen(false);
                                                        }}
                                                        className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl transition-all text-xs font-medium ${education === item
                                                            ? "bg-[#EEF2F6] dark:bg-gray-700 text-[#001D3D] font-bold"
                                                            : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                                            }`}
                                                    >
                                                        <span>{item}</span>
                                                        {education === item && <Check size={14} />}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Preferensi Gender</label>
                                <div className="flex p-1 bg-[#EEF2F6] dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                                    <button
                                        onClick={() => setGenderPreference("SEMUA")}
                                        className={`flex-1 py-1.5 text-xs font-bold rounded-xl shadow-sm transition-all ${genderPreference === "SEMUA"
                                            ? "bg-white dark:bg-gray-700 text-[#FF7A00]"
                                            : "text-gray-400 dark:text-gray-500 hover:text-gray-600"
                                            }`}
                                    >
                                        Semua
                                    </button>
                                    <button
                                        onClick={() => setGenderPreference("LAKI_LAKI")}
                                        className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${genderPreference === "LAKI_LAKI"
                                            ? "bg-white dark:bg-gray-700 text-[#FF7A00]"
                                            : "text-gray-400 dark:text-gray-500 hover:text-gray-600"
                                            }`}
                                    >
                                        Laki-laki
                                    </button>
                                    <button
                                        onClick={() => setGenderPreference("PEREMPUAN")}
                                        className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${genderPreference === "PEREMPUAN"
                                            ? "bg-white dark:bg-gray-700 text-[#FF7A00]"
                                            : "text-gray-400 dark:text-gray-500 hover:text-gray-600"
                                            }`}
                                    >
                                        Perempuan
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Rentang Usia</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    className="flex-1 px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none text-sm text-center"
                                />
                                <div className="w-3 h-px bg-gray-300" />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    className="flex-1 px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none text-sm text-center"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Keahlian / Skills</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                                    placeholder="Ketik skill lalu tekan Enter"
                                    className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none text-sm"
                                />
                                <button
                                    onClick={handleAddSkill}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#001D3D] text-white rounded-xl hover:bg-[#002855] transition-all"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            {skills.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {skills.map(skill => (
                                        <div key={skill} className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full text-xs font-bold text-gray-600 dark:text-gray-300">
                                            {skill}
                                            <button onClick={() => handleRemoveSkill(skill)} className="hover:text-red-500 transition-all">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 3. GAJI & BENEFIT */}
                <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-50 dark:border-gray-800 flex items-center gap-3">
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <DollarSign size={18} className="text-[#FF7A00]" />
                        </div>
                        <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Gaji & Benefit</h2>
                    </div>
                    <div className="p-8 space-y-8">
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 italic">Kisaran Gaji Bulanan (IDR)</label>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 relative flex items-center">
                                    <div className="absolute left-4 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-black text-gray-400 italic">MIN</div>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="w-full pl-14 pr-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none text-sm font-bold"
                                    />
                                </div>
                                <div className="flex-1 relative flex items-center">
                                    <div className="absolute left-4 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-black text-gray-400 italic">MAX</div>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="w-full pl-14 pr-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none text-sm font-bold"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Benefit / Fasilitas Tambahan</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={benefitInput}
                                    onChange={(e) => setBenefitInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddBenefit()}
                                    placeholder="Contoh: Makan Siang, Laptop, Sertifikat"
                                    className="w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none text-sm"
                                />
                                <button
                                    onClick={handleAddBenefit}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#001D3D] text-white rounded-xl hover:bg-[#002855] transition-all"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            {benefits.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {benefits.map(benefit => (
                                        <div key={benefit} className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full text-xs font-bold text-gray-600 dark:text-gray-300">
                                            {benefit}
                                            <button onClick={() => handleRemoveBenefit(benefit)} className="hover:text-red-500 transition-all">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 4. DESKRIPSI */}
                <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-50 dark:border-gray-800 flex items-center gap-3">
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <FileText size={18} className="text-[#FF7A00]" />
                        </div>
                        <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Deskripsi</h2>
                    </div>
                    <div className="p-8">
                        <textarea
                            rows={8}
                            placeholder="Jelaskan detail tanggung jawab, alur kerja, dan kriteria tambahan lainnya..."
                            className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[24px] focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none text-sm resize-none"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
