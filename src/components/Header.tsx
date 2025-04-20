import { Menu, LogOut, Settings as SettingsIcon, Moon, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check sidebar state from layout
  useEffect(() => {
    const checkSidebarState = () => {
      // Check if window width is mobile sized
      const isMobile = window.innerWidth < 768;
      setSidebarOpen(!isMobile);
    };
    
    checkSidebarState();
    window.addEventListener('resize', checkSidebarState);
    
    return () => {
      window.removeEventListener('resize', checkSidebarState);
    };
  }, []);
  
  // Toggle local sidebar state for button appearance
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    toggleSidebar();
  };

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
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-16 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-4 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={handleToggleSidebar}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
        <div className="flex flex-col">
          <h2 className="text-sm font-medium text-gray-800 dark:text-gray-200">
            <span className="font-['Special_Gothic_Expanded_One'] text-lg tracking-wide">Welcome back, <span className="text-ledger-600 dark:text-ledger-400">{user?.name || "User"}</span></span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Here's an overview of all of your balances.</p>
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
            <div className="flex items-center cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-ledger-600 text-white flex items-center justify-center font-medium">
                {getUserInitials()}
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
            </div>
            <DropdownMenuSeparator className="dark:border-gray-700" />
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
