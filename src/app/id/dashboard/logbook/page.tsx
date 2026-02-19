"use client";

import { useEffect, useState, useMemo } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import LogBookFilters from "@/components/dashboard/logbook/LogBookFilters";
import LogBookTable, { LogEntry } from "@/components/dashboard/logbook/LogBookTable";
import LogBookPagination from "@/components/dashboard/logbook/LogBookPagination";
import LogBookModal from "@/components/dashboard/logbook/LogBookModal";
import * as XLSX from "xlsx";
import { Loader2 } from "lucide-react";

const MOCK_DATA: LogEntry[] = [
    { id: "1", tglLaporan: "16 Feb 2026", periode: "16 Feb 2026", proyek: "Chamber Dashboard", uraian: "Eksport project Unity ke format WebGL dan melakukan testing performa di Chrome dan Safari.", industri: true, pendidikan: true },
    { id: "2", tglLaporan: "14 Feb 2026", periode: "14 Feb 2026", proyek: "Logistic System", uraian: "Menambahkan index pada kolom email dan created_at untuk mempercepat filtering data user.", industri: true, pendidikan: true },
    { id: "3", tglLaporan: "13 Feb 2026", periode: "13 Feb 2026", proyek: "Finance Report 2024", uraian: "Sinkronisasi posisi player menggunakan Photon PUN2 dan membuat sistem room listing.", industri: false, pendidikan: false },
    { id: "4", tglLaporan: "12 Feb 2026", periode: "12 Feb 2026", proyek: "Chamber Dashboard", uraian: "Melakukan deployment contract ke network Polygon dan melakukan verifikasi source code di Polygonscan.", industri: true, pendidikan: true },
    { id: "5", tglLaporan: "11 Feb 2026", periode: "11 Feb 2026", proyek: "Magang Hub", uraian: "Menyambungkan endpoint Midtrans ke frontend and memindahkan state global ke React Context.", industri: true, pendidikan: false },
    { id: "6", tglLaporan: "11 Feb 2026", periode: "1 - 12 Feb 2026", proyek: "Magang Hub", uraian: "Upload asset gambar ke Pinata IPFS dan generate JSON metadata untuk koleksi NFT.", industri: true, pendidikan: false },
    { id: "7", tglLaporan: "10 Feb 2026", periode: "10 Feb 2026", proyek: "Logistic System", uraian: "Optimasi query database untuk dashboard utama.", industri: true, pendidikan: true },
    { id: "8", tglLaporan: "09 Feb 2026", periode: "09 Feb 2026", proyek: "Chamber Dashboard", uraian: "Integrasi sistem autentikasi menggunakan OAuth2.", industri: true, pendidikan: true },
    { id: "9", tglLaporan: "08 Feb 2026", periode: "08 Feb 2026", proyek: "Finance Report 2024", uraian: "Pembuatan laporan keuangan otomatis bulanan.", industri: true, pendidikan: false },
    { id: "10", tglLaporan: "07 Feb 2026", periode: "07 Feb 2026", proyek: "Magang Hub", uraian: "Penambahan fitur push notification untuk user baru.", industri: false, pendidikan: true },
    { id: "11", tglLaporan: "06 Feb 2026", periode: "06 Feb 2026", proyek: "Logistic System", uraian: "Testing integrasi API pihak ketiga untuk pelacakan barang.", industri: true, pendidikan: true },
    { id: "12", tglLaporan: "05 Feb 2026", periode: "05 Feb 2026", proyek: "Chamber Dashboard", uraian: "Redesign UI untuk halaman profil pengguna.", industri: true, pendidikan: false },
    { id: "13", tglLaporan: "04 Feb 2026", periode: "04 Feb 2026", proyek: "Magang Hub", uraian: "Fix bug pada sistem login mobile.", industri: true, pendidikan: true },
    { id: "14", tglLaporan: "03 Feb 2026", periode: "03 Feb 2026", proyek: "Finance Report 2024", uraian: "Implementasi cache Redis untuk mempercepat render dashboard.", industri: true, pendidikan: true },
    { id: "15", tglLaporan: "02 Feb 2026", periode: "02 Feb 2026", proyek: "Logistic System", uraian: "Migrasi data lama ke struktur database baru.", industri: false, pendidikan: false },
    { id: "16", tglLaporan: "01 Feb 2026", periode: "01 Feb 2026", proyek: "Magang Hub", uraian: "Setup unit testing menggunakan Jest dan React Testing Library.", industri: true, pendidikan: true },
    { id: "17", tglLaporan: "31 Jan 2026", periode: "31 Jan 2026", proyek: "Chamber Dashboard", uraian: "Penambahan validasi form pada pendaftaran industri baru.", industri: true, pendidikan: true },
    { id: "18", tglLaporan: "30 Jan 2026", periode: "30 Jan 2026", proyek: "Logistic System", uraian: "Optimasi script deployment CI/CD di GitHub Actions.", industri: true, pendidikan: false },
    { id: "19", tglLaporan: "29 Jan 2026", periode: "29 Jan 2026", proyek: "Finance Report 2024", uraian: "Setup dashboard Grafana untuk monitoring dan script auto-backup database harian.", industri: true, pendidikan: true },
    { id: "20", tglLaporan: "29 Jan 2026", periode: "29 Jan 2026", proyek: "Magang Hub", uraian: "Menambahkan logging Winston untuk debugging di environment staging.", industri: true, pendidikan: true },
    { id: "21", tglLaporan: "29 Jan 2026", periode: "29 Jan 2026", proyek: "Logistic System", uraian: "Membuat grafik distribusi data dan tuning hyperparameter model BERT.", industri: false, pendidikan: true },
    { id: "22", tglLaporan: "28 Jan 2026", periode: "28 Jan 2026", proyek: "Magang Hub", uraian: "Update versi OpenSSL di server produksi and mengirim email test phishing ke karyawan.", industri: true, pendidikan: true },
    { id: "23", tglLaporan: "28 Jan 2026", periode: "28 Jan 2026", proyek: "Chamber Dashboard", uraian: "Melakukan deployment aplikasi front-end dan mengecek tampilan di device mobile.", industri: true, pendidikan: false },
    { id: "24", tglLaporan: "27 Jan 2026", periode: "27 Jan 2026", proyek: "Logistic System", uraian: "Testing keamanan API dengan OWASP ZAP.", industri: true, pendidikan: true },
    { id: "25", tglLaporan: "26 Jan 2026", periode: "26 Jan 2026", proyek: "Finance Report 2024", uraian: "Audit struktur data keuangan untuk kepatuhan regulasi.", industri: true, pendidikan: true },
    { id: "26", tglLaporan: "25 Jan 2026", periode: "25 Jan 2026", proyek: "Magang Hub", uraian: "Implementasi fitur dark mode menggunakan CSS variables.", industri: false, pendidikan: false },
    { id: "27", tglLaporan: "24 Jan 2026", periode: "24 Jan 2026", proyek: "Chamber Dashboard", uraian: "Menyusun skema database baru untuk fitur analytics.", industri: true, pendidikan: true },
    { id: "28", tglLaporan: "23 Jan 2026", periode: "23 Jan 2026", proyek: "Logistic System", uraian: "Pelatihan internal mengenai penggunaan dashboard baru.", industri: true, pendidikan: true },
    { id: "29", tglLaporan: "22 Jan 2026", periode: "22 Jan 2026", proyek: "Finance Report 2024", uraian: "Perbaikan format angka pada ekspor PDF laporan.", industri: true, pendidikan: false },
    { id: "30", tglLaporan: "21 Jan 2026", periode: "21 Jan 2026", proyek: "Magang Hub", uraian: "Integrasi API Maps untuk fitur pencarian lokasi magang.", industri: true, pendidikan: true },
];

