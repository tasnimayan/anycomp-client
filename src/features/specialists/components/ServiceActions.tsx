import { CirclePlus, Download } from "lucide-react";

interface ServiceActionsProps {
  onCreateClick?: () => void;
  onExportClick?: () => void;
}

export function ServiceActions({
  onCreateClick,
  onExportClick,
}: ServiceActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onCreateClick}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-sm hover:bg-primary/90 transition-colors"
      >
        <CirclePlus className="h-4 w-4" />
        Create
      </button>
      <button
        onClick={onExportClick}
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#071331] border border-border text-primary-foreground text-sm font-medium rounded-sm hover:bg-[#071331]/80 transition-colors"
      >
        <Download className="h-4 w-4" />
        Export
      </button>
    </div>
  );
}
