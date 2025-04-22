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
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Enable CORS
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:5173', 'http://localhost:8081', 'https://personal-finance-tracker-r1ri.onrender.com', '*'],
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);

// Basic home route
app.get('/', (req, res) => {
  console.log('Root endpoint accessed');
  res.json({ message: 'Welcome to Finance Tracker API' });
});

// Add a test route to verify authRoutes are loaded
app.get('/api/test', (req, res) => {
  console.log('Test endpoint accessed');
  res.json({ message: 'API test endpoint working' });
});

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

// Error handling middleware - should be AFTER all other routes
app.use((req, res) => {
  console.log(`404 Not Found: ${req.method} ${req.url}`);
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 