
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Investments from "./pages/Investments";
import FinancialGoals from "./pages/FinancialGoals";
import FinancialCalculator from "./pages/FinancialCalculator";
import Settings from "./pages/Settings";
import BudgetPlanner from "./pages/BudgetPlanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/financial-goals" element={<FinancialGoals />} />
          <Route path="/financial-calculator" element={<FinancialCalculator />} />
          <Route path="/budget-planner" element={<BudgetPlanner />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
