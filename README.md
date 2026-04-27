# Mini SaaS Task Manager

A simple, full-stack task management web application. I built this to manage daily tasks, keeping things minimal and clean. It supports user accounts, so you only see your own personal tasks!

## Features

- **User Authentication:** Secure sign-up and log-in using JWT and bcrypt.
- **Task CRUD:** Create, view, update (mark complete/undo), and delete tasks dynamically.
- **Multi-user Support:** Tasks are tied to specific users securely via a PostgreSQL database.
- **Clean UI:** A simple, no-fuss interface built with Tailwind CSS.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS v4, React Router Dom, Axios
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL, Sequelize ORM

## Folder Structure

```text
Mini-SaaS-Task-App/
├── backend/
│   ├── config/      # Database connection logic
│   ├── controllers/ # Route handlers (auth & tasks)
│   ├── middlewares/ # JWT auth & logging logic
│   ├── models/      # Sequelize database schemas (User, Task)
│   ├── routes/      # Express endpoints
│   ├── server.js    # Entry file
│   └── .env         # Environment configuration
└── frontend/
    ├── src/
    │   ├── layouts/     # Main wrapper (MainLayout)
    │   ├── pages/       # Views: Login, Signup, Dashboard
    │   ├── App.jsx      # Navigation routing tree
    │   └── index.css    # Tailwind config
    └── vite.config.js
```

## How to Run Locally

### 1. Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add your Postgres credentials:
   ```env
   PORT=5000
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=super_secret_jwt_key_123_!
   ```
4. Start the Express server:
   ```bash
   node server.js
   ```
   *Note: On your first run, Sequelize will automatically create the tables inside your PostgreSQL database.*

### 2. Frontend Setup

1. Open a second terminal window and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open the link (`http://localhost:5173/`) provided in the terminal to view the app!

## API Endpoints Overview

### Authentication (Public)
- `POST /api/auth/signup` - Register a new account (requires email and password).
- `POST /api/auth/login` - Sign into your account and receive a JWT token.

### Tasks (Protected - Requires Bearer Token)
- `GET /api/tasks` - Get all tasks for the logged-in user.
- `POST /api/tasks` - Create a new task.
- `PUT /api/tasks/:id` - Change a task's status.
- `DELETE /api/tasks/:id` - Permanently delete a task.
