<h1 align="center">🌐 Pilar Media Web (Frontend)</h1>

<p align="center">
  <strong>Modern Dashboard Frontend built with Next.js 14, TailwindCSS, and Shadcn/UI</strong><br>
  Fully integrated with the <a href="https://github.com/AchmadPutraA12/pilar-media-api" target="_blank">Pilar Media API (NestJS)</a>.
</p>

<p align="center">
  <a href="https://nextjs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Next.js-v14.0.0-black?logo=next.js" alt="Next.js">
  </a>
  <a href="https://tailwindcss.com/" target="_blank">
    <img src="https://img.shields.io/badge/TailwindCSS-v3.4.0-38B2AC?logo=tailwind-css&logoColor=white" alt="TailwindCSS">
  </a>
  <a href="https://ui.shadcn.com/" target="_blank">
    <img src="https://img.shields.io/badge/shadcn/ui-Components-7E22CE?logo=shadcnui&logoColor=white" alt="shadcn/ui">
  </a>
  <a href="https://nodejs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white" alt="Node.js">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT">
  </a>
</p>

---

## 🧩 Overview

**Pilar Media Web** adalah frontend dashboard modern yang dibangun menggunakan:
- ⚡ **Next.js 14 (App Router)**
- 🎨 **TailwindCSS + Shadcn/UI** untuk komponen UI modern dan dark mode
- 🔐 **Authentication via JWT Cookie** (terhubung ke NestJS API)
- 🧭 **Protected Routes Middleware**
- 💅 Struktur modular dan siap untuk pengembangan skala besar

---

## 🗂️ Folder Structure

```bash
src/
├── app/
│   ├── dashboard/
│   │   └── page.tsx
│   ├── job-order/
│   │   └── page.tsx
│   ├── login/
│   │   ├── page.tsx
│   │   ├── favicon.ico
│   │   └── globals.css
│   ├── layout.tsx
│   └── middleware.ts
│
├── components/
│   └── ui/
│       ├── navbar.tsx
│       ├── sidebar.tsx
│       ├── theme-provider.tsx
│       ├── theme-toggle.tsx
│       ├── button.tsx
│       ├── card.tsx
│       └── input.tsx
│
├── core/
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   └── use-theme.ts
│   └── lib/
│       └── utils.ts
│
├── layout/
│   └── layout.tsx
│
└── .env
```

---

## ⚙️ Installation

Pastikan Node.js 20 atau lebih baru sudah terpasang:

```bash
# Clone repository
git clone https://github.com/username/pilar-media-web.git
cd pilar-media-web

# Install dependencies
npm install
# atau
yarn install
```

---

## 🔧 Environment Variables

Buat file `.env` di root project kamu dan isi dengan konfigurasi berikut:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NODE_ENV=development
PORT=3001

NEXT_PUBLIC_APP_NAME=Pilar Media Web
NEXT_PUBLIC_APP_VERSION=1.0.0
```

> 💡 `NEXT_PUBLIC_API_BASE_URL` mengarah ke URL **NestJS API** kamu  
> contoh: `http://localhost:3000`

---

## 🚀 Development

Jalankan proyek dalam mode pengembangan:

```bash
npm run dev
# atau
yarn dev
```

Buka di browser:
```
http://localhost:3001
```

---

## 🔐 Authentication Flow

1. **User login** di `/login`  
   → data dikirim ke NestJS API (`/auth/login`).

2. **NestJS mengembalikan JWT**  
   → token disimpan di cookie (`token` & `user`).

3. **Middleware Next.js** otomatis:
   - Redirect user **tanpa token** ke `/login`.
   - Redirect user **yang sudah login** ke `/dashboard`.

4. **Logout** akan:
   - Menghapus cookie token.
   - Redirect ke halaman `/login`.

---

## 🧠 Core Features

| Fitur | Deskripsi |
|-------|------------|
| 🔑 **Login/Logout** | Integrasi penuh dengan NestJS API menggunakan cookie |
| 🧭 **Middleware Proteksi Route** | Redirect otomatis berdasarkan status login |
| 🎨 **UI Shadcn** | Komponen UI dengan Tailwind dan Dark Mode |
| ⚡ **App Router Next.js 14** | Routing modern & client/server component |
| 🧱 **Reusable Components** | Navbar, Button, Card, Input siap pakai |

---

## 🧰 Scripts

| Command | Deskripsi |
|----------|------------|
| `npm run dev` | Menjalankan server development |
| `npm run build` | Build project untuk production |
| `npm run start` | Menjalankan hasil build |
| `npm run lint` | Menjalankan linting code |

---

## 🧑‍💻 Tech Stack

- **Frontend Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS + Shadcn/UI
- **Auth:** JWT via Cookies
- **Icons:** Lucide-react
- **State Management:** React Hooks + Context
- **Deployment:** Vercel / Docker-ready

---

## 📦 Deployment

### 🪣 Vercel
1. Push project ke GitHub.
2. Hubungkan repo ke [Vercel Dashboard](https://vercel.com).
3. Tambahkan variabel environment di menu **Settings → Environment Variables**.
4. Deploy otomatis 🚀

### 🐳 Docker (optional)
```bash
# Build image
docker build -t pilar-media-web .

# Jalankan container
docker run -p 3001:3000 pilar-media-web
```

---

## 🪪 License

This project is licensed under the [MIT License](LICENSE).

---

## 💬 Author

**Achmad Putra Arifky**  
Fullstack Web Developer (Laravel + React + NestJS + NextJS)  
