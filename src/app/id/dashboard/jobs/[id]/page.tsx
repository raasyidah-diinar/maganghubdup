"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
    ArrowLeft,
    Download,
    CheckCircle2,
    Calendar,
    MapPin,
    Briefcase,
    Building2,
    Bookmark,
    ExternalLink,
    Clock,
    DollarSign,
    Check,
    Share2,
    CheckCircle,
    X,
    User,
    FileText,
    CreditCard,
    GraduationCap,
    Pencil,
    ArrowRight,
    ClipboardCheck,
    Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JOBS_DUMMY, Job } from "@/lib/constants/jobs";
import { Skeleton } from "@/components/ui/skeleton";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

const JobDetailSkeleton = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[600px]">
        <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-500">
            <div className="relative">
                {/* Outer Glow */}
                <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full" />
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin relative z-10" />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Memuat detail...</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Mohon tunggu sebentar ya!</p>
            </div>
        </div>

        {/* Subtle background placeholders */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0 overflow-hidden p-8 pt-20">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between">
                    <Skeleton className="h-10 w-32 rounded-xl" />
                    <Skeleton className="h-10 w-40 rounded-xl" />
                </div>
                <Skeleton className="h-40 w-full rounded-[32px]" />
                <div className="grid grid-cols-4 gap-4">
                    <Skeleton className="h-24 rounded-2xl" />
                    <Skeleton className="h-24 rounded-2xl" />
                    <Skeleton className="h-24 rounded-2xl" />
                    <Skeleton className="h-24 rounded-2xl" />
                </div>
            </div>
        </div>
    </div>
);

