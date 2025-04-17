import express from 'express';
import { getIncomes, getIncomeById, createIncome, updateIncome, deleteIncome } from '../controllers/incomeController';

const router = express.Router();

// @route   GET /api/incomes
// @desc    Get all incomes
router.get('/', getIncomes);

// @route   GET /api/incomes/:id
// @desc    Get a single income
router.get('/:id', getIncomeById);

// @route   POST /api/incomes
// @desc    Create a new income
router.post('/', createIncome);

// @route   PUT /api/incomes/:id
// @desc    Update an income
router.put('/:id', updateIncome);

// @route   DELETE /api/incomes/:id
// @desc    Delete an income
router.delete('/:id', deleteIncome);

export default router; 