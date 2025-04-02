
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Income = () => {
  const { toast } = useToast();

  const handleAddIncome = () => {
    toast({
      title: "Feature coming soon",
      description: "The ability to add income records will be available soon.",
    });
  };

  const dummyIncomeData = [
    { id: 1, source: "Salary", amount: "₹45,000", date: "2023-06-01", category: "Employment" },
    { id: 2, source: "Freelance", amount: "₹15,000", date: "2023-06-10", category: "Self-employment" },
    { id: 3, source: "Dividends", amount: "₹5,000", date: "2023-06-15", category: "Investments" },
  ];

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Income Management</h1>
          <p className="text-gray-500 mt-1">Track and manage your income sources</p>
        </div>
        <Button onClick={handleAddIncome} className="bg-ledger-600 hover:bg-ledger-700">
          <Plus size={16} className="mr-2" />
          Add Income
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Source</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Amount</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Date</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Category</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dummyIncomeData.map((income) => (
                <tr key={income.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm">{income.source}</td>
                  <td className="px-4 py-4 text-sm font-medium">{income.amount}</td>
                  <td className="px-4 py-4 text-sm">{income.date}</td>
                  <td className="px-4 py-4 text-sm">{income.category}</td>
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

export default Income;
