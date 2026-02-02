import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { DashboardLayoutRoute, PublicLayoutRoute } from "./layouts";

// Lazy load pages for better performance
const SpecialistsPage = lazy(() =>
  import("@/features/specialists/pages/SpecialistsPage").then((m) => ({
    default: m.SpecialistsPage,
  })),
);

const RegisterCompanyPage = lazy(() =>
  import("@/features/register-company/pages/RegisterCompanyPage").then((m) => ({
    default: m.RegisterCompanyPage,
  })),
);

const CreateServicePage = lazy(() =>
  import("@/features/specialists/pages/CreateServicePage").then((m) => ({
    default: m.CreateServicePage,
  })),
);

const NotFound = lazy(() => import("@/pages/NotFound"));

// Route path constants
export const ROUTES = {
  HOME: "/",
  REGISTER_COMPANY: "/register-company",
  LOGIN: "/login",
  CREATE_SERVICE: "/specialists/create",
} as const;

// Route configuration
export const routes: RouteObject[] = [
  // Protected routes with Dashboard layout
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayoutRoute />,
        children: [
          {
            path: ROUTES.HOME,
            element: <SpecialistsPage />,
          },
          {
            path: ROUTES.CREATE_SERVICE,
            element: <CreateServicePage />,
          },
        ],
      },
    ],
  },

  // Public routes with Public layout
  {
    element: <PublicRoute />,
    children: [
      {
        element: <PublicLayoutRoute />,
        children: [
          {
            path: ROUTES.REGISTER_COMPANY,
            element: <RegisterCompanyPage />,
          },
        ],
      },
    ],
  },
  // Catch-all 404 route
  {
    path: "*",
    element: <NotFound />,
  },
];
