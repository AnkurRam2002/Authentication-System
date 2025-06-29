# Node.js + Express + TypeScript + Prisma Authentication API

A secure, role-based authentication system backend using Node.js, Express, TypeScript, Prisma ORM, MySQL, JWT, and bcrypt.

## 📌 Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- MySQL
- JWT for authentication
- bcrypt for password hashing
- Zod for request validation (if included)
- ts-node-dev for development runtime

## 🚀 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/ankur-ram/authentication-system-backend.git
   cd authentication-system-backend

2. **Install dependencies**
    ```bash
    npm install
    Configure environment variables

3. **Copy .env.example to .env**
4. **Update it with your database credentials and JWT secret.**

5. **Setup Prisma**
    ```bash
    npx prisma generate
    npx prisma migrate dev --name init

6. **Seed admin user (optional)**
    ```bash
    npm run seed

7. **Start development server**
    ```bash
    npm run dev


## 📌 API Endpoints

***POST /auth/signup → User Registration***
**POST /auth/login → User Login***
***GET /auth/me → Get current user profile (protected)***
***GET /users → Admin-only, get all users (protected)***

📦 Sample .env configuration
```bash
env
DATABASE_URL="mysql://user:password@localhost:3306/authdb"
JWT_SECRET="your_jwt_secret"
JWT_EXPIRES_IN="1d"
PORT=5000
```

## 📌 Features

- JWT authentication
- Role-based authorization
- Password hashing with bcrypt
- Centralized error handling
- Type-safe request extension via global.d.ts
- Prisma ORM integration with MySQL
- Admin seeding script
- Clean modular folder structure

---

## 📦 .gitignore

```gitignore
node_modules/
dist/
.env
.prisma/
