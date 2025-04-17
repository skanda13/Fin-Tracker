import express from 'express';
import { getBudgets, getBudgetById, createBudget, updateBudget, updateActualAmount, deleteBudget } from '../controllers/budgetController';

const router = express.Router();

// @route   GET /api/budgets
// @desc    Get all budgets
router.get('/', getBudgets);

// @route   GET /api/budgets/:id
// @desc    Get a single budget
router.get('/:id', getBudgetById);

// @route   POST /api/budgets
// @desc    Create a new budget
router.post('/', createBudget);

// @route   PUT /api/budgets/:id
// @desc    Update a budget
router.put('/:id', updateBudget);

// @route   PATCH /api/budgets/:id/actual
// @desc    Update actual amount in a budget
router.patch('/:id/actual', updateActualAmount);

// @route   DELETE /api/budgets/:id
// @desc    Delete a budget
router.delete('/:id', deleteBudget);

export default router; 