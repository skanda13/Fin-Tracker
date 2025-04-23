import { useState, useEffect } from 'react';
import api from '../config/axios';

interface Goal {
  _id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category?: string;
  notes?: string;
}

const useFinancialGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get('/api/goals');
      console.log('Fetched goals:', response.data);
      setGoals(response.data);
    } catch (err: any) {
      console.error('Error fetching goals:', err);
      setError(err.response?.data?.message || 'Error fetching goals');
    } finally {
      setIsLoading(false);
    }
  };

  const createGoal = async (goalData: Omit<Goal, '_id'>) => {
    try {
      setError(null);
      const response = await api.post('/api/goals', goalData);
      setGoals(prevGoals => [...prevGoals, response.data]);
      return response.data;
    } catch (err: any) {
      console.error('Error creating goal:', err);
      setError(err.response?.data?.message || 'Error creating goal');
      throw err;
    }
  };

  const updateGoal = async (id: string, goalData: Partial<Goal>) => {
    try {
      setError(null);
      const response = await api.put(`/api/goals/${id}`, goalData);
      setGoals(prevGoals => 
        prevGoals.map(goal => 
          goal._id === id ? response.data : goal
        )
      );
      return response.data;
    } catch (err: any) {
      console.error('Error updating goal:', err);
      setError(err.response?.data?.message || 'Error updating goal');
      throw err;
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      setError(null);
      await api.delete(`/api/goals/${id}`);
      setGoals(prevGoals => prevGoals.filter(goal => goal._id !== id));
    } catch (err: any) {
      console.error('Error deleting goal:', err);
      setError(err.response?.data?.message || 'Error deleting goal');
      throw err;
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return {
    goals,
    isLoading,
    error,
    fetchGoals,
    createGoal,
    updateGoal,
    deleteGoal
  };
};

export default useFinancialGoals; 