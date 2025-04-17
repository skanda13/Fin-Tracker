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

interface Investment {
  _id: string;
  name: string;
  amount: number;
  date: string;
  type: string;
  returns: string;
  notes?: string;
}

const Investments = () => {
  const { toast } = useToast();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentInvestmentId, setCurrentInvestmentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form states
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('Equity');
  const [returns, setReturns] = useState('');
  const [notes, setNotes] = useState('');

  const api = useApi();

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    setIsLoading(true);
    try {
      const data = await api.get('/api/investments');
      if (data) {
        setInvestments(data);
      }
    } catch (error) {
      console.error('Error fetching investments:', error);
      toast({
        title: "Error",
        description: "Failed to load investments",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddInvestment = () => {
    setIsEditMode(false);
    setCurrentInvestmentId(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditInvestment = (investment: Investment) => {
    setIsEditMode(true);
    setCurrentInvestmentId(investment._id);
    setName(investment.name);
    setAmount(investment.amount.toString());
    setDate(new Date(investment.date).toISOString().split('T')[0]);
    setType(investment.type);
    setReturns(investment.returns);
    setNotes(investment.notes || '');
    setIsDialogOpen(true);
  };

  const handleDeleteInvestment = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this investment record?')) {
      try {
        const result = await api.delete(`/api/investments/${id}`);
        if (result) {
          toast({
            title: "Investment deleted",
            description: "The investment record has been deleted successfully.",
          });
          fetchInvestments();
        }
      } catch (error) {
        console.error('Error deleting investment:', error);
        toast({
          title: "Error",
          description: "Failed to delete investment",
          variant: "destructive"
        });
      }
    }
  };

  const resetForm = () => {
    setName('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    setType('Equity');
    setReturns('');
    setNotes('');
  };

  const handleSubmit = async () => {
    // Validation
    if (!name || !amount || !date || !type || !returns) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const investmentData = {
      name,
      amount: parseFloat(amount),
      date,
      type,
      returns,
      notes,
    };

    setIsLoading(true);
    try {
      let result;
      if (isEditMode && currentInvestmentId) {
        result = await api.put(`/api/investments/${currentInvestmentId}`, investmentData);
        if (result) {
          toast({
            title: "Investment updated",
            description: "The investment record has been updated successfully.",
          });
        }
      } else {
        result = await api.post('/api/investments', investmentData);
        if (result) {
          toast({
            title: "Investment added",
            description: "A new investment record has been added successfully.",
          });
        }
      }

      if (result) {
        setIsDialogOpen(false);
        fetchInvestments();
      }
    } catch (error) {
      console.error('Error saving investment:', error);
      toast({
        title: "Error",
        description: "Failed to save investment",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Investment Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track and manage your investments</p>
        </div>
        <Button 
          onClick={handleAddInvestment} 
          className="bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600"
          disabled={isLoading}
        >
          <Plus size={16} className="mr-2" />
          Add Investment
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-ledger-600 dark:border-ledger-400"></div>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Date</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Type</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Returns</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {investments.length > 0 ? (
                  investments.map((investment) => (
                    <tr key={investment._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-4 text-sm dark:text-gray-300">{investment.name}</td>
                      <td className="px-4 py-4 text-sm font-medium dark:text-gray-300">₹{investment.amount.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-4 text-sm dark:text-gray-300">{new Date(investment.date).toLocaleDateString('en-IN')}</td>
                      <td className="px-4 py-4 text-sm dark:text-gray-300">{investment.type}</td>
                      <td className="px-4 py-4 text-sm text-green-600 dark:text-green-400">{investment.returns}</td>
                      <td className="px-4 py-4 text-sm text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-ledger-600 hover:text-ledger-700 dark:text-ledger-400 dark:hover:text-ledger-300"
                          onClick={() => handleEditInvestment(investment)}
                        >
                          <Edit size={16} className="mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          onClick={() => handleDeleteInvestment(investment._id)}
                        >
                          <Trash size={16} className="mr-1" />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                      No investment records found. Click "Add Investment" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Investment' : 'Add Investment'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="E.g., Mutual Fund XYZ"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                placeholder="E.g., 10000"
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
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select
                value={type}
                onValueChange={(value) => setType(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Equity">Equity</SelectItem>
                  <SelectItem value="Debt">Debt</SelectItem>
                  <SelectItem value="Real Estate">Real Estate</SelectItem>
                  <SelectItem value="Gold">Gold</SelectItem>
                  <SelectItem value="Cryptocurrency">Cryptocurrency</SelectItem>
                  <SelectItem value="Fixed Deposit">Fixed Deposit</SelectItem>
                  <SelectItem value="Bonds">Bonds</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="returns" className="text-right">
                Returns (%)
              </Label>
              <Input
                id="returns"
                placeholder="E.g., 12%"
                value={returns}
                onChange={(e) => setReturns(e.target.value)}
                className="col-span-3"
              />
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
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                  {isEditMode ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                isEditMode ? 'Update' : 'Add'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Investments;
