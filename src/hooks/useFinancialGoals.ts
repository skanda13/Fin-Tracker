import { useState } from 'react';
import useApi from './useApi';
import { ApiGoalData } from '@/components/FinancialGoalForm';

interface FinancialGoal {
  _id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// This interface matches the API expectations
interface GoalFormData {
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  notes?: string;
}

export default function useFinancialGoals() {
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const api = useApi();

  const fetchGoals = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await api.get('/api/goals');
      if (data) {
        setGoals(data);
        return data;
      }
      return null;
    } catch (err) {
      setError('Failed to fetch goals');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGoalById = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await api.get(`/api/goals/${id}`);
      return data;
    } catch (err) {
      setError('Failed to fetch goal');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createGoal = async (goalData: ApiGoalData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await api.post('/api/goals', goalData);
      if (data) {
        setGoals(prev => [data, ...prev]);
        return data;
      }
      return null;
    } catch (err) {
      setError('Failed to create goal');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateGoal = async (id: string, goalData: Partial<ApiGoalData>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await api.put(`/api/goals/${id}`, goalData);
      if (data) {
        setGoals(prev => prev.map(goal => goal._id === id ? data : goal));
        return data;
      }
      return null;
    } catch (err) {
      setError('Failed to update goal');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteGoal = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await api.delete(`/api/goals/${id}`);
      if (data) {
        setGoals(prev => prev.filter(goal => goal._id !== id));
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to delete goal');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    goals,
    isLoading,
    error,
    fetchGoals,
    fetchGoalById,
    createGoal,
    updateGoal,
    deleteGoal
  };
} 