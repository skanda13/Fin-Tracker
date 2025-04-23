import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db';
import path from 'path';
import { protect } from './middleware/authMiddleware';
import fs from 'fs';

// Import all controllers
import { loginUser, registerUser, getMe, updateProfile } from './controllers/authController';
import { 
  getInvestments, 
  getInvestmentById, 
  createInvestment, 
  updateInvestment, 
  deleteInvestment 
} from './controllers/investmentController';
import {
  getIncomes,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome
} from './controllers/incomeController';
import {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense
} from './controllers/expenseController';
import {
  getBudgets,
  getBudgetById,
  createBudget,
  updateBudget,
  deleteBudget
} from './controllers/budgetController';

// Import routes
import goalRoutes from './routes/goalRoutes';
import budgetRoutes from './routes/budgetRoutes';

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
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Handle preflight requests
app.options('*', cors());

// Debug middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// API Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API test endpoint working' });
});

app.post('/api/test', (req, res) => {
  console.log('Test POST request body:', req.body);
  res.json({ message: 'POST test endpoint working', data: req.body });
});

// Auth Routes
app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    console.log('Register request body:', req.body);
    await registerUser(req, res);
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    console.log('Login request body:', req.body);
    await loginUser(req, res);
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

app.get('/api/auth/me', protect, getMe);

// User Routes
app.put('/api/users/profile', protect, updateProfile);

// Income Routes
app.get('/api/incomes', protect, getIncomes);
app.post('/api/incomes', protect, createIncome);
app.get('/api/incomes/:id', protect, getIncomeById);
app.put('/api/incomes/:id', protect, updateIncome);
app.delete('/api/incomes/:id', protect, deleteIncome);

// Expense Routes
app.get('/api/expenses', protect, getExpenses);
app.post('/api/expenses', protect, createExpense);
app.get('/api/expenses/:id', protect, getExpenseById);
app.put('/api/expenses/:id', protect, updateExpense);
app.delete('/api/expenses/:id', protect, deleteExpense);

// Budget Routes
app.use('/api/budgets', protect, budgetRoutes);

// Goal Routes
app.use('/api/goals', goalRoutes);

// Investment Routes
app.get('/api/investments', protect, getInvestments);
app.post('/api/investments', protect, createInvestment);
app.get('/api/investments/:id', protect, getInvestmentById);
app.put('/api/investments/:id', protect, updateInvestment);
app.delete('/api/investments/:id', protect, deleteInvestment);

// Serve static files from the React app if the build directory exists
const clientBuildPath = path.join(__dirname, '../../dist');
if (fs.existsSync(clientBuildPath)) {
  console.log('Serving static files from:', clientBuildPath);
  
  // Serve static files
  app.use(express.static(clientBuildPath));
  
  // Handle client-side routing - serve index.html for all non-API routes
  app.get('*', (req: Request, res: Response) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    } else {
      res.status(404).json({ message: 'API endpoint not found' });
    }
  });
} else {
  console.log('Client build directory not found at:', clientBuildPath);
  console.log('Current directory:', __dirname);
  
  // API-only mode handler
  app.get('*', (req: Request, res: Response) => {
    if (req.path.startsWith('/api')) {
      res.status(404).json({ message: 'API endpoint not found' });
    } else {
      res.status(200).json({ 
        message: 'Welcome to Finance Tracker API',
        note: 'Client build directory not found. Running in API-only mode.'
      });
    }
  });
}

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
}); 