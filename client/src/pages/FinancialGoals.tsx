import React, { useState, useEffect } from 'react';
import useFinancialGoals from '../hooks/useFinancialGoals';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { format } from 'date-fns';

const FinancialGoals = () => {
  const { goals, isLoading, error, fetchGoals, deleteGoal, createGoal, updateGoal } = useFinancialGoals();
  const [isCreating, setIsCreating] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: '',
    category: '',
    notes: ''
  });

  // Add a manual refresh function
  const handleRefresh = () => {
    console.log('Manually refreshing goals...');
    fetchGoals();
  };

  useEffect(() => {
    console.log('Component mounted, current goals:', goals);
  }, [goals]);

  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Submitting new goal:', newGoal);
      await createGoal({
        name: newGoal.name,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: parseFloat(newGoal.currentAmount) || 0,
        targetDate: newGoal.targetDate,
        category: newGoal.category || undefined,
        notes: newGoal.notes || undefined
      });
      setNewGoal({
        name: '',
        targetAmount: '',
        currentAmount: '',
        targetDate: '',
        category: '',
        notes: ''
      });
      setIsCreating(false);
      // Refresh goals after creating
      fetchGoals();
    } catch (error) {
      console.error('Error in handleCreateGoal:', error);
    }
  };

  const handleUpdateProgress = async (goalId: string, newAmount: number) => {
    try {
      console.log('Updating progress for goal:', goalId, 'new amount:', newAmount);
      await updateGoal(goalId, { currentAmount: newAmount });
      // Refresh goals after updating
      fetchGoals();
    } catch (error) {
      console.error('Error in handleUpdateProgress:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Financial Goals</h1>
          <p className="text-sm text-gray-500">
            {isLoading ? 'Loading goals...' : `${goals.length} goals found`}
          </p>
        </div>
        <div className="space-x-2">
          <Button onClick={handleRefresh} variant="outline">
            Refresh
          </Button>
          <Button onClick={() => setIsCreating(true)}>Create New Goal</Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          Error: {error}
        </div>
      )}

      {isCreating && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div>
                <Label htmlFor="name">Goal Name</Label>
                <Input
                  id="name"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="targetAmount">Target Amount</Label>
                <Input
                  id="targetAmount"
                  type="number"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="currentAmount">Current Amount</Label>
                <Input
                  id="currentAmount"
                  type="number"
                  value={newGoal.currentAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, currentAmount: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="targetDate">Target Date</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  value={newGoal.notes}
                  onChange={(e) => setNewGoal({ ...newGoal, notes: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Goal</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500">Loading goals...</p>
        </div>
      ) : goals.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No financial goals yet</h3>
          <p className="text-gray-500 mt-2">Create your first goal to start tracking your progress.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <Card key={goal._id}>
              <CardHeader>
                <CardTitle>{goal.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Target Amount: ${goal.targetAmount}</p>
                    <p className="text-sm text-gray-500">Current Amount: ${goal.currentAmount}</p>
                    <Progress value={(goal.currentAmount / goal.targetAmount) * 100} className="mt-2" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Target Date: {format(new Date(goal.targetDate), 'MMM dd, yyyy')}
                    </p>
                    {goal.category && (
                      <p className="text-sm text-gray-500">Category: {goal.category}</p>
                    )}
                    {goal.notes && (
                      <p className="text-sm text-gray-500">Notes: {goal.notes}</p>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const newAmount = prompt('Enter new current amount:', goal.currentAmount.toString());
                        if (newAmount !== null) {
                          handleUpdateProgress(goal._id, parseFloat(newAmount));
                        }
                      }}
                    >
                      Update Progress
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this goal?')) {
                          deleteGoal(goal._id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FinancialGoals; 