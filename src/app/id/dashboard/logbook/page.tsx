"use client";

import { useEffect, useState, useMemo } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import LogBookFilters from "@/components/dashboard/logbook/LogBookFilters";
import LogBookTable, { LogEntry } from "@/components/dashboard/logbook/LogBookTable";
import LogBookPagination from "@/components/dashboard/logbook/LogBookPagination";
import LogBookModal from "@/components/dashboard/logbook/LogBookModal";
import LogBookDetailModal from "@/components/dashboard/logbook/LogBookDetailModal";
import * as XLSX from "xlsx";
import { Loader2 } from "lucide-react";

const MOCK_DATA: LogEntry[] = [
    {
        id: "1",
        tglLaporan: "16 Feb 2026",
        periode: "16 Feb 2026",
        proyek: "Chamber Dashboard",
        uraian: "Eksport project Unity ke format WebGL dan melakukan testing performa di Chrome dan Safari.",
        industri: true,
        pendidikan: true,
        industryName: "Glints",
        tasks: ["Build WebGL", "Testing on Browser"],
        attachments: [{ name: "File 1", url: "#" }]
    },
    {
        id: "2",
        tglLaporan: "14 Feb 2026",
        periode: "14 Feb 2026",
        proyek: "Logistic System",
        uraian: "Menambahkan index pada kolom email dan created_at untuk mempercepat filtering data user.",
        industri: true,
        pendidikan: true,
        industryName: "Tokopedia",
        tasks: ["Database Optimization", "Index Creation"],
        attachments: [{ name: "Query Plan", url: "#" }]
    },
    {
        id: "3",
        tglLaporan: "13 Feb 2026",
        periode: "13 Feb 2026",
        proyek: "Finance Report 2024",
        uraian: "Sinkronisasi posisi player menggunakan Photon PUN2 dan membuat sistem room listing.",
        industri: false,
        pendidikan: false,
        industryName: "Gojek",
        tasks: ["Photon Integration", "Room System"],
        attachments: []
    },
    {
        id: "4",
        tglLaporan: "12 Feb 2026",
        periode: "12 Feb 2026",
        proyek: "Chamber Dashboard",
        uraian: "Melakukan deployment contract ke network Polygon dan melakukan verifikasi source code di Polygonscan.",
        industri: true,
        pendidikan: true,
        industryName: "Glints",
        tasks: ["Smart Contract Deployment", "Verification"],
        attachments: [{ name: "Contract Address", url: "#" }]
    },
    {
        id: "5",
        tglLaporan: "11 Feb 2026",
        periode: "11 Feb 2026",
        proyek: "Magang Hub",
        uraian: "Menyambungkan endpoint Midtrans ke frontend and memindahkan state global ke React Context.",
        industri: true,
        pendidikan: false,
        industryName: "Glints",
        tasks: ["Payment Integration", "State Management"],
        attachments: []
    },
    {
        id: "6",
        tglLaporan: "10 Feb 2026",
        periode: "10 Feb 2026",
        proyek: "Chamber Dashboard",
        uraian: "Refactor API logic to use specialized controllers for each module.",
        industri: true,
        pendidikan: true,
        industryName: "Glints",
        tasks: ["API Refactoring", "Controller Pattern"],
        attachments: []
    },
    {
        id: "7",
        tglLaporan: "09 Feb 2026",
        periode: "09 Feb 2026",
        proyek: "Logistic System",
        uraian: "Implement server-side pagination for tracking history logs.",
        industri: true,
        pendidikan: true,
        industryName: "Tokopedia",
        tasks: ["Pagination", "DB Query Optimization"],
        attachments: []
    },
    {
        id: "8",
        tglLaporan: "08 Feb 2026",
        periode: "08 Feb 2026",
        proyek: "Finance Report 2024",
        uraian: "Create automated daily reports using Node-cron and nodemailer.",
        industri: true,
        pendidikan: false,
        industryName: "Gojek",
        tasks: ["Cron Jobs", "Email Service"],
        attachments: []
    },
    {
        id: "9",
        tglLaporan: "07 Feb 2026",
        periode: "07 Feb 2026",
        proyek: "Magang Hub",
        uraian: "Add Dark Mode support across all internal dashboard pages.",
        industri: true,
        pendidikan: true,
        industryName: "Glints",
        tasks: ["UI Polishing", "Tailwind Theme"],
        attachments: []
    },
    {
        id: "10",
        tglLaporan: "06 Feb 2026",
        periode: "06 Feb 2026",
        proyek: "Chamber Dashboard",
        uraian: "Setup unit testing for authentication hooks using Vitest.",
        industri: true,
        pendidikan: true,
        industryName: "Glints",
        tasks: ["Vitest Setup", "Auth Testing"],
        attachments: []
    },
    {
        id: "11",
        tglLaporan: "05 Feb 2026",
        periode: "05 Feb 2026",
        proyek: "Logistic System",
        uraian: "Integrate Google Maps API for real-time delivery tracking.",
        industri: true,
        pendidikan: true,
        industryName: "Tokopedia",
        tasks: ["Maps Integration", "Tracking Service"],
        attachments: []
    },
    {
        id: "12",
        tglLaporan: "04 Feb 2026",
        periode: "04 Feb 2026",
        proyek: "Finance Report 2024",
        uraian: "Build a custom analytics dashboard for annual revenue projection.",
        industri: true,
        pendidikan: true,
        industryName: "Gojek",
        tasks: ["Data Presentation", "Revenue Logic"],
        attachments: []
    },
    {
        id: "13",
        tglLaporan: "03 Feb 2026",
        periode: "03 Feb 2026",
        proyek: "Magang Hub",
        uraian: "Migrate database from local instance to AWS RDS.",
        industri: true,
        pendidikan: false,
        industryName: "Glints",
        tasks: ["DB Migration", "AWS Setup"],
        attachments: []
    },
    {
        id: "14",
        tglLaporan: "02 Feb 2026",
        periode: "02 Feb 2026",
        proyek: "Chamber Dashboard",
        uraian: "Improve mobile responsiveness for the project timeline view.",
        industri: true,
        pendidikan: true,
        industryName: "Glints",
        tasks: ["Responsive Design", "Mobile UI Fixes"],
        attachments: []
    },
    {
        id: "15",
        tglLaporan: "01 Feb 2026",
        periode: "01 Feb 2026",
        proyek: "Logistic System",
        uraian: "Add role-based access control for administrative users.",
        industri: true,
        pendidikan: true,
        industryName: "Tokopedia",
        tasks: ["RBAC Implementation", "Middleware Auth"],
        attachments: []
    },
    {
        id: "16",
        tglLaporan: "31 Jan 2026",
        periode: "31 Jan 2026",
        proyek: "Finance Report 2024",
        uraian: "Optimize PDF export function to support large data tables.",
        industri: true,
        pendidikan: true,
        industryName: "Gojek",
        tasks: ["PDF Generation", "Performance"],
        attachments: []
    },
    {
        id: "17",
        tglLaporan: "30 Jan 2026",
        periode: "30 Jan 2026",
        proyek: "Magang Hub",
        uraian: "Implement multi-language support (i18n) for the landing page.",
        industri: true,
        pendidikan: false,
        industryName: "Glints",
        tasks: ["i18n Setup", "Localization"],
        attachments: []
    },
    {
        id: "18",
        tglLaporan: "29 Jan 2026",
        periode: "29 Jan 2026",
        proyek: "Chamber Dashboard",
        uraian: "Add WebSocket support for real-time project updates.",
        industri: true,
        pendidikan: true,
        industryName: "Glints",
        tasks: ["Socket.io Integration", "Real-time State"],
        attachments: []
    },
    {
        id: "19",
        tglLaporan: "28 Jan 2026",
        periode: "28 Jan 2026",
        proyek: "Logistic System",
        uraian: "Update API documentation using Swagger/OpenAPI standards.",
        industri: true,
        pendidikan: true,
        industryName: "Tokopedia",
        tasks: ["API Docs", "Swagger Setup"],
        attachments: []
    },
    {
        id: "20",
        tglLaporan: "27 Jan 2026",
        periode: "27 Jan 2026",
        proyek: "Finance Report 2024",
        uraian: "Verify financial data integrity across multiple microservices.",
        industri: true,
        pendidikan: true,
        industryName: "Gojek",
        tasks: ["Data Auditing", "Integration Testing"],
        attachments: []
    },
    {
        id: "21",
        tglLaporan: "26 Jan 2026",
        periode: "26 Jan 2026",
        proyek: "Magang Hub",
        uraian: "Setup CI/CD pipeline using GitHub Actions for automated deployment.",
        industri: true,
        pendidikan: false,
        industryName: "Glints",
        tasks: ["DevOps", "CI/CD Setup"],
        attachments: []
    },
    {
        id: "22",
        tglLaporan: "25 Jan 2026",
        periode: "25 Jan 2026",
        proyek: "Chamber Dashboard",
        uraian: "Build a reusable UI component library for the company dashboard.",
        industri: true,
        pendidikan: true,
        industryName: "Glints",
        tasks: ["Component Library", "Storybook"],
        attachments: []
    },
    {
        id: "23",
        tglLaporan: "24 Jan 2026",
        periode: "24 Jan 2026",
        proyek: "Logistic System",
        uraian: "Scale up backend infrastructure to handle high traffic surges.",
        industri: true,
        pendidikan: true,
        industryName: "Tokopedia",
        tasks: ["Auto-scaling", "Load Balancing"],
        attachments: []
    },
    {
        id: "24",
        tglLaporan: "23 Jan 2026",
        periode: "23 Jan 2026",
        proyek: "Finance Report 2024",
        uraian: "Implement Redis caching for slow-performing report queries.",
        industri: true,
        pendidikan: true,
        industryName: "Gojek",
        tasks: ["Redis Setup", "Query Caching"],
        attachments: []
    }
];

