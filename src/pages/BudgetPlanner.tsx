import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, Wallet, Calendar, PieChart } from "lucide-react";
import useApi from "@/hooks/useApi";

type Category = "Housing" | "Food" | "Transportation" | "Entertainment" | "Utilities" | "Healthcare" | "Personal" | "Education" | "Savings" | "Other";

interface Budget {
  _id: string;
  category: Category;
  month: string;
  budgetAmount: number;
  actualAmount: number;
  notes: string;
}

const BudgetPlanner = () => {
  const { toast } = useToast();
  const [category, setCategory] = useState<Category>("Housing");
  
  // Helper function to format the current month in the expected format
  const getCurrentMonthFormatted = () => {
    const date = new Date();
    return `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  };
  
  const [month, setMonth] = useState<string>(getCurrentMonthFormatted());
  const [budgetAmount, setBudgetAmount] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const api = useApi();

  // Generate an array of months for the current year, formatted consistently
  const generateMonthsList = () => {
    const currentYear = new Date().getFullYear();
    const monthsArray = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentYear, i, 1);
      monthsArray.push(`${date.toLocaleString('default', { month: 'long' })} ${currentYear}`);
    }
    return monthsArray;
  };

  const months = generateMonthsList();

  const categories: Category[] = [
    "Housing",
    "Food",
    "Transportation",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Personal",
    "Education",
    "Savings",
    "Other",
  ];

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    setIsLoading(true);
    try {
      const data = await api.get('/api/budgets');
      if (data) {
        setBudgets(data);
      }
    } catch (error) {
      console.error('Error fetching budgets:', error);
      toast({
        title: "Error",
        description: "Failed to load budgets. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBudget = async () => {
    if (!budgetAmount || parseFloat(budgetAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid budget amount.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (editingId) {
        const result = await api.put(`/api/budgets/${editingId}`, {
          category,
          month,
          budgetAmount: parseFloat(budgetAmount),
          notes,
        });

        if (result) {
          toast({
            title: "Budget updated",
            description: `Budget for ${category} has been updated.`,
          });
          setEditingId(null);
          fetchBudgets();
        }
      } else {
        const result = await api.post('/api/budgets', {
          category,
          month,
          budgetAmount: parseFloat(budgetAmount),
          notes,
        });
        
        if (result) {
          toast({
            title: "Budget added",
            description: `Budget for ${category} has been added.`,
          });
          fetchBudgets();
        }
      }

      // Reset form
      setCategory("Housing");
      setMonth(getCurrentMonthFormatted());
      setBudgetAmount("");
      setNotes("");
    } catch (error) {
      console.error('Error saving budget:', error);
      toast({
        title: "Error",
        description: "Failed to save budget. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: Budget) => {
    setEditingId(item._id);
    setCategory(item.category);
    setMonth(item.month);
    setBudgetAmount(item.budgetAmount.toString());
    setNotes(item.notes);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      setIsLoading(true);
      try {
        const result = await api.delete(`/api/budgets/${id}`);
        if (result) {
          toast({
            title: "Budget deleted",
            description: "The budget item has been removed.",
          });
          fetchBudgets();
        }
      } catch (error) {
        console.error('Error deleting budget:', error);
        toast({
          title: "Error",
          description: "Failed to delete budget. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUpdateActual = async (id: string, actualAmount: number) => {
    setIsLoading(true);
    try {
      const result = await api.patch(`/api/budgets/${id}/actual`, {
        actualAmount
      });
      
      if (result) {
        toast({
          title: "Actual spending updated",
          description: "The actual spending amount has been updated.",
        });
        fetchBudgets();
      }
    } catch (error) {
      console.error('Error updating actual amount:', error);
      toast({
        title: "Error",
        description: "Failed to update actual amount. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const totalBudgeted = budgets.reduce(
    (sum, item) => sum + item.budgetAmount,
    0
  );
  
  const totalSpent = budgets.reduce(
    (sum, item) => sum + item.actualAmount,
    0
  );

  const getStatusBadge = (budgetAmount: number, actualAmount: number) => {
    const percentage = (actualAmount / budgetAmount) * 100;
    
    if (percentage <= 80) {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 rounded-none">Under Budget</Badge>;
    } else if (percentage <= 100) {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 rounded-none">Near Limit</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 rounded-none">Over Budget</Badge>;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Budget Planner</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Plan and track your monthly budget across different categories
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center dark:text-gray-100">
              <Wallet className="mr-2 h-5 w-5 text-ledger-600" />
              Total Budgeted
            </CardTitle>
            <CardDescription className="dark:text-gray-400">Monthly allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-ledger-700 dark:text-ledger-400">₹{totalBudgeted.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center dark:text-gray-100">
              <Calendar className="mr-2 h-5 w-5 text-ledger-600" />
              Total Spent
            </CardTitle>
            <CardDescription className="dark:text-gray-400">Actual expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-ledger-700 dark:text-ledger-400">₹{totalSpent.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center dark:text-gray-100">
              <PieChart className="mr-2 h-5 w-5 text-ledger-600" />
              Budget Status
            </CardTitle>
            <CardDescription className="dark:text-gray-400">Spending vs Budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium dark:text-gray-300">
                  {totalBudgeted ? Math.round((totalSpent / totalBudgeted) * 100) : 0}% Used
                </span>
                <span className="text-sm font-medium dark:text-gray-300">
                  ₹{(totalBudgeted - totalSpent).toLocaleString()} Remaining
                </span>
              </div>
              <Progress 
                value={totalBudgeted ? (totalSpent / totalBudgeted) * 100 : 0} 
                className="h-2 bg-gray-200 dark:bg-gray-700"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Create Budget</CardTitle>
              <CardDescription className="dark:text-gray-400">
                {editingId ? "Update an existing budget" : "Set up a new budget category"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                handleAddBudget();
              }}>
                <div className="space-y-2">
                  <label className="text-sm font-medium dark:text-gray-300">Category</label>
                  <Select value={category} onValueChange={(value) => setCategory(value as Category)}>
                    <SelectTrigger className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat} className="dark:text-gray-300 dark:focus:bg-gray-700">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium dark:text-gray-300">Month</label>
                  <Select value={month} onValueChange={setMonth}>
                    <SelectTrigger className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      {months.map((m) => (
                        <SelectItem key={m} value={m} className="dark:text-gray-300 dark:focus:bg-gray-700">
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium dark:text-gray-300">Budget Amount (₹)</label>
                  <Input
                    type="number"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium dark:text-gray-300">Notes</label>
                  <Input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Optional notes"
                    className="dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600 dark:text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-t-transparent border-white rounded-full"></div>
                      {editingId ? "Updating..." : "Adding..."}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Plus size={16} className="mr-2" />
                      {editingId ? "Update Budget" : "Add Budget"}
                    </span>
                  )}
                </Button>
                
                {editingId && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full dark:text-gray-300 dark:border-gray-600"
                    onClick={() => {
                      setEditingId(null);
                      setCategory("Housing");
                      setMonth(getCurrentMonthFormatted());
                      setBudgetAmount("");
                      setNotes("");
                    }}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Budget Tracker</CardTitle>
              <CardDescription className="dark:text-gray-400">Track spending against your budget</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && !budgets.length && (
                <div className="flex justify-center py-8">
                  <div className="animate-spin h-8 w-8 border-2 border-t-transparent border-ledger-600 rounded-full"></div>
                </div>
              )}
              
              {!isLoading && !budgets.length && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>No budgets found. Start by creating a budget category.</p>
                </div>
              )}
              
              {budgets.length > 0 && (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="dark:border-gray-700">
                        <TableHead className="dark:text-gray-400">Category</TableHead>
                        <TableHead className="dark:text-gray-400">Month</TableHead>
                        <TableHead className="text-right dark:text-gray-400">Budget</TableHead>
                        <TableHead className="text-right dark:text-gray-400">Actual</TableHead>
                        <TableHead className="dark:text-gray-400">Status</TableHead>
                        <TableHead className="text-right dark:text-gray-400">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {budgets.map((item) => (
                        <TableRow key={item._id} className="dark:border-gray-700">
                          <TableCell className="font-medium dark:text-gray-300">{item.category}</TableCell>
                          <TableCell className="dark:text-gray-300">{item.month}</TableCell>
                          <TableCell className="text-right dark:text-gray-300">₹{item.budgetAmount.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end">
                              <span className="mr-2 dark:text-gray-300">₹{item.actualAmount.toLocaleString()}</span>
                              <div className="flex">
                                <Input
                                  type="number"
                                  className="w-20 h-7 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
                                  defaultValue={item.actualAmount}
                                  onBlur={(e) => {
                                    const value = parseFloat(e.target.value) || 0;
                                    if (value !== item.actualAmount) {
                                      handleUpdateActual(item._id, value);
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(item.budgetAmount, item.actualAmount)}
                            <div className="mt-1">
                              <Progress 
                                value={(item.actualAmount / item.budgetAmount) * 100} 
                                className="h-1 bg-gray-200 dark:bg-gray-700"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 dark:text-gray-300 dark:hover:bg-gray-700"
                                onClick={() => handleEdit(item)}
                              >
                                <Edit size={16} />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-red-600 dark:text-red-400 dark:hover:bg-gray-700"
                                onClick={() => handleDelete(item._id)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BudgetPlanner;
