import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar as CalendarIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, "Goal name is required"),
  targetAmount: z.coerce.number()
    .min(1, "Target amount must be greater than 0"),
  currentAmount: z.coerce.number()
    .min(0, "Current amount must be at least 0"),
  deadline: z.date({
    required_error: "Deadline is required",
  }),
  notes: z.string().optional(),
});

export type GoalFormData = z.infer<typeof formSchema>;

export interface ApiGoalData {
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  notes?: string;
}

interface FinancialGoalFormProps {
  initialData?: GoalFormData & { _id?: string };
  onSubmit: (data: GoalFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const FinancialGoalForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: FinancialGoalFormProps) => {
  const form = useForm<GoalFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      targetAmount: 0,
      currentAmount: 0,
      notes: "",
      deadline: undefined,
    },
  });

  const handleSubmit = async (data: GoalFormData) => {
    await onSubmit(data);
  };

  // Helper function to format date to YYYY-MM-DD
  const formatDateForInput = (date: Date | undefined): string => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter goal name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="targetAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Amount (₹)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter target amount" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Amount (₹)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter current amount" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deadline</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type="date"
                    value={formatDateForInput(field.value)}
                    onChange={(e) => {
                      const newDate = e.target.value ? new Date(e.target.value) : undefined;
                      field.onChange(newDate);
                    }}
                    className="pl-3 pr-10 cursor-pointer hover:border-ledger-500 focus:border-ledger-500"
                    onClick={(e) => {
                      try {
                        // Modern browsers
                        (e.currentTarget as HTMLInputElement).showPicker();
                      } catch (err) {
                        // Fallback for browsers that don't support showPicker()
                        // Just focus the input which will usually show the date picker
                        (e.currentTarget as HTMLInputElement).focus();
                      }
                    }}
                  />
                </FormControl>
                <div 
                  className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
                    try {
                      // Try to show the picker
                      dateInput.showPicker();
                    } catch (err) {
                      // Fallback - just focus
                      dateInput.focus();
                    }
                  }}
                >
                  <CalendarIcon size={18} className="text-gray-500" />
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional notes about this goal"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600 dark:text-white">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {initialData?._id ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{initialData?._id ? "Update Goal" : "Create Goal"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FinancialGoalForm; 