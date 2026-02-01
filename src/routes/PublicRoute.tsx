import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PublicRouteProps {
  restricted?: boolean;
  redirectTo?: string;
}

export const PublicRoute = ({
  restricted = false,
  redirectTo = "/",
}: PublicRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // For restricted public routes (like login/register), redirect authenticated users
  if (restricted && isAuthenticated) {
    const from = location.state?.from?.pathname || redirectTo;
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};
