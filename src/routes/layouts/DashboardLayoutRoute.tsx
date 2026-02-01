import { Outlet } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";

export const DashboardLayoutRoute = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};
