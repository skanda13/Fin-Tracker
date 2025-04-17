import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  ArrowDownCircle,
  ArrowUpCircle,
  LineChart,
  Target,
  FileBarChart2, 
  Calculator,
  Settings,
  Wallet,
  User
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { name: "Income", icon: <ArrowDownCircle size={20} />, path: "/income" },
    { name: "Expenses", icon: <ArrowUpCircle size={20} />, path: "/expenses" },
    { name: "Investments", icon: <LineChart size={20} />, path: "/investments" },
    { name: "Financial Goals", icon: <Target size={20} />, path: "/financial-goals" },
    { name: "Budget Planner", icon: <Wallet size={20} />, path: "/budget-planner" },
    { name: "Reports", icon: <FileBarChart2 size={20} />, path: "/reports" },
    { name: "Financial Calculator", icon: <Calculator size={20} />, path: "/financial-calculator" },
    { name: "Profile", icon: <User size={20} />, path: "/profile" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-ledger-700 dark:text-ledger-500">Personal Finance</h1>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 rounded-md hover:bg-ledger-50 dark:hover:bg-gray-700 hover:text-ledger-700 dark:hover:text-ledger-400 transition-colors duration-200"
              >
                <span className="mr-3 text-gray-500 dark:text-gray-400">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
