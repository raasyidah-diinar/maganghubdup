"use client";

import { useState } from "react";
import { ArrowLeft, FileText, ChevronRight, Check, Send, Users, Layout } from "lucide-react";
import Image from "next/image";

interface Step {
    id: number;
    label: string;
}

const steps: Step[] = [
    { id: 1, label: "TEMPLATE" },
    { id: 2, label: "TUJUAN" },
    { id: 3, label: "ISI DATA" },
    { id: 4, label: "PREVIEW" },
];

export default function ComposeFlow({ onBack }: { onBack: () => void }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedCompany, setSelectedCompany] = useState<any>(null);
    const [formData, setFormData] = useState({
        university_name: "",
        student_name: "",
        major: "",
        duration: "",
    });

    const companies = [
        { name: "Glints", email: "hi@glints.com", avatar: "/g.png" }, // Mock avatars
        { name: "Tokopedia", email: "recruitment@tokopedia.com", avatar: "/t.png" },
        { name: "Gojek", email: "careers@gojek.com", avatar: "/g2.png" },
        { name: "Ruangguru", email: "info@ruangguru.com", avatar: "/r.png" },
        { name: "Bukalapak", email: "recruitment@bukalapak.com", avatar: "/b.png" },
        { name: "AWS Indonesia", email: "aws-indo-recruitment@amazon.com", avatar: "/a.png" },
    ];

    const handleFormChange = (field: string, value: string) => {
        // If one is filled, all are filled automatically as requested
        if (value && !formData.university_name && !formData.student_name && !formData.major && !formData.duration) {
            setFormData({
                university_name: "SMK Telkom 20 Malang",
                student_name: "Raasyidah Diinar Kaamilah",
                major: "Rekayasa Perangkat Lunak",
                duration: "6",
            });
        } else {
            setFormData({ ...formData, [field]: value });
        }
    };

    const renderStepper = () => (
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-16 relative">
            <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-100 dark:bg-gray-800 -z-10"></div>
            {steps.map((step) => {
                const isCompleted = currentStep > step.id;
                const isActive = currentStep === step.id;

                const getStepIcon = () => {
                    if (isCompleted) return <Check size={18} className="text-blue-600" />;

                    switch (step.id) {
                        case 1: return <FileText size={18} />;
                        case 2: return <Users size={18} />;
                        case 3: return <Layout size={18} />;
                        case 4: return <Send size={18} />;
                        default: return null;
                    }
                };

                return (
                    <div key={step.id} className="flex flex-col items-center gap-3">
                        <div
                            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${isCompleted
                                ? "bg-white border-2 border-blue-600 text-blue-600 shadow-sm"
                                : isActive
                                    ? "bg-blue-600 text-white shadow-xl shadow-blue-200"
                                    : "bg-white border-2 border-gray-100 text-gray-300 shadow-sm"
                                }`}
                        >
                            {getStepIcon()}
                        </div>
                        <span className={`text-[10px] font-extrabold tracking-[0.15em] ${isActive ? "text-blue-600" : "text-blue-200 dark:text-gray-600"}`}>
                            {step.label}
                        </span>
                    </div>
                );
            })}
        </div>
    );

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[32px] p-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-[20px] font-bold text-[#001D35] dark:text-white mb-8">Pilih Format Surat</h2>

                        <button
                            onClick={() => setCurrentStep(2)}
                            className="w-full flex items-center gap-6 p-6 rounded-3xl border border-gray-100 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/50 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left group"
                        >
                            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600">
                                <FileText size={28} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-[17px] font-bold text-gray-900 dark:text-white mb-1">Surat Pengajuan Magang</h3>
                                <p className="text-[14px] text-gray-500">Gunakan template standar ini</p>
                            </div>
                            <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                        </button>
                    </div>
                );
            case 2:
                return (
                    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[32px] p-8 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
                        <h2 className="text-[20px] font-bold text-[#001D35] dark:text-white mb-6">Kirim Ke Siapa?</h2>

                        <div className="space-y-3">
                            {companies.map((company, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setSelectedCompany(company);
                                        setCurrentStep(3);
                                    }}
                                    className="w-full flex items-center gap-4 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-gray-100 bg-white flex items-center justify-center text-gray-400 font-bold bg-gray-100 capitalize">
                                        {company.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="text-[15px] font-bold text-gray-900 dark:text-white">{company.name}</h3>
                                        <p className="text-[13px] text-gray-400">{company.email}</p>
                                    </div>
                                    <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-400 transition-all" />
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[32px] p-10 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500 text-center">
                        <h2 className="text-[20px] font-bold text-[#001D35] dark:text-white mb-1">Lengkapi Data</h2>
                        <p className="text-[14px] text-gray-500 mb-8">Isi informasi sesuai kebutuhan surat</p>

                        <div className="max-w-md mx-auto space-y-4">
                            <input
                                type="text"
                                placeholder="Nama Instansi Pendidikan"
                                value={formData.university_name}
                                onChange={(e) => handleFormChange("university_name", e.target.value)}
                                className="w-full px-6 py-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                            />
                            <input
                                type="text"
                                placeholder="Nama Mahasiswa/Siswa"
                                value={formData.student_name}
                                onChange={(e) => handleFormChange("student_name", e.target.value)}
                                className="w-full px-6 py-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                            />
                            <input
                                type="text"
                                placeholder="Jurusan"
                                value={formData.major}
                                onChange={(e) => handleFormChange("major", e.target.value)}
                                className="w-full px-6 py-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                            />
                            <input
                                type="text"
                                placeholder="Durasi Magang"
                                value={formData.duration}
                                onChange={(e) => handleFormChange("duration", e.target.value)}
                                className="w-full px-6 py-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                            />

                            <button
                                onClick={() => setCurrentStep(4)}
                                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl mt-6 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
                            >
                                Lihat Preview Surat
                            </button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[32px] p-8 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-1">DRAF SURAT SELESAI</p>
                                <h2 className="text-[22px] font-bold text-[#001D35] dark:text-white">Surat Pengajuan Magang</h2>
                            </div>
                            <button
                                onClick={() => setCurrentStep(3)}
                                className="px-4 py-2 border border-gray-100 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                            >
                                Edit Data
                            </button>
                        </div>

                        <div className="bg-gray-50/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700 rounded-[24px] p-8 mb-8 text-[14px] leading-relaxed text-gray-700 dark:text-gray-300">
                            <p className="mb-6">Yth. Pimpinan <span className="font-bold">{selectedCompany?.name}</span>,</p>
                            <p className="mb-6">Dengan hormat, kami dari <span className="font-bold">{formData.university_name || "{{university_name}}"}</span> bermaksud mengajukan permohonan magang untuk mahasiswa kami:</p>

                            <div className="space-y-1 mb-6 pl-4">
                                <p><span className="font-bold">Nama:</span> {formData.student_name || "{{student_name}}"}</p>
                                <p><span className="font-bold">Jurusan:</span> {formData.major || "{{major}}"}</p>
                                <p><span className="font-bold">Durasi:</span> {formData.duration || "{{duration}}"} bulan</p>
                            </div>

                            <p className="mb-8">Besar harapan kami agar permohonan ini dapat diterima. Atas perhatiannya kami ucapkan terima kasih.</p>

                            <p>Hormat kami,</p>
                            <p className="font-bold mt-1">SMK Telkom 20 Malang</p>
                        </div>

                        <button
                            className="w-full py-4 bg-[#00BA34] hover:bg-[#00A32D] text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 transition-all active:scale-[0.98]"
                        >
                            <Send size={18} />
                            <span>Kirim Sekarang</span>
                        </button>
                        <p className="text-center text-[11px] text-gray-400 italic mt-4">Surat akan langsung masuk ke kotak masuk {selectedCompany?.name}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-4">
            {/* Header */}
            <div className="flex items-center gap-6 mb-12">
                <button
                    onClick={() => {
                        if (currentStep > 1) setCurrentStep(currentStep - 1);
                        else onBack();
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-[26px] font-bold text-[#001D35] dark:text-white leading-tight">Buat Surat Baru</h1>
                    <p className="text-[12px] font-extrabold text-[#B8C5D0] dark:text-gray-500 tracking-[0.25em] uppercase mt-1">
                        TAHAP {currentStep} DARI 4
                    </p>
                </div>
            </div>

            {/* Stepper */}
            {renderStepper()}

            {/* Content */}
            {renderStepContent()}
        </div>
    );
}
