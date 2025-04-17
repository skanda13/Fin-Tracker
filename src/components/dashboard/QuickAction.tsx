import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface QuickActionProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
}

const QuickAction = ({ title, description, icon, onClick }: QuickActionProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-start">
      <div className="p-3 rounded-full bg-ledger-50 dark:bg-gray-700 text-ledger-700 dark:text-ledger-400 mr-4">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-3 text-ledger-700 dark:text-ledger-400 border-ledger-200 dark:border-gray-600 hover:bg-ledger-50 dark:hover:bg-gray-700"
          onClick={onClick}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default QuickAction;
