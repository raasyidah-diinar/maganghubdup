export type Job = {
    id: number;
    category: string;
    title: string;
    salary?: string;
    tags: string[];
    company: string;
    companyLogo?: string;
    location: string;
    city: string;
    subdistrict: string;
    applicants: string;
    postedAt: string;
    isPremium: boolean;
    workType: "Onsite" | "Hybrid" | "Remote";
    businessField: string;
    status?: string;
    description?: string;
    responsibilities?: string[];
    skills?: string[];
    benefits?: string[];
    companyDescription?: string;
    postedDateFull?: string;
};

export const JOBS_DUMMY: Job[] = [
    {
        id: 1,
        category: "Technology",
        title: "Software Engineer (Intern)",
        salary: undefined,
        tags: ["REST API", "REACT", "NODE.JS", "SQL", "GIT"],
        company: "Glints",
        companyLogo: "/gambar1.png",
        location: "Lowokwaru, Malang",
        city: "Malang",
        subdistrict: "Lowokwaru",
        applicants: "142 / 1 / 5",
        postedAt: "11 jam yang lalu",
        postedDateFull: "15 Februari 2026",
        isPremium: true,
        workType: "Onsite",
        businessField: "Technology",
        status: "Aktif",
        description: "Bergabunglah dengan tim engineering kami untuk membangun platform karir terdepan di Asia. Anda akan bekerja langsung pada fitur produk inti.",
        responsibilities: [
            "Mengembangkan fitur baru menggunakan React dan Node.js",
            "Melakukan bug fixing dan optimasi performa aplikasi",
            "Berkolaborasi dengan tim produk dan desain"
        ],
        skills: ["REST API", "REACT", "NODE.JS", "SQL", "GIT"],
        benefits: [
            "Mentoring Eksklusif",
            "Makan Siang Gratis",
            "Sertifikat Magang"
        ],
        companyDescription: "Glints adalah platform rekrutmen dan pengembangan karir terdepan di Asia Tenggara yang membantu jutaan profesional mengembangkan potensi mereka."
    },
    {
        id: 2,
        category: "Technology",
        title: "Frontend Developer Intern",
        salary: "Rp3.000.000",
        tags: ["REACT", "TYPESCRIPT", "NEXT.JS"],
        company: "Tokopedia",
        companyLogo: "/gambar2.png",
        location: "Kebayoran Baru, Jakarta Selatan",
        city: "Jakarta Selatan",
        subdistrict: "Kebayoran Baru",
        applicants: "350 / 4 / 10",
        postedAt: "2 hari yang lalu",
        postedDateFull: "14 Februari 2026",
        isPremium: false,
        workType: "Hybrid",
        businessField: "Business",
        status: "Aktif",
        description: "Tokopedia mencari talenta muda untuk bergabung sebagai Frontend Developer Intern. Anda akan berkontribusi dalam membangun antarmuka web yang intuitif dan responsif.",
        responsibilities: [
            "Membangun komponen UI yang reusable",
            "Integrasi API dengan aplikasi Frontend",
            "Meningkatkan kualitas kode melalui testing"
        ],
        skills: ["REACT", "TYPESCRIPT", "NEXT.JS", "TAILWIND CSS"],
        benefits: [
            "Uang Saku Kompetitif",
            "Lingkungan Kerja Fleksibel",
            "Kesempatan Menjadi Karyawan Tetap"
        ],
        companyDescription: "Tokopedia adalah perusahaan teknologi Indonesia yang berfokus pada e-commerce dan solusi logistik."
    },
    {
        id: 3,
        category: "Technology",
        title: "Backend Developer Intern (Microservices)",
        salary: "Rp3.500.000",
        tags: ["GO", "DOCKER", "KUBERNETES"],
        company: "Gojek",
        companyLogo: "/gambar3.png",
        location: "Tebet, Jakarta Selatan",
        city: "Jakarta Selatan",
        subdistrict: "Tebet",
        applicants: "289 / 2 / 8",
        postedAt: "3 hari yang lalu",
        postedDateFull: "13 Februari 2026",
        isPremium: true,
        workType: "Hybrid",
        businessField: "Technology",
        status: "Aktif"
    },
    {
        id: 4,
        category: "Technology",
        title: "Mobile Developer Intern (Flutter)",
        salary: "Rp2.000.000",
        tags: ["FLUTTER", "DART"],
        company: "Ruangguru",
        companyLogo: "/gambar4.png",
        location: "Blimbing, Malang",
        city: "Malang",
        subdistrict: "Blimbing",
        applicants: "88 / 0 / 4",
        postedAt: "5 hari yang lalu",
        postedDateFull: "11 Februari 2026",
        isPremium: false,
        workType: "Onsite",
        businessField: "Education Tech",
        status: "Aktif"
    },
    {
        id: 5,
        category: "Technology",
        title: "DevOps Intern",
        salary: "Rp2.500.000",
        tags: ["DOCKER", "JENKINS", "AWS"],
        company: "Bukalapak",
        companyLogo: "/gambar5.png",
        location: "Remote",
        city: "Remote",
        subdistrict: "Klojen",
        applicants: "156 / 0 / 2",
        postedAt: "7 hari yang lalu",
        postedDateFull: "9 Februari 2026",
        isPremium: true,
        workType: "Remote",
        businessField: "Business",
        status: "Aktif"
    },
    {
        id: 6,
        category: "Technology",
        title: "Cloud Engineer Intern",
        salary: "Rp4.000.000",
        tags: ["AWS", "AZURE", "TERRAFORM"],
        company: "AWS Indonesia",
        companyLogo: "/gambar6.png",
        location: "Cilandak, Jakarta Selatan",
        city: "Jakarta Selatan",
        subdistrict: "Cilandak",
        applicants: "410 / 1 / 3",
        postedAt: "20 hari yang lalu",
        postedDateFull: "27 Januari 2026",
        isPremium: true,
        workType: "Hybrid",
        businessField: "Technology",
        status: "Aktif"
    },
    {
        id: 7,
        category: "Technology",
        title: "IT Support Intern",
        salary: "Rp1.500.000",
        tags: ["TROUBLESHOOTING", "HARDWARE"],
        company: "Indosat Ooredoo",
        companyLogo: "/gambar7.png",
        location: "Gubeng, Surabaya",
        city: "Surabaya",
        subdistrict: "Gubeng",
        applicants: "45 / 4 / 6",
        postedAt: "11 hari yang lalu",
        postedDateFull: "5 Februari 2026",
        isPremium: false,
        workType: "Onsite",
        businessField: "Technology",
        status: "Aktif"
    },
    {
        id: 8,
        category: "Technology",
        title: "Cyber Security Intern",
        salary: "Rp2.200.000",
        tags: ["PENETRATION TESTING", "SIEM"],
        company: "Telkom Indonesia",
        companyLogo: "/gambar8.png",
        location: "Coblong, Bandung",
        city: "Bandung",
        subdistrict: "Coblong",
        applicants: "95 / 1 / 3",
        postedAt: "14 hari yang lalu",
        postedDateFull: "2 Februari 2026",
        isPremium: true,
        workType: "Onsite",
        businessField: "Technology",
        status: "Aktif"
    },
    {
        id: 9,
        category: "Technology",
        title: "UI/UX Designer Intern",
        salary: "Rp2.800.000",
        tags: ["FIGMA", "DESIGN SYSTEM"],
        company: "Shopee",
        companyLogo: "/shopee.png",
        location: "Jakarta Selatan",
        city: "Jakarta",
        subdistrict: "Sukun",
        applicants: "210 / 3 / 7",
        postedAt: "1 hari yang lalu",
        postedDateFull: "15 Februari 2026",
        isPremium: true,
        workType: "Hybrid",
        businessField: "Design",
        status: "Aktif"
    },
    {
        id: 10,
        category: "Technology",
        title: "IOS Developer Intern",
        salary: "Rp3.200.000",
        tags: ["SWIFT", "IOS", "XCODE"],
        company: "Traveloka",
        companyLogo: "/traveloka.png",
        location: "Tangerang",
        city: "Tangerang",
        subdistrict: "Kedungkandang",
        applicants: "178 / 2 / 5",
        postedAt: "4 hari yang lalu",
        postedDateFull: "12 Februari 2026",
        isPremium: true,
        workType: "Onsite",
        businessField: "Technology",
        status: "Aktif"
    },
];
