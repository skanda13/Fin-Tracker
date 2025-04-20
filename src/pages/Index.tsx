import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import StatCard from "@/components/dashboard/StatCard";
import QuickAction from "@/components/dashboard/QuickAction";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { Link, useNavigate } from "react-router-dom";
import { 
  DollarSign, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  LineChart, 
  Target, 
  Calculator,
  IndianRupee
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip, CartesianGrid } from "recharts";
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
  const navigate = useNavigate();
  
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
    
    // Set up a refresh timer to fetch data every 10 seconds
    const timer = setInterval(() => {
      fetchData();
      console.log('Dashboard data refreshed automatically');
    }, 10000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Generate recent activities from real data
  const generateRecentActivities = (incomes: Income[], expenses: Expense[]) => {
    const activities: Activity[] = [];
    
    // Add income activities
    incomes.forEach(income => {
      activities.push({
        id: income._id,
        title: `${income.source}`,
        description: `${income.category} - ₹${income.amount.toLocaleString()}`,
        timestamp: new Date(income.date).toLocaleDateString(),
        type: "income"
      });
    });
    
    // Add expense activities
    expenses.forEach(expense => {
      activities.push({
        id: expense._id,
        title: `${expense.description}`,
        description: `${expense.category} - ₹${expense.amount.toLocaleString()}`,
        timestamp: new Date(expense.date).toLocaleDateString(),
        type: "expense"
      });
    });
    
    // Try to add budget activities
    budgets.slice(0, 3).forEach(budget => {
      activities.push({
        id: budget._id,
        title: `Budget Update: ${budget.category}`,
        description: `Budget - ₹${budget.budgetAmount.toLocaleString()} / Spent - ₹${budget.actualAmount.toLocaleString()}`,
        timestamp: `${budget.month}`,
        type: "system"
      });
    });
    
    // Sort by date (newest first)
    activities.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
    
    // Limit to the 10 most recent activities
    setRecentActivities(activities.slice(0, 10));
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Balance"
          value={`₹${totalBalance.toLocaleString()}`}
          icon={<IndianRupee size={20} />}
        />
        <StatCard
          title="Monthly Income"
          value={`₹${monthlyIncome.toLocaleString()}`}
          icon={<ArrowDownCircle size={20} />}
        />
        <StatCard
          title="Monthly Expenses"
          value={`₹${monthlyExpense.toLocaleString()}`}
          icon={<ArrowUpCircle size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Income vs Expenses</h2>
          <div className="h-[300px] flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
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
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F44336" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#F44336" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 114, 128, 0.2)" />
                <XAxis dataKey="name" tick={{ fill: 'var(--chart-text-color, #6B7280)' }} />
                <YAxis tick={{ fill: 'var(--chart-text-color, #6B7280)' }} />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                          <p className="font-bold text-gray-800 dark:text-gray-200 mb-2">{label}</p>
                          {payload.map((entry, index) => {
                            const isIncome = entry.dataKey === 'income';
                            const color = isIncome ? chartConfig.income.color : chartConfig.expenses.color;
                            const name = isIncome ? 'Income' : 'Expenses';
                            
                            return (
                              <div key={index} className="mb-1 last:mb-0">
                                <div className="flex items-center">
                                  <div 
                                    className="w-3 h-3 mr-2 rounded-full" 
                                    style={{ backgroundColor: color }}
                                  />
                                  <span className="font-semibold" style={{ color }}>
                                    {name}: 
                                  </span>
                                  <span className="ml-2 font-semibold" style={{ color }}>
                                    ₹{Number(entry.value).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  formatter={(value, entry, index) => (
                    <span className="text-sm text-gray-600 dark:text-gray-300">{value}</span>
                  )}
                />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  name={chartConfig.income.label}
                  stroke={chartConfig.income.color} 
                  fillOpacity={1}
                  fill="url(#colorIncome)" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  name={chartConfig.expenses.label}
                  stroke={chartConfig.expenses.color} 
                  fillOpacity={1}
                  fill="url(#colorExpenses)" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="lg:col-span-1 flex flex-col h-full">
          <RecentActivity activities={recentActivities} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <QuickAction
          title="Manage Income"
          description="Add and track your income sources"
          icon={<ArrowDownCircle size={18} />}
          onClick={() => navigate("/income")}
        />
        <QuickAction
          title="Track Expenses"
          description="Record and categorize your expenses"
          icon={<ArrowUpCircle size={18} />}
          onClick={() => navigate("/expenses")}
        />
        <QuickAction
          title="Set Financial Goals"
          description="Create and track your financial goals"
          icon={<Target size={18} />}
          onClick={() => navigate("/financial-goals")}
        />
      </div>
    </Layout>
  );
};

export default Index;