export default function LogBookPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndustri, setSelectedIndustri] = useState("Glints");
    const [selectedProject, setSelectedProject] = useState("Semua Proyek");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Close sidebar on mobile by default
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const filteredData = useMemo(() => {
        // Since MOCK_DATA only has "Chamber Dashboard", "Logistic System", "Finance Report 2024", "Magang Hub"
        // And these are all linked to "Glints" for simulation purposes
        if (selectedIndustri !== "Glints") return [];

        if (selectedProject === "Semua Proyek") return MOCK_DATA;

        return MOCK_DATA.filter(item => item.proyek === selectedProject);
    }, [selectedIndustri, selectedProject]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        return filteredData.slice(startIndex, startIndex + rowsPerPage);
    }, [filteredData, currentPage, rowsPerPage]);

    const handleTampilkan = () => {
        setIsLoading(true);
        setCurrentPage(1); // Reset to first page
        setTimeout(() => {
            setIsLoading(false);
        }, 800);
    };

    const handleIndustriChange = (val: string) => {
        setSelectedIndustri(val);
        setCurrentPage(1);
    };

    const handleProjectChange = (val: string) => {
        setSelectedProject(val);
        setCurrentPage(1);
    };

    const handleExportExcel = () => {
        const dataToExport = filteredData.length > 0 ? filteredData : MOCK_DATA;
        const exportData = dataToExport.map(item => ({
            "Tanggal Laporan": item.tglLaporan,
            "Periode": item.periode,
            "Proyek": item.proyek,
            "Uraian": item.uraian,
            "Industri": item.industri ? "Selesai" : "Belum",
            "Pendidikan": item.pendidikan ? "Selesai" : "Belum"
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "LogBook");
        const wscols = [{ wch: 15 }, { wch: 15 }, { wch: 25 }, { wch: 60 }, { wch: 15 }, { wch: 15 }];
        worksheet["!cols"] = wscols;
        XLSX.writeFile(workbook, `LogBook_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 relative">
            <DashboardSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white shrink-0">LogBook</h1>
                            <div className="flex-1 flex justify-end">
                                <LogBookFilters
                                    onExport={handleExportExcel}
                                    onAdd={() => setIsModalOpen(true)}
                                    onShow={handleTampilkan}
                                    selectedIndustri={selectedIndustri}
                                    selectedProject={selectedProject}
                                    onIndustriChange={handleIndustriChange}
                                    onProjectChange={handleProjectChange}
                                />
                            </div>
                        </div>

                        <LogBookTable data={paginatedData} isLoading={isLoading} />

                        <LogBookPagination
                            currentPage={currentPage}
                            totalItems={filteredData.length}
                            rowsPerPage={rowsPerPage}
                            onPageChange={(val) => {
                                setIsLoading(true);
                                setCurrentPage(val);
                                setTimeout(() => setIsLoading(false), 500);
                            }}
                            onRowsPerPageChange={(val) => {
                                setIsLoading(true);
                                setRowsPerPage(val);
                                setCurrentPage(1);
                                setTimeout(() => setIsLoading(false), 500);
                            }}
                        />
                    </div>
                </main>
            </div>

            <LogBookModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}
