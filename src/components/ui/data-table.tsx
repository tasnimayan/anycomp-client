// components/data-table/DataTableColumn.ts
import { type ReactNode } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { DataTableSkeleton } from "../feedback/Loader";
import { TablePagination } from "./table-pagination";
import type { PaginationState } from "@/hooks/usePaginationState";

export interface DataTableColumn<TData> {
  key: string;
  header: ReactNode;
  width?: string;
  align?: "left" | "center" | "right";

  /**
   * Accessor value from row
   * Example: row.trackingCode
   */
  accessor?: (row: TData) => ReactNode;

  // Fully custom cell renderer
  cell?: (row: TData) => ReactNode;
}

interface DataTableProps<TData> {
  data: TData[];
  columns: DataTableColumn<TData>[];

  // Row identity (required for selection)
  rowId?: (row: TData) => string;

  loading?: boolean;
  stickyHeader?: boolean;

  pagination?: PaginationState & {
    total: number;
  };
  // Selection (optional)
  selectable?: boolean;
  selectedIds?: string[];
  onToggleRow?: (id: string) => void;
  onToggleAll?: (checked: boolean) => void;

  // States
  emptyState?: ReactNode;

  // Styling
  rowClassName?: (row: TData) => string;
}

export function DataTable<TData>({
  data,
  columns,
  rowId,
  loading = false,
  selectable = false,
  selectedIds = [],
  onToggleRow,
  onToggleAll,
  stickyHeader = false,
  emptyState,
  pagination,
  rowClassName,
}: DataTableProps<TData>) {
  const isAllSelected = selectable && data.length > 0 && selectedIds.length === data.length;

  if (loading) {
    return <DataTableSkeleton columns={columns.length} selectable={selectable} />;
  }

  if (!data || data.length === 0) {
    return <>{emptyState}</>;
  }

  return (
    <>
      <div className="relative overflow-auto">
        <Table>
          <TableHeader className={cn(stickyHeader && "sticky top-0 z-10 bg-background shadow-sm")}>
            <TableRow className="bg-muted/50">
              {selectable && (
                <TableHead className="w-12">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={(v) => onToggleAll?.(!!v)}
                    aria-label="Select all rows"
                  />
                </TableHead>
              )}

              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={cn(
                    col.width,
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right",
                  )}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((row, index) => {
              const id = rowId?.(row);

              return (
                <TableRow key={id ?? index} className={cn("hover:bg-muted/30", rowClassName?.(row))}>
                  {selectable && id && (
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(id)}
                        onCheckedChange={() => onToggleRow?.(id)}
                        aria-label="Select row"
                      />
                    </TableCell>
                  )}

                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className={cn(col.align === "center" && "text-center", col.align === "right" && "text-right")}
                    >
                      {col.cell ? col.cell(row) : col.accessor ? col.accessor(row) : null}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <TablePagination
          currentPage={pagination.currentPage}
          totalItems={pagination.total}
          itemsPerPage={pagination.itemsPerPage}
          onPageChange={pagination.onPageChange}
          onItemsPerPageChange={pagination.onLimitChange}
        />
      )}
    </>
  );
}
