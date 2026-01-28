import { cn } from "@/lib/utils";
import { type ServiceTabFilter } from "../types";

interface ServiceTabsProps {
  activeTab: ServiceTabFilter;
  onTabChange: (tab: ServiceTabFilter) => void;
}

const tabs: { id: ServiceTabFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "drafts", label: "Drafts" },
  { id: "published", label: "Published" },
];

export function ServiceTabs({ activeTab, onTabChange }: ServiceTabsProps) {
  return (
    <div className="flex border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-6 py-3 text-xs font-medium transition-colors relative",
            activeTab === tab.id
              ? "text-primary"
              : "text-heading hover:text-primary",
          )}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
}
