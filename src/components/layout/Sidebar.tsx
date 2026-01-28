import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FileText,
  HelpCircle,
  MessageSquare,
  PenTool,
  Receipt,
  Settings,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import { useActivePath } from "@/hooks/useActivePath";
import { NavLink } from "react-router-dom";
import { UserAvatar } from "../shared";

interface NavItem {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }> | LucideIcon;
}
// Navigation item
const sidebarNavItems: NavItem[] = [
  { label: "Specialists", path: "/", icon: Users },
  { label: "Clients", path: "/clients", icon: UserCheck },
  { label: "Service Orders", path: "/service-orders", icon: FileText },
  { label: "eSignature", path: "/esignature", icon: PenTool },
  { label: "Messages", path: "/messages", icon: MessageSquare },
  { label: "Invoices & Receipts", path: "/invoices", icon: Receipt },
];

const bottomNavItems: NavItem[] = [
  { label: "Help", path: "/help", icon: HelpCircle },
  { label: "Settings", path: "/settings", icon: Settings },
];

function SidebarHeader() {
  return (
    <div className="p-4">
      <p className="text-xs text-sidebar-foreground uppercase tracking-wider mb-3">
        Profile
      </p>
      <div className="flex items-center gap-3">
        <UserAvatar name="Gwen Lam" size="md" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-white truncate">Gwen Lam</p>
          <p className="text-xs text-sidebar-company truncate">
            ST Comp Holdings Sdn Bhd
          </p>
        </div>
      </div>
    </div>
  );
}

function NavigationList({ items }: { items: NavItem[] }) {
  const { isActive } = useActivePath();

  return (
    <nav className="flex-1 p-2">
      <ul className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path, true);

          return (
            <li key={item.path} className="flex justify-center">
              <Button
                variant={active ? "default" : "ghost"}
                asChild
                className={cn(
                  "transition-all",
                  "w-full justify-start gap-3 px-3",
                )}
              >
                <NavLink to={item.path}>
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const SidebarNavigation = ({ navItems }: { navItems: NavItem[] }) => {
  const { isActive } = useActivePath();

  return (
    <aside className="flex flex-col h-screen overflow-y-auto bg-card transition-all duration-300">
      <SidebarHeader />
      <div className="text-muted-foreground text-xs font-medium px-3 py-2">
        Dashboard
      </div>
      <NavigationList items={navItems} />

      <div className="py-4">
        <ul className="space-y-1 px-2">
          {bottomNavItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                  isActive(item.path)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export function AppSidebar() {
  return <SidebarNavigation navItems={sidebarNavItems} />;
}
