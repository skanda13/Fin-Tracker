import { Bell, Search, Menu, LogOut, User, Settings as SettingsIcon, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/login");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    
    const nameParts = user.name.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={20} />
        </Button>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-ledger-400 focus:border-transparent dark:bg-gray-800 dark:text-gray-200"
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme} 
          className="mr-2"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
            <DropdownMenuItem className="dark:text-gray-200 dark:focus:bg-gray-700">New notification</DropdownMenuItem>
            <DropdownMenuItem className="dark:text-gray-200 dark:focus:bg-gray-700">View all notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="ml-4 flex items-center cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-ledger-600 text-white flex items-center justify-center font-medium">
                {getUserInitials()}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200 hidden md:block">
                {user?.name || "User"}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
            </div>
            <DropdownMenuSeparator className="dark:border-gray-700" />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex items-center cursor-pointer dark:text-gray-200 dark:focus:bg-gray-700">
                <User className="w-4 h-4 mr-2" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center cursor-pointer dark:text-gray-200 dark:focus:bg-gray-700">
                <SettingsIcon className="w-4 h-4 mr-2" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="dark:border-gray-700" />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20 cursor-pointer">
              <LogOut className="w-4 h-4 mr-2" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
