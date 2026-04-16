# API Reference

## 🌐 Base URL
The frontend connects to the **CIFPEC API** (backend).

- **Development:** `http://localhost:3000/api/v1`
- **Staging/Production:** Configured via `VITE_API_URL` in `.env`.

## 📖 Postman Documentation
Full API documentation, including request/response schemas, is available on Postman:

[![Postman Documentation](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://documenter.getpostman.com/view/18545142/2sAYQUpuAt#intro)

## 🔑 Authentication
The frontend uses **JWT (JSON Web Token)** for authentication.

- Tokens are requested via `POST /api/v1/auth/login`.
- Authentication header: `Authorization: Bearer <token>`.
- Token refreshing is managed by the `axiosInstance` interceptors.

## 🛠 Key Modules
| Module | Endpoint | Description |
|---|---|---|
| **Auth** | `/auth` | Login, Register, Logout, Password/Email verification |
| **Users** | `/users`, `/user/profile` | Manage users and view personal profile |
| **Courses** | `/courses` | Listing and managing academic courses |
| **Batches** | `/batches` | Defining project requirements per batch |
| **Projects** | `/projects` | Core PTA (Projek Tahun Akhir) management |
| **Categories** | `/categories` | Categorization for competition scoring |
| **Roles** | `/roles` | Role-based access control list |
