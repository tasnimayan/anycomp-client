import { StatusBadge } from "@/components/shared";
import { cn } from "@/lib/utils";
import { MoreVertical } from "lucide-react";
import { type Service } from "../types";

interface ServiceTableProps {
  services: Service[];
  selectedIds: string[];
  onSelectToggle: (id: string) => void;
  isSelected: (id: string) => boolean;
  onSelectAll: (checked: boolean) => void;
}

export function ServiceTable({
  services,
  selectedIds,
  onSelectToggle,
  isSelected,
  onSelectAll,
}: ServiceTableProps) {
  const allSelected =
    services.length > 0 && selectedIds.length === services.length;
  const someSelected =
    selectedIds.length > 0 && selectedIds.length < services.length;

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="w-12 p-4">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected;
                }}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                aria-label="Select all services"
              />
            </th>
            <th className="p-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Service
            </th>
            <th className="p-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Price
            </th>
            <th className="p-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Purchases
            </th>
            <th className="p-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Duration
            </th>
            <th className="p-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Approval Status
            </th>
            <th className="p-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Publish Status
            </th>
            <th className="p-4 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr
              key={service.id}
              className={cn(
                "border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors text-[#454545]",
                selectedIds.includes(service.id) && "bg-primary/5",
              )}
            >
              <td className="p-4">
                <input
                  type="checkbox"
                  checked={isSelected(service.id)}
                  onChange={() => onSelectToggle(service.id)}
                  className="size-4 rounded border-input text-primary focus:ring-primary"
                  aria-label={`Select ${service.title}`}
                />
              </td>
              <td className="p-4">
                <span className="text-sm">{service.title}</span>
              </td>
              <td className="p-4 text-center">
                <span className="text-sm">{service.price}</span>
              </td>
              <td className="p-4 text-center">
                <span className="text-sm">
                  {service.purchases.toLocaleString()}
                </span>
              </td>
              <td className="p-4 text-center">
                <span className="text-sm">{service.duration}</span>
              </td>
              <td className="p-4 text-center">
                <StatusBadge status={service.approvalStatus} />
              </td>
              <td className="p-4 text-center">
                <StatusBadge status={service.publishStatus} />
              </td>
              <td className="p-4 text-center">
                <button
                  className="p-1 hover:text-foreground transition-colors"
                  aria-label={`More actions for ${service.title}`}
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
