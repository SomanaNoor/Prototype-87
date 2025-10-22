# 🌍 CIF-AI Dashboard — Global Disaster Overview

**CIF-AI Dashboard** is an interactive real-time disaster visualization platform built with **React + Vite + Leaflet.js**, designed for tracking and analyzing global natural disasters such as floods, earthquakes, heat waves, and droughts.  
This prototype features modular components, live alert integration, and an open-source base map (no billing required).

---

## 🚀 Live Overview

> If GitHub Pages deployment is active:  
> 🌐 [Live Demo](https://github.com/SomanaNoor/Prototype-87)

If the live demo fails to load, follow the **local setup instructions** below to run it manually.

---

## 🧩 Features

- 🌎 **Interactive Map Visualization** — powered by Leaflet & OpenStreetMap  
- 🔔 **Live Alerts Panel** — displays current disaster updates by severity  
- 🧭 **Location Tree Navigation** — drill down to countries and cities dynamically  
- 📊 **Dynamic Metrics Dashboard** — active disasters, affected population, infrastructure risk, displacement  
- 💡 **Open Data Ready** — accepts external CSV datasets for alerts  
- 💻 **Optimized Frontend** — built with Vite + React + Tailwind CSS

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend Framework | React (Vite) |
| Styling | Tailwind CSS |
| Map Engine | Leaflet + OpenStreetMap |
| Build Tool | Vite |
| Deployment | GitHub Pages via Actions |
| Data Input | CSV / Static JSON |

---

## 📁 Project Structure

```
Prototype-87/
├── public/
│   ├── data/                  # CSV datasets for alerts
│   ├── assets/                # Images, icons, etc.
│   └── favicon.ico
├── src/
│   ├── components/            # Shared UI components
│   │   ├── ui/                # Reusable UI elements (buttons, header, checkbox)
│   │   └── map/               # Leaflet map canvas
│   ├── pages/                 # Individual dashboard pages
│   │   └── global-disaster-overview/
│   │       ├── components/    # Submodules for overview page
│   │       └── index.jsx
│   ├── styles/                # Tailwind and global styles
│   └── utils/                 # Data loaders and helpers
├── package.json
├── vite.config.mjs
└── README.md
```

---

## ⚙️ Local Setup

To run this project locally:

```bash

# 1️⃣ Clone this repository
git clone https://github.com/SomanaNoor/Prototype-87.git
cd Prototype-87

# 2️⃣ Install dependencies
npm install

# 3️⃣ Run the development server
npm run dev

# 4️⃣ Open in your browser
Select Open in Browser or Enter 'o' on the terminal
# Default: http://localhost:4028/

```

## 👩‍💻 Authors

Main Developers:
Syeda Mehak Shah Hussain,
Somana Noor

Documentation:
Diya vijay, 
Marina Lulina

📍 Developed for Innovation Hackathon 2025

🎓 Murdoch University Dubai
