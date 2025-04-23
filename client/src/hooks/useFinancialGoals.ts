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
      console.log('Starting to fetch goals...');
      setIsLoading(true);
      setError(null);
      
      // Log the request configuration
      const token = localStorage.getItem('token');
      console.log('Auth token:', token ? 'Present' : 'Missing');
      
      const response = await api.get('/api/goals');
      console.log('API Response:', {
        status: response.status,
        headers: response.headers,
        data: response.data
      });
      
      if (!Array.isArray(response.data)) {
        console.error('Response data is not an array:', response.data);
        setError('Invalid response format');
        return;
      }
      
      setGoals(response.data);
      console.log('Goals set successfully:', response.data);
    } catch (err: any) {
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        headers: err.response?.headers
      });
      setError(err.response?.data?.message || 'Error fetching goals');
    } finally {
      setIsLoading(false);
    }
  };

  const createGoal = async (goalData: Omit<Goal, '_id'>) => {
    try {
      console.log('Creating goal with data:', goalData);
      setError(null);
      const response = await api.post('/api/goals', goalData);
      console.log('Create goal response:', response.data);
      setGoals(prevGoals => [...prevGoals, response.data]);
      return response.data;
    } catch (err: any) {
      console.error('Error creating goal:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(err.response?.data?.message || 'Error creating goal');
      throw err;
    }
  };

  const updateGoal = async (id: string, goalData: Partial<Goal>) => {
    try {
      console.log('Updating goal:', id, 'with data:', goalData);
      setError(null);
      const response = await api.put(`/api/goals/${id}`, goalData);
      console.log('Update goal response:', response.data);
      setGoals(prevGoals => 
        prevGoals.map(goal => 
          goal._id === id ? response.data : goal
        )
      );
      return response.data;
    } catch (err: any) {
      console.error('Error updating goal:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(err.response?.data?.message || 'Error updating goal');
      throw err;
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      console.log('Deleting goal:', id);
      setError(null);
      await api.delete(`/api/goals/${id}`);
      console.log('Goal deleted successfully');
      setGoals(prevGoals => prevGoals.filter(goal => goal._id !== id));
    } catch (err: any) {
      console.error('Error deleting goal:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(err.response?.data?.message || 'Error deleting goal');
      throw err;
    }
  };

  useEffect(() => {
    console.log('useEffect triggered - fetching goals');
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