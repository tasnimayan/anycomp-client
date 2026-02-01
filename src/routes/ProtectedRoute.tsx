import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PageLoader } from "../components/feedback/Loader";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  redirectTo?: string;
}

export const ProtectedRoute = ({
  redirectTo = "/login",
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    // Redirect to login while saving the attempted location
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
