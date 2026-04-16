# Product Specification - CIFPEC Frontend

## 📌 Product Overview
**CIFPEC (Creative Innovation Final Project Exhibition and Competition)** is a dedicated platform for **ADTEC Melaka** to streamline the management of student Final Year Projects (PTA - Projek Tahun Akhir). The frontend dashboard provides an intuitive interface for students to submit projects and for staff (Admins, Coordinators, and Supervisors) to manage and evaluate them.

## 🎯 Target Audience
- **Students:** To register, submit project details, and participate in innovation competitions.
- **Supervisors:** To oversee and guide assigned student projects.
- **Coordinators:** To manage and monitor projects within specific courses.
- **Admins:** To control the entire system, including user roles, batch requirements, and site settings.

## ✨ Core Features
- **Project Lifecycle Management:** Handles everything from submission to final archiving of PTA projects.
- **Dynamic Batch Requirements:** Interfaces with the backend to allow Admins to define custom fields for each batch (e.g., posters, slides, video links).
- **Role-Based Access Control (RBAC):** UI adapts based on user permissions (Admin vs Student views).
- **Data Visualization:** Dashboard charts (Chart.js) to monitor project counts, categories, and student distribution.
- **Reporting:** Integration with backend PDF generation for project reports.

## 🏗 Technical Constraints
- **Framework:** React 19 (Vite)
- **API Integration:** Must communicate with CIFPEC Node.js API via REST.
- **Authentication:** Token-based (JWT) with secure storage.
- **Responsive Design:** Must work across desktop and tablet devices for onsite competition evaluation.

## ✅ Success Metrics
- Successful submission of PTA projects by all final year students.
- Efficient evaluation process by supervisors and coordinators through the dashboard.
- Centralized archive of all past innovation projects for ADTEC Melaka.