export default function LogBookPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState<LogEntry | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndustri, setSelectedIndustri] = useState("Glints");
    const [selectedProject, setSelectedProject] = useState("Semua Proyek");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [startDate, setStartDate] = useState<Date>(new Date(2026, 0, 23)); // 23 Jan 2026
    const [endDate, setEndDate] = useState<Date>(new Date(2026, 1, 22));   // 22 Feb 2026

    // Sequential Loading Logic
    useEffect(() => {
        // Step 1: Full-page spinner for 1s
        const pageTimer = setTimeout(() => {
            setIsPageLoading(false);

            // Step 2: Table spinner for 2s, immediately after page finishes
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 2000);
        }, 1000);

        return () => clearTimeout(pageTimer);
    }, []);

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
        }, 2000);
    };

    const handleIndustriChange = (val: string) => {
        setSelectedIndustri(val);
        setCurrentPage(1);
    };

    const handleProjectChange = (val: string) => {
        setSelectedProject(val);
        setCurrentPage(1);
    };

    const handleDateRangeChange = (start: Date, end: Date) => {
        setStartDate(start);
        setEndDate(end);
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
                    <div className="max-w-[1400px] mx-auto h-full">
                        {isPageLoading ? (
                            <div className="flex items-center justify-center h-full min-h-[400px]">
                                <Loader2 className="w-10 h-10 text-[#E8532F] animate-spin" />
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between gap-4 mb-4">
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white shrink-0">LogBook</h1>
                                    <LogBookFilters
                                        onExport={handleExportExcel}
                                        onAdd={() => setIsModalOpen(true)}
                                        onShow={handleTampilkan}
                                        selectedIndustri={selectedIndustri}
                                        selectedProject={selectedProject}
                                        onIndustriChange={handleIndustriChange}
                                        onProjectChange={handleProjectChange}
                                        startDate={startDate}
                                        endDate={endDate}
                                        onDateRangeChange={handleDateRangeChange}
                                    />
                                </div>

                                <LogBookTable
                                    data={paginatedData}
                                    isLoading={isLoading}
                                    onShowDetail={(entry) => {
                                        setSelectedEntry(entry);
                                        setIsDetailModalOpen(true);
                                    }}
                                />

                                <LogBookPagination
                                    currentPage={currentPage}
                                    totalItems={filteredData.length}
                                    rowsPerPage={rowsPerPage}
                                    onPageChange={(val) => {
                                        setIsLoading(true);
                                        setCurrentPage(val);
                                        setTimeout(() => setIsLoading(false), 2000);
                                    }}
                                    onRowsPerPageChange={(val) => {
                                        setIsLoading(true);
                                        setRowsPerPage(val);
                                        setCurrentPage(1);
                                        setTimeout(() => setIsLoading(false), 2000);
                                    }}
                                />
                            </>
                        )}
                    </div>
                </main>
            </div>

            <LogBookModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <LogBookDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => {
                    setIsDetailModalOpen(false);
                    setSelectedEntry(null);
                }}
                entry={selectedEntry}
            />
        </div>
    );
}
