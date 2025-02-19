# 📚 Book Management API

## 🚀 About The Project

This is a **Book Management API** built with **Node.js** and **Express**, following the **Layered Architecture (N-Tier Architecture)** approach. The API supports **authentication**, **authorization**, and **CRUD operations** for books. It also features **global error handling** and uses **HTTP-only cookies** for secure user sessions.

## ✨ Features

- 🛡️ **Authentication & Authorization** (JWT-based)
- 📚 **CRUD Operations for Books**
- 🍪 **Secure HTTP-Only Cookie Authentication**
- 🌍 **Global Error Handling Middleware**
- 📂 **Layered Architecture (Controller, Service, Route Layers)**
- 📦 **Repository Pattern for Data Access**

## 🏗️ Project Structure

```
📦 node-backend-project
 ┣ 📂 src
 ┃ ┣ 📂 features
 ┃ ┃ ┣ 📂 auth
 ┃ ┃ ┃ ┣ 📂 controllers
 ┃ ┃ ┃ ┣ 📂 services
 ┃ ┃ ┃ ┣ 📂 routes
 ┃ ┃ ┣ 📂 book
 ┃ ┃ ┃ ┣ 📂 controllers
 ┃ ┃ ┃ ┣ 📂 services
 ┃ ┃ ┃ ┣ 📂 routes
 ┃ ┃ ┣ 📂 user
 ┃ ┃ ┃ ┣ 📂 controllers
 ┃ ┃ ┃ ┣ 📂 services
 ┃ ┃ ┃ ┣ 📂 routes
 ┃ ┣ 📂 models
 ┃ ┣ 📂 shared
 ┃ ┃ ┣ 📂 middleware
 ┃ ┃ ┣ 📂 error
 ┃ ┃ ┣ 📂 db
 ┃ ┃ ┣ 📂 config
 ┣ 📜 app.js
 ┣ 📜 server.js
 ┣ 📜 .env
 ┣ 📜 .gitignore
 ┣ 📜 package.json
 ┣ 📜 README.md
```

## 🔑 Authentication

- **User Login** (JWT Token & Cookie-based)
- **User Authorization** (Role-based access control)
- **Token Blacklisting for Logout**

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/yourusername/book-management-api.git
cd book-management-api
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Start the Server

```sh
npm run dev
```

## 🎯 API Endpoints

| Method | Endpoint         | Description              |
| ------ | ---------------- | ------------------------ |
| POST   | `/auth/register` | Register a new user      |
| POST   | `/auth/login`    | Login and get JWT token  |
| GET    | `/auth/logout`   | Logout (clear HTTP-Cookie) |
| GET    | `/auth/isAuthorized` | Check if you are Authorized|
| GET    | `/books`         | Get all books            |
| GET    | `/books/:id`     | Get a book by ID         |
| POST   | `/books`         | Create a new book        |
| PUT    | `/books/:id`     | Update a book            |
| DELETE | `/books/:id`     | Delete a book            |

## 🏆 Technologies Used

- **Node.js** & **Express.js** 🚀
- **MongoDB** & **Mongoose** 📦
- **JWT Authentication** 🔑
- **HTTP-Only Cookies** 🍪
- **loadEnvFile for Configuration** 🛠️
- **Layered Architecture (N-Tier Architecture) ** 📂

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repo
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a **Pull Request**



🚀 **Happy Coding!**

