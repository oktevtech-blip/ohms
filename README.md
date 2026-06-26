# 🏥 Online Hospital Management System (OHMS)

A modern, full-stack Hospital Management System developed to streamline hospital operations including patient management, appointments, billing, medical records, staff management, reporting, and role-based authentication.

The system is built using **React**, **Node.js**, **Express.js**, **MySQL**, and **Tailwind CSS**, providing a secure, responsive, and user-friendly interface for hospital administrators and staff.

---

# Features

## Authentication & Authorization

- Secure Login using JWT
- Password encryption using bcrypt
- Role-Based Access Control (RBAC)
- Protected Routes
- Change Password
- Profile Management

### Supported Roles

- Admin
- Doctor
- Receptionist
- Accountant

Each role only accesses the modules assigned to them.

---

# Modules

## Dashboard

- Hospital overview
- Patient statistics
- Revenue statistics
- Appointment statistics
- Recent patients
- Recent activity
- Patient growth charts

---

## Patient Management

- Register patients
- Edit patient information
- Delete patients
- Search patients
- Patient history

---

## Doctor Management

- Add doctors
- Edit doctors
- Delete doctors
- Doctor availability
- Department assignment
- Specialization management

---

## Employee Management

Manage hospital employees including:

- Receptionists
- Accountants

Features include:

- Add employee
- Edit employee
- Delete employee
- Assign roles
- User account creation

---

## Appointment Management

- Book appointments
- Assign doctors
- View appointments
- Update appointments
- Cancel appointments

---

## Medical Records

- View patient medical records
- Diagnoses
- Prescriptions
- Laboratory results
- Doctor notes

---

## Billing & Finance

- Create invoices
- Record payments
- Track payment status
- Revenue statistics
- Monthly income
- Outstanding payments

---

## Reports & Analytics

Interactive reports including:

- Patient growth
- Revenue trends
- Department distribution
- Appointment statistics
- Hospital KPIs

---

## Settings

### Administrator

- Hospital Information
- System Preferences
- Administrator Profile
- Password Management

### All Users

- Personal Profile
- Change Password

---

# Technologies Used

## Frontend

- React
- React Router
- Axios
- Tailwind CSS
- Recharts
- React Icons

## Backend

- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcryptjs

---

# Database

MySQL

Main tables include:

- users
- roles
- patients
- doctors
- appointments
- billing
- medical_records
- settings

---

# Project Structure

```
OHMS
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── models
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   └── App.jsx
│   │
│   └── package.json
│
├── database
│   └── ohms.sql
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/oktevtech-blip/ohms.git
```

Move into the project

```bash
cd ohms
```

---

## Backend

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ohms

JWT_SECRET=your_secret_key
```

Run the backend

```bash
npm run dev
```

---

## Frontend

Open another terminal

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Start React

```bash
npm run dev
```

---

# Database Setup

1. Create a MySQL database named:

```
ohms
```

2. Import the SQL file

```
database/ohms.sql
```

3. Update the `.env` file with your MySQL credentials.

---

# User Roles

| Role | Permissions |
|------|-------------|
| Admin | Full system access |
| Doctor | Dashboard, Patients, Appointments, Medical Records, Settings |
| Receptionist | Dashboard, Patients, Appointments, Settings |
| Accountant | Dashboard, Billing, Reports, Settings |

---

# Security Features

- JWT Authentication
- Password Hashing
- Role-Based Authorization
- Protected API Routes
- Secure Password Updates

---

# Future Improvements

- Pharmacy Management
- Laboratory Management
- Ward Management
- Inventory Management
- Drug Stock Management
- Laboratory Requests
- Radiology Module
- Nurse Module
- Attendance System
- Payroll Management
- Email Notifications
- SMS Notifications
- Patient Portal
- Online Appointment Booking
- File Uploads
- PDF Reports
- Audit Logs
- Dashboard Widgets
- Dark Mode

---

# Author

**Okema Elvis Atuhairwe**

Bachelor of Science in Software Engineering


GitHub:
https://github.com/oktevtech-blip

---

# License

This project is developed for educational and portfolio purposes.

---

⭐ If you find this project useful, consider giving it a star on GitHub.