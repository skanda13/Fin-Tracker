
import { useState } from "react";
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

type Category = "Housing" | "Food" | "Transportation" | "Entertainment" | "Utilities" | "Healthcare" | "Personal" | "Education" | "Savings" | "Other";

interface BudgetItem {
  id: string;
  category: Category;
  month: string;
  budgetAmount: number;
  actualAmount: number;
  notes: string;
}

const BudgetPlanner = () => {
  const { toast } = useToast();
  const [category, setCategory] = useState<Category>("Housing");
  const [month, setMonth] = useState<string>("June 2023");
  const [budgetAmount, setBudgetAmount] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    {
      id: "1",
      category: "Housing",
      month: "June 2023",
      budgetAmount: 25000,
      actualAmount: 24500,
      notes: "Monthly rent and maintenance",
    },
    {
      id: "2",
      category: "Food",
      month: "June 2023",
      budgetAmount: 10000,
      actualAmount: 12500,
      notes: "Groceries and dining out",
    },
    {
      id: "3",
      category: "Transportation",
      month: "June 2023",
      budgetAmount: 5000,
      actualAmount: 4200,
      notes: "Public transport and occasional cab",
    },
    {
      id: "4",
      category: "Entertainment",
      month: "June 2023",
      budgetAmount: 3000,
      actualAmount: 3600,
      notes: "Movies and weekend activities",
    },
    {
      id: "5",
      category: "Utilities",
      month: "June 2023",
      budgetAmount: 4000,
      actualAmount: 3800,
      notes: "Electricity, water, and internet",
    },
  ]);

  const months = [
    "January 2023",
    "February 2023",
    "March 2023",
    "April 2023",
    "May 2023",
    "June 2023",
    "July 2023",
    "August 2023",
    "September 2023",
    "October 2023",
    "November 2023",
    "December 2023",
  ];

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

  const handleAddBudget = () => {
    if (!budgetAmount || parseFloat(budgetAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid budget amount.",
        variant: "destructive",
      });
      return;
    }

    if (editingId) {
      setBudgetItems(
        budgetItems.map((item) =>
          item.id === editingId
            ? {
                ...item,
                category,
                month,
                budgetAmount: parseFloat(budgetAmount),
                notes,
              }
            : item
        )
      );
      toast({
        title: "Budget updated",
        description: `Budget for ${category} has been updated.`,
      });
      setEditingId(null);
    } else {
      const newBudget: BudgetItem = {
        id: Date.now().toString(),
        category,
        month,
        budgetAmount: parseFloat(budgetAmount),
        actualAmount: 0, // Default to 0 for new budgets
        notes,
      };
      
      setBudgetItems([...budgetItems, newBudget]);
      toast({
        title: "Budget added",
        description: `Budget for ${category} has been added.`,
      });
    }

    // Reset form
    setCategory("Housing");
    setMonth("June 2023");
    setBudgetAmount("");
    setNotes("");
  };

  const handleEdit = (item: BudgetItem) => {
    setEditingId(item.id);
    setCategory(item.category);
    setMonth(item.month);
    setBudgetAmount(item.budgetAmount.toString());
    setNotes(item.notes);
  };

  const handleDelete = (id: string) => {
    setBudgetItems(budgetItems.filter((item) => item.id !== id));
    toast({
      title: "Budget deleted",
      description: "The budget item has been removed.",
    });
  };

  const handleUpdateActual = (id: string, actualAmount: number) => {
    setBudgetItems(
      budgetItems.map((item) =>
        item.id === id
          ? {
              ...item,
              actualAmount,
            }
          : item
      )
    );
    toast({
      title: "Actual spending updated",
      description: "The actual spending amount has been updated.",
    });
  };

  const totalBudgeted = budgetItems.reduce(
    (sum, item) => sum + item.budgetAmount,
    0
  );
  
  const totalSpent = budgetItems.reduce(
    (sum, item) => sum + item.actualAmount,
    0
  );

  const getStatusBadge = (budgetAmount: number, actualAmount: number) => {
    const percentage = (actualAmount / budgetAmount) * 100;
    
    if (percentage <= 80) {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Under Budget</Badge>;
    } else if (percentage <= 100) {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Near Limit</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Over Budget</Badge>;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budget Planner</h1>
          <p className="text-gray-500 mt-1">
            Plan and track your monthly budget across different categories
          </p>
        </div>
        <div className="flex mt-4 md:mt-0">
          <Button className="bg-ledger-600 hover:bg-ledger-700 flex items-center">
            <Plus size={16} className="mr-2" />
            {editingId ? "Update Budget" : "Add Budget"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Wallet className="mr-2 h-5 w-5 text-ledger-600" />
              Total Budgeted
            </CardTitle>
            <CardDescription>Monthly allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-ledger-700">₹{totalBudgeted.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-ledger-600" />
              Total Spent
            </CardTitle>
            <CardDescription>Actual expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-ledger-700">₹{totalSpent.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center">
              <PieChart className="mr-2 h-5 w-5 text-ledger-600" />
              Budget Status
            </CardTitle>
            <CardDescription>Spending vs Budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">
                  {Math.round((totalSpent / totalBudgeted) * 100)}% Used
                </span>
                <span className="text-sm font-medium">
                  ₹{(totalBudgeted - totalSpent).toLocaleString()} Remaining
                </span>
              </div>
              <Progress 
                value={(totalSpent / totalBudgeted) * 100} 
                className={`h-2 ${
                  (totalSpent / totalBudgeted) * 100 > 100 
                    ? "bg-red-200" 
                    : "bg-gray-200"
                }`}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Create Budget</CardTitle>
              <CardDescription>
                {editingId ? "Update an existing budget" : "Set up a new budget category"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={category} onValueChange={(value) => setCategory(value as Category)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Month</label>
                  <Select value={month} onValueChange={setMonth}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Budget Amount (₹)</label>
                  <Input
                    type="number"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notes</label>
                  <Input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Optional notes"
                  />
                </div>
                
                <Button 
                  type="button" 
                  className="w-full bg-ledger-600 hover:bg-ledger-700"
                  onClick={handleAddBudget}
                >
                  {editingId ? "Update Budget" : "Add Budget"}
                </Button>
                
                {editingId && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setEditingId(null);
                      setCategory("Housing");
                      setMonth("June 2023");
                      setBudgetAmount("");
                      setNotes("");
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Budget Tracker</CardTitle>
              <CardDescription>Track spending against your budget</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Budget</TableHead>
                      <TableHead className="text-right">Actual</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {budgetItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.category}</TableCell>
                        <TableCell>{item.month}</TableCell>
                        <TableCell className="text-right">₹{item.budgetAmount.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            <span className="mr-2">₹{item.actualAmount.toLocaleString()}</span>
                            <Input
                              type="number"
                              className="w-20 h-7"
                              value={item.actualAmount}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value) || 0;
                                handleUpdateActual(item.id, value);
                              }}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(item.budgetAmount, item.actualAmount)}
                          <div className="mt-1">
                            <Progress 
                              value={(item.actualAmount / item.budgetAmount) * 100} 
                              className={`h-1 ${
                                (item.actualAmount / item.budgetAmount) * 100 > 100 
                                  ? "bg-red-200" 
                                  : "bg-gray-200"
                              }`}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-red-600"
                              onClick={() => handleDelete(item.id)}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BudgetPlanner;
