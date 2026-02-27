export type Member = {
    id: number;
    name: string;
    avatar: string;
    banner?: string;
    role: string;
    location: string;
    city: string;
    subdistrict: string;
    educationLevel: string;
    institution: string;
    skills: string[];
    interests: string[];
    internshipStatus: string;
    currentCompany?: string | null;
    rating: number;
    completedProjects: number;
    isVerified: boolean;
    timePosted: string;
    slug: string;
    blogsCount?: number;
    summary?: string;
    stats?: {
        followers: number;
        following: number;
        connections: number;
    };
    internshipActivities?: {
        company: string;
        logo: string;
        period: string;
    }[];
    experience?: {
        title: string;
        company: string;
        period: string;
        location: string;
        description: string;
    }[];
    education?: {
        school: string;
        degree: string;
        period: string;
        description: string;
    }[];
    awards?: {
        title: string;
        issuer: string;
        date: string;
    }[];
    volunteering?: {
        role: string;
        organization: string;
        period: string;
        description: string;
    }[];
    languages?: {
        language: string;
        proficiency: string;
    }[];
    certifications?: {
        title: string;
        issuer: string;
    }[];
    projects?: {
        title: string;
        description: string;
        tech: string[];
        image?: string;
    }[];
    blogs?: {
        title: string;
        date: string;
    }[];
    followerList?: {
        name: string;
        role: string;
        avatar: string;
    }[];
    followingList?: {
        name: string;
        role: string;
        avatar: string;
    }[];
};

