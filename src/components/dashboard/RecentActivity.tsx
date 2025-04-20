import { ScrollArea } from "@/components/ui/scroll-area";

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "transaction" | "invoice" | "reconciliation" | "system" | "income" | "expense" | "investment";
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "transaction":
        return <div className="w-3 h-3 rounded-full bg-green-500" />;
      case "invoice":
        return <div className="w-3 h-3 rounded-full bg-blue-500" />;
      case "reconciliation":
        return <div className="w-3 h-3 rounded-full bg-purple-500" />;
      case "system":
        return <div className="w-3 h-3 rounded-full bg-gray-500" />;
      case "income":
        return <div className="w-3 h-3 rounded-full bg-green-600" />;
      case "expense":
        return <div className="w-3 h-3 rounded-full bg-red-500" />;
      case "investment":
        return <div className="w-3 h-3 rounded-full bg-yellow-500" />;
    }
  };

  // Calculate height for 6 items (each ~82px tall including margins)
  const maxVisibleItems = 5; // Show maximum 5 items before scrolling
  const itemHeight = 82; // Approximate height per item

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold dark:text-gray-100">Recent Activity</h2>
      </div>
      <div className="flex-1 overflow-hidden" style={{ maxHeight: `${maxVisibleItems * itemHeight}px` }}>
        <ScrollArea className="h-full">
          <div className="p-4">
            {activities.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No recent activity</p>
            ) : (
              activities.map((activity) => (
                <div key={activity.id} className="mb-5 last:mb-0">
                  <div className="flex items-start">
                    <div className="mt-1.5 mr-4 flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold dark:text-gray-200">{activity.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default RecentActivity;
