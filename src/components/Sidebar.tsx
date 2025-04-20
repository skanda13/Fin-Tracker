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
  X,
  IndianRupee
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { name: "Income", icon: <ArrowDownCircle size={20} />, path: "/income" },
    { name: "Expenses", icon: <ArrowUpCircle size={20} />, path: "/expenses" },
    { name: "Investments", icon: <LineChart size={20} />, path: "/investments" },
    { name: "Financial Goals", icon: <Target size={20} />, path: "/financial-goals" },
    { name: "Budget Planner", icon: <Wallet size={20} />, path: "/budget-planner" },
    { name: "Financial Calculator", icon: <Calculator size={20} />, path: "/financial-calculator" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
    <aside 
      className={`fixed md:relative z-20 flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full 
        ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-20'} 
        transition-all duration-300 ease-in-out`}
    >
      <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
        <div className={`flex items-center justify-center w-full`}>
          <h1 className={`text-xl font-bold text-ledger-700 dark:text-ledger-500 ${!isOpen && 'md:hidden'}`}>Personal Finance</h1>
          {!isOpen && <IndianRupee size={24} className="hidden md:block text-ledger-700 dark:text-ledger-500" />}
        </div>
        {/* Close button for mobile only */}
        <div className="md:hidden flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </Button>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 rounded-md hover:bg-ledger-50 dark:hover:bg-gray-700 hover:text-ledger-700 dark:hover:text-ledger-400 transition-colors duration-200"
                onClick={() => {
                  // Close sidebar on mobile after navigation
                  if (window.innerWidth < 768 && onClose) {
                    onClose();
                  }
                }}
              >
                <span className="mr-3 text-gray-500 dark:text-gray-400">{item.icon}</span>
                <span className={`${!isOpen && 'md:hidden'}`}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
