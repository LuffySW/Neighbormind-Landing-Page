<div align="center">
  <img src="public\img\logo\Transparent logo-R (1).webp" alt="Neighbormind Logo" width="200" />
  <h1>NEIGHBORMIND</h1>
  <p><strong>Clothing brand fighting social stereotypes — Mind Over Stereotype.</strong></p>
</div>

---

## 🏴‍☠️ About The Project

Neighbormind is a premium streetwear brand born from the fusion of "neighbor" and "mind". We deconstruct the idea that other people's expectations are a cage. This repository contains the source code for the **official Neighbormind ecosystem**, which consists of two main parts:

1. **The Landing Page**: A fast, responsive, and highly interactive storefront featuring an immersive "Story Mode".
2. **The CMS Dashboard**: A dedicated portal (`/apps/cms`) for managing articles, stories, media assets, and carousel items.

The landing page showcases our latest lineup (NYX, CYRO, GREED) and directs users to our official Shopee storefront for seamless conversions.

## ✨ Key Features

### Landing Page
- **Dynamic Animations**: Smooth, premium animations powered by Framer Motion.
- **High-Performance Assets**: Fully optimized `.webp` imagery for blazing-fast load times.
- **Lazy Loading Strategy**: Non-critical images load asynchronously to boost mobile performance.
- **Responsive Design**: Flawless UI across all device sizes (Mobile, Tablet, Desktop) using Tailwind CSS.
- **Static Data Fallback**: Automatically falls back to high-quality local static data (`src/data/products.ts`) if the Supabase database is empty or unconfigured, ensuring the site never breaks.
- **Integrated E-Commerce**: Strategic Call-To-Action (CTA) buttons directly connected to the Shopee marketplace.
- **SEO Optimized**: Complete metadata structure for high discoverability and social sharing.

### CMS Dashboard
- **Article & Story Builder**: Visually construct the "Story Mode" for each product by organizing scenes, narratives, and images.
- **Media Asset Manager**: Upload and organize images used across the platform.
- **Database Integrated**: Powered by Supabase for real-time data syncing, authentication, and secure access (RLS).

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Backend & DB:** [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript
- **Asset Optimization:** Sharp (Local build scripts)

## 🚀 Getting Started

To run the project locally on your machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/neighbormind-landing-page.git
   ```
2. Navigate to the project directory
   ```bash
   cd neighbormind-landing-page
   ```
3. Install dependencies
   ```bash
   npm install
   ```

### Running the Landing Page
4. Start the landing page development server
   ```bash
   npm run dev
   ```
5. Open your browser and visit `http://localhost:5173`

### Running the CMS
If you want to run the CMS Dashboard, navigate to the `apps/cms` folder:
```bash
cd apps/cms
npm install
npm run dev
```
Open your browser and visit `http://localhost:5174` (or the port specified by Vite).

### Image Optimization
If you add new `.jpg` or `.png` images to the `src/img` folder, you can automatically convert them to highly-compressed `.webp` formats by running:
```bash
node optimize-images.cjs
```

## 🏗️ CMS & Story Mode Architecture

The landing page fetches its content dynamically from Supabase. The storytelling experience is divided into modular components:

- **Story Scenes**: A product's story is divided into multiple **Scenes** (e.g., Title, Narrative, Details, CTA).
- **Carousels**: A Carousel is not a standalone entity for the entire product; it is **attached to a specific Scene**.
  - *Example*: For most products, the Carousel items are attached to **Scene 3 ("The Details")**. 
  - If you open the CMS Story Builder, it defaults to highlighting **Scene 1**, which usually has **no carousel items**. 
  - **Do not panic if the carousel looks empty!** Simply click on the scene that actually holds the carousel (e.g., Scene 3) from the "Scene List" sidebar to manage its images.

## 🔒 Security & Privacy

This repository only contains front-end code and public assets. **It is 100% safe to be hosted publicly.**
- No API keys or sensitive environment variables are exposed directly in the repo. Supabase keys should be kept in `.env` files.
- Built-in `.gitignore` prevents uploading local modules and system files.
- **Row Level Security (RLS)**: The database is protected via Supabase RLS. Only authenticated admin profiles can mutate data.

## 🛒 Store

Visit our official store to acquire your piece:
**[Neighbormind on Shopee](https://shopee.co.id/Neighbormind)**

---
<div align="center">
  <i>"Jangan minta maaf atas ambisimu."</i><br>
  <b>© 2026 Neighbormind. All rights reserved.</b>
</div>
