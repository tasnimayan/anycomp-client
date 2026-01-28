import { type ReactNode } from "react";
import { BreadCrumb } from "../components/layout/BreadCrumb";
import { AppSidebar } from "../components/layout/Sidebar";
import { TopHeader } from "../components/layout/TopHeader";

interface DashboardLayoutProps {
  children: ReactNode;
  breadcrumb?: string[];
  title?: string;
}

export default function DashboardLayout({
  children,
  breadcrumb,
  title,
}: DashboardLayoutProps) {
  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Sidebar */}
      <AppSidebar />

      <div className="flex-1 px-6 pt-6 pb-2 min-w-0 overflow-y-auto">
        <TopHeader />

        <main className="flex-1 py-4">
          {/* Breadcrumb */}
          {breadcrumb && breadcrumb.length > 0 && (
            <BreadCrumb breadcrumb={breadcrumb} />
          )}
          {/* Page Title */}
          {title && (
            <h1 className="text-lg font-semibold text-heading mb-6">{title}</h1>
          )}

          {/* Main Content */}
          <div className="ps-4 py-2">{children}</div>
        </main>
      </div>
    </div>
  );
}
