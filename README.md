# BOTANIKART 🌿

Welcome to the **BOTANIKART** repository! This is a modern, fully responsive, front-end E-commerce demonstration for a premium plant and seed D2C (Direct-to-Consumer) brand. 

This project was built focusing on high-quality aesthetics, smooth micro-interactions, and a seamless user experience using React, TailwindCSS, and Framer Motion.

## ✨ Key Features

### 🎨 Stunning Visual Design
*   **Glassmorphism UI**: Beautiful frosted glass effects (`backdrop-filter`) across navigation, cards, and modals.
*   **Dynamic Animations**: Powered by Framer Motion. Features include a 3D perspective splash screen, continuously spinning/pulsing logos, floating background particles, and buttery-smooth page transitions.
*   **Premium Aesthetics**: Curated typography (Playfair Display & Poppins) combined with a deep nature-inspired color palette and subtle gradients.

### 🛒 Functional Shopping Experience
*   **Persistent Shopping Cart**: Add, remove, and update quantities. Cart data is saved to `localStorage` so it persists across page reloads.
*   **Slide-out Cart Drawer**: Easily view cart contents and subtotal without leaving the current page.
*   **Live Pincode Checker**: A functional demo tool on the Shop page that validates 6-digit Indian pincodes to "check delivery availability". 
*   **Dynamic Categories & Filtering**: Shop page features category filtering (Indoor, Outdoor, Seeds, etc.) and difficulty sorting.

### 💳 Demo Checkout System
*   **Simulated Razorpay Flow**: A fully animated checkout button inside the cart drawer that simulates payment processing delays, loading spinners, and success states without requiring a real payment gateway.

### 🔐 Client-Side Authentication
*   **Demo Login & Registration**: A beautiful auth portal that stores user sessions in `localStorage`. No backend database required.
*   **One-Click Demo Access**: Includes a "Use Demo Credentials" button to instantly autofill the login form for quick testing.
*   **Protected UI Elements**: Navbar dynamically updates to show user avatars and logout options when authenticated. Restricts access to shop features organically.

### 📱 Responsive & Performant
*   **Mobile-First Approach**: Perfect rendering on both desktop and mobile devices with a responsive hamburger menu and adaptive grid layouts.
*   **SPA Routing**: Fast client-side routing using `react-router-dom` ensuring no page reloads when navigating between Home, Shop, About, Blog, and Contact pages.

## 🛠️ Tech Stack
*   **Framework**: React (Vite)
*   **Styling**: TailwindCSS & Custom CSS Keyframes
*   **Animations**: Motion (Framer Motion)
*   **Icons**: Lucide React
*   **Routing**: React Router v7

## 🚀 Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Run the development server**:
    ```bash
    npm run dev
    ```
3.  Navigate to `http://localhost:5173` in your browser.

---
*Note: This is a frontend-only demonstration project built for prototyping and hackathon purposes. It does not contain a live backend database.*
