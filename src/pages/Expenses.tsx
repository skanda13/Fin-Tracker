import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import useApi from "@/hooks/useApi";

interface Expense {
  _id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  notes?: string;
}

const Expenses = () => {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState<string | null>(null);
  
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Housing');
  const [notes, setNotes] = useState('');

  const api = useApi();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const data = await api.get('/api/expenses');
    if (data) {
      setExpenses(data);
    }
  };

  const handleAddExpense = () => {
    setIsEditMode(false);
    setCurrentExpenseId(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditExpense = (expense: Expense) => {
    setIsEditMode(true);
    setCurrentExpenseId(expense._id);
    setDescription(expense.description);
    setAmount(expense.amount.toString());
    setDate(new Date(expense.date).toISOString().split('T')[0]);
    setCategory(expense.category);
    setNotes(expense.notes || '');
    setIsDialogOpen(true);
  };

  const handleDeleteExpense = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense record?')) {
      const result = await api.delete(`/api/expenses/${id}`);
      if (result) {
        toast({
          title: "Expense deleted",
          description: "The expense record has been deleted successfully.",
        });
        fetchExpenses();
      }
    }
  };

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setCategory('Housing');
    setNotes('');
  };

  const handleSubmit = async () => {
    // Validation
    if (!description || !amount || !date || !category) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const expenseData = {
      description,
      amount: parseFloat(amount),
      date,
      category,
      notes,
    };

    let result;
    if (isEditMode && currentExpenseId) {
      result = await api.put(`/api/expenses/${currentExpenseId}`, expenseData);
      if (result) {
        toast({
          title: "Expense updated",
          description: "The expense record has been updated successfully.",
        });
      }
    } else {
      result = await api.post('/api/expenses', expenseData);
      if (result) {
        toast({
          title: "Expense added",
          description: "A new expense record has been added successfully.",
        });
      }
    }

    if (result) {
      setIsDialogOpen(false);
      fetchExpenses();
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Expense Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track and manage your expenses</p>
        </div>
        <Button onClick={handleAddExpense} className="bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600">
          <Plus size={16} className="mr-2" />
          Add Expense
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Description</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Category</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length > 0 ? (
                expenses.map((expense) => (
                  <tr key={expense._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-4 text-sm dark:text-gray-300">{expense.description}</td>
                    <td className="px-4 py-4 text-sm font-medium dark:text-gray-300">₹{expense.amount.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-4 text-sm dark:text-gray-300">{new Date(expense.date).toLocaleDateString('en-IN')}</td>
                    <td className="px-4 py-4 text-sm dark:text-gray-300">{expense.category}</td>
                    <td className="px-4 py-4 text-sm text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-ledger-600 hover:text-ledger-700 dark:text-ledger-400 dark:hover:text-ledger-300"
                        onClick={() => handleEditExpense(expense)}
                      >
                        <Edit size={16} className="mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        onClick={() => handleDeleteExpense(expense._id)}
                      >
                        <Trash size={16} className="mr-1" />
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                    No expense records found. Click "Add Expense" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                placeholder="E.g., Rent, Groceries"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount (₹)
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="E.g., 5000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Housing">Housing</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Input
                id="notes"
                placeholder="Optional notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-ledger-600 hover:bg-ledger-700">
              {isEditMode ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Expenses;
