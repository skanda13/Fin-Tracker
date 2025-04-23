import { Request, Response } from 'express';
import Goal from '../models/Goal';

// Get all goals for the authenticated user
export const getGoals = async (req: Request, res: Response) => {
  try {
    console.log('Fetching goals for user:', req.user._id);
    const goals = await Goal.find({ userId: req.user._id });
    console.log('Found goals:', goals);
    res.status(200).json(goals);
  } catch (error: any) {
    console.error('Error in getGoals:', error);
    res.status(500).json({ message: 'Error fetching goals', error: error.message });
  }
};

// Get a single goal by ID
export const getGoalById = async (req: Request, res: Response) => {
  try {
    console.log('Fetching goal by ID:', req.params.id, 'for user:', req.user._id);
    const goal = await Goal.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!goal) {
      console.log('Goal not found');
      return res.status(404).json({ message: 'Goal not found' });
    }

    console.log('Found goal:', goal);
    res.status(200).json(goal);
  } catch (error: any) {
    console.error('Error in getGoalById:', error);
    res.status(500).json({ message: 'Error fetching goal', error: error.message });
  }
};

// Create a new goal
export const createGoal = async (req: Request, res: Response) => {
  try {
    const { name, targetAmount, currentAmount, targetDate, category, notes } = req.body;
    console.log('Creating goal with data:', req.body);

    if (!name || !targetAmount || !targetDate) {
      console.log('Missing required fields');
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

    console.log('Saving goal:', goal);
    const savedGoal = await goal.save();
    console.log('Goal saved successfully:', savedGoal);
    res.status(201).json(savedGoal);
  } catch (error: any) {
    console.error('Error in createGoal:', error);
    res.status(500).json({ message: 'Error creating goal', error: error.message });
  }
};

// Update a goal
export const updateGoal = async (req: Request, res: Response) => {
  try {
    const { name, targetAmount, currentAmount, targetDate, category, notes } = req.body;
    console.log('Updating goal:', req.params.id, 'with data:', req.body);

    const goal = await Goal.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!goal) {
      console.log('Goal not found');
      return res.status(404).json({ message: 'Goal not found' });
    }

    goal.name = name || goal.name;
    goal.targetAmount = targetAmount || goal.targetAmount;
    goal.currentAmount = currentAmount !== undefined ? currentAmount : goal.currentAmount;
    goal.targetDate = targetDate || goal.targetDate;
    goal.category = category || goal.category;
    goal.notes = notes || goal.notes;

    console.log('Saving updated goal:', goal);
    const updatedGoal = await goal.save();
    console.log('Goal updated successfully:', updatedGoal);
    res.status(200).json(updatedGoal);
  } catch (error: any) {
    console.error('Error in updateGoal:', error);
    res.status(500).json({ message: 'Error updating goal', error: error.message });
  }
};

// Delete a goal
export const deleteGoal = async (req: Request, res: Response) => {
  try {
    console.log('Deleting goal:', req.params.id, 'for user:', req.user._id);
    const goal = await Goal.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!goal) {
      console.log('Goal not found');
      return res.status(404).json({ message: 'Goal not found' });
    }

    await goal.deleteOne();
    console.log('Goal deleted successfully');
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error: any) {
    console.error('Error in deleteGoal:', error);
    res.status(500).json({ message: 'Error deleting goal', error: error.message });
  }
}; 