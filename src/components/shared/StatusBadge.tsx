import { cn } from "@/lib/utils";

export type ApprovalStatus = "approved" | "under-review" | "rejected";
export type PublishStatus = "published" | "not-published";

interface StatusBadgeProps {
  status: ApprovalStatus | PublishStatus;
  className?: string;
}

const statusConfig = {
  approved: {
    label: "Approved",
    className: "bg-success/40 text-success",
  },
  "under-review": {
    label: "Under-Review",
    className: "bg-[#61e7da]/40 text-[#00AC95]",
  },
  rejected: {
    label: "Rejected",
    className: "bg-destructive/40 text-destructive",
  },
  published: {
    label: "Published",
    className: "bg-success text-success-foreground",
  },
  "not-published": {
    label: "Not Published",
    className: "bg-destructive text-destructive-foreground",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-2.5 py-0.5 text-xs font-medium rounded-sm whitespace-nowrap",
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
