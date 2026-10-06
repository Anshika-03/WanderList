# 🌍 WanderList

> **Discover, Explore, and Plan Your Next Adventure**  
> A modern, responsive travel exploration web application built with **React 18**, **Vite**, **Tailwind CSS**, and **RESTful API Architecture**.

---

## 🚀 Overview

**WanderList** is a full-featured travel discovery platform that enables users to seamlessly explore destinations categorized by travel preferences and geographical regions. Built with high performance and scalable frontend engineering practices, WanderList offers interactive destination browsing, community reviews, authentication, and vlog integration.

---

## ✨ Key Features

- 🧭 **Categorized Exploration:** Browse travel destinations dynamically filtered by categories (e.g., Heritage, Adventure, Beaches) and states/regions.
- 🔐 **JWT Authentication:** Secure user registration, sign-in, and persistent session management via React Context.
- ⭐ **Ratings & Reviews:** Interactive user-generated reviews and ratings for individual travel spots with real-time feedback.
- 🎥 **Travel Vlogs & Community:** Curated section highlighting travel experiences and community media.
- 🎨 **Responsive UI/UX:** Styled using Tailwind CSS with glassmorphism touches, fluid typography, and mobile-first design.
- ⚡ **Optimized Performance:** Blazing fast page loads powered by Vite asset bundling and dynamic code execution.

---

## 🛠️ Tech Stack & Engineering Highlights

| Layer | Technologies / Tools |
| :--- | :--- |
| **Frontend Framework** | React 18, Vite |
| **Routing** | React Router v6 |
| **State & Auth** | React Context API, Custom Hooks |
| **Styling** | Tailwind CSS, PostCSS, Autoprefixer |
| **API & Data Fetching** | Modular Fetch Abstraction, REST APIs, JWT Authorization |

---

## 📂 Project Structure

```text
wanderlist/
├── src/
│   ├── components/      # Reusable UI components (Navbar, Cards, Rating Stars, etc.)
│   ├── context/         # AuthContext & global state management
│   ├── lib/             # API client & HTTP request helper functions
│   ├── pages/           # Route views (CategorySelect, PlacesList, Login, Vlogs)
│   ├── App.jsx          # Application routing structure
│   └── main.jsx         # React DOM entry point
├── .env.example         # Environment variables template
├── package.json         # Project dependencies & scripts
├── tailwind.config.js   # Tailwind theme customization
└── vite.config.js       # Vite configuration
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher recommended)
- **npm** or **yarn**

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Anshika-03/WanderList.git
   cd WanderList
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   VITE_API_URL=http://localhost:4000
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to view the app.

---

## 📝 License

This project is open-source under the [MIT License](LICENSE).
