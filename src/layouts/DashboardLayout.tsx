import { type ReactNode } from "react";
import { AppSidebar } from "../components/layout/Sidebar";
import { UserActions } from "../components/shared/UserActions";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Sidebar */}
      <AppSidebar />

      <div className="flex-1 px-6 pt-6 pb-2 min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="h-12 shadow bg-white flex items-center justify-end px-6 gap-3">
          <UserActions />
        </header>

        {/* Main Content */}
        <main className="flex-1 py-4 ps-4">{children}</main>
      </div>
    </div>
  );
}
