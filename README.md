# 🕌 Darul Hikmah Institute - Madrasa Management System

A comprehensive full-stack management system for Darul Hikmah Institute (দারুল হিকমাহ ইনস্টিটিউট), designed to streamline administrative tasks, student management, teacher coordination, and academic operations for a modern Islamic educational institution.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Usage Guide](#usage-guide)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)

## 🎯 Overview

This is a complete management system built for Darul Hikmah Institute, an Islamic educational institution that combines religious (দ্বীনি) and modern (জাগতিক) education. The system provides role-based dashboards for Principals, Teachers, and Guardians, enabling efficient management of students, courses, results, notices, homework, and attendance.

### Key Highlights

- **Multi-role Dashboard System**: Separate interfaces for Principal, Teachers, and Guardians
- **Bilingual Support**: Bengali (বাংলা) and English interface
- **Comprehensive Student Management**: Complete student lifecycle from admission to results
- **Academic Management**: Course assignment, grading, homework, and attendance tracking
- **Communication System**: Notice board and notification system
- **Modern UI/UX**: Responsive design with Tailwind CSS

## ✨ Features

### 🎓 Principal Dashboard

- **Overview Dashboard**: Statistics and key metrics
- **Student Management**:
  - View all students with detailed information
  - Add new students with comprehensive data collection
  - Edit and update student records
  - Filter by class, section, and other criteria
- **Teacher Management**:
  - View all teachers with profiles
  - Add new teachers with qualifications
  - Edit teacher information
  - Track teacher assignments
- **Course Management**:
  - Create and manage courses
  - Assign teachers to courses
  - Link courses to classes
- **Results Management**:
  - View and manage student results
  - Create exam results with grades
  - Filter results by class, exam, and student
- **Notice Board**:
  - Create and publish notices
  - Categorize notices (info, warning, success)
  - Manage notice visibility

### 👨‍🏫 Teacher Dashboard

- **Overview**: Personal statistics and assigned students
- **Student Management**:
  - View assigned students
  - Track student progress
- **Attendance Management**:
  - Mark daily attendance
  - View attendance history
  - Generate attendance reports
- **Grading System**:
  - Grade students by subject
  - Multiple grading views (list, grid)
  - Subject-specific grading
- **Homework Management**:
  - Assign homework to students
  - Track homework submissions
  - Grade homework assignments
- **Notices**: View and respond to institutional notices
- **Profile Management**: Update personal information

### 👨‍👩‍👧 Guardian Dashboard

- **Student Information**: View child's academic details
- **Notifications**: Real-time notifications for important updates
- **Results**: View child's exam results and grades
- **Notices**: Access to institutional notices
- **Communication**: Direct communication with teachers

### 🏠 Public Website

- **Homepage**: Institution information and features
- **About Page**: Detailed information about the institute
- **Contact Page**: Contact information and form
- **Admission Information**: Admission dates and procedures
- **Social Media Integration**: Facebook feed integration

## 🛠️ Technology Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js 4.18.2
- **Database**: MongoDB with Mongoose 7.0.0
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Security**:
  - Helmet 7.1.0 (HTTP headers security)
  - CORS 2.8.5 (Cross-origin resource sharing)
  - express-rate-limit 7.1.5 (Rate limiting)
  - bcryptjs 2.4.3 (Password hashing)
- **Utilities**:
  - express-validator 7.0.1 (Input validation)
  - morgan 1.10.0 (HTTP request logger)
  - compression 1.7.4 (Response compression)
  - dotenv 16.6.1 (Environment variables)

### Frontend

- **Framework**: Next.js 15.3.5 (React 19.2.0)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios 1.11.0
- **UI Components**:
  - Radix UI (@radix-ui/react-slot)
  - Lucide React 0.525.0 (Icons)
  - React Icons 5.5.0
- **State Management**: React Hooks
- **Notifications**: React Hot Toast 2.5.2
- **Email**: EmailJS (@emailjs/browser 4.4.1)
- **Utilities**:
  - class-variance-authority 0.7.1
  - clsx 2.1.1
  - tailwind-merge 3.3.1

## 📁 Project Structure

```
Madrasa_Management/
├── backend/                          # Node.js/Express Backend
│   ├── config/
│   │   └── database.js               # MongoDB connection configuration
│   ├── controllers/                  # Business logic controllers
│   │   ├── courseController.js      # Course management logic
│   │   ├── gradeController.js       # Grading system logic
│   │   ├── homeworkController.js    # Homework management
│   │   ├── noticeController.js     # Notice board logic
│   │   ├── resultController.js     # Results management
│   │   ├── studentController.js    # Student CRUD operations
│   │   └── teacherController.js    # Teacher management
│   ├── middleware/                  # Express middleware
│   │   ├── advancedResults.js      # Advanced query results
│   │   ├── async.js                # Async error handler wrapper
│   │   ├── auth.js                 # JWT authentication
│   │   └── errorHandler.js         # Global error handler
│   ├── models/                       # MongoDB Schemas (Mongoose)
│   │   ├── Course.js               # Course model
│   │   ├── Grade.js                # Grade model
│   │   ├── Homework.js             # Homework model
│   │   ├── Notice.js               # Notice model
│   │   ├── Result.js               # Result model
│   │   ├── Student.js              # Student model
│   │   └── Teacher.js              # Teacher model
│   ├── routes/                       # API Routes
│   │   ├── course.js               # Course endpoints
│   │   ├── grade.js                # Grade endpoints
│   │   ├── homework.js             # Homework endpoints
│   │   ├── notices.js              # Notice endpoints
│   │   ├── results.js              # Result endpoints
│   │   ├── students.js             # Student endpoints
│   │   └── teachers.js             # Teacher endpoints
│   ├── scripts/
│   │   └── seedData.js             # Database seeding script
│   ├── utils/                        # Utility functions
│   │   ├── appError.js             # Custom error class
│   │   ├── catchAsync.js           # Async wrapper
│   │   └── errorResponse.js        # Error response formatter
│   ├── server.js                    # Main server file
│   └── package.json                 # Backend dependencies
│
└── frontend/                         # Next.js Frontend
    ├── public/                       # Static assets
    │   └── images/                  # Images and logos
    ├── src/
    │   ├── app/                     # Next.js App Router
    │   │   ├── about/              # About page
    │   │   ├── components/         # Shared components
    │   │   │   ├── FacebookFeed.tsx
    │   │   │   ├── types.ts
    │   │   │   └── withAuth.tsx   # Authentication HOC
    │   │   ├── contact/            # Contact page
    │   │   ├── dashboard-guardian/ # Guardian dashboard
    │   │   │   └── page.tsx
    │   │   ├── dashboard-principal/# Principal dashboard
    │   │   │   ├── CourseAssignmentTab.tsx
    │   │   │   ├── NoticeModal.tsx
    │   │   │   ├── NoticesTab.tsx
    │   │   │   ├── OverviewTab.tsx
    │   │   │   ├── page.tsx
    │   │   │   ├── ResultModal.tsx
    │   │   │   ├── ResultsTab.tsx
    │   │   │   ├── Sidebar.tsx
    │   │   │   ├── StudentModal.tsx
    │   │   │   ├── StudentsTab.tsx
    │   │   │   ├── TeacherModal.tsx
    │   │   │   └── TeachersTab.tsx
    │   │   ├── dashboard-teacher/  # Teacher dashboard
    │   │   │   ├── AttendanceTab.tsx
    │   │   │   ├── GradingView.tsx
    │   │   │   ├── Header.tsx
    │   │   │   ├── HomeworkTab.tsx
    │   │   │   ├── NoticesTab.tsx
    │   │   │   ├── OverviewTab.tsx
    │   │   │   ├── page.tsx
    │   │   │   ├── ProfileModal.tsx
    │   │   │   ├── SettingsTab.tsx
    │   │   │   ├── Sidebar.tsx
    │   │   │   └── types.ts
    │   │   ├── login/              # Login page
    │   │   ├── new-student-add/   # Student registration
    │   │   ├── new-teacher-add/   # Teacher registration
    │   │   ├── register/          # User registration
    │   │   ├── test-api/          # API testing page
    │   │   ├── globals.css        # Global styles
    │   │   ├── layout.tsx         # Root layout
    │   │   └── page.tsx           # Homepage
    │   ├── components/
    │   │   └── ui/                # Reusable UI components
    │   │       ├── badge.tsx
    │   │       ├── button.tsx
    │   │       └── card.tsx
    │   ├── lib/
    │   │   ├── api.ts             # Axios API client
    │   │   └── utils.ts           # Utility functions
    │   └── services/
    │       └── gradeService.ts    # Grade service
    ├── package.json               # Frontend dependencies
    └── tsconfig.json              # TypeScript configuration
```

## 🚀 Installation & Setup

### Prerequisites

- **Node.js**: v18 or higher
- **MongoDB**: v6 or higher (local or cloud instance)
- **npm** or **yarn**: Package manager

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Madrasa_Management
```

### Step 2: Backend Setup

```bash
cd backend
npm install
```

### Step 3: Frontend Setup

```bash
cd ../frontend
npm install
```

### Step 4: Environment Configuration

Create environment files (see [Environment Variables](#environment-variables) section below).

### Step 5: Start MongoDB

Ensure MongoDB is running on your system:

```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
```

### Step 6: Seed Database (Optional)

```bash
cd backend
npm run seed
```

### Step 7: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev  # Development mode with nodemon
# OR
npm start    # Production mode
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🔐 Environment Variables

### Backend (.env)

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/madrasa_management
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/madrasa_management

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env.local)

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

#### Students
- `GET /students` - Get all students
- `GET /students/:id` - Get student by ID
- `POST /students` - Create new student
- `PUT /students/:id` - Update student
- `DELETE /students/:id` - Delete student

#### Teachers
- `GET /teachers` - Get all teachers
- `GET /teachers/:id` - Get teacher by ID
- `POST /teachers` - Create new teacher
- `PUT /teachers/:id` - Update teacher
- `DELETE /teachers/:id` - Delete teacher

#### Courses
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get course by ID
- `POST /courses` - Create new course
- `PUT /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course

#### Results
- `GET /results` - Get all results
- `GET /results/:id` - Get result by ID
- `POST /results` - Create new result
- `PUT /results/:id` - Update result
- `DELETE /results/:id` - Delete result

#### Notices
- `GET /notices` - Get all notices
- `GET /notices/:id` - Get notice by ID
- `POST /notices` - Create new notice
- `PUT /notices/:id` - Update notice
- `DELETE /notices/:id` - Delete notice

#### Homework
- `GET /homework` - Get all homework assignments
- `GET /homework/:id` - Get homework by ID
- `POST /homework` - Create new homework
- `PUT /homework/:id` - Update homework
- `DELETE /homework/:id` - Delete homework

#### Grades
- `GET /grade` - Get all grades
- `GET /grade/:id` - Get grade by ID
- `POST /grade` - Create new grade
- `PUT /grade/:id` - Update grade
- `DELETE /grade/:id` - Delete grade

#### Health Check
- `GET /health` - Server health check

## 📖 Usage Guide

### For Principals

1. **Login** to the principal dashboard
2. **Add Students**: Navigate to "শিক্ষার্থী তথ্য" (Student Information) → Click "নতুন শিক্ষার্থী যোগ করুন" (Add New Student)
3. **Add Teachers**: Navigate to "শিক্ষক তথ্য" (Teacher Information) → Click "নতুন শিক্ষক যোগ করুন" (Add New Teacher)
4. **Manage Courses**: Navigate to "কোর্স ব্যবস্থাপনা" (Course Management) → Create and assign courses
5. **View Results**: Navigate to "ফলাফল" (Results) → View and manage student results
6. **Post Notices**: Navigate to "নোটিশ বোর্ড" (Notice Board) → Create and publish notices

### For Teachers

1. **Login** to the teacher dashboard
2. **View Students**: See all assigned students in the overview
3. **Mark Attendance**: Navigate to "উপস্থিতি" (Attendance) → Mark daily attendance
4. **Grade Students**: Navigate to "গ্রেডিং" (Grading) → Select subject and grade students
5. **Assign Homework**: Navigate to "হোমওয়ার্ক" (Homework) → Create and assign homework
6. **View Notices**: Check institutional notices in the notices tab

### For Guardians

1. **Login** to the guardian dashboard
2. **View Child's Information**: See academic details and progress
3. **Check Notifications**: View important updates and notices
4. **View Results**: Access exam results and grades
5. **Contact Teachers**: Use the communication features

## 💻 Development

### Backend Development

```bash
cd backend
npm run dev  # Starts with nodemon for auto-reload
```

### Frontend Development

```bash
cd frontend
npm run dev  # Starts Next.js development server
```

### Code Structure

- **Backend**: Follows MVC pattern with controllers, models, and routes
- **Frontend**: Uses Next.js App Router with TypeScript
- **Styling**: Tailwind CSS utility classes
- **State Management**: React Hooks (useState, useEffect, useCallback)

### Database Models

#### Student Model
- Personal information (name, DOB, gender, blood group, NID)
- Contact information (address, phone, email, guardian details)
- Academic information (class, teacher, previous education)
- Health information (medical conditions, allergies)

#### Teacher Model
- Personal information (name, DOB, family details, NID)
- Contact information (address, phone, email)
- Educational qualifications (education, university, subject)
- Job information (designation, salary, joining date)
- Experience and references

#### Course Model
- Course name and code
- Class association
- Teacher assignment
- Description

#### Result Model
- Student reference
- Exam information
- Grade and marks
- Subject and remarks
- Exam date

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error**
```
Error: MongoDB connection failed
```
- **Solution**: Ensure MongoDB is running and `MONGODB_URI` is correct in `.env`

**Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
- **Solution**: Change `PORT` in `.env` or kill the process using port 5000:
  ```bash
  lsof -ti:5000 | xargs kill -9
  ```

**Module Not Found**
```
Error: Cannot find module 'express'
```
- **Solution**: Run `npm install` in the backend directory

### Frontend Issues

**API Connection Error**
```
Error: Network Error or 404 Not Found
```
- **Solution**: 
  - Check `NEXT_PUBLIC_API_URL` in `.env.local`
  - Ensure backend server is running
  - Check CORS configuration in backend

**Build Errors**
```
Error: Failed to compile
```
- **Solution**: 
  - Clear `.next` folder: `rm -rf .next`
  - Rebuild: `npm run build`

**TypeScript Errors**
- **Solution**: Check `tsconfig.json` configuration and ensure all types are properly defined

### Common Issues

**Authentication Token Expired**
- **Solution**: Log out and log back in to get a new token

**CORS Errors**
- **Solution**: Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL

## 🔮 Future Improvements

### Authentication & Authorization
- [ ] Complete JWT-based authentication for all routes
- [ ] Role-based access control (RBAC) implementation
- [ ] Password reset functionality
- [ ] Email verification

### Features
- [ ] Student attendance tracking with detailed reports
- [ ] Fee management system
- [ ] Library management
- [ ] Event management and calendar
- [ ] SMS notification integration
- [ ] File upload for documents and assignments
- [ ] Advanced search and filtering
- [ ] Export data to PDF/Excel
- [ ] Dashboard analytics and charts

### Technical Improvements
- [ ] Unit and integration tests
- [ ] API documentation with Swagger/OpenAPI
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Performance optimization
- [ ] Caching implementation (Redis)
- [ ] Real-time updates with WebSockets
- [ ] Mobile app (React Native)

### UI/UX Enhancements
- [ ] Dark mode support
- [ ] Improved responsive design
- [ ] Accessibility improvements (WCAG compliance)
- [ ] Multi-language support (full internationalization)
- [ ] Advanced data visualization

## 📝 License

This project is proprietary software developed for Darul Hikmah Institute.

## 👥 Contributing

This is a private project. For contributions or suggestions, please contact the project maintainers.

## 📞 Support

For support and inquiries:
- **Institution**: Darul Hikmah Institute (দারুল হিকমাহ ইনস্টিটিউট)
- **Facebook**: [Darul Hikmah Institute](https://www.facebook.com/DarulHikmahInstitute.edu)
- **YouTube**: [Darul Hikmah Institute](https://www.youtube.com/@DarulHikmahInstitute25)

---

**Built with ❤️ for Darul Hikmah Institute**

*"দ্বীনি ও জাগতিক শিক্ষার সমন্বয়ে আধুনিক পাঠ্যক্রমে পরিচালিত একটি ন্যাশনাল ধর্মীয় দ্বীনি শিক্ষা প্রতিষ্ঠান"*
