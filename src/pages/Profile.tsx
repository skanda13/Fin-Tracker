import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Edit, Check, X } from "lucide-react";
import useApi from "@/hooks/useApi";

const Profile = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const api = useApi();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("₹");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.settings) {
        setCurrency(user.settings.currency || "₹");
        setDateFormat(user.settings.dateFormat || "DD/MM/YYYY");
      }
    }
  }, [user]);
  
  const handleUpdateProfile = async () => {
    try {
      const result = await api.put('/api/users/profile', {
        name,
        settings: {
          currency,
          dateFormat,
          theme: 'light'
        }
      });
      
      if (result) {
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
    }
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.settings) {
        setCurrency(user.settings.currency || "₹");
        setDateFormat(user.settings.dateFormat || "DD/MM/YYYY");
      }
    }
  };
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
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
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 mt-1">View and manage your account information</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Manage your personal details</CardDescription>
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
                  >
                    <Check size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-red-500 text-red-500"
                    onClick={handleCancelEdit}
                  >
                    <X size={16} />
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    value={email} 
                    disabled={true}
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-gray-500">Email cannot be changed</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Preferred Currency</Label>
                  <Input 
                    id="currency" 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Input 
                    id="dateFormat" 
                    value={dateFormat} 
                    onChange={(e) => setDateFormat(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">Password was last changed: Never</p>
                  <Button 
                    variant="outline" 
                    className="w-full md:w-auto"
                    onClick={() => toast({
                      title: "Coming soon",
                      description: "Password change functionality will be available soon."
                    })}
                  >
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Member Since</p>
                <p className="text-lg font-medium">January 2024</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Account Type</p>
                <p className="text-lg font-medium">Standard</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <div className="flex items-center">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span>
                  <p className="text-lg font-medium">Active</p>
                </div>
              </div>
              
              <div className="pt-6">
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile; 