export default function Page() {
    const params = useParams();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [isApplied, setIsApplied] = useState(false);
    const flyerRef = useRef<HTMLDivElement>(null);
    const [randomJobs, setRandomJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Safety check for ID
    const jobId = typeof params?.id === 'string' ? parseInt(params.id) : 1;
    const currentJob = JOBS_DUMMY.find(j => j.id === jobId) || JOBS_DUMMY[0];

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Randomize similar jobs on mount
        const otherJobs = JOBS_DUMMY.filter(j => j.id !== currentJob.id);
        const shuffled = [...otherJobs].sort(() => 0.5 - Math.random()).slice(0, 4);
        setRandomJobs(shuffled);
    }, [currentJob.id]);

    const job = currentJob;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleDownloadPDF = async () => {
        const element = flyerRef.current;
        if (!element) return;

        // 1. MANUALLY SHOW FLYER FOR CAPTURE
        element.style.display = 'block';
        element.style.position = 'fixed';
        element.style.top = '0';
        element.style.left = '0';
        element.style.zIndex = '-9999';
        element.style.opacity = '1';

        setIsDownloading(true);
        try {
            // Wait for images inside the flyer to be fully loaded
            const flyerImages = Array.from(element.getElementsByTagName('img'));
            await Promise.all(flyerImages.map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise(resolve => {
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            }));

            // Extra wait for layout and font stabilization
            await new Promise(resolve => setTimeout(resolve, 500));

            const dataUrl = await toPng(element, {
                quality: 1,
                pixelRatio: 2,
                backgroundColor: "#ffffff",
                cacheBust: true,
                width: 794,
                height: 1123,
            });

            if (!dataUrl || dataUrl === 'data:,' || dataUrl.length < 1000) {
                console.error("Captured PNG is too small or empty:", dataUrl?.substring(0, 100));
                throw new Error("Flyer capture produced blank/empty image");
            }

            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Flyer-${job.title}-${job.company}.pdf`);
        } catch (error) {
            console.error("CRITICAL PDF ERROR DETECTED");
            const errorObj = error as any;
            const detailedError = {
                message: errorObj?.message || "No message",
                name: errorObj?.name || "No name",
                stack: errorObj?.stack || "No stack",
                full: JSON.stringify(error, Object.getOwnPropertyNames(error))
            };
            console.error("DETAILED ERROR:", detailedError);
            alert(`Gagal membuat PDF: ${detailedError.message}`);
        } finally {
            // 2. HIDE FLYER AGAIN
            element.style.display = 'none';
            setIsDownloading(false);
        }
    };

    return (
        <div className="flex h-screen bg-[#F8FAFC] dark:bg-gray-900 overflow-hidden">
            <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col overflow-hidden relative">
                <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

                <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative">
                    {isLoading ? (
                        <JobDetailSkeleton />
                    ) : (
                        <>
                            <div className="no-print">
                                {/* Header Section */}
                                <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
                                    <button
                                        onClick={() => router.back()}
                                        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-orange-600 transition-colors font-semibold text-sm"
                                    >
                                        <ArrowLeft size={18} />
                                        Kembali
                                    </button>

                                    <button
                                        onClick={handleDownloadPDF}
                                        disabled={isDownloading}
                                        className={`flex items-center gap-2 px-4 py-2 border border-orange-500 text-orange-500 hover:bg-orange-50 rounded-lg font-bold text-xs transition-all shadow-sm ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {isDownloading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                                                Downloading...
                                            </>
                                        ) : (
                                            <>
                                                <Download size={16} />
                                                Download PDF
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start pb-20">
                                    {/* Main Content Area (Left) */}
                                    <div className="flex-1 space-y-6 w-full">

                                        {/* Summary Header Card */}
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-orange-500" />

                                            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                                                <div className="flex gap-6 items-start">
                                                    <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600 flex items-center justify-center p-3 flex-shrink-0">
                                                        {job.companyLogo ? (
                                                            <Image src={job.companyLogo} alt={job.company} width={80} height={80} className="object-contain" />
                                                        ) : (
                                                            <Building2 className="text-gray-300" size={40} />
                                                        )}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <span className="px-3 py-1 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-bold tracking-wide uppercase">
                                                            {job.category}
                                                        </span>
                                                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                                                            {job.title}
                                                        </h1>
                                                        <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
                                                            <span className="font-bold text-orange-600 dark:text-orange-400">{job.company}</span>
                                                            <CheckCircle2 size={16} className="text-blue-500 fill-blue-500 text-white" />
                                                            <span className="text-gray-300 dark:text-gray-600">|</span>
                                                            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm">
                                                                <Clock size={16} />
                                                                <span>Dibuat pada {job.postedDateFull || job.postedAt}</span>
                                                            </div>
                                                        </div>

                                                        <button
                                                            onClick={() => setIsApplyModalOpen(true)}
                                                            className="mt-4 px-8 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-all shadow-md shadow-orange-200 dark:shadow-none"
                                                        >
                                                            Ajukan Magang
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* QR Code Section */}
                                                <div
                                                    onClick={() => setIsQRModalOpen(true)}
                                                    className="hidden md:flex flex-col items-center bg-gray-50 dark:bg-gray-900/50 p-3 rounded-2xl border border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group"
                                                >
                                                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-2 group-hover:text-orange-500 transition-colors">
                                                        <Image src="/maganghublogo.webp" alt="MH" width={14} height={14} className="opacity-50" />
                                                        <span>Scan Me</span>
                                                    </div>
                                                    <div className="bg-white p-1 rounded-lg group-hover:ring-2 group-hover:ring-orange-500/20 transition-all">
                                                        <img
                                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`https://maganghub.id/id/jobs/${job.id}`)}`}
                                                            alt="QR Code"
                                                            width={80}
                                                            height={80}
                                                            crossOrigin="anonymous"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info Grid Card */}
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">GAJI</p>
                                                    <p className="font-bold text-blue-600 dark:text-blue-400">{job.salary || "Tidak Ditampilkan"}</p>
                                                </div>
                                                <div className="space-y-1 border-l-0 md:border-l border-gray-100 dark:border-gray-700 md:pl-8">
                                                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">TIPE LOKASI</p>
                                                    <p className="font-bold text-slate-800 dark:text-gray-100">{job.workType}</p>
                                                </div>
                                                <div className="space-y-1 border-l-0 md:border-l border-gray-100 dark:border-gray-700 md:pl-8">
                                                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">LOKASI KANTOR</p>
                                                    <p className="font-bold text-slate-800 dark:text-gray-100">{job.location}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Detailed Description Sections */}
                                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 space-y-10">
                                            <section>
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                                                    <span className="w-1 h-6 bg-orange-500 rounded-full" />
                                                    Deskripsi Pekerjaan
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                                    {job.description}
                                                </p>
                                            </section>

                                            <section>
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                                                    <span className="w-1 h-6 bg-orange-500 rounded-full" />
                                                    Tanggung Jawab
                                                </h3>
                                                <ul className="space-y-3">
                                                    {job.responsibilities?.map((resp, idx) => (
                                                        <li key={idx} className="flex gap-3 text-gray-600 dark:text-gray-400 text-sm font-medium">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                                                            <span>{resp}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </section>

                                            <section>
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                                                    <span className="w-1 h-6 bg-orange-500 rounded-full" />
                                                    Skill yang Dibutuhkan
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {job.skills?.map(skill => (
                                                        <span key={skill} className="px-4 py-1.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-bold text-gray-600 dark:text-gray-400 uppercase">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </section>

                                            <section>
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                                                    <span className="w-1 h-6 bg-orange-500 rounded-full" />
                                                    Keuntungan
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {job.benefits?.map((benefit, idx) => (
                                                        <div key={idx} className="flex items-center gap-3 p-4 bg-green-50/50 dark:bg-green-950/10 rounded-2xl border border-green-100/50 dark:border-green-900/30">
                                                            <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                                                                <CheckCircle size={14} />
                                                            </div>
                                                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-tight">{benefit}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </section>
                                        </div>
                                    </div>

                                    {/* Sidebar (Right) */}
                                    <div className="lg:w-[380px] space-y-6 w-full">
                                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Lowongan Serupa</h2>
                                        <div className="space-y-3">
                                            {randomJobs.map((sj: Job) => (
                                                <Link key={sj.id} href={`/id/dashboard/jobs/${sj.id}`} className="group block h-full">
                                                    <div className="bg-white dark:bg-gray-800 rounded-[28px] p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all flex flex-col gap-2 relative overflow-hidden">
                                                        {/* Left Accent Border */}
                                                        <div className="absolute top-0 left-0 bottom-0 w-[5px] bg-orange-500" />

                                                        <div className="flex justify-between items-start pl-1">
                                                            <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none mt-1">{sj.category || "TECHNOLOGY"}</span>
                                                            <span className="px-3 py-1 bg-blue-50/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[11px] font-black rounded-lg">
                                                                {sj.salary || "Negosiasi"}
                                                            </span>
                                                        </div>

                                                        <div className="pl-1">
                                                            <h4 className="text-[16px] font-bold text-slate-800 dark:text-white leading-tight group-hover:text-orange-600 transition-colors mb-2">
                                                                {sj.title}
                                                            </h4>

                                                            {/* Work Type Badge */}
                                                            <div className="flex flex-wrap gap-2 mb-2">
                                                                <span className="px-2.5 py-1 bg-green-50/50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/50 text-green-600 dark:text-green-400 rounded-lg text-[10px] font-semibold uppercase flex items-center gap-1.5">
                                                                    <Building2 size={11} />
                                                                    {sj.workType}
                                                                </span>
                                                            </div>

                                                            {/* Skill Tags */}
                                                            <div className="flex flex-wrap gap-2 mb-3">
                                                                {sj.tags.slice(0, 1).map((tag: string, i: number) => (
                                                                    <span key={i} className="px-2.5 py-1 bg-gray-50 dark:bg-gray-900/50 text-slate-500 dark:text-gray-400 rounded-lg text-[10px] font-medium uppercase tracking-wider">
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                                <span className="px-2.5 py-1 bg-gray-50 dark:bg-gray-900/50 text-slate-500 dark:text-gray-400 rounded-lg text-[10px] font-medium">
                                                                    +2
                                                                </span>
                                                            </div>

                                                            {/* Company Info */}
                                                            <div className="flex items-center gap-2.5">
                                                                <div className="w-10 h-10 bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl flex items-center justify-center p-1 shadow-sm">
                                                                    {sj.companyLogo ? (
                                                                        <Image src={sj.companyLogo} alt={sj.company} width={28} height={28} className="object-contain" />
                                                                    ) : (
                                                                        <Building2 className="text-gray-300" size={18} />
                                                                    )}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center gap-1">
                                                                        <span className="text-sm font-semibold text-slate-700 dark:text-gray-200 truncate leading-none mb-0.5 block">{sj.company}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
                                                                        <MapPin size={10} />
                                                                        <span className="text-[10px] font-medium truncate">{sj.location}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Footer */}
                                                        <div className="pt-3 border-t border-gray-50 dark:border-gray-700/50 mt-1 flex items-center justify-between pl-1">
                                                            <div className="px-2.5 py-1 bg-green-50/50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/40 rounded-lg flex items-center gap-1.5">
                                                                <ClipboardCheck size={11} className="text-green-600" />
                                                                <span className="text-[9px] font-semibold text-green-600 uppercase">Aktif Merekrut</span>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-[10px] font-medium text-gray-400">8 Februari 2026</span>
                                                                <Bookmark size={16} className="text-gray-300 hover:text-orange-500 transition-colors cursor-pointer" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Specialized Printable Flyer View (Maintained for High Quality Capture) */}
                            <div
                                ref={flyerRef}
                                className="bg-white min-h-[1123px] w-[794px] font-jakarta opacity-0 pointer-events-none overflow-hidden"
                                aria-hidden="true"
                                style={{
                                    display: 'none',
                                    position: 'fixed',
                                    left: '-9999px',
                                    top: '0'
                                }}
                            >
                                {/* Header Banner */}
                                <div className="bg-[#0F172A] p-10 relative overflow-hidden h-[320px] flex flex-col justify-end">
                                    <div className="absolute top-10 left-10 flex gap-2">
                                        <span className="bg-[#E8532F] py-1 px-3 text-[10px] font-black text-white uppercase tracking-wider rounded-md">
                                            {job.category} • {job.workType}
                                        </span>
                                    </div>

                                    {/* Glints Logo Circle */}
                                    <div className="absolute top-8 right-8 w-28 h-28 bg-white rounded-2xl shadow-xl flex items-center justify-center p-3 border-[4px] border-[#0F172A]">
                                        {job.companyLogo ? (
                                            <img
                                                src={job.companyLogo}
                                                alt={job.company}
                                                width={90}
                                                height={90}
                                                className="object-contain"
                                                crossOrigin="anonymous"
                                            />
                                        ) : (
                                            <Building2 className="text-gray-200" size={50} />
                                        )}
                                    </div>

                                    <div className="space-y-6 relative z-10 max-w-[500px]">
                                        <p className="text-[#E8532F] font-bold text-lg tracking-wider uppercase mb-1">WE ARE HIRING</p>
                                        <h1 className="text-5xl font-black text-white leading-tight">
                                            {job.title.split('(')[0]}
                                            <br />
                                            <span className="text-4xl opacity-90">{job.title.includes('(') ? `(${job.title.split('(')[1]}` : ''}</span>
                                        </h1>
                                        <div className="flex items-center gap-3 pt-4 border-t border-white/20 mt-4">
                                            <span className="w-12 h-1.5 bg-[#E8532F] rounded-full" />
                                            <h2 className="text-3xl font-black text-white tracking-widest uppercase font-jakarta">{job.company}</h2>
                                        </div>
                                    </div>
                                </div>

                                {/* Info Ribbon */}
                                <div className="mx-10 -mt-10 bg-white shadow-2xl rounded-3xl grid grid-cols-3 overflow-hidden border border-gray-100 relative z-20">
                                    <div className="p-8 text-center flex flex-col items-center justify-center border-r border-gray-100">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">GAJI</p>
                                        <p className="text-lg font-black text-blue-600 font-jakarta">{job.salary || "Not Disclosed"}</p>
                                    </div>
                                    <div className="p-8 text-center flex flex-col items-center justify-center border-r border-gray-100">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">LOKASI KANTOR</p>
                                        <p className="text-lg font-black text-[#1E293B] font-jakarta">{job.location}</p>
                                    </div>
                                    <div className="p-8 text-center bg-[#FFF8F5] flex flex-col items-center justify-center">
                                        <p className="text-[10px] font-bold text-[#E8532F] uppercase tracking-widest mb-1">POSTED ON</p>
                                        <p className="text-lg font-black text-[#E8532F] font-jakarta">{job.postedDateFull || "15 Februari 2026"}</p>
                                    </div>
                                </div>

                                {/* Print Content Body */}
                                <div className="p-12 grid grid-cols-[2fr_1fr] gap-10">
                                    {/* Left Column */}
                                    <div className="space-y-12">
                                        <section>
                                            <h3 className="text-2xl font-black text-[#1E293B] mb-6 flex items-center gap-3 uppercase tracking-tight">
                                                <span className="w-2 h-8 bg-[#E8532F] rounded-full" />
                                                JOB DESCRIPTION
                                            </h3>
                                            <p className="text-gray-600 text-lg leading-relaxed font-jakarta font-medium">
                                                {job.description}
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-2xl font-black text-[#1E293B] mb-6 flex items-center gap-3 uppercase tracking-tight">
                                                <span className="w-2 h-8 bg-[#E8532F] rounded-full" />
                                                RESPONSIBILITIES
                                            </h3>
                                            <ul className="space-y-5">
                                                {job.responsibilities?.map((resp, idx) => (
                                                    <li key={idx} className="flex gap-4 text-gray-600 text-lg font-jakarta font-medium">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#E8532F] mt-3 flex-shrink-0" />
                                                        <span>{resp}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-12">
                                        <section>
                                            <h3 className="text-xl font-black text-[#1E293B] mb-6 uppercase tracking-tight">
                                                SKILLS NEEDED
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {job.skills?.map(skill => (
                                                    <span key={skill} className="px-4 py-2 border-2 border-gray-100 rounded-lg text-sm font-black text-[#1E293B] uppercase font-jakarta">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>

                                        {/* Large QR Apply Card */}
                                        <div className="bg-[#E8532F] rounded-[40px] p-8 flex flex-col items-center text-center shadow-2xl shadow-orange-500/20">
                                            <p className="text-white font-black text-2xl mb-8 tracking-widest uppercase font-jakarta">APPLY NOW</p>
                                            <div className="bg-white p-4 rounded-[32px] shadow-inner mb-6">
                                                <img
                                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`https://maganghub.id/id/jobs/${job.id}`)}`}
                                                    alt="Apply QR"
                                                    width={180}
                                                    height={180}
                                                    crossOrigin="anonymous"
                                                />
                                            </div>
                                            <p className="text-white/80 text-[10px] font-bold leading-tight max-w-[180px] font-jakarta">
                                                Scan this QR code to view the detail and submit your application
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Print Footer */}
                                <div className="absolute bottom-10 left-16 right-16 flex items-end justify-between border-t border-gray-100 pt-8">
                                    <p className="text-gray-400 text-xs font-bold italic font-jakarta">
                                        Generated by TalentNet • {new Date().toLocaleDateString('id-ID')}
                                    </p>
                                    <div className="text-right">
                                        <p className="text-[#E8532F] font-black text-xl tracking-tighter font-jakarta">TALENTNET.ID</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div>

            <style jsx global>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 0;
                    }
                    body {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    header, nav, aside, button, .no-print {
                        display: none !important;
                    }
                    main {
                        padding: 0 !important;
                        margin: 0 !important;
                        background: white !important;
                    }
                    .custom-scrollbar {
                        overflow: visible !important;
                    }
                }
            `}</style>

            {/* QR Zoom Modal */}
            {isQRModalOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setIsQRModalOpen(false)}
                >
                    <div
                        className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsQRModalOpen(false)}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all"
                        >
                            <X size={24} />
                        </button>

                        <div className="text-center space-y-4">
                            <div className="flex justify-center mb-2">
                                <div className="bg-orange-50 dark:bg-orange-950/30 p-3 rounded-2xl">
                                    <Image src="/maganghublogo.webp" alt="MagangHub" width={40} height={40} />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Scan for Details</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Scan this QR code to view the job details on your phone or share it with others.
                            </p>

                            <div className="bg-white p-4 rounded-3xl inline-block shadow-inner ring-1 ring-gray-100 mx-auto">
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`https://maganghub.id/id/jobs/${job.id}`)}`}
                                    alt="QR Code Zoomed"
                                    width={240}
                                    height={240}
                                    className="mx-auto"
                                    crossOrigin="anonymous"
                                />
                            </div>

                            <div className="pt-4">
                                <p className="text-xs font-bold text-orange-600 dark:text-orange-400 tracking-widest uppercase">
                                    {job.company}
                                </p>
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-1 line-clamp-1">
                                    {job.title}
                                </p>
                            </div>

                            <button
                                onClick={() => setIsQRModalOpen(false)}
                                className="w-full mt-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-200 dark:shadow-none"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Application Modal */}
            {isApplyModalOpen && (
                <div
                    className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => {
                        if (!isApplied) setIsApplyModalOpen(false);
                    }}
                >
                    <div
                        className="bg-white dark:bg-gray-800 rounded-[32px] p-8 max-w-lg w-full shadow-2xl relative animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {!isApplied ? (
                            <>
                                <button
                                    onClick={() => setIsApplyModalOpen(false)}
                                    className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all"
                                >
                                    <X size={20} />
                                </button>

                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                                    Konfirmasi Pengajuan
                                </h3>

                                <div className="space-y-4 mb-8">
                                    {[
                                        { label: "Profil Diri Lengkap", icon: <User size={20} className="text-green-600" />, bgColor: "bg-green-50" },
                                        { label: "Curriculum Vitae (CV)", icon: <FileText size={20} className="text-green-600" />, bgColor: "bg-green-50" },
                                        { label: "KTP / Identitas", icon: <CreditCard size={20} className="text-green-600" />, bgColor: "bg-green-50" },
                                        { label: "Kartu Pelajar / Mahasiswa", icon: <GraduationCap size={20} className="text-green-600" />, bgColor: "bg-green-50" },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                                            <div className="flex items-center gap-4">
                                                <div className={`${item.bgColor} dark:bg-green-900/20 p-3 rounded-xl`}>
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white text-sm">{item.label}</p>
                                                    <p className="text-[10px] font-bold text-green-600 uppercase flex items-center gap-1">
                                                        <Check size={10} /> Terverifikasi
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
                                                <Pencil size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setIsApplied(true)}
                                    className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-2 group"
                                >
                                    Ajukan
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </>
                        ) : (
                            <div className="text-center py-4">
                                <div className="flex justify-center mb-6">
                                    <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-full">
                                        <CheckCircle2 size={64} className="text-green-600 animate-in zoom-in duration-500" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Pengajuan berhasil dikirim!
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">
                                    silahkan cek status dashboard anda
                                </p>
                                <button
                                    onClick={() => {
                                        setIsApplyModalOpen(false);
                                        setTimeout(() => setIsApplied(false), 300);
                                    }}
                                    className="w-full py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold rounded-2xl transition-all hover:bg-gray-800 dark:hover:bg-gray-100 shadow-xl"
                                >
                                    Oke, Mengerti
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
