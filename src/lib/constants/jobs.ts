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
        status: "Aktif",
        description: "Gojek sedang mencari Backend Developer Intern yang antusias untuk bekerja dengan arsitektur microservices skala besar.",
        responsibilities: [
            "Membangun dan memelihara microservices menggunakan Go",
            "Mengoptimalkan query database dan performa API",
            "Menulis unit test dan dokumentasi teknis"
        ],
        skills: ["GO", "DOCKER", "KUBERNETES", "POSTGRESQL", "GRPC"],
        benefits: [
            "Lingkungan Engineering Kelas Dunia",
            "Voucher Gojek Bulanan",
            "Asuransi Kesehatan"
        ],
        companyDescription: "Gojek adalah platform on-demand terkemuka di Asia Tenggara yang melayani jutaan pengguna setiap harinya."
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
        status: "Aktif",
        description: "Bantu kami merevolusi pendidikan di Indonesia dengan mengembangkan aplikasi mobile yang interaktif dan mudah digunakan.",
        responsibilities: [
            "Implementasi desain UI ke dalam kode Flutter",
            "Integrasi RESTful API ke dalam aplikasi mobile",
            "Melakukan testing dan debugging pada berbagai perangkat Android/iOS"
        ],
        skills: ["FLUTTER", "DART", "FIREBASE", "GIT"],
        benefits: [
            "Akses Gratis Ruangguru",
            "Budaya Startup yang Dinamis",
            "Ruang Kerja yang Nyaman"
        ],
        companyDescription: "Ruangguru adalah perusahaan teknologi pendidikan terbesar di Indonesia."
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
        status: "Aktif",
        description: "Pelajari cara mengelola infrastruktur cloud skala besar dan otomatisasi pipeline CI/CD di Bukalapak.",
        responsibilities: [
            "Membantu pengelolaan pipeline CI/CD",
            "Otomatisasi deployment menggunakan Docker dan Jenkins",
            "Monitoring stabilitas sistem dan performa cloud"
        ],
        skills: ["DOCKER", "JENKINS", "AWS", "LINUX", "TERRAFORM"],
        benefits: [
            "Kerja Full Remote",
            "Subsidi Internet Bulanan",
            "Jadwal Kerja Fleksibel"
        ],
        companyDescription: "Bukalapak adalah salah satu marketplace terbesar di Indonesia yang memberdayakan UMKM."
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
        status: "Aktif",
        description: "Dapatkan pengalaman langsung bekerja dengan teknologi cloud AWS terbaru dan bantu pelanggan melakukan migrasi ke cloud.",
        responsibilities: [
            "Membantu konfigurasi layanan AWS (EC2, S3, RDS)",
            "Menulis skrip Infrastructure as Code menggunakan Terraform",
            "Menganalisis arsitektur sistem pelanggan"
        ],
        skills: ["AWS", "AZURE", "TERRAFORM", "PYTHON", "NETWORKING"],
        benefits: [
            "Pelatihan Sertifikasi AWS Gratis",
            "Laptop Perusahaan",
            "Gaji yang Sangat Kompetitif"
        ],
        companyDescription: "Amazon Web Services (AWS) adalah platform cloud yang paling komprehensif dan banyak digunakan di dunia."
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
        status: "Aktif",
        description: "Membantu operasional IT harian dan menangani masalah teknis di salah satu perusahaan telekomunikasi terbesar.",
        responsibilities: [
            "Melakukan troubleshooting masalah hardware dan software",
            "Membantu instalasi dan konfigurasi sistem operasi",
            "Maintenance infrastruktur jaringan lokal"
        ],
        skills: ["TROUBLESHOOTING", "HARDWARE", "WINDOWS SERVER", "NETWORKING"],
        benefits: [
            "Paket Data Unlimited",
            "Asuransi Kecelakaan Kerja",
            "Sertifikat Resmi Indosat"
        ],
        companyDescription: "Indosat Ooredoo Hutchison adalah perusahaan telekomunikasi digital terkemuka di Indonesia."
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
        status: "Aktif",
        description: "Pelajari cara mengamankan infrastruktur digital nasional dan lakukan simulasi serangan cyber.",
        responsibilities: [
            "Membantu pengujian penetrasi pada aplikasi web",
            "Monitoring log keamanan menggunakan SIEM",
            "Melakukan analisis kerentanan sistem"
        ],
        skills: ["BTOP", "METASPLOIT", "WIRESHARK", "LINUX SEC"],
        benefits: [
            "Sesi Mentoring dengan Ahli Keamanan",
            "Akses ke Lab Cyber Security",
            "Tunjangan Transportasi"
        ],
        companyDescription: "Telkom Indonesia adalah perusahaan informasi dan komunikasi serta penyedia jasa dan jaringan telekomunikasi terbesar di Indonesia."
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
        status: "Aktif",
        description: "Bantu kami menciptakan pengalaman belanja yang menyenangkan bagi jutaan pengguna Shopee di seluruh dunia.",
        responsibilities: [
            "Membuat wireframe dan prototipe hi-fi menggunakan Figma",
            "Berkontribusi pada pemeliharaan design system",
            "Melakukan user research dan usability testing"
        ],
        skills: ["FIGMA", "DESIGN SYSTEM", "PROTOTYPING", "USER RESEARCH"],
        benefits: [
            "Diskon Karyawan Shopee",
            "Makanan Ringan & Kopi Gratis",
            "Workshop Desain Mingguan"
        ],
        companyDescription: "Shopee adalah platform e-commerce terdepan di Asia Tenggara dan Taiwan."
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
        status: "Aktif",
        description: "Bergabunglah dengan tim iOS kami untuk membangun aplikasi lifestyle terpopuler di Asia Tenggara.",
        responsibilities: [
            "Mengembangkan fitur aplikasi iOS menggunakan Swift",
            "Bekerja dengan UIKit dan SwiftUI",
            "Melakukan integrasi API dan optimasi memori"
        ],
        skills: ["SWIFT", "IOS", "XCODE", "COCOAPODS", "REST API"],
        benefits: [
            "Tunjangan Traveloka Points",
            "Mentoring 1-on-1",
            "Gym Membership"
        ],
        companyDescription: "Traveloka adalah perusahaan teknologi terkemuka di Asia Tenggara yang menyediakan berbagai kebutuhan perjalanan dan gaya hidup dalam satu aplikasi."
    },
];
