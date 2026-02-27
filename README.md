# 🎬 Movies CRUD – Multi-Backend Project

## 📌 Overview
This project demonstrates **CRUD operations on Movies** using **three different backend architectures**, all exposing the **same REST API contract**.

The primary goal of this project is to strengthen backend fundamentals by building the same Movies CRUD API using different backend setups, progressing from core Node.js to Express and MongoDB.

---

## 🏗 Backend Architectures Used

1. **Node.js + HTTP + File System**
2. **Express.js + File System**
3. **Express.js + MongoDB (Mongoose)**

Each backend runs independently and can be switched by **starting the desired server**.

---

## 🖥 Frontend (React)

A simple **React-based frontend** is included to consume and test all backend APIs.

**Frontend Responsibilities:**
- Select backend environment
- Fetch movies from the active backend
- Add, update, and delete movies
- Demonstrate backend switching in real time

The frontend remains unchanged regardless of the backend used, ensuring a consistent API contract.

---

## 🔀 Backend Switching (How It Works)

- All backends expose the same API endpoints:
  - `GET /movies`
  - `POST /movies`
  - `PUT /movies/:id`
  - `DELETE /movies/:id`
- No code changes are required to switch backends
- Backend switching is handled by **choosing which server to run**
- This allows easy comparison of different architectures using the same API design

---

## ✨ Features

- Create, read, update, and delete movies
- Consistent REST API across all backends
- File-based persistence (Node.js & Express)
- Database persistence using MongoDB Atlas
- Clean separation of routes, controllers, and data layers
- Validation middleware (Express + FS)
- Proper error handling and status codes

---

## 🧠 What I Learned

- How HTTP servers work using Node.js core modules
- Differences between manual routing and Express routing
- REST API design and CRUD lifecycle
- Express architecture (Router, Controller, Middleware)
- File System–based persistence vs database persistence
- MongoDB integration using Mongoose
- Schema design and data validation
- Async/Await and error handling
- Designing scalable backend projects

---

## 🗂 Project Structure

```text
Movies_Project/
│
├── 1Frontend/                  # API consumer
│
├── 2NodeJS-FileSystemDB/       # Node.js + HTTP + File System
│
├── 3ExpressJS-FileSystemDB/    # Express.js + File System
│
├── 4ExpressJS-MongoDB/         # Express.js + MongoDB
│
└── README.md
```


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/NetetiPavanKumar/movies-crud-multi-backend.git
cd Movies_Project
```

### 2️⃣ Start the Backends

Each backend runs independently.
Open a new terminal for each backend.

    2.1 Node.js + File System

    ```bash
    cd ./2NodeJS-FileSystemDB/
    npm start
    ```

    2.2 Express.js + File System

    ```bash
    cd ./3ExpressJS-FileSystemDB/
    npm start
    ```

    2.3 Express.js + MongoDB

    Create a .env file inside 4ExpressJS-MongoDB/:
    
    ```env
    PORT=3003
    ATLAS_CONN_STR=your_mongodb_connection_string
    ```
    
    Then start the server:
    
    ```bash
    cd ./4ExpressJS-MongoDB/
    npm start
    ```

### 3️⃣ Start the Frontend

```bash
cd ./1Frontend/
npm run dev
```
