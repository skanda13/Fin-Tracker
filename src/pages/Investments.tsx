
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Investments = () => {
  const { toast } = useToast();

  const handleAddInvestment = () => {
    toast({
      title: "Feature coming soon",
      description: "The ability to add investment records will be available soon.",
    });
  };

  const dummyInvestmentData = [
    { id: 1, name: "Mutual Fund", amount: "₹100,000", date: "2023-01-15", type: "Equity", returns: "12%" },
    { id: 2, name: "Fixed Deposit", amount: "₹250,000", date: "2023-03-10", type: "Debt", returns: "7%" },
    { id: 3, name: "Stocks", amount: "₹50,000", date: "2023-05-20", type: "Equity", returns: "15%" },
  ];

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Investment Management</h1>
          <p className="text-gray-500 mt-1">Track and manage your investments</p>
        </div>
        <Button onClick={handleAddInvestment} className="bg-ledger-600 hover:bg-ledger-700">
          <Plus size={16} className="mr-2" />
          Add Investment
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Name</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Amount</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Date</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Type</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Returns</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dummyInvestmentData.map((investment) => (
                <tr key={investment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm">{investment.name}</td>
                  <td className="px-4 py-4 text-sm font-medium">{investment.amount}</td>
                  <td className="px-4 py-4 text-sm">{investment.date}</td>
                  <td className="px-4 py-4 text-sm">{investment.type}</td>
                  <td className="px-4 py-4 text-sm text-green-600">{investment.returns}</td>
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

export default Investments;
