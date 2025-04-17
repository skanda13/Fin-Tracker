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

interface Income {
  _id: string;
  source: string;
  amount: number;
  date: string;
  category: string;
  notes?: string;
}

const Income = () => {
  const { toast } = useToast();
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentIncomeId, setCurrentIncomeId] = useState<string | null>(null);
  
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Employment');
  const [notes, setNotes] = useState('');

  const api = useApi();

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    const data = await api.get('/api/incomes');
    if (data) {
      setIncomes(data);
    }
  };

  const handleAddIncome = () => {
    setIsEditMode(false);
    setCurrentIncomeId(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditIncome = (income: Income) => {
    setIsEditMode(true);
    setCurrentIncomeId(income._id);
    setSource(income.source);
    setAmount(income.amount.toString());
    setDate(new Date(income.date).toISOString().split('T')[0]);
    setCategory(income.category);
    setNotes(income.notes || '');
    setIsDialogOpen(true);
  };

  const handleDeleteIncome = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this income record?')) {
      const result = await api.delete(`/api/incomes/${id}`);
      if (result) {
        toast({
          title: "Income deleted",
          description: "The income record has been deleted successfully.",
        });
        fetchIncomes();
      }
    }
  };

  const resetForm = () => {
    setSource('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setCategory('Employment');
    setNotes('');
  };

  const handleSubmit = async () => {
    // Validation
    if (!source || !amount || !date || !category) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const incomeData = {
      source,
      amount: parseFloat(amount),
      date,
      category,
      notes,
    };

    let result;
    if (isEditMode && currentIncomeId) {
      result = await api.put(`/api/incomes/${currentIncomeId}`, incomeData);
      if (result) {
        toast({
          title: "Income updated",
          description: "The income record has been updated successfully.",
        });
      }
    } else {
      result = await api.post('/api/incomes', incomeData);
      if (result) {
        toast({
          title: "Income added",
          description: "A new income record has been added successfully.",
        });
      }
    }

    if (result) {
      setIsDialogOpen(false);
      fetchIncomes();
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Income Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track and manage your income sources</p>
        </div>
        <Button onClick={handleAddIncome} className="bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600">
          <Plus size={16} className="mr-2" />
          Add Income
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Source</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Category</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {incomes.length > 0 ? (
                incomes.map((income) => (
                  <tr key={income._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-4 text-sm dark:text-gray-300">{income.source}</td>
                    <td className="px-4 py-4 text-sm font-medium dark:text-gray-300">₹{income.amount.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-4 text-sm dark:text-gray-300">{new Date(income.date).toLocaleDateString('en-IN')}</td>
                    <td className="px-4 py-4 text-sm dark:text-gray-300">{income.category}</td>
                    <td className="px-4 py-4 text-sm text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-ledger-600 hover:text-ledger-700 dark:text-ledger-400 dark:hover:text-ledger-300"
                        onClick={() => handleEditIncome(income)}
                      >
                        <Edit size={16} className="mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        onClick={() => handleDeleteIncome(income._id)}
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
                    No income records found. Click "Add Income" to create one.
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
            <DialogTitle>{isEditMode ? 'Edit Income' : 'Add Income'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="source" className="text-right">
                Source
              </Label>
              <Input
                id="source"
                placeholder="E.g., Salary, Freelance"
                value={source}
                onChange={(e) => setSource(e.target.value)}
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
                placeholder="E.g., 50000"
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
                  <SelectItem value="Employment">Employment</SelectItem>
                  <SelectItem value="Self-employment">Self-employment</SelectItem>
                  <SelectItem value="Investments">Investments</SelectItem>
                  <SelectItem value="Rental">Rental</SelectItem>
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
                placeholder="Additional details (optional)"
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

export default Income;
