import { useState, useEffect } from "react";
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
  Wallet,
  IndianRupee
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip } from "recharts";
import useApi from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "income" | "expense" | "investment" | "system";
}

interface Income {
  _id: string;
  source: string;
  amount: number;
  date: string;
  category: string;
}

interface Expense {
  _id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface Budget {
  _id: string;
  category: string;
  month: string;
  budgetAmount: number;
  actualAmount: number;
}

const Index = () => {
  const { toast } = useToast();
  const api = useApi();
  const { user } = useAuth();
  
  const [isLoading, setIsLoading] = useState(true);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch incomes
        const incomesData = await api.get('/api/incomes');
        if (incomesData) {
          setIncomes(incomesData);
        }
        
        // Fetch expenses
        const expensesData = await api.get('/api/expenses');
        if (expensesData) {
          setExpenses(expensesData);
        }
        
        // Fetch budgets
        const budgetsData = await api.get('/api/budgets');
        if (budgetsData) {
          setBudgets(budgetsData);
        }
        
        // Generate recent activities from real data
        generateRecentActivities(incomesData, expensesData);
        
        // Generate monthly data for chart
        generateMonthlyData(incomesData, expensesData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Generate recent activities from real data
  const generateRecentActivities = (incomes: Income[], expenses: Expense[]) => {
    const activities: Activity[] = [];
    
    // Add income activities
    incomes.slice(0, 3).forEach(income => {
      activities.push({
        id: income._id,
        title: `${income.source}`,
        description: `${income.category} - ₹${income.amount.toLocaleString()}`,
        timestamp: new Date(income.date).toLocaleDateString(),
        type: "income"
      });
    });
    
    // Add expense activities
    expenses.slice(0, 3).forEach(expense => {
      activities.push({
        id: expense._id,
        title: `${expense.description}`,
        description: `${expense.category} - ₹${expense.amount.toLocaleString()}`,
        timestamp: new Date(expense.date).toLocaleDateString(),
        type: "expense"
      });
    });
    
    // Sort by date (newest first)
    activities.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
    
    setRecentActivities(activities);
  };
  
  // Generate monthly data for chart
  const generateMonthlyData = (incomes: Income[], expenses: Expense[]) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    const chartData: any[] = [];
    
    // Initialize data for each month
    months.forEach(month => {
      chartData.push({
        name: month,
        income: 0,
        expenses: 0
      });
    });
    
    // Add income data
    incomes.forEach(income => {
      const date = new Date(income.date);
      if (date.getFullYear() === currentYear) {
        const monthIndex = date.getMonth();
        chartData[monthIndex].income += income.amount;
      }
    });
    
    // Add expense data
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      if (date.getFullYear() === currentYear) {
        const monthIndex = date.getMonth();
        chartData[monthIndex].expenses += expense.amount;
      }
    });
    
    setMonthlyData(chartData);
  };
  
  // Calculate summary statistics
  const totalBalance = incomes.reduce((sum, income) => sum + income.amount, 0) - 
                       expenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate current month's income and expenses
  const currentMonth = new Date().getMonth();
  const currentMonthIncomes = incomes.filter(income => new Date(income.date).getMonth() === currentMonth);
  const currentMonthExpenses = expenses.filter(expense => new Date(expense.date).getMonth() === currentMonth);
  
  const monthlyIncome = currentMonthIncomes.reduce((sum, income) => sum + income.amount, 0);
  const monthlyExpense = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Comparison with previous month for trend calculation
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousMonthIncomes = incomes.filter(income => new Date(income.date).getMonth() === previousMonth);
  const previousMonthExpenses = expenses.filter(expense => new Date(expense.date).getMonth() === previousMonth);
  
  const previousMonthIncome = previousMonthIncomes.reduce((sum, income) => sum + income.amount, 0);
  const previousMonthExpense = previousMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate income trend percentage
  const incomeTrend = previousMonthIncome === 0 ? 0 : 
                     ((monthlyIncome - previousMonthIncome) / previousMonthIncome * 100).toFixed(1);
  
  // Calculate expense trend percentage
  const expenseTrend = previousMonthExpense === 0 ? 0 : 
                      ((monthlyExpense - previousMonthExpense) / previousMonthExpense * 100).toFixed(1);
  
  const handleQuickActionClick = (action: string) => {
    toast({
      title: "Action initiated",
      description: `${action} process has been started.`,
    });
  };

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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back{user ? `, ${user.name}` : ''}! Here's an overview of your financial data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Balance"
          value={`₹${totalBalance.toLocaleString()}`}
          icon={<IndianRupee size={20} />}
          trend={{ value: "0%", positive: totalBalance >= 0 }}
        />
        <StatCard
          title="Monthly Income"
          value={`₹${monthlyIncome.toLocaleString()}`}
          icon={<ArrowDownCircle size={20} />}
          trend={{ value: `${incomeTrend}%`, positive: Number(incomeTrend) >= 0 }}
        />
        <StatCard
          title="Monthly Expenses"
          value={`₹${monthlyExpense.toLocaleString()}`}
          icon={<ArrowUpCircle size={20} />}
          trend={{ value: `${expenseTrend}%`, positive: Number(expenseTrend) <= 0 }}
        />
        <StatCard
          title="Budget Utilization"
          value={`${budgets.length > 0 ? 
                  Math.round((expenses.reduce((sum, expense) => sum + expense.amount, 0) / 
                  budgets.reduce((sum, budget) => sum + budget.budgetAmount, 0)) * 100) : 0}%`}
          icon={<Wallet size={20} />}
          trend={{ value: "0%", positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Income vs Expenses</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={monthlyData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" tick={{ fill: 'var(--chart-text-color, #6B7280)' }} />
                <YAxis tick={{ fill: 'var(--chart-text-color, #6B7280)' }} />
                <Tooltip 
                  formatter={(value) => [`₹${Number(value).toLocaleString()}`, '']}
                  contentStyle={{ backgroundColor: 'var(--tooltip-bg, #ffffff)', border: '1px solid var(--tooltip-border, #e5e7eb)' }}
                  labelStyle={{ color: 'var(--tooltip-label, #111827)' }}
                  itemStyle={{ color: 'var(--tooltip-item, #6B7280)' }}
                  wrapperStyle={{ outline: 'none' }}
                  cursor={{ fill: 'var(--tooltip-cursor, rgba(0,0,0,0.1))' }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  formatter={(value, entry, index) => (
                    <span className="text-sm text-gray-600 dark:text-gray-300">{value}</span>
                  )}
                />
                <Bar dataKey="income" fill={chartConfig.income.color} name={chartConfig.income.label} />
                <Bar dataKey="expenses" fill={chartConfig.expenses.color} name={chartConfig.expenses.label} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="lg:col-span-1">
          <RecentActivity activities={recentActivities} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <QuickAction
          title="Manage Income"
          description="Add and track your income sources"
          icon={<ArrowDownCircle size={18} />}
          onClick={() => handleQuickActionClick("Income management")}
        />
        <QuickAction
          title="Track Expenses"
          description="Record and categorize your expenses"
          icon={<ArrowUpCircle size={18} />}
          onClick={() => handleQuickActionClick("Expense tracking")}
        />
        <QuickAction
          title="Set Financial Goals"
          description="Create and track your financial goals"
          icon={<Target size={18} />}
          onClick={() => handleQuickActionClick("Goal setting")}
        />
        <QuickAction
          title="Generate Reports"
          description="View reports and insights about your finances"
          icon={<FileBarChart2 size={18} />}
          onClick={() => handleQuickActionClick("Report generation")}
        />
      </div>
    </Layout>
  );
};

export default Index;
