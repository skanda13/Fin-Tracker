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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { RefreshCw, X, Plus, Download, Check } from "lucide-react";

const BankReconciliation = () => {
  const { toast } = useToast();

  const transactions = [
    {
      id: "TR-001",
      date: "2023-06-15",
      description: "Client Payment",
      amount: 2500.00,
      status: "matched",
      bankDate: "2023-06-15",
      bankAmount: 2500.00,
    },
    {
      id: "TR-002",
      date: "2023-06-16",
      description: "Office Supplies",
      amount: -125.50,
      status: "unmatched",
      bankDate: "",
      bankAmount: 0,
    },
    {
      id: "TR-003",
      date: "2023-06-18",
      description: "Monthly Subscription",
      amount: -49.99,
      status: "matched",
      bankDate: "2023-06-18",
      bankAmount: -49.99,
    },
    {
      id: "TR-004",
      date: "2023-06-20",
      description: "Client Invoice #123",
      amount: 1750.00,
      status: "matched",
      bankDate: "2023-06-21",
      bankAmount: 1750.00,
    },
    {
      id: "TR-005",
      date: "2023-06-22",
      description: "Unknown Transaction",
      amount: 0,
      status: "bank-only",
      bankDate: "2023-06-22",
      bankAmount: -89.99,
    },
    {
      id: "TR-006",
      date: "2023-06-25",
      description: "Payroll",
      amount: -4250.00,
      status: "unmatched",
      bankDate: "",
      bankAmount: 0,
    },
  ];

  const handleMatch = (id: string) => {
    toast({
      title: "Transaction Matched",
      description: `Transaction ${id} has been matched successfully.`,
    });
  };

  const handleIgnore = (id: string) => {
    toast({
      title: "Transaction Ignored",
      description: `Transaction ${id} has been ignored.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "matched":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Matched</Badge>;
      case "unmatched":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Unmatched</Badge>;
      case "bank-only":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Bank Only</Badge>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bank Reconciliation</h1>
          <p className="text-gray-500 mt-1">
            Match your transactions with bank statements for accurate financial records.
          </p>
        </div>
        <div className="flex mt-4 md:mt-0 space-x-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
          <Button size="sm" className="flex items-center bg-ledger-600 hover:bg-ledger-700">
            <Plus size={16} className="mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-semibold text-lg mb-1">Total Transactions</h3>
          <p className="text-3xl font-bold">6</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-semibold text-lg mb-1">Matched</h3>
          <p className="text-3xl font-bold text-green-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-semibold text-lg mb-1">Unmatched</h3>
          <p className="text-3xl font-bold text-red-600">3</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Transaction Matching</h2>
          <Button variant="outline" size="sm" className="flex items-center">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Bank Date</TableHead>
                <TableHead className="text-right">Bank Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="text-right">
                    <span className={transaction.amount < 0 ? "text-red-600" : "text-green-600"}>
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell>{transaction.bankDate || "-"}</TableCell>
                  <TableCell className="text-right">
                    {transaction.bankAmount !== 0 ? (
                      <span className={transaction.bankAmount < 0 ? "text-red-600" : "text-green-600"}>
                        ${Math.abs(transaction.bankAmount).toFixed(2)}
                      </span>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell className="text-right">
                    {transaction.status !== "matched" && (
                      <div className="flex justify-end space-x-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-green-600"
                          onClick={() => handleMatch(transaction.id)}
                        >
                          <Check size={16} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-red-600"
                          onClick={() => handleIgnore(transaction.id)}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default BankReconciliation;
