import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db';
import path from 'path';
import { protect } from './middleware/authMiddleware';
import { loginUser, registerUser, getMe, updateProfile } from './controllers/authController';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev'));

// Enable CORS with specific options
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://personal-finance-tracker-r1ri.onrender.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Basic home route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Finance Tracker API' });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API test endpoint working' });
});

// Auth Routes
app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', loginUser);
app.get('/api/auth/me', protect, getMe);

// User Routes
app.put('/api/users/profile', protect, updateProfile);

// Income Routes
app.get('/api/incomes', protect, (req: any, res: Response) => {
  res.json({ message: 'Get all incomes' });
});

app.post('/api/incomes', protect, (req: any, res: Response) => {
  console.log('Create income request body:', req.body);
  res.json({ message: 'Create income', data: req.body });
});

app.get('/api/incomes/:id', protect, (req: any, res: Response) => {
  res.json({ message: 'Get income by id' });
});

app.put('/api/incomes/:id', protect, (req: any, res: Response) => {
  res.json({ message: 'Update income' });
});

app.delete('/api/incomes/:id', protect, (req: any, res: Response) => {
  res.json({ message: 'Delete income' });
});

// Expense Routes
app.get('/api/expenses', protect, (req: any, res: Response) => {
  res.json({ message: 'Get all expenses' });
});

app.post('/api/expenses', protect, (req: any, res: Response) => {
  console.log('Create expense request body:', req.body);
  res.json({ message: 'Create expense', data: req.body });
});

app.get('/api/expenses/:id', protect, (req: any, res: Response) => {
  res.json({ message: 'Get expense by id' });
});

app.put('/api/expenses/:id', protect, (req: any, res: Response) => {
  res.json({ message: 'Update expense' });
});

app.delete('/api/expenses/:id', protect, (req: any, res: Response) => {
  res.json({ message: 'Delete expense' });
});

// Budget Routes
app.get('/api/budgets', protect, (req: any, res: Response) => {
  res.json({ message: 'Get all budgets' });
});

app.post('/api/budgets', protect, (req: any, res: Response) => {
  console.log('Create budget request body:', req.body);
  res.json({ message: 'Create budget', data: req.body });
});

app.get('/api/budgets/:id', protect, (req: any, res: Response) => {
  res.json({ message: 'Get budget by id' });
});

app.put('/api/budgets/:id', protect, (req: any, res: Response) => {
  res.json({ message: 'Update budget' });
});

app.delete('/api/budgets/:id', protect, (req: any, res: Response) => {
  res.json({ message: 'Delete budget' });
});

// Goal Routes
app.get('/api/goals', protect, (req: any, res: Response) => {
  res.json({ message: 'Get all goals' });
});

app.post('/api/goals', protect, (req: any, res: Response) => {
  console.log('Create goal request body:', req.body);
  res.json({ message: 'Create goal', data: req.body });
});

app.get('/api/goals/:id', protect, (req: any, res: Response) => {
  res.json({ message: 'Get goal by id' });
});

app.put('/api/goals/:id', protect, (req: any, res: Response) => {
  res.json({ message: 'Update goal' });
});

app.delete('/api/goals/:id', protect, (req: any, res: Response) => {
  res.json({ message: 'Delete goal' });
});

// Investment Routes
app.get('/api/investments', protect, (req: any, res: Response) => {
  res.json({ message: 'Get all investments' });
});

app.post('/api/investments', protect, (req: any, res: Response) => {
  console.log('Create investment request body:', req.body);
  res.json({ message: 'Create investment', data: req.body });
});

app.get('/api/investments/:id', protect, (req: any, res: Response) => {
  res.json({ message: 'Get investment by id' });
});

app.put('/api/investments/:id', protect, (req: any, res: Response) => {
  res.json({ message: 'Update investment' });
});

app.delete('/api/investments/:id', protect, (req: any, res: Response) => {
  res.json({ message: 'Delete investment' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// 404 handler
app.use((req, res) => {
  console.log(`404 Not Found: ${req.method} ${req.url}`);
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
}); 