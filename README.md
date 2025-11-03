# 📚 Library Management System

A full-stack **Library Management System** built with **MERN stack** (MongoDB, Express.js, React.js, Node.js) for managing books, users, and borrow/return operations. Supports **admin and member roles**, search functionality, and integrates external book APIs for fetching book data.

---

## 🛠️ Features

### User Management
- User registration and login
- Admin and member roles
- Password hashing with bcrypt
- View all users (admin only)

### Book Management
- Add, view, borrow, and return books
- Admin can add books manually
- Books fetched from Open Library API
- Search books by title or author
- Lazy loading for performance

### Borrow & Return System
- Track borrow history for users
- Borrow / return buttons per book
- Status indicators: Available / Borrowed
- Automatic update after borrowing/returning

### UI / UX
- Responsive and clean UI with **TailwindCSS**
- Loader for initial page load
- Borrow / return buttons indicate processing
- Search bar for books

---

## 💻 Tech Stack

- **Frontend:** React.js, TailwindCSS, Axios, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (optional), bcrypt for password hashing
- **APIs:** Open Library API for book data

---

## 🔧 Project Setup

### Backend Setup

1. Clone the repository:

```bash
git clone <repo-url>
cd backend

Install dependencies:

npm install


Create a .env file:

PORT=5000
MONGO_URI=<your_mongodb_connection_string>


Start the backend server:

npm run dev


Uses nodemon for live-reloading.

Frontend Setup

Navigate to frontend:

cd frontend


Install dependencies:

npm install


Start the React app:

npm start


The app runs on http://localhost:3000 by default.

📁 Project Structure
backend/
├─ controllers/
│  └─ userController.js
│  └─ bookController.js
├─ models/
│  └─ userModel.js
│  └─ bookModel.js
├─ routes/
│  └─ userRoute.js
│  └─ bookRoute.js
├─ server.js
frontend/
├─ src/
│  ├─ components/
│  │  └─ AddBook.jsx
│  │  └─ BookList.jsx
│  │  └─ BorrowHistory.jsx
│  ├─ pages/
│  │  └─ Login.jsx
│  │  └─ Signup.jsx
│  ├─ App.jsx
│  ├─ index.css
│  └─ index.js

🔑 Usage

Register a new user or login.

Admin can:

Add books

View all users

Manage borrow/return

Members can:

View available books

Borrow/return books

Use the search bar to filter books by title or author.

⚡ API Endpoints
User Routes
Method	Endpoint	Description
POST	/api/users/register	Register a new user
POST	/api/users/login	Login a user
GET	/api/users/	Get all users (admin only)
Book Routes
Method	Endpoint	Description
GET	/api/books	Get all books (DB)
GET	/api/books/fetch	Fetch books from Open Library API
POST	/api/books	Add a new book (admin only)
POST	/api/borrow	Borrow a book
PUT	/api/borrow/return	Return a borrowed book
📌 Notes

Ensure MongoDB is running and .env contains a valid connection string.

Frontend calls backend at http://localhost:5000 by default; update if deployed elsewhere.

Admin-only routes should be protected with middleware (optional enhancement).

📦 Dependencies

Backend: express, mongoose, bcryptjs, dotenv, cors, nodemon
Frontend: react, axios, react-router-dom, tailwindcss

🌐 Future Enhancements

Add JWT authentication for secure sessions

Pagination for book list

User profile management

Email notifications for borrow/return

👨‍💻 Author

Ahmad Raza – Full-stack MERN developer


This file is **copy-paste ready** and covers backend, frontend, API endpoints, usage, setup, and future enhancements.  

If you want, I can also **add a section with screenshots of the UI and example API responses** to make it visually professional for GitHub.  

Do you want me to do that?