# ProgMan | Joki

<img width="1919" height="984" alt="image" src="https://github.com/user-attachments/assets/0ce371d8-75d6-476c-8926-2345c40f8224" />



> **"Merancang sebuah website untuk joki ukk."**

ProgMan adalah sebuah website joki ukk yang cepat dan terpecaya

## Fitur Utama

- **⚡ Performa Tinggi**: Dibangun di atas [Next.js 15](https://nextjs.org/) untuk kecepatan optimal dan SEO yang superior.
- **🎨 Desain Modern**: Styling canggih menggunakan **Tailwind CSS v4** dengan tema gelap yang elegan.
- **✨ Animasi Interaktif**: Pengalaman pengguna yang hidup dengan [Framer Motion](https://www.framer.com/motion/).
- **📱 Responsif**: Tata letak yang beradaptasi sempurna di semua perangkat (Desktop, Tablet, Mobile).
- **🔐 Admin Dashboard**: Panel admin yang aman untuk pengelolaan konten dan data.
- **🗄️ Backend Neon Tech**: Integrasi database serverless PostgreSQL yang kuat dengan [Neon Tech](https://neon.tech/).

## Tech Stack

Project ini menggunakan kombinasi teknologi terbaik saat ini:

| Kategori       | Teknologi                                       |
| :------------- | :---------------------------------------------- |
| **Framework**  | [Next.js 15 (App Router)](https://nextjs.org/)  |
| **Bahasa**     | [TypeScript](https://www.typescriptlang.org/)   |
| **UI Library** | [React 19](https://react.dev/)                  |
| **Styling**    | [Tailwind CSS v4](https://tailwindcss.com/)     |
| **Animasi**    | [Framer Motion](https://www.framer.com/motion/) |
| **Icons**      | [Lucide React](https://lucide.dev/)             |
| **Backend**    | [Neon Tech (Postgres)](https://neon.tech/)      |
| **Font**       | [Geist](https://vercel.com/font)                |

## Memulai (Getting Started)

Ikuti langkah-langkah berikut untuk menjalankan project di lokal komputer Anda.

### Prasyarat

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (versi 18+ direkomendasikan).

### Instalasi

1.  **Clone repository:**

    ```bash
    git clone https://github.com/username/progman.git
    cd progman
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # atau
    yarn install
    # atau
    pnpm install
    # atau
    bun install
    ```

3.  **Konfigurasi Environment Variables:**
    Duplikasi file `.env.local.example` (jika ada) atau buat file `.env.local` baru dan isi variabel yang diperlukan untuk koneksi Neon Tech database.

4.  **Jalankan Server Development:**

    ```bash
    npm run dev
    # atau
    yarn dev
    # atau
    pnpm dev
    # atau
    bun dev
    ```

5.  Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📂 Struktur Project

Berikut adalah gambaran singkat struktur folder utama:

```
progman/
├── app/                  # App Router: Halaman dan layout
│   ├── (public)/         # Halaman publik (Home, About, dll)
│   ├── admin/            # Halaman admin dashboard
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main entry page
├── components/           # Komponen React reusable
│   ├── home/             # Komponen spesifik halaman Home
│   ├── layout/           # Header, Footer, Sidebar
│   └── ui/               # Komponen UI dasar (Button, Input, dll)
├── lib/                  # Utilitas dan helper functions
├── public/               # Aset statis (gambar, font, icon)
└── ...config files       # Konfigurasi (Tailwind, TypeScript, Next.js)
```

## Kontribusi

Kontribusi selalu diterima! Silakan buat issue atau pull request untuk perbaikan atau fitur baru.

---