# Ledger Wizard Server

Backend API server for the Ledger Wizard Simplifier application.

## Features

- User authentication with JWT
- CRUD operations for incomes, expenses, and budgets
- Data validation and error handling
- Protected routes with middleware

## Prerequisites

- Node.js (v14 or later)
- MongoDB (local installation or MongoDB Atlas)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

Create a .env file in the server directory with the following:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
JWT_SECRET=your_secret_key
```

3. Seed the database with initial data:

```bash
npm run seed
```

This will create a test user with the following credentials:
- Email: test@example.com
- Password: password123

4. Start the development server:

```bash
npm run dev
```

The server will start on http://localhost:5000.

## API Endpoints

### Authentication

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login and get token
- GET /api/users/me - Get current user info (protected)

### Incomes

- GET /api/incomes - Get all incomes for logged in user
- GET /api/incomes/:id - Get single income by ID
- POST /api/incomes - Create new income
- PUT /api/incomes/:id - Update income
- DELETE /api/incomes/:id - Delete income

### Expenses

- GET /api/expenses - Get all expenses for logged in user
- GET /api/expenses/:id - Get single expense by ID
- POST /api/expenses - Create new expense
- PUT /api/expenses/:id - Update expense
- DELETE /api/expenses/:id - Delete expense

### Budgets

- GET /api/budgets - Get all budgets for logged in user
- GET /api/budgets/:id - Get single budget by ID
- POST /api/budgets - Create new budget
- PUT /api/budgets/:id - Update budget
- PATCH /api/budgets/:id/actual - Update actual amount in budget
- DELETE /api/budgets/:id - Delete budget

## Auth Token

Include the authentication token in the request headers for protected routes:

```
Authorization: Bearer YOUR_TOKEN
``` 