
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon, trend, className }: StatCardProps) => {
  return (
    <div className={cn("bg-white rounded-lg p-6 shadow-sm border border-gray-100", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-xs font-medium ${
                  trend.positive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.value}
                {trend.positive ? " ↑" : " ↓"}
              </span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-full bg-ledger-50 text-ledger-700">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
