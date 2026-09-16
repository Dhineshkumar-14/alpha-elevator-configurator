import { Navigate, Outlet } from "react-router-dom";
import { useGetMeQuery } from "../services/authApi";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = () => {
  const loginUser = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { data, isLoading, isError } = useGetMeQuery();

  // Still checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-sm text-text-secondary">
          Checking authentication...
        </div>
      </div>
    );
  }

  // Cookie is invalid / user is not authenticated
  if (isError || !data?.user) {
    return <Navigate to="/login" replace />;
  }

  // Restore user into Zustand
  if (!isAuthenticated) {
    loginUser(data.user);
  }

  return <Outlet />;
};

export default ProtectedRoute;
