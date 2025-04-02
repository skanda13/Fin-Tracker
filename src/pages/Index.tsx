
import Layout from "@/components/Layout";
import StatCard from "@/components/dashboard/StatCard";
import QuickAction from "@/components/dashboard/QuickAction";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { CreditCard, DollarSign, ArrowUpDown, Package, FileBarChart2, Clock, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  const handleQuickActionClick = (action: string) => {
    toast({
      title: "Action initiated",
      description: `${action} process has been started.`,
    });
  };

  const recentActivities = [
    {
      id: "1",
      title: "Bank transaction matched",
      description: "Transaction #4392 matched automatically with bank statement",
      timestamp: "2 minutes ago",
      type: "reconciliation" as const,
    },
    {
      id: "2",
      title: "New invoice created",
      description: "Invoice #INV-2023-004 created for Client XYZ",
      timestamp: "1 hour ago",
      type: "invoice" as const,
    },
    {
      id: "3",
      title: "Inventory updated",
      description: "5 units of Product ABC added to inventory",
      timestamp: "3 hours ago",
      type: "transaction" as const,
    },
    {
      id: "4",
      title: "Automated report generated",
      description: "Monthly financial report has been generated",
      timestamp: "Yesterday at 10:30 AM",
      type: "system" as const,
    },
    {
      id: "5",
      title: "New team member added",
      description: "Jane Smith has been added to the accounting team",
      timestamp: "Yesterday at 2:15 PM",
      type: "system" as const,
    },
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's an overview of your financial data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Cash Balance"
          value="$24,742.00"
          icon={<DollarSign size={20} />}
          trend={{ value: "3.5%", positive: true }}
        />
        <StatCard
          title="Pending Transactions"
          value="12"
          icon={<ArrowUpDown size={20} />}
        />
        <StatCard
          title="Accounts Reconciled"
          value="8/10"
          icon={<CreditCard size={20} />}
          trend={{ value: "2 pending", positive: false }}
        />
        <StatCard
          title="Inventory Items"
          value="243"
          icon={<Package size={20} />}
          trend={{ value: "5 low stock", positive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Financial Overview</h2>
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-gray-500">Chart visualization will appear here</p>
            </div>
          </div>
        </div>
        <RecentActivity activities={recentActivities} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickAction
            title="Reconcile Accounts"
            description="Match your transactions with bank statements"
            icon={<CreditCard size={20} />}
            onClick={() => handleQuickActionClick("Bank reconciliation")}
          />
          <QuickAction
            title="Generate Reports"
            description="Create customized financial reports"
            icon={<FileBarChart2 size={20} />}
            onClick={() => handleQuickActionClick("Report generation")}
          />
          <QuickAction
            title="Manage Inventory"
            description="Update and track your inventory items"
            icon={<Package size={20} />}
            onClick={() => handleQuickActionClick("Inventory management")}
          />
          <QuickAction
            title="Set Up Automation"
            description="Automate recurring tasks and payments"
            icon={<Clock size={20} />}
            onClick={() => handleQuickActionClick("Automation setup")}
          />
          <QuickAction
            title="Invite Team Members"
            description="Collaborate with your accounting team"
            icon={<Users size={20} />}
            onClick={() => handleQuickActionClick("Team invitation")}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
