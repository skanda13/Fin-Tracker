
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Expenses = () => {
  const { toast } = useToast();

  const handleAddExpense = () => {
    toast({
      title: "Feature coming soon",
      description: "The ability to add expense records will be available soon.",
    });
  };

  const dummyExpenseData = [
    { id: 1, description: "Rent", amount: "₹20,000", date: "2023-06-01", category: "Housing" },
    { id: 2, description: "Groceries", amount: "₹5,500", date: "2023-06-05", category: "Food" },
    { id: 3, description: "Internet", amount: "₹1,200", date: "2023-06-10", category: "Utilities" },
    { id: 4, description: "Dining Out", amount: "₹3,000", date: "2023-06-15", category: "Entertainment" },
  ];

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expense Management</h1>
          <p className="text-gray-500 mt-1">Track and manage your expenses</p>
        </div>
        <Button onClick={handleAddExpense} className="bg-ledger-600 hover:bg-ledger-700">
          <Plus size={16} className="mr-2" />
          Add Expense
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Description</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Amount</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Date</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Category</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dummyExpenseData.map((expense) => (
                <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm">{expense.description}</td>
                  <td className="px-4 py-4 text-sm font-medium">{expense.amount}</td>
                  <td className="px-4 py-4 text-sm">{expense.date}</td>
                  <td className="px-4 py-4 text-sm">{expense.category}</td>
                  <td className="px-4 py-4 text-sm text-right">
                    <Button variant="ghost" size="sm" className="text-ledger-600 hover:text-ledger-700">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Expenses;
