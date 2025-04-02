
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
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex items-start">
      <div className="p-3 rounded-full bg-ledger-50 text-ledger-700 mr-4">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-3 text-ledger-700 border-ledger-200 hover:bg-ledger-50"
          onClick={onClick}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default QuickAction;
