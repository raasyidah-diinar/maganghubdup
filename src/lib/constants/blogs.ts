export type BlogPost = {
    id: number;
    image: string;
    category: string;
    date: string;
    readTime: string;
    title: string;
    description: string;
    content: string;
    tags: string[];
    slug: string;
    author: {
        id: number;
        name: string;
        role: string;
        slug: string;
        avatar?: string;
        bio?: string;
    };
};

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        image: "/arsitektur.png",
        category: "ENGINEERING",
        date: "25 Des 2025",
        readTime: "8 min read",
        title: "Menguasai Arsitektur Microservices dengan Golang",
        description: "Panduan komprehensif memecah monolitik menjadi layanan mikro yang scalable.",
        slug: "menguasai-arsitektur-microservices",
        content: `
Arsitektur microservices telah merevolusi cara perusahaan besar membangun dan mengelola perangkat lunak mereka. Berbeda dengan arsitektur monolitik tradisional di mana seluruh fungsi aplikasi digabungkan dalam satu unit tunggal, microservices memecah aplikasi menjadi sekumpulan layanan kecil yang saling berkomunikasi.

### Mengapa Memilih Golang?
Golang (atau Go) dirancang oleh Google untuk menangani konkurensi dengan sangat efisien. Beberapa alasan mengapa Go menjadi pilihan utama untuk microservices adalah:
- **Goroutines:** Ringan dan memungkinkan ribuan proses berjalan secara paralel.
- **Statically Typed:** Mengurangi bug pada saat runtime karena pengecekan tipe data yang ketat.
- **Binary Tunggal:** Memudahkan proses deployment di lingkungan Docker atau Kubernetes tanpa dependensi eksternal yang rumit.

### Langkah Strategis Migrasi
1. **Identifikasi Domain:** Gunakan pendekatan Domain-Driven Design (DDD) untuk menentukan batas antar layanan agar tidak terjadi ketergantungan yang tumpang tindih.
2. **Komunikasi Antar Layanan:** Tentukan apakah akan menggunakan REST API untuk kemudahan atau gRPC yang jauh lebih cepat untuk komunikasi internal tim.
3. **Manajemen Database:** Setiap layanan harus memiliki database sendiri untuk menjaga otonomi data dan menghindari single point of failure.

Dengan menerapkan microservices menggunakan Go, tim pengembang dapat melakukan rilis fitur lebih cepat tanpa harus khawatir merusak bagian aplikasi lainnya secara keseluruhan.
        `,
        tags: ["#Golang", "#Microservices", "#Backend"],
        author: {
            id: 1,
            name: "Vernon Chwe",
            role: "Senior Backend Engineer",
            slug: "vernon-chwe",
            avatar: "/vernon.jpg",
            bio: "Seorang enthusiast Golang yang gemar membagikan ilmu tentang sistem terdistribusi."
        },
    },
    {
        id: 2,
        image: "/gamevr.png",
        category: "GAME DEV",
        date: "24 Des 2025",
        readTime: "12 min read",
        title: "Membangun Game VR Pertama Anda di Unity",
        description: "Langkah awal memahami environment 3D dan interaksi Virtual Reality.",
        slug: "membangun-game-vr-pertama",
        content: "Konten lengkap tentang pembangunan game VR di Unity...",
        tags: ["#Unity", "#VR", "#C#"],
        author: {
            id: 2,
            name: "Siti Nurhaliza",
            role: "Game Designer",
            slug: "siti-nurhaliza",
            avatar: "/hyein.png",
            bio: "Berfokus pada immersive experience dan interaksi manusia-komputer."
        },
    },
    {
        id: 3,
        image: "/code.jpg",
        category: "DESIGN",
        date: "23 Des 2025",
        readTime: "6 min read",
        title: "Psikologi Warna dalam UI Design Modern",
        description: "Bagaimana warna orange dan gelap mempengaruhi keputusan pengguna.",
        slug: "psikologi-warna-ui-design",
        content: "Konten lengkap tentang psikologi warna dalam UI...",
        tags: ["#UI/UX", "#Design", "#Psychology"],
        author: {
            id: 3,
            name: "Andi Saputra",
            role: "UI/UX Designer",
            slug: "andi-saputra",
            avatar: "/vernon.jpg",
            bio: "Designer yang percaya bahwa setiap warna memiliki cerita dan emosi."
        },
    },
    {
        id: 4,
        image: "/pkl.png",
        category: "CAREER",
        date: "22 Des 2025",
        readTime: "5 min read",
        title: "Persiapan PKL untuk Siswa SMK RPL",
        description: "Tips sukses mendapatkan tempat magang di perusahaan tech startup.",
        slug: "persiapan-pkl-smk-rpl",
        content: "Konten lengkap tentang persiapan PKL SMK RPL...",
        tags: ["#SMK", "#Internship", "#Career"],
        author: {
            id: 4,
            name: "Indah Permata",
            role: "HR specialist",
            slug: "indah-permata",
            avatar: "/hyein.png",
            bio: "Membantu talenta muda menemukan karir impian mereka sejak dini."
        },
    },
    {
        id: 5,
        image: "/teknologi.png",
        category: "TECHNOLOGY",
        date: "21 Des 2025",
        readTime: "10 min read",
        title: "Tren AI dan Machine Learning di 2026",
        description: "Eksplorasi perkembangan terbaru dalam dunia kecerdasan buatan.",
        slug: "tren-ai-machine-learning-2026",
        content: "Konten lengkap tentang tren AI di 2026...",
        tags: ["#AI", "#MachineLearning", "#Tech"],
        author: {
            id: 5,
            name: "Budi Santoso",
            role: "AI Researcher",
            slug: "budi-santoso",
            avatar: "/vernon.jpg",
            bio: "Meneliti bagaimana AI dapat membantu kehidupan sehari-hari."
        },
    },
    {
        id: 6,
        image: "/engineering.png",
        category: "ENGINEERING",
        date: "20 Des 2025",
        readTime: "7 min read",
        title: "Clean Code: Prinsip dan Best Practices",
        description: "Menulis kode yang mudah dibaca, dipelihara, dan di-scale.",
        slug: "clean-code-prinsip-best-practices",
        content: "Konten lengkap tentang prinsip Clean Code...",
        tags: ["#CleanCode", "#BestPractices", "#Development"],
        author: {
            id: 6,
            name: "Maya Sari",
            role: "Tech Lead",
            slug: "maya-sari",
            avatar: "/hyein.png",
            bio: "Penulis kode yang rapi adalah bentuk kepedulian terhadap rekan kerja."
        },
    },
    {
        id: 7,
        image: "/uiux.png",
        category: "UI/UX",
        date: "19 Des 2025",
        readTime: "9 min read",
        title: "Designing Accessible User Interfaces",
        description: "Membuat desain yang inklusif untuk semua pengguna.",
        slug: "designing-accessible-ui",
        content: "Konten lengkap tentang aksesibilitas UI...",
        tags: ["#Accessibility", "#UX", "#Design"],
        author: {
            id: 1,
            name: "Vernon Chwe",
            role: "UX Researcher",
            slug: "vernon-chwe",
            avatar: "/vernon.jpg",
            bio: "Pecinta inklusivitas dalam setiap aspect teknologi."
        },
    },
    {
        id: 8,
        image: "/digitalmarketing.png",
        category: "MARKETING",
        date: "18 Des 2025",
        readTime: "8 min read",
        title: "Digital Marketing Strategy untuk Startup",
        description: "Cara efektif membangun brand awareness dengan budget terbatas.",
        slug: "digital-marketing-strategy-startup",
        content: "Konten lengkap tentang digital marketing startup...",
        tags: ["#Marketing", "#Startup", "#Digital"],
        author: {
            id: 2,
            name: "Siti Nurhaliza",
            role: "Marketing Head",
            slug: "siti-nurhaliza",
            avatar: "/hyein.png",
            bio: "Strategist handal dalam menumbuhkan startup dari nol."
        },
    },
];
