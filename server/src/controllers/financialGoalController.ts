import { Request, Response } from 'express';
import mongoose from 'mongoose';
import FinancialGoal from '../models/FinancialGoal';

// @desc    Get all financial goals
// @route   GET /api/goals
// @access  Private
export const getGoals = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const goals = await FinancialGoal.find({ userId }).sort({ createdAt: -1 });
    
    res.status(200).json(goals);
  } catch (error) {
    console.error('Error in getGoals:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Get financial goal by ID
// @route   GET /api/goals/:id
// @access  Private
export const getGoalById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid goal ID' });
    }

    // Find the goal
    const goal = await FinancialGoal.findOne({ _id: id, userId });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.status(200).json(goal);
  } catch (error) {
    console.error('Error in getGoalById:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Create new financial goal
// @route   POST /api/goals
// @access  Private
export const createGoal = async (req: Request, res: Response) => {
  try {
    const { name, targetAmount, currentAmount, deadline, notes } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!name || !targetAmount) {
      return res.status(400).json({ message: 'Please provide name and target amount' });
    }

    // Create new goal
    const goal = await FinancialGoal.create({
      name,
      targetAmount,
      currentAmount: currentAmount || 0,
      deadline,
      notes,
      userId
    });

    res.status(201).json(goal);
  } catch (error) {
    console.error('Error in createGoal:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Update financial goal
// @route   PUT /api/goals/:id
// @access  Private
export const updateGoal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { name, targetAmount, currentAmount, deadline, notes } = req.body;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid goal ID' });
    }

    // Find and update the goal
    const updatedGoal = await FinancialGoal.findOneAndUpdate(
      { _id: id, userId },
      { name, targetAmount, currentAmount, deadline, notes },
      { new: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.status(200).json(updatedGoal);
  } catch (error) {
    console.error('Error in updateGoal:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Delete financial goal
// @route   DELETE /api/goals/:id
// @access  Private
export const deleteGoal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid goal ID' });
    }

    // Find and delete the goal
    const deletedGoal = await FinancialGoal.findOneAndDelete({ _id: id, userId });

    if (!deletedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.status(200).json({ id });
  } catch (error) {
    console.error('Error in deleteGoal:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}; 