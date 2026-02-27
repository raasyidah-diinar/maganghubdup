export type Education = {
    id: number;
    institutionName: string;
    institutionLogo: string;
    category: string;
    address: string;
    city: string;
    subdistrict: string;
    educationLevel: string;
    workTypes: string[];
    openPositions: number;
    activeInterns: number;
    totalAlumni: number;
    isVerified: boolean;
    description?: string;
    website?: string;
    banner?: string;
};

export const EDUCATION_DUMMY: Education[] = [
    {
        id: 1,
        institutionName: "Ruangguru",
        institutionLogo: "/gambar4.png",
        banner: "/pemandangan1.png",
        category: "PERUSAHAAN EDTECH",
        address: "Jl. Dr. Saharjo No.161, Manggarai",
        city: "Jakarta Selatan",
        subdistrict: "Tebet",
        educationLevel: "Perusahaan EdTech",
        workTypes: ["Onsite", "Hybrid"],
        openPositions: 1,
        activeInterns: 25,
        totalAlumni: 300,
        isVerified: true,
        website: "https://www.ruangguru.com",
        description: "Ruangguru adalah perusahaan teknologi pendidikan terbesar di Indonesia yang berfokus pada layanan berbasis kurikulum sekolah melalui video belajar interaktif, kartu belajar, dan kuis.",
    },
    {
        id: 2,
        institutionName: "Dicoding Indonesia",
        institutionLogo: "/dcoding.png",
        banner: "/pemandangan2.png",
        category: "INSTITUSI PENDIDIKAN & TECH",
        address: "Jl. Batik Kumeli No.50, Bandung",
        city: "Bandung",
        subdistrict: "Coblong",
        educationLevel: "Institusi Pendidikan & Tech",
        workTypes: ["Remote", "Hybrid"],
        openPositions: 1,
        activeInterns: 8,
        totalAlumni: 80,
        isVerified: true,
        website: "https://www.dicoding.com",
        description: "Dicoding adalah platform edukasi teknologi terdepan di Indonesia yang membantu mencetak developer standar global melalui kurikulum yang disusun bersama industri.",
    },
    {
        id: 3,
        institutionName: "Universitas Indonesia",
        institutionLogo: "/ui.png",
        banner: "/pemandangan3.png",
        category: "UNIVERSITAS NEGERI",
        address: "Kampus UI Depok, Jawa Barat",
        city: "Jakarta",
        subdistrict: "Cilandak",
        educationLevel: "Universitas Negeri",
        workTypes: ["Onsite"],
        openPositions: 0,
        activeInterns: 0,
        totalAlumni: 50000,
        isVerified: true,
        website: "https://www.ui.ac.id",
        description: "Universitas Indonesia adalah salah satu universitas tertua dan paling prestisius di Indonesia yang berkomitmen untuk menghasilkan lulusan berkualitas tinggi.",
    },
    {
        id: 4,
        institutionName: "Institut Teknologi Bandung",
        institutionLogo: "/itb.png",
        banner: "/pemandangan4.png",
        category: "INSTITUT NEGERI",
        address: "Jl. Ganesha No.10, Bandung",
        city: "Bandung",
        subdistrict: "Coblong",
        educationLevel: "Institut Negeri",
        workTypes: ["Onsite", "Hybrid"],
        openPositions: 0,
        activeInterns: 0,
        totalAlumni: 45000,
        isVerified: true,
        website: "https://www.itb.ac.id",
        description: "Institut Teknologi Bandung adalah sekolah tinggi teknik pertama di Indonesia yang berorientasi pada pengembangan ilmu pengetahuan dan teknologi.",
    },
    {
        id: 5,
        institutionName: "Politeknik Negeri Malang",
        institutionLogo: "/poltek.png",
        banner: "/pemandangan5.png",
        category: "POLITEKNIK NEGERI",
        address: "Jl. Soekarno Hatta No.9, Malang",
        city: "Malang",
        subdistrict: "Lowokwaru",
        educationLevel: "Politeknik Negeri",
        workTypes: ["Onsite"],
        openPositions: 2,
        activeInterns: 12,
        totalAlumni: 15000,
        isVerified: true,
        website: "https://www.polinema.ac.id",
        description: "Politeknik Negeri Malang adalah institusi pendidikan vokasi yang membekali mahasiswa dengan keterampilan praktis untuk kebutuhan industri.",
    },
    {
        id: 6,
        institutionName: "SMK Telkom Malang",
        institutionLogo: "/smktelkom.png",
        banner: "/pemandangan1.png",
        category: "SEKOLAH MENENGAH KEJURUAN",
        address: "Jl. Danau Ranau, Malang",
        city: "Malang",
        subdistrict: "Sukun",
        educationLevel: "Sekolah Menengah Kejuruan",
        workTypes: ["Onsite"],
        openPositions: 0,
        activeInterns: 5,
        totalAlumni: 8000,
        isVerified: true,
        website: "https://www.smktelkom-mlg.sch.id",
        description: "SMK Telkom Malang adalah sekolah kejuruan rujukan nasional yang spesialis dalam bidang teknologi informasi dan komunikasi.",
    },
];
