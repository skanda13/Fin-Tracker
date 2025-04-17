import express from 'express';
import { getExpenses, getExpenseById, createExpense, updateExpense, deleteExpense } from '../controllers/expenseController';

const router = express.Router();

// @route   GET /api/expenses
// @desc    Get all expenses
router.get('/', getExpenses);

// @route   GET /api/expenses/:id
// @desc    Get a single expense
router.get('/:id', getExpenseById);

// @route   POST /api/expenses
// @desc    Create a new expense
router.post('/', createExpense);

// @route   PUT /api/expenses/:id
// @desc    Update an expense
router.put('/:id', updateExpense);

// @route   DELETE /api/expenses/:id
// @desc    Delete an expense
router.delete('/:id', deleteExpense);

export default router; 