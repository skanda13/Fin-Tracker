import { Request, Response } from 'express';
import Goal from '../models/Goal';

// Get all goals for the authenticated user
export const getGoals = async (req: Request, res: Response) => {
  try {
    const goals = await Goal.find({ userId: req.user._id });
    res.status(200).json(goals);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching goals', error: error.message });
  }
};

// Get a single goal by ID
export const getGoalById = async (req: Request, res: Response) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.status(200).json(goal);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching goal', error: error.message });
  }
};

// Create a new goal
export const createGoal = async (req: Request, res: Response) => {
  try {
    const { name, targetAmount, currentAmount, targetDate, category, notes } = req.body;

    if (!name || !targetAmount || !targetDate) {
      return res.status(400).json({ message: 'Name, target amount, and target date are required' });
    }

    const goal = new Goal({
      name,
      targetAmount,
      currentAmount: currentAmount || 0,
      targetDate,
      category,
      notes,
      userId: req.user._id
    });

    const savedGoal = await goal.save();
    res.status(201).json(savedGoal);
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating goal', error: error.message });
  }
};

// Update a goal
export const updateGoal = async (req: Request, res: Response) => {
  try {
    const { name, targetAmount, currentAmount, targetDate, category, notes } = req.body;

    const goal = await Goal.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    goal.name = name || goal.name;
    goal.targetAmount = targetAmount || goal.targetAmount;
    goal.currentAmount = currentAmount !== undefined ? currentAmount : goal.currentAmount;
    goal.targetDate = targetDate || goal.targetDate;
    goal.category = category || goal.category;
    goal.notes = notes || goal.notes;

    const updatedGoal = await goal.save();
    res.status(200).json(updatedGoal);
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating goal', error: error.message });
  }
};

// Delete a goal
export const deleteGoal = async (req: Request, res: Response) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    await goal.deleteOne();
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting goal', error: error.message });
  }
}; 