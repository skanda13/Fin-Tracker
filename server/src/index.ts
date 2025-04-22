import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db';
import path from 'path';

// Import routes
import authRoutes from './routes/authRoutes';
import incomeRoutes from './routes/incomeRoutes';
import expenseRoutes from './routes/expenseRoutes';
import budgetRoutes from './routes/budgetRoutes';
import goalRoutes from './routes/goalRoutes';
import investmentRoutes from './routes/investmentRoutes';
import { protect } from './middleware/authMiddleware';
import { updateProfile } from './controllers/authController';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Enable CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://personal-finance-tracker-r1ri.onrender.com',
  credentials: true
}));

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

// Auth routes
console.log('Setting up auth routes...');
app.use('/api/auth', authRoutes);
console.log('Auth routes setup complete');

// Protected routes
app.get('/api/users/me', protect, (req: any, res: Response) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    settings: req.user.settings
  });
});

app.put('/api/users/profile', protect, updateProfile);

app.use('/api/incomes', protect, incomeRoutes);
app.use('/api/expenses', protect, expenseRoutes);
app.use('/api/budgets', protect, budgetRoutes);
app.use('/api/goals', protect, goalRoutes);
app.use('/api/investments', protect, investmentRoutes);

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