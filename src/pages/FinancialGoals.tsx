
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const FinancialGoals = () => {
  const { toast } = useToast();

  const handleAddGoal = () => {
    toast({
      title: "Feature coming soon",
      description: "The ability to add financial goals will be available soon.",
    });
  };

  const dummyGoalsData = [
    { id: 1, name: "Emergency Fund", target: "₹300,000", current: "₹200,000", deadline: "2023-12-31", progress: 67 },
    { id: 2, name: "New Car", target: "₹800,000", current: "₹350,000", deadline: "2024-06-30", progress: 44 },
    { id: 3, name: "Vacation", target: "₹150,000", current: "₹75,000", deadline: "2023-10-15", progress: 50 },
  ];

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Goals</h1>
          <p className="text-gray-500 mt-1">Set and track your financial goals</p>
        </div>
        <Button onClick={handleAddGoal} className="bg-ledger-600 hover:bg-ledger-700">
          <Plus size={16} className="mr-2" />
          Add Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {dummyGoalsData.map((goal) => (
          <div key={goal.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{goal.name}</h3>
                <p className="text-gray-500 text-sm">Target: {goal.target} • Deadline: {goal.deadline}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">Delete</Button>
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{goal.progress}%</span>
              </div>
              <Progress value={goal.progress} className="h-2" />
            </div>
            
            <div className="flex justify-between text-sm mt-4">
              <span className="text-gray-500">Current: {goal.current}</span>
              <span className="text-gray-500">Remaining: ₹{parseInt(goal.target.replace(/[₹,]/g, '')) - parseInt(goal.current.replace(/[₹,]/g, ''))}</span>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default FinancialGoals;
