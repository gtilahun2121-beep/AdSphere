# AdSphere Marketplace Platform

AdSphere is a premium, full-stack digital advertising marketplace platform. It allows users to browse, search, and submit digital advertisements (websites, mobile apps, software, SaaS, etc.) in a highly aesthetic, culturally inspired environment.

## 🌟 Key Features

- **Modern & Premium UI:** A dynamic, responsive interface designed with an Ethiopian-inspired color palette (Vibrant Emerald, Rich Gold, and Deep Red) on a warm Ivory theme.
- **Glassmorphism Design:** Beautiful, semi-transparent frosted glass forms that overlay a dynamic, moving background slider of high-quality digital marketing images.
- **User Authentication:** Complete login and registration forms (powered by a mock JWT backend).
- **Ad Submission Workflow:** A multi-step flow for users to submit new digital advertisements, complete with mock payment integrations and premium plan selections.
- **Categorized Discovery:** Users can easily browse ads filtered by categories like Mobile Apps, Desktop Software, and SaaS.
- **Mock REST API Backend:** A fast, lightweight Node/Express backend that handles data persistence using a local JSON store for rapid development and testing.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router DOM v6
- **Icons:** Lucide React
- **Styling:** Vanilla CSS (CSS Variables, Flexbox/Grid, Keyframe Animations)

### Backend
- **Environment:** Node.js
- **Framework:** Express.js
- **Database:** Local JSON File (`data.json` for rapid mocking)
- **Utilities:** Cors, Dotenv, Bcryptjs, JSONWebToken (JWT)

---

## 🚀 Getting Started

To run the AdSphere platform locally, you will need to start both the Backend API and the Frontend React application in separate terminal windows.

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Start the Backend API

Open a terminal and run the following commands:

```bash
cd c:\AdSphere\backend
npm install
npm run dev
```
*The backend server will start running at **http://localhost:5000***

### 2. Start the Frontend Application

Open a **new** terminal window and run the following commands:

```bash
cd c:\AdSphere\frontend
npm install
npm run dev
```
*The frontend development server will start running at **http://localhost:5173***

---

## 🎨 Design & Aesthetics
AdSphere was built with a custom design system prioritizing visual excellence:
- **Animations:** A pure CSS infinite background slider fades beautifully between high-quality advertisement imagery.
- **Theme:** Warm Light Mode (`#fdfbf7`) combined with semi-transparent frosted glass components (`rgba(255, 255, 255, 0.75)`).
- **Accessibility:** Text fields and dropdowns are carefully contrasted with subtle gold outlines on focus to ensure maximum readability against the animated backgrounds.

## 📁 Directory Structure

```text
AdSphere/
├── backend/
│   ├── data.json         # Mock database storage
│   ├── package.json      # Backend dependencies
│   └── server.js         # Express server & API routes
└── frontend/
    ├── index.html        # HTML entry point
    ├── package.json      # Frontend dependencies
    ├── src/
    │   ├── App.jsx       # Main application & routing logic
    │   ├── index.css     # Global CSS, theme tokens & animations
    │   ├── main.jsx      # React root render
    │   ├── components/   # Reusable UI components (Navbar, Footer, AdCard)
    │   └── pages/        # Page views (Home, Login, Register, Dashboard, SubmitAd)
    └── vite.config.js    # Vite bundler configuration
```

## 📝 API Endpoints Overview

The backend uses a mock JSON implementation, providing the following endpoints:

- `GET /api/categories` - Returns available ad categories.
- `GET /api/ads?category=&search=` - Returns ads, optionally filtered.
- `POST /api/ads` - Submits a new advertisement.
- `POST /api/payment` - Mocks a payment transaction.
- `POST /api/register` - Registers a new user.
- `POST /api/login` - Authenticates a user and returns a mock JWT.
