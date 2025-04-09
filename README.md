

# 🎓 Student Attendance System

A full-stack web application for managing B.Tech student attendance. It provides real-time code-based attendance, timetable management, and role-specific dashboards for Admins, Teachers, and Students.

---

![Logo](https://github.com/vyshnaviGadamsetty/Student_attenadance_system/blob/e6306b31882d23b5639324be5e5ff5411650af39/frontend/src/assets/logo.jpeg)

## ✨ Features

- 🔐 Secure login with JWT authentication
- 🧑‍🏫 Admin dashboard to manage teachers, students, sections, and timetables
- ⏰ Teachers generate real-time attendance codes
- 📥 Students mark attendance using unique codes
- 📊 Manual and auto attendance modes
- 📆 Weekly timetable for teachers and students
- 📌 Attendance request management

---

## 🧑‍💻 Tech Stack

| Layer     | Technology                |
|-----------|---------------------------|
| Frontend  | React.js (Vite) + Bootstrap |
| Backend   | Node.js + Express.js      |
| Database  | MongoDB                   |
| Auth      | JWT (Token-based)         |

---

## 🖼️ Screenshots

### 🔐 Login
![Login](https://github.com/vyshnaviGadamsetty/Student_attenadance_system/blob/e6306b31882d23b5639324be5e5ff5411650af39/frontend/src/assets/Login.png)

### 🛠️ Admin Dashboard
![Admin Dashboard](https://github.com/vyshnaviGadamsetty/Student_attenadance_system/blob/e6306b31882d23b5639324be5e5ff5411650af39/frontend/src/assets/Admin_Dashboard.png)

### 👩‍🏫 Manage Teachers & Students
| Manage Teachers | Manage Students |
|-----------------|-----------------|
| ![Manage Teachers](https://github.com/vyshnaviGadamsetty/Student_attenadance_system/blob/e6306b31882d23b5639324be5e5ff5411650af39/frontend/src/assets/manage_teachers.png) | ![Manage Students](https://github.com/vyshnaviGadamsetty/Student_attenadance_system/blob/e6306b31882d23b5639324be5e5ff5411650af39/frontend/src/assets/manage_students.png) |

### 🧩 Manage Sections & Teacher Timetables
| Sections Timetables | Teacher Timetables |
|----------|------------|
| ![Manage Section](https://github.com/vyshnaviGadamsetty/Student_attenadance_system/blob/e6306b31882d23b5639324be5e5ff5411650af39/frontend/src/assets/manage_section.png) | ![Manage Timetable](https://github.com/vyshnaviGadamsetty/Student_attenadance_system/blob/e6306b31882d23b5639324be5e5ff5411650af39/frontend/src/assets/Manage_Teacher_Timetable.png) |

### 🧾 Manual Attendance
![Manual Attendance](https://github.com/vyshnaviGadamsetty/Student_attenadance_system/blob/e6306b31882d23b5639324be5e5ff5411650af39/frontend/src/assets/Manual_Attendance.png)

### 🔐 Random Code Attendance
| Teacher Side | Student Side |
|--------------|---------------|
| ![Generate Code](https://github.com/vyshnaviGadamsetty/Student_attenadance_system/blob/e6306b31882d23b5639324be5e5ff5411650af39/frontend/src/assets/Random_code_Attendance.png) | ![Enter Code](https://github.com/vyshnaviGadamsetty/Student_attenadance_system/blob/e6306b31882d23b5639324be5e5ff5411650af39/frontend/src/assets/entering_random_number.png) |

### 🛠️ View Timetable of a student
![Student Timetable](https://github.com/vyshnaviGadamsetty/Student_attenadance_system/blob/e6306b31882d23b5639324be5e5ff5411650af39/frontend/src/assets/Students_Timetable.png)
### 🛠️ View Attendance Percentage
![Attendance Percentage](https://github.com/vyshnaviGadamsetty/Student_attenadance_system/blob/e6306b31882d23b5639324be5e5ff5411650af39/frontend/src/assets/View_Attendance.png)
### 📑 View & Request Attendance
| View Request| Request Attendance |
|------------------|--------------------|
| ![View Request](https://github.com/vyshnaviGadamsetty/Student_attenadance_system/blob/e6306b31882d23b5639324be5e5ff5411650af39/frontend/src/assets/accepting_request.png) | ![Request Page](https://github.com/vyshnaviGadamsetty/Student_attenadance_system/blob/e6306b31882d23b5639324be5e5ff5411650af39/frontend/src/assets/request_page.png) |

### ✅  Request Status
![Status](https://github.com/vyshnaviGadamsetty/Student_attenadance_system/blob/e6306b31882d23b5639324be5e5ff5411650af39/frontend/src/assets/request_status.png) 
### 🔐 Post Summary
| Teacher Side | Student Side |
|--------------|---------------|
| ![Post Summary](https://github.com/vyshnaviGadamsetty/Student_attenadance_system/blob/e6306b31882d23b5639324be5e5ff5411650af39/frontend/src/assets/summary_post.png) | ![Enter Code](https://github.com/vyshnaviGadamsetty/Student_attenadance_system/blob/e6306b31882d23b5639324be5e5ff5411650af39/frontend/src/assets/summary%20page.png) |

---

## 📁 Folder Structure

```
attendance/
├── frontend/        # React + Vite client app
├── backend/         # Express backend APIs
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/attendance.git
cd attendance
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

#### 📄 Create `.env` file

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/attendance
JWT_SECRET=your_jwt_secret
```

#### ▶️ Run the Server

```bash
node server.js
```

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🌱 Seeding the Database

Initial data includes admins, teachers, students, subjects, and timetable entries.

### ✅ Steps to Seed

1. Open `backend/SeedDatabase.js`

2. Run:

```bash
node SeedDatabase.js
```

4. Re-comment or delete the script after successful seeding.

---

## 🎯 Future Enhancements

- 📈 Admin analytics dashboard
- 📩 Email notifications for attendance
- 📲 Mobile app (React Native or Flutter)
- 📥 CSV & Excel export options
- ⌛ Attendance history by date range

---

## 👩‍💻 Developed By

**Sri Vyshnavi Gadamsetty** and team  
Made with ❤️ from Vijayawada

---
