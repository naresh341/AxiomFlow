# ⚙️ AxiomFlow Backend

A robust **Workflow Management Backend API** built using FastAPI, SQLAlchemy, and JWT-based authentication.

---

## 🧠 Overview

This backend powers:

* Workflow execution
* Task and approval systems
* Authentication & authorization
* Organizational structure

---

## 🏗️ Tech Stack

* ⚡ FastAPI
* 🗄️ SQLAlchemy ORM
* 🐘 PostgreSQL (or any SQL DB)
* 🔐 JWT Authentication
* 🔑 OAuth2 Password Flow
* 📩 Email Service (Password Reset)
* 🔄 Alembic (Migrations)

---

## 📁 Project Structure

```
app/
│── model/
│── schemas/
│── services/
│── repositories/
│── auth/
│── core/
│── routes/
│── main.py
```

---

## 🔐 Authentication System

* Access Token (Short-lived)
* Refresh Token (HTTP-only cookies)
* Secure login/logout flow

### Endpoints:

* `POST /auth/login`
* `POST /auth/logout`
* `POST /auth/refresh`
* `GET /auth/me`
* `POST /auth/register`

---

## 🔁 Password Reset Flow

* Token-based reset system
* Email integration

Endpoints:

* `/auth/forgot-password`
* `/auth/reset-password`

---

## 📊 Core Modules

### 🔄 Workflow

* Create workflows
* Version management
* Execution tracking

### 📋 Task

* Assign tasks
* Track status & priority
* Pagination & filtering

### ✅ Approval

* Multi-stage approval system
* SLA tracking
* Approval history

### 🏢 Organization

* User & team management
* Role assignment

---

## ⚡ Error Handling

Custom exception system:

```python
class AppException(HTTPException):
```

Standard response format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": null
  }
}
```

---

## 📡 API Features

* Pagination support
* Filtering & search
* Structured responses
* Clean service-repository architecture

---

## ⚙️ Setup Instructions

```bash
# Create virtual environment
python -m venv venv

# Activate environment
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn app.main:app --reload
```

---

## 🌍 Environment Variables

Create `.env` file:

```
DATABASE_URL=postgresql://user:password@localhost/db
SECRET_KEY=your_secret_key
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
```

---

## 🔒 Security Features

* Password hashing (bcrypt)
* Token hashing for reset tokens
* HTTP-only cookies
* Secure authentication flow

---

## 🧱 Architecture Pattern

* Service Layer → Business Logic
* Repository Layer → DB Queries
* Schema Layer → Validation
* Model Layer → DB Structure

---

## 🚀 Future Enhancements

* 🔐 Role-Based Access Control (RBAC)
* 📊 Audit logging system
* 📡 WebSocket support for real-time updates
* 🌐 Multi-tenant architecture

---

## 👨‍💻 Author

Engineered for scalability, modularity, and enterprise-grade performance.
