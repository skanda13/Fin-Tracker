
import Layout from "@/components/Layout";
import StatCard from "@/components/dashboard/StatCard";
import QuickAction from "@/components/dashboard/QuickAction";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { Link } from "react-router-dom";
import { 
  DollarSign, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  LineChart, 
  Target, 
  FileBarChart2,
  Calculator,
  Wallet
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";

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
      title: "Salary received",
      description: "Monthly salary credited to your account",
      timestamp: "2 hours ago",
      type: "income" as const,
    },
    {
      id: "2",
      title: "Rent paid",
      description: "Monthly rent payment processed",
      timestamp: "1 day ago",
      type: "expense" as const,
    },
    {
      id: "3",
      title: "New investment added",
      description: "Added investment in Mutual Funds",
      timestamp: "3 days ago",
      type: "investment" as const,
    },
    {
      id: "4",
      title: "Grocery shopping",
      description: "Spent on weekly groceries",
      timestamp: "4 days ago",
      type: "expense" as const,
    },
    {
      id: "5",
      title: "Financial goal updated",
      description: "Updated savings target for Home Purchase",
      timestamp: "1 week ago",
      type: "system" as const,
    },
  ];

  const monthlyData = [
    { name: "Jan", income: 45000, expenses: 32000 },
    { name: "Feb", income: 47000, expenses: 30000 },
    { name: "Mar", income: 48000, expenses: 35000 },
    { name: "Apr", income: 46000, expenses: 32000 },
    { name: "May", income: 50000, expenses: 34000 },
    { name: "Jun", income: 52000, expenses: 36000 },
  ];

  const chartConfig = {
    income: {
      label: "Income",
      color: "#4CAF50",
    },
    expenses: {
      label: "Expenses",
      color: "#F44336",
    },
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's an overview of your financial data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Balance"
          value="₹1,24,500"
          icon={<DollarSign size={20} />}
          trend={{ value: "3.5%", positive: true }}
        />
        <StatCard
          title="Monthly Income"
          value="₹52,000"
          icon={<ArrowDownCircle size={20} />}
          trend={{ value: "4%", positive: true }}
        />
        <StatCard
          title="Monthly Expenses"
          value="₹36,000"
          icon={<ArrowUpCircle size={20} />}
          trend={{ value: "5.5%", positive: false }}
        />
        <StatCard
          title="Investments"
          value="₹4,00,000"
          icon={<LineChart size={20} />}
          trend={{ value: "12%", positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Income vs Expenses</h2>
            <div className="h-64">
              <ChartContainer config={chartConfig}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="income" fill={chartConfig.income.color} name="Income" />
                  <Bar dataKey="expenses" fill={chartConfig.expenses.color} name="Expenses" />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </div>
        <RecentActivity activities={recentActivities} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/income">
            <QuickAction
              title="Add Income"
              description="Record your income from various sources"
              icon={<ArrowDownCircle size={20} />}
              onClick={() => handleQuickActionClick("Income recording")}
            />
          </Link>
          <Link to="/expenses">
            <QuickAction
              title="Add Expense"
              description="Record your expenses by categories"
              icon={<ArrowUpCircle size={20} />}
              onClick={() => handleQuickActionClick("Expense recording")}
            />
          </Link>
          <Link to="/investments">
            <QuickAction
              title="Manage Investments"
              description="Track and update your investments"
              icon={<LineChart size={20} />}
              onClick={() => handleQuickActionClick("Investment management")}
            />
          </Link>
          <Link to="/financial-goals">
            <QuickAction
              title="Set Financial Goals"
              description="Create and track your financial goals"
              icon={<Target size={20} />}
              onClick={() => handleQuickActionClick("Goal setting")}
            />
          </Link>
          <Link to="/budget-planner">
            <QuickAction
              title="Budget Planner"
              description="Plan and track your monthly budget"
              icon={<Wallet size={20} />}
              onClick={() => handleQuickActionClick("Budget planning")}
            />
          </Link>
          <Link to="/reports">
            <QuickAction
              title="Generate Reports"
              description="Create financial reports and analysis"
              icon={<FileBarChart2 size={20} />}
              onClick={() => handleQuickActionClick("Report generation")}
            />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
