<div align="center">
  <h1>🚀 Premium 3D Interactive Portfolio</h1>
  <p><strong>A highly interactive, visually stunning personal portfolio built with Next.js 15, Tailwind CSS, GSAP, and Spline 3D.</strong></p>
  <p>
    <a href="https://ramkrishna.dev"><img src="https://img.shields.io/badge/Live_Website-ramkrishna.dev-blue?style=for-the-badge" alt="Live Demo" /></a>
    <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
  </p>
</div>

---

## 🌟 Overview

Welcome to my personal portfolio repository! This project serves as a showcase of my skills, experiences, and projects as a Full-Stack Developer & AI Engineer. I wanted to build something beyond a standard template—a fully interactive, premium web experience.

The core of this portfolio revolves around a custom **3D Interactive Keyboard** powered by Spline, which dynamically responds to user scrolling and interactions, offering a unique gamified experience.

## ✨ Key Features

- **Interactive 3D WebGL Scene**: A beautiful 3D keyboard that translates, rotates, and scales smoothly as you scroll through different sections.
- **Scroll-Triggered Animations**: Powered by GSAP and Lenis smooth scrolling for a buttery, immersive navigation experience.
- **Progressive Enhancement**: Automatically detects device performance capabilities and disables the heavy 3D scene on low-end devices or mobile phones to ensure optimal performance.
- **Dynamic Content Overlay**: Text UI layout engineered to flawlessly compliment the 3D canvas without overlapping.
- **Modern Tech Stack**: Fully built on Next.js 15 (App Router) with React Server Components, TypeScript, and Tailwind CSS.
- **Premium Glassmorphism Aesthetics**: Custom blur effects, glowing borders, and interactive hover states.

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend Framework** | Next.js 15, React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4, Custom CSS |
| **Animations** | GSAP (ScrollTrigger), Framer Motion, Lenis |
| **3D Graphics** | Spline 3D (`@splinetool/react-spline`, `@splinetool/runtime`) |
| **Icons & UI** | Lucide React, DevIcons, Radix UI |
| **Deployment** | Vercel |

## 🚀 Local Development

Follow these steps to run the portfolio locally on your machine.

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ramkrishna45/RK_Portfolio.git
   cd RK_Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Required for the GitHub stars fetching API to bypass 60req/hr rate limits
   GITHUB_TOKEN=your_github_personal_access_token
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **View the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Environment Variables Explanation

The repository includes a Serverless API route (`/api/github/route.ts`) that fetches live repository data (like star counts) directly from GitHub.
GitHub's public API limits unauthenticated requests to **60 requests per hour**. For a deployed portfolio, this limit is easily exceeded by site visitors, which will cause the API to return `403 Forbidden` errors.
By providing a `GITHUB_TOKEN` (a Personal Access Token), the rate limit increases to **5,000 requests per hour**, ensuring the site functions reliably under traffic.

## 📂 Project Structure

```text
RK_Portfolio/
├── src/
│   ├── app/                # Next.js App Router (pages, layout, APIs)
│   ├── components/         # Reusable UI components & Sections
│   │   ├── sections/       # Individual page sections (hero, skills, etc.)
│   │   ├── ui/             # Radix UI primitives & micro-components
│   │   ├── animated-background.tsx  # Core Spline 3D logic
│   ├── data/               # Constants, configurations, projects list
│   ├── hooks/              # Custom React hooks (performance profiling)
│   ├── lib/                # Utilities (cn, tailwind merge)
│   └── styles/             # Global CSS and Tailwind directives
├── public/                 # Static assets (images, 3D models)
└── tailwind.config.ts      # Tailwind CSS configuration
```

## 🤝 Let's Connect

Feel free to reach out if you want to discuss full-stack development, AI, or collaborate on a project!

- **Email**: tripathiramkrishna16@gmail.com
- **LinkedIn**: [Ram Krishna Tripathi](https://www.linkedin.com/in/ramkrishna-tripathi-920405295)
- **GitHub**: [Ramkrishna45](https://github.com/Ramkrishna45)

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
