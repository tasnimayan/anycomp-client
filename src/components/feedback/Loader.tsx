import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTableSkeletonProps {
  columns: number;
  rows?: number;
  selectable?: boolean;
}

export const DataTableSkeleton = ({ columns, rows = 5, selectable = false }: DataTableSkeletonProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {selectable && <TableCell className="w-12" />}
          {Array.from({ length: columns }).map((_, i) => (
            <TableCell key={i}>
              <Skeleton className="h-4 w-24" />
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {selectable && (
              <TableCell>
                <Skeleton className="h-4 w-4 rounded" />
              </TableCell>
            )}
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
