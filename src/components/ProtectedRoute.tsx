import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    console.log("ProtectedRoute: Authentication state:", { isAuthenticated, loading });
  }, [isAuthenticated, loading]);

  // Show loading indicator while checking authentication status
  if (loading) {
    console.log("ProtectedRoute: Still loading auth status");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ledger-600"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log("ProtectedRoute: Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // Render children if authenticated
  console.log("ProtectedRoute: Authenticated, rendering children");
  return <>{children}</>;
};

export default ProtectedRoute; 