import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import useFinancialGoals from "@/hooks/useFinancialGoals";
import FinancialGoalForm, { GoalFormData, ApiGoalData } from "@/components/FinancialGoalForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const FinancialGoals = () => {
  const { toast } = useToast();
  const { goals, isLoading, error, fetchGoals, deleteGoal, createGoal, updateGoal } = useFinancialGoals();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentGoal, setCurrentGoal] = useState<(GoalFormData & { _id?: string }) | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchGoals();
  }, []);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const handleAddGoal = () => {
    setIsEditMode(false);
    setCurrentGoal(null);
    setIsDialogOpen(true);
  };

  const handleEditGoal = (goal: any) => {
    setIsEditMode(true);
    // Convert deadline string to Date object for the form
    const formattedGoal = {
      ...goal,
      deadline: new Date(goal.deadline)
    };
    setCurrentGoal(formattedGoal);
    setIsDialogOpen(true);
  };

  const handleDeleteGoal = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      setIsDeleting(id);
      const success = await deleteGoal(id);
      setIsDeleting(null);
      
      if (success) {
        toast({
          title: "Goal deleted",
          description: "The financial goal has been successfully deleted.",
        });
      }
    }
  };

  const handleSubmitGoal = async (data: GoalFormData) => {
    setIsSubmitting(true);
    
    try {
      // Convert the Date object to ISO string format for API
      const formattedData: ApiGoalData = {
        name: data.name,
        targetAmount: data.targetAmount,
        currentAmount: data.currentAmount,
        deadline: data.deadline.toISOString(),
        notes: data.notes
      };
      
      if (isEditMode && currentGoal?._id) {
        await updateGoal(currentGoal._id, formattedData);
        toast({
          title: "Goal updated",
          description: "Your financial goal has been updated successfully.",
        });
      } else {
        await createGoal(formattedData);
        toast({
          title: "Goal created",
          description: "Your new financial goal has been created successfully.",
        });
      }
      setIsDialogOpen(false);
      fetchGoals(); // Refresh the data
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to save goal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate progress percentage
  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Financial Goals</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Set and track your financial goals</p>
        </div>
        <Button onClick={handleAddGoal} className="bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600">
          <Plus size={16} className="mr-2" />
          Add Goal
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-ledger-600" />
        </div>
      ) : goals.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No financial goals yet</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Create your first financial goal to start tracking your progress.</p>
          <Button onClick={handleAddGoal} className="mt-4 bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600">
            <Plus size={16} className="mr-2" />
            Add Goal
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {goals.map((goal) => {
            const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
            const remaining = goal.targetAmount - goal.currentAmount;
            const deadlineDate = new Date(goal.deadline).toLocaleDateString();
            
            return (
              <div key={goal._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold dark:text-gray-100">{goal.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Target: {formatCurrency(goal.targetAmount)} • Deadline: {deadlineDate}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditGoal(goal)}
                      className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      disabled={isDeleting === goal._id}
                      onClick={() => handleDeleteGoal(goal._id)}
                      className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800/30 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      {isDeleting === goal._id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <>
                          <Trash size={14} className="mr-1" />
                          Delete
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1 dark:text-gray-300">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <div className="flex justify-between text-sm mt-4">
                  <span className="text-gray-500 dark:text-gray-400">Current: {formatCurrency(goal.currentAmount)}</span>
                  <span className="text-gray-500 dark:text-gray-400">Remaining: {formatCurrency(remaining)}</span>
                </div>
                
                {goal.notes && (
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-700/30 rounded">
                    <p><span className="font-medium">Notes:</span> {goal.notes}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Financial Goal' : 'Create Financial Goal'}</DialogTitle>
          </DialogHeader>
          <FinancialGoalForm
            initialData={currentGoal || undefined}
            onSubmit={handleSubmitGoal}
            onCancel={() => setIsDialogOpen(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default FinancialGoals;
