import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Investment from '../models/Investment';

// @desc    Get all investments
// @route   GET /api/investments
// @access  Private
export const getInvestments = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const investments = await Investment.find({ userId }).sort({ date: -1 });
    
    res.status(200).json(investments);
  } catch (error) {
    console.error('Error in getInvestments:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Get investment by ID
// @route   GET /api/investments/:id
// @access  Private
export const getInvestmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid investment ID' });
    }

    // Find the investment
    const investment = await Investment.findOne({ _id: id, userId });

    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    res.status(200).json(investment);
  } catch (error) {
    console.error('Error in getInvestmentById:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Create new investment
// @route   POST /api/investments
// @access  Private
export const createInvestment = async (req: Request, res: Response) => {
  try {
    const { name, amount, date, type, returns, notes } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!name || !amount || !date || !type || !returns) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Create new investment
    const investment = await Investment.create({
      name,
      amount,
      date,
      type,
      returns,
      notes,
      userId
    });

    res.status(201).json(investment);
  } catch (error) {
    console.error('Error in createInvestment:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Update investment
// @route   PUT /api/investments/:id
// @access  Private
export const updateInvestment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { name, amount, date, type, returns, notes } = req.body;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid investment ID' });
    }

    // Find and update the investment
    const updatedInvestment = await Investment.findOneAndUpdate(
      { _id: id, userId },
      { name, amount, date, type, returns, notes },
      { new: true }
    );

    if (!updatedInvestment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    res.status(200).json(updatedInvestment);
  } catch (error) {
    console.error('Error in updateInvestment:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// @desc    Delete investment
// @route   DELETE /api/investments/:id
// @access  Private
export const deleteInvestment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid investment ID' });
    }

    // Find and delete the investment
    const deletedInvestment = await Investment.findOneAndDelete({ _id: id, userId });

    if (!deletedInvestment) {
      return res.status(404).json({ message: 'Investment not found' });
    }

    res.status(200).json({ id });
  } catch (error) {
    console.error('Error in deleteInvestment:', error);
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
}; 