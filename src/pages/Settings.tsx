import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/hooks/useTheme";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Sun, Monitor } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Settings = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [currency, setCurrency] = useState("INR");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account settings and preferences</p>
      </div>
      
      <div className="grid gap-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-gray-100">Profile Information</CardTitle>
            <CardDescription className="dark:text-gray-400">Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name" className="dark:text-gray-300">Full Name</Label>
                <Input 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="email" className="dark:text-gray-300">Email Address</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-gray-100">Appearance</CardTitle>
            <CardDescription className="dark:text-gray-400">Customize your application theme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <Label htmlFor="theme" className="dark:text-gray-300">Theme Mode</Label>
              <RadioGroup 
                id="theme" 
                value={theme === 'system' ? 'system' : theme} 
                onValueChange={(value) => setTheme(value as 'light' | 'dark')}
                className="grid grid-cols-3 gap-4"
              >
                <div className="flex flex-col items-center gap-2">
                  <RadioGroupItem value="light" id="light" className="sr-only" />
                  <label 
                    htmlFor="light" 
                    className={`flex h-14 w-full flex-col justify-between rounded-md border-2 p-3 hover:border-ledger-400 hover:bg-ledger-50 dark:hover:bg-ledger-950/20 cursor-pointer
                              ${theme === 'light' ? 'border-ledger-600 bg-ledger-50 dark:bg-ledger-950/20' : 'border-transparent dark:border-gray-600'}`}
                  >
                    <Sun className="h-5 w-5 dark:text-gray-300" />
                    <span className="block w-full text-center text-sm dark:text-gray-300">Light</span>
                  </label>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <RadioGroupItem value="dark" id="dark" className="sr-only" />
                  <label 
                    htmlFor="dark" 
                    className={`flex h-14 w-full flex-col justify-between rounded-md border-2 p-3 hover:border-ledger-400 hover:bg-ledger-50 dark:hover:bg-ledger-950/20 cursor-pointer
                              ${theme === 'dark' ? 'border-ledger-600 bg-ledger-50 dark:bg-ledger-950/20' : 'border-transparent dark:border-gray-600'}`}
                  >
                    <Moon className="h-5 w-5 dark:text-gray-300" />
                    <span className="block w-full text-center text-sm dark:text-gray-300">Dark</span>
                  </label>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <RadioGroupItem value="system" id="system" className="sr-only" />
                  <label 
                    htmlFor="system" 
                    className={`flex h-14 w-full flex-col justify-between rounded-md border-2 p-3 hover:border-ledger-400 hover:bg-ledger-50 dark:hover:bg-ledger-950/20 cursor-pointer
                              ${theme === 'system' ? 'border-ledger-600 bg-ledger-50 dark:bg-ledger-950/20' : 'border-transparent dark:border-gray-600'}`}
                  >
                    <Monitor className="h-5 w-5 dark:text-gray-300" />
                    <span className="block w-full text-center text-sm dark:text-gray-300">System</span>
                  </label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-gray-100">Preferences</CardTitle>
            <CardDescription className="dark:text-gray-400">Set your application preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="currency" className="dark:text-gray-300">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                    <SelectValue placeholder="Select a currency" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="INR" className="dark:text-gray-100 dark:focus:bg-gray-700">Indian Rupee (₹)</SelectItem>
                    <SelectItem value="USD" className="dark:text-gray-100 dark:focus:bg-gray-700">US Dollar ($)</SelectItem>
                    <SelectItem value="EUR" className="dark:text-gray-100 dark:focus:bg-gray-700">Euro (€)</SelectItem>
                    <SelectItem value="GBP" className="dark:text-gray-100 dark:focus:bg-gray-700">British Pound (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-3">
                <Label htmlFor="date-format" className="dark:text-gray-300">Date Format</Label>
                <Select value={dateFormat} onValueChange={setDateFormat}>
                  <SelectTrigger id="date-format" className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                    <SelectValue placeholder="Select a date format" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                    <SelectItem value="DD/MM/YYYY" className="dark:text-gray-100 dark:focus:bg-gray-700">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM/DD/YYYY" className="dark:text-gray-100 dark:focus:bg-gray-700">MM/DD/YYYY</SelectItem>
                    <SelectItem value="YYYY/MM/DD" className="dark:text-gray-100 dark:focus:bg-gray-700">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Button onClick={handleSaveSettings} className="bg-ledger-600 hover:bg-ledger-700 dark:bg-ledger-700 dark:hover:bg-ledger-600">
          Save Settings
        </Button>
      </div>
    </Layout>
  );
};

export default Settings;
