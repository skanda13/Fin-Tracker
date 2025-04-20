import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { Edit, Check, X, Sun, Moon, Monitor } from "lucide-react";
import useApi from "@/hooks/useApi";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Settings = () => {
  const { user, updateUserData } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const api = useApi();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);
  
  const handleUpdateProfile = async () => {
    try {
      setIsSaving(true);
      
      // Only send 'light' or 'dark' to the server, not 'system'
      // If theme is 'system', don't send theme in the settings at all
      const settingsData = {
        ...(theme !== 'system' && { theme })
      };
      
      const response = await api.put('/api/users/profile', {
        name,
        settings: settingsData
      });
      
      if (response) {
        // Update the user context with the new data
        updateUserData(response);
        
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully."
        });
        setIsEditing(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  };
  
  if (!user) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ledger-600"></div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account settings and preferences</p>
      </div>
      
      <div className="grid gap-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="dark:text-gray-100">Account Information</CardTitle>
              <CardDescription className="dark:text-gray-400">Update your personal details</CardDescription>
            </div>
            {!isEditing ? (
              <Button
                variant="outline" 
                size="icon" 
                onClick={() => setIsEditing(true)}
              >
                <Edit size={16} />
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-green-500 text-green-500"
                  onClick={handleUpdateProfile}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <div className="h-4 w-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Check size={16} />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-red-500 text-red-500"
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                >
                  <X size={16} />
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="dark:text-gray-300">Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-gray-300">Email</Label>
                <Input 
                  id="email" 
                  value={email} 
                  disabled={true}
                  className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">Email cannot be changed</p>
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
                value={theme} 
                onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
                className="grid grid-cols-3 gap-4"
              >
                <div className="flex flex-col items-center">
                  <RadioGroupItem value="light" id="light" className="sr-only" />
                  <label 
                    htmlFor="light" 
                    className={`flex h-[60px] w-full flex-row items-center justify-center gap-3 rounded-md border-2 px-4 hover:border-ledger-400 hover:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer
                              ${theme === 'light' ? 'border-ledger-600 bg-gray-700 dark:bg-gray-800' : 'border-transparent dark:border-gray-600'}`}
                  >
                    <Sun className="h-5 w-5 dark:text-gray-300" />
                    <span className="text-sm font-medium dark:text-gray-300">Light</span>
                  </label>
                </div>
                
                <div className="flex flex-col items-center">
                  <RadioGroupItem value="dark" id="dark" className="sr-only" />
                  <label 
                    htmlFor="dark" 
                    className={`flex h-[60px] w-full flex-row items-center justify-center gap-3 rounded-md border-2 px-4 hover:border-ledger-400 hover:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer
                              ${theme === 'dark' ? 'border-ledger-600 bg-gray-700 dark:bg-gray-800' : 'border-transparent dark:border-gray-600'}`}
                  >
                    <Moon className="h-5 w-5 dark:text-gray-300" />
                    <span className="text-sm font-medium dark:text-gray-300">Dark</span>
                  </label>
                </div>
                
                <div className="flex flex-col items-center">
                  <RadioGroupItem value="system" id="system" className="sr-only" />
                  <label 
                    htmlFor="system" 
                    className={`flex h-[60px] w-full flex-row items-center justify-center gap-3 rounded-md border-2 px-4 hover:border-ledger-400 hover:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer
                              ${theme === 'system' ? 'border-ledger-600 bg-gray-700 dark:bg-gray-800' : 'border-transparent dark:border-gray-600'}`}
                  >
                    <Monitor className="h-5 w-5 dark:text-gray-300" />
                    <span className="text-sm font-medium dark:text-gray-300">System</span>
                  </label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
