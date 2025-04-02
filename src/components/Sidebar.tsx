
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  CreditCard, 
  Package, 
  FileBarChart2, 
  Users, 
  Clock, 
  Globe, 
  Settings 
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { name: "Bank Reconciliation", icon: <CreditCard size={20} />, path: "/bank-reconciliation" },
    { name: "Inventory", icon: <Package size={20} />, path: "/inventory" },
    { name: "Reports", icon: <FileBarChart2 size={20} />, path: "/reports" },
    { name: "Collaboration", icon: <Users size={20} />, path: "/collaboration" },
    { name: "Automation", icon: <Clock size={20} />, path: "/automation" },
    { name: "Global Business", icon: <Globe size={20} />, path: "/global-business" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <h1 className="text-xl font-bold text-ledger-700">Ledger Wizard</h1>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="flex items-center px-4 py-3 text-gray-700 rounded-md hover:bg-ledger-50 hover:text-ledger-700 transition-colors duration-200"
              >
                <span className="mr-3 text-gray-500">{item.icon}</span>
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
