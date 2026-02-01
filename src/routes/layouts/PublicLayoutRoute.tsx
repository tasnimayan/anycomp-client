import { Outlet } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";

export const PublicLayoutRoute = () => {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
};
