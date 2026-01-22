# Smart School Management System – Backend APIs

This backend is built using **NestJS + PostgreSQL + TypeORM + JWT + Role Based Access Control (RBAC)**  
It supports three roles: **ADMIN, TEACHER, STUDENT**

---

## 🔐 Authentication APIs

### POST /auth/register

Register a new user (Admin can create teachers & students).

### POST /auth/login

Login user and receive JWT token.

### GET /auth/me

Get currently logged-in user profile using token.

---

## 👑 Admin APIs (Role: ADMIN)

### GET /admin/me

Get admin profile.

### GET /admin/all

Get all users in system.

### GET /admin/all-students

Get all students.

### GET /admin/all-teachers

Get all teachers.

### POST /admin/student/create

Create a new student user.

### POST /admin/teacher/create

Create a new teacher user.

### PATCH /admin/student/update/:id

Update student profile.

### PATCH /admin/teacher/update/:id

Update teacher profile.

### PATCH /admin/users/:id/status

Activate / Deactivate a user.

### POST /admin/class

Create a new class (e.g. 10-A, 12-Science).

### POST /admin/subject

Create a new subject (Math, Physics, etc).

### POST /admin/assign-student

Assign student to a class with roll number.

### POST /admin/assign-teacher

Assign teacher to classes and subjects.

---

## 👨‍🏫 Teacher APIs (Role: TEACHER)

### GET /teacher/me

Get teacher profile.

### GET /teacher/allStudents

Get all students.

### PATCH /teacher/student/:id

Update a student profile.

### POST /teacher/student/create

Create a new student.

### GET /teacher/marks/my-classes

Get classes and subjects assigned to the teacher.

### GET /teacher/marks/class/:classId/students

Get students of a specific class.

### POST /teacher/marks

Assign marks and remarks to a student for a subject.

### PATCH /teacher/marks/:id

Update marks and remarks.

---

## 👨‍🎓 Student APIs (Role: STUDENT)

### GET /student/me

Get own profile.

### PATCH /student/:id

Update own profile.

### GET /student/report-card

View report card with:

- Class
- Roll Number
- Subjects
- Marks
- Teacher Remarks

---

## 🔒 Security

- JWT Authentication
- Role Based Guards (ADMIN, TEACHER, STUDENT)
- Data access controlled by role

---

## 🏗️ Core Features

- User Management
- Role Based Access
- Class & Subject Management
- Teacher Assignment
- Student Enrollment
- Marks & Remarks
- Report Card System

---

## 🚀 Future Scope

- Attendance Management
- Exams & Results
- Timetable
- Parent Portal
- Admin Analytics Dashboard
- GPA & Ranking System

---

**Developed as an Enterprise-Grade School ERP Backend using NestJS.**
