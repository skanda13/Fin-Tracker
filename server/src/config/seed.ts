import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Income from '../models/Income';
import Expense from '../models/Expense';
import Budget from '../models/Budget';
import dotenv from 'dotenv';
import connectDB from './db';

// Load environment variables
dotenv.config();

// Default user details
const DEFAULT_USER = {
  _id: new mongoose.Types.ObjectId('5f9d4a3d9d3e2c1b4c6f8a7e'),
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

// Clear database collections
const clearDatabase = async () => {
  console.log('Clearing existing database records...');
  await User.deleteMany({});
  await Income.deleteMany({});
  await Expense.deleteMany({});
  await Budget.deleteMany({});
  console.log('Database cleared.');
};

// Seed users
const seedUsers = async () => {
  console.log('Creating default user...');
  const hashedPassword = await bcrypt.hash(DEFAULT_USER.password, 10);
  
  const user = new User({
    _id: DEFAULT_USER._id,
    name: DEFAULT_USER.name,
    email: DEFAULT_USER.email,
    password: hashedPassword,
    settings: {
      currency: 'INR',
      theme: 'light',
      dateFormat: 'DD/MM/YYYY'
    }
  });
  
  await user.save();
  console.log('Default user created.');
  return user;
};

// Seed sample incomes
const seedIncomes = async (userId: mongoose.Types.ObjectId) => {
  console.log('Creating sample incomes...');
  const incomes = [
    {
      source: 'Salary',
      amount: 50000,
      date: new Date('2023-06-01'),
      category: 'Employment',
      notes: 'Monthly salary',
      userId
    },
    {
      source: 'Freelance Project',
      amount: 15000,
      date: new Date('2023-06-15'),
      category: 'Self-employment',
      notes: 'Website development project',
      userId
    },
    {
      source: 'Investment Dividend',
      amount: 5000,
      date: new Date('2023-06-20'),
      category: 'Investment',
      notes: 'Quarterly dividend payment',
      userId
    }
  ];
  
  await Income.insertMany(incomes);
  console.log('Sample incomes created.');
};

// Seed sample expenses
const seedExpenses = async (userId: mongoose.Types.ObjectId) => {
  console.log('Creating sample expenses...');
  const expenses = [
    {
      description: 'Rent',
      amount: 20000,
      date: new Date('2023-06-05'),
      category: 'Housing',
      notes: 'Monthly rent payment',
      userId
    },
    {
      description: 'Groceries',
      amount: 5000,
      date: new Date('2023-06-10'),
      category: 'Food',
      notes: 'Weekly grocery shopping',
      userId
    },
    {
      description: 'Internet Bill',
      amount: 1500,
      date: new Date('2023-06-15'),
      category: 'Utilities',
      notes: 'Monthly internet bill',
      userId
    },
    {
      description: 'Movie Night',
      amount: 1000,
      date: new Date('2023-06-18'),
      category: 'Entertainment',
      notes: 'Weekend movie and dinner',
      userId
    }
  ];
  
  await Expense.insertMany(expenses);
  console.log('Sample expenses created.');
};

// Seed sample budgets
const seedBudgets = async (userId: mongoose.Types.ObjectId) => {
  console.log('Creating sample budgets...');
  const budgets = [
    {
      category: 'Housing',
      month: 'June 2023',
      budgetAmount: 25000,
      actualAmount: 22000,
      notes: 'Rent and maintenance',
      userId
    },
    {
      category: 'Food',
      month: 'June 2023',
      budgetAmount: 10000,
      actualAmount: 8500,
      notes: 'Groceries and dining out',
      userId
    },
    {
      category: 'Transportation',
      month: 'June 2023',
      budgetAmount: 5000,
      actualAmount: 4200,
      notes: 'Fuel and public transit',
      userId
    },
    {
      category: 'Entertainment',
      month: 'June 2023',
      budgetAmount: 3000,
      actualAmount: 2800,
      notes: 'Movies and activities',
      userId
    },
    {
      category: 'Utilities',
      month: 'June 2023',
      budgetAmount: 4000,
      actualAmount: 3500,
      notes: 'Electricity, water, and internet',
      userId
    }
  ];
  
  await Budget.insertMany(budgets);
  console.log('Sample budgets created.');
};

// Main seeding function
const seedData = async () => {
  try {
    await connectDB();
    await clearDatabase();
    const user = await seedUsers();
    await seedIncomes(user._id);
    await seedExpenses(user._id);
    await seedBudgets(user._id);
    
    console.log('\nSeeding completed successfully! 🎉');
    console.log('\nDefault user login:');
    console.log(`Email: ${DEFAULT_USER.email}`);
    console.log(`Password: ${DEFAULT_USER.password}`);
    console.log('\nNow you can run the server with: npm run dev');
    
    process.exit(0);
  } catch (error) {
    console.error('Error while seeding the database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedData(); 