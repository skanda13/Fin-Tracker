import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db';

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
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Enable CORS
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:5173', 'http://localhost:8081'],
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);

// Protected route to get current user
app.get('/api/users/me', protect, (req: any, res: Response) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    settings: req.user.settings
  });
});

// Protected route to update user profile
app.put('/api/users/profile', protect, updateProfile);

app.use('/api/incomes', protect, incomeRoutes);
app.use('/api/expenses', protect, expenseRoutes);
app.use('/api/budgets', protect, budgetRoutes);
app.use('/api/goals', protect, goalRoutes);
app.use('/api/investments', protect, investmentRoutes);

// Basic home route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Ledger Wizard API' });
});

// Error handling middleware
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 