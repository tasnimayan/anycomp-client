import { StateLayout } from "./StateLayout";
import { Package } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No data found",
  description = "There is no data available for this section yet.",
  action,
}) => {
  return <StateLayout title={title} description={description} icon={<Package className="h-6 w-6" />} action={action} />;
};