export const MEMBERS_DUMMY: Member[] = [
    {
        id: 1,
        name: "Vernon Chwe",
        avatar: "/vernon.jpg",
        banner: "/pemandangan1.png",
        role: "Technical Unity Game Developer",
        location: "Depok, Sleman",
        city: "Jakarta Selatan",
        subdistrict: "Cilandak",
        educationLevel: "S1 - Teknik Informatika",
        institution: "Universitas Indonesia",
        skills: ["Unity Engine", "C# Programming", "Game Design", "3D Modeling", "UI/UX Development"],
        interests: ["Game Development", "Virtual Reality", "Augmented Reality"],
        internshipStatus: "Sedang Magang",
        currentCompany: "Tokopedia",
        rating: 4.8,
        completedProjects: 12,
        isVerified: true,
        timePosted: "1 jam lalu",
        slug: "vernon-chwe",
        summary: "Mahasiswa Teknik Informatika yang memiliki minat besar dalam pengembangan Game menggunakan Unity. Berpengalaman dalam membangun mekanik gameplay yang kompleks dan optimasi performa pada berbagai platform. Memiliki kemampuan dalam integrasi VR/AR dan desain aset 3D menggunakan Blender.",
        stats: {
            followers: 120,
            following: 80,
            connections: 250,
        },
        internshipActivities: [
            { company: "Tokopedia", logo: "/gambar2.png", period: "Feb 2024 - Sekarang" },
            { company: "Gojek", logo: "/gambar3.png", period: "Okt 2023 - Jan 2024" },
        ],
        experience: [
            {
                title: "Unity Game Programmer Intern",
                company: "PT Telekomunikasi Indonesia - Yogyakarta Region",
                period: "Februari 2024 - Sekarang",
                location: "Kec. Sewon, Kab. Bantul, Yogyakarta",
                description: "Membantu dalam pengembangan aplikasi simulasi VR untuk training karyawan. Bertanggung jawab atas implementasi interaksi objek dan integrasi aset 3D ke dalam Unity.",
            },
            {
                title: "Technical Game Developer Mentor",
                company: "Amikom Computer Club (AMCC) - Sleman, Yogyakarta",
                period: "Januari 2024 - Sekarang",
                location: "Sleman, Yogyakarta",
                description: "Menjadi mentor dalam kelas pengembangan game Unity. Memberikan bimbingan teknis tingkat lanjut mengenai arsitektur game dan optimasi.",
            },
        ],
        education: [
            {
                school: "Universitas Amikom Yogyakarta",
                degree: "S1 Teknik Informatika",
                period: "2021 - Sekarang",
                description: "IPK: 3.85/4.00. Fokus pada mata kuliah Grafika Komputer, Kecerdasan Buatan dalam Game, dan Pemrograman Mobile.",
            },
            {
                school: "SMK Negeri 2 Depok Sleman (Stembayo)",
                degree: "Rekayasa Perangkat Lunak",
                period: "2018 - 2021",
                description: "Lulus dengan nilai terbaik di jurusan. Aktif dalam organisasi sekolah.",
            },
        ],
        awards: [
            { title: "Winner of Game Jam Competition", issuer: "Amikom Computer Club", date: "2023" },
        ],
        volunteering: [
            {
                role: "Event Coordinator",
                organization: "Google Developer Student Clubs Amikom",
                period: "2022 - 2023",
                description: "Mengkoordinasi berbagai event workshop teknologi dan hackathon untuk mahasiswa.",
            },
        ],
        languages: [
            { language: "Bahasa Indonesia", proficiency: "Native / Billingual" },
            { language: "English", proficiency: "Professional Working Proficiency (TOEFL: 550)" },
        ],
        certifications: [
            { title: "Unity Certified User: Programmer", issuer: "Unity Technologies" },
            { title: "Dicoding: Menjadi Game Developer Expert", issuer: "Dicoding Indonesia" },
        ],
        projects: [
            {
                title: "Apex Settlers: VR Tour",
                description: "Aplikasi VR Tour untuk simulasi perumahan. Fitur: Interaksi objek, teleportasi, dan render fotorealistik.",
                tech: ["Unity", "C#", "Oculus SDK", "Blender"],
                image: "/pemandangan1.png",
            },
            {
                title: "Green City: AR Simulation",
                description: "Simulasi kota ramah lingkungan berbasis AR untuk membantu edukasi pengelolaan sampah di sekolah.",
                tech: ["Unity", "AR Foundation", "Vuforia"],
                image: "/pemandangan2.png",
            },
        ],
        blogs: [
            { title: "Membangun Game VR Pertama Anda di Unity", date: "15 Jan 2024" },
        ],
        followerList: [
            { name: "Fitriani", role: "Data Scientist", avatar: "/hyein.png" },
            { name: "Bagas Kara", role: "Android Developer", avatar: "/vernon.jpg" },
            { name: "Indah Permata", role: "Game Designer", avatar: "/hyein.png" },
            { name: "Dian Sastro", role: "UX Researcher", avatar: "/hyein.png" },
            { name: "Aditya Pratama", role: "DevOps & Cloud Engineer", avatar: "/vernon.jpg" },
        ],
        followingList: [
            { name: "Fitriani", role: "Data Scientist", avatar: "/hyein.png" },
            { name: "Bagas Kara", role: "Android Developer", avatar: "/vernon.jpg" },
        ],
    },
    {
        id: 2,
        name: "Siti Nurhaliza",
        avatar: "/hyein.png",
        banner: "/pemandangan2.png",
        role: "UX Researcher",
        location: "Bandung, Jawa Barat",
        city: "Bandung",
        subdistrict: "Coblong",
        educationLevel: "D3 - Desain Grafis",
        institution: "Politeknik Negeri Bandung",
        skills: ["Figma", "Adobe XD", "Illustrator", "User Research", "Usability Testing"],
        interests: ["UI/UX Design", "Product Design"],
        internshipStatus: "Mencari Magang",
        currentCompany: null,
        rating: 4.5,
        completedProjects: 8,
        isVerified: true,
        timePosted: "30 menit lalu",
        slug: "siti-nurhaliza",
        summary: "Desainer grafis yang beralih ke UX Research. Memiliki ketertarikan kuat dalam memahami perilaku pengguna dan menerjemahkannya ke dalam desain produk yang intuitif.",
        stats: {
            followers: 45,
            following: 120,
            connections: 88,
        },
        followerList: [
            { name: "Vernon Chwe", role: "Unity Developer", avatar: "/vernon.jpg" },
        ],
        followingList: [
            { name: "Vernon Chwe", role: "Unity Developer", avatar: "/vernon.jpg" },
        ],
    },
    {
        id: 3,
        name: "Andi Saputra",
        avatar: "/vernon.jpg",
        banner: "/pemandangan1.png",
        role: "Android Developer",
        location: "Yogyakarta, Indonesia",
        city: "Yogyakarta",
        subdistrict: "Depok",
        educationLevel: "S1 - Teknologi Informasi",
        institution: "Universitas Gadjah Mada",
        skills: ["Kotlin", "Java", "Android Studio", "Firebase", "Retrofit", "Jetpack Compose"],
        interests: ["Mobile Development", "Open Source", "UI/UX"],
        internshipStatus: "Sedang Magang",
        currentCompany: "Grab",
        rating: 4.9,
        completedProjects: 15,
        isVerified: true,
        timePosted: "2 jam lalu",
        slug: "andi-saputra",
        summary: "Seorang Android Developer yang bersemangat dalam membangun aplikasi mobile yang efisien dan user-friendly. Berpengalaman menggunakan Kotlin dan Jetpack Compose untuk menciptakan antarmuka yang modern.",
        stats: {
            followers: 230,
            following: 150,
            connections: 400,
        },
        internshipActivities: [
            { company: "Grab", logo: "/gambar1.png", period: "Jan 2024 - Sekarang" },
            { company: "Traveloka", logo: "/gambar2.png", period: "Jul 2023 - Des 2023" },
        ],
        experience: [
            {
                title: "Mobile Developer Intern",
                company: "Grab Indonesia",
                period: "Januari 2024 - Sekarang",
                location: "Jakarta, Indonesia",
                description: "Membantu pengembangan fitur baru pada aplikasi Grab menggunakan Kotlin dan MVVM architecture.",
            },
        ],
        education: [
            {
                school: "Universitas Gadjah Mada",
                degree: "S1 Teknologi Informasi",
                period: "2020 - Sekarang",
                description: "Fokus pada pengembangan sistem terdistribusi dan komputasi mobile.",
            },
        ],
        awards: [
            { title: "Indonesian ICT Award (INAICTA) Finalist", issuer: "Menkominfo", date: "2023" },
        ],
        volunteering: [
            {
                role: "Mobile Lead",
                organization: "GDSC UGM",
                period: "2022 - 2023",
                description: "Memimpin workshop pengembangan aplikasi Android untuk anggota GDSC.",
            },
        ],
        languages: [
            { language: "Bahasa Indonesia", proficiency: "Native" },
            { language: "English", proficiency: "Professional" },
        ],
        projects: [
            {
                title: "FitLife: Health Tracker",
                description: "Aplikasi pelacak kesehatan dan nutrisi harian yang terintegrasi dengan Google Fit.",
                tech: ["Kotlin", "Jetpack Compose", "Coroutines"],
                image: "/pemandangan1.png",
            },
        ],
        blogs: [
            { title: "Tips Optimasi Performa Aplikasi Android", date: "10 Feb 2024" },
        ],
    },
    {
        id: 4,
        name: "Indah Permata",
        avatar: "/hyein.png",
        banner: "/pemandangan2.png",
        role: "Fullstack Web Developer",
        location: "Surabaya, Jawa Timur",
        city: "Surabaya",
        subdistrict: "Gubeng",
        educationLevel: "S1 - Sistem Informasi",
        institution: "ITS Surabaya",
        skills: ["React.js", "Node.js", "Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
        interests: ["Web Performance", "Clean Architecture", "DevOps"],
        internshipStatus: "Lulus Magang",
        currentCompany: "Shopee",
        rating: 4.7,
        completedProjects: 20,
        isVerified: true,
        timePosted: "5 jam lalu",
        slug: "indah-permata",
        summary: "Web Developer dengan keahlian di frontend maupun backend. Berfokus pada skalabilitas kode dan performa aplikasi web yang optimal.",
        stats: {
            followers: 310,
            following: 200,
            connections: 550,
        },
        internshipActivities: [
            { company: "Shopee", logo: "/gambar3.png", period: "Aug 2023 - Jan 2024" },
        ],
        experience: [
            {
                title: "Fullstack Developer Intern",
                company: "Shopee Indonesia",
                period: "Agustus 2023 - Januari 2024",
                location: "Jakarta, Indonesia",
                description: "Mengerjakan sistem internal untuk manajemen kampanye marketing menggunakan React dan Go.",
            },
        ],
        education: [
            {
                school: "ITS Surabaya",
                degree: "S1 Sistem Informasi",
                period: "2019 - 2023",
                description: "Lulus dengan predikat Cum Laude. Aktif di laboratorium RPL.",
            },
        ],
        certifications: [
            { title: "AWS Certified Developer – Associate", issuer: "AWS" },
        ],
        projects: [
            {
                title: "E-Commerce Dashboard",
                description: "Dashboard analisis penjualan real-time dengan visualisasi data yang kompleks.",
                tech: ["Next.js", "Trpc", "Prisma"],
                image: "/pemandangan2.png",
            },
        ],
    },
    {
        id: 5,
        name: "Budi Santoso",
        avatar: "/vernon.jpg",
        banner: "/pemandangan1.png",
        role: "Data Analyst",
        location: "Semarang, Jawa Tengah",
        city: "Semarang",
        subdistrict: "Tembalang",
        educationLevel: "S1 - Statistika",
        institution: "Universitas Diponegoro",
        skills: ["Python", "SQL", "Tableau", "Power BI", "Pandas", "Scikit-learn"],
        interests: ["Big Data", "Machine Learning", "Data Visualization"],
        internshipStatus: "Sedang Magang",
        currentCompany: "Gojek",
        rating: 4.6,
        completedProjects: 10,
        isVerified: false,
        timePosted: "8 jam lalu",
        slug: "budi-santoso",
        summary: "Data Enthusiast yang gemar menggali wawasan dari data mentah. Berpengalaman dalam membersihkan data, pemodelan statistik, dan visualisasi interaktif.",
        stats: {
            followers: 180,
            following: 210,
            connections: 320,
        },
        internshipActivities: [
            { company: "Gojek", logo: "/gambar2.png", period: "Sep 2023 - Sekarang" },
        ],
        experience: [
            {
                title: "Data Analyst Intern",
                company: "Gojek",
                period: "September 2023 - Sekarang",
                location: "Jakarta, Indonesia",
                description: "Melakukan analisis user retention dan memberikan rekomendasi strategi promo berbasis data.",
            },
        ],
        education: [
            {
                school: "Universitas Diponegoro",
                degree: "S1 Statistika",
                period: "2020 - Sekarang",
                description: "Fokus pada analisis multivariat dan deret waktu.",
            },
        ],
        projects: [
            {
                title: "Uber Data Analysis",
                description: "Analiis tren perjalanan dan pola permintaan menggunakan BigML.",
                tech: ["Python", "SQL", "Tableau"],
            },
        ],
    },
    {
        id: 6,
        name: "Maya Sari",
        avatar: "/hyein.png",
        banner: "/pemandangan2.png",
        role: "Product Manager",
        location: "Jakarta Barat, Indonesia",
        city: "Jakarta Barat",
        subdistrict: "Kebon Jeruk",
        educationLevel: "S1 - Manajemen Bisnis",
        institution: "Binus University",
        skills: ["Agile/Scrum", "Product Vision", "Market Research", "Jira", "Trello"],
        interests: ["Tech Product", "Business Strategy", "User Experience"],
        internshipStatus: "Mencari Magang",
        currentCompany: null,
        rating: 4.8,
        completedProjects: 5,
        isVerified: true,
        timePosted: "1 hari lalu",
        slug: "maya-sari",
        summary: "Calon Product Manager yang memiliki latar belakang manajemen bisnis dan pemahaman teknis dasar. Fokus pada pengembangan produk berbasis data dan kebutuhan pasar.",
        stats: {
            followers: 150,
            following: 300,
            connections: 280,
        },
        experience: [
            {
                title: "Associate Product Manager Intern",
                company: "StartUp XYZ",
                period: "Jun 2023 - Aug 2023",
                location: "Remote",
                description: "Membantu PRD drafting dan user story mapping untuk fitur baru aplikasi.",
            },
        ],
        education: [
            {
                school: "Binus University",
                degree: "S1 Manajemen Bisnis",
                period: "2021 - Sekarang",
                description: "Aktif dalam organisasi kewirausahaan kampus.",
            },
        ],
    },
];
