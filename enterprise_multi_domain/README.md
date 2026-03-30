# 🚀 AxionFlow Frontend

A modern, scalable **Workflow Management SaaS UI** built with React, Redux Toolkit, and Tailwind CSS.
This application provides an intuitive interface for managing workflows, tasks, approvals, and enterprise operations.

---

## 🧠 Overview

AxionFlow is designed to:

* Manage workflows and approvals
* Provide real-time dashboards and analytics
* Enable role-based access and modular navigation
* Deliver a smooth and responsive UI experience

---

## 🏗️ Tech Stack

* ⚛️ React (Vite)
* 🧠 Redux Toolkit (State Management)
* 🎨 Tailwind CSS
* 🔗 React Router DOM
* 📡 Axios (API Communication)
* 🔔 React Hot Toast (Notifications)
* 🎯 Lucide Icons

---

## 📁 Project Structure

```
src/
│── Components/
│── Pages/
│── RTKThunk/
│── Features/
│── Utils/
│── Context/
│── MainLayout/
│── App.jsx
```

---

## 🔐 Authentication Flow

* Cookie-based authentication
* Token validation via `/auth/me`
* Conditional UI rendering using:

  * `selectIsAuthenticated`
* Feature-level protection (not full page blocking)

---

## 🚦 Routing Strategy

* Public Routes:

  * `/login`
  * `/signup`
  * `/forgot-password`

* App Layout:

  * Sidebar + Topbar always visible
  * Feature-level access control inside components

---

## 🔒 Access Control

* UI-based protection using `ProtectedComponent`
* Sidebar shows all modules
* Restricted features:

  * Disabled buttons
  * Toast-based access alerts
  * Conditional rendering

---

## 📊 Key Features

* 📌 Dashboard with analytics
* 🔄 Workflow builder & execution
* ✅ Task & Approval management
* 🧑‍💼 User & Organization module
* 🔗 Integrations system
* ⚙️ Admin & Governance panel

---

## ⚡ Setup Instructions

```bash
# Clone the repo
git clone <repo-url>

# Install dependencies
npm install

# Run development server
npm run dev
```

---

## 🌍 Environment Variables

Create `.env` file:

```
VITE_API_URL=http://localhost:8000
```

---

## 📡 API Handling

* Centralized API file
* Axios with credentials enabled
* No global interceptor dependency
* Explicit error handling per API

---

## 🎯 Design Philosophy

* Component-driven architecture
* Clean separation of concerns
* Scalable folder structure
* Enterprise-grade UI patterns

---

## 🚀 Future Enhancements

* 🔐 Role-Based Access Control (RBAC)
* 🌐 Multi-tenant support
* 📈 Advanced analytics
* ⚡ Performance optimization

---

## 👨‍💻 Author

Built with precision and scalability in mind.
