# 🚀 AxionFlow - Workflow Management SaaS
A high-concurrency Enterprise SaaS platform for multi-domain workflow automation, governance, and organizational control. Built with React (FastAPI backend) focusing on RBAC, immutable audit logs, and integrated payment systems.

## 📌 Overview
AxiomFlow is an enterprise-grade workflow automation platform designed to streamline complex business processes. It provides a centralized hub for managing workflows, tasks, and compliance across multiple domains.

## 🧱 Architecture
- **Frontend:** React (Vite) + Redux Toolkit + Tailwind CSS
- **Backend:** FastAPI (Python 3.12+) + SQLAlchemy ORM
- **Database:** PostgreSQL (Hosted on Neon.tech)
- **Auth:** JWT + Refresh Token (Secure HTTP-only Cookie-based)
- **Storage:** Cloudinary (Media & Documents)
- **Email:** Resend API (System Notifications)

## 🔐 Key Features
- **Role-Based Access Control (RBAC):** Granular permission management.
- **Workflow Builder & Execution:** Dynamic versioning and execution tracking.
- **Task & Approval Engine:** Multi-stage SLA tracking and approval history.
- **Real-time Dashboard:** Analytics, audit logs, and compliance centers.
- **Secure Auth System:** Robust token-based lifecycle management.

## 🗂️ Project Structure
/frontend → React App  
/backend → FastAPI Server  

## ⚙️ Setup Instructions

### 1. Clone repo
git clone ...

### 2. Run Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

### 3. Run Frontend
cd frontend
npm install
npm run dev

## 🔐 Authentication Flow
- Access Token (short-lived)
- Refresh Token (HTTP-only cookie)
- Auto refresh mechanism

## 📸 Screenshots (optional but powerful)

## 🚀 Future Enhancements
- Multi-tenant architecture
- WebSocket live updates
- AI workflow suggestions