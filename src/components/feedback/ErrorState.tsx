// components/state/ErrorState.tsx
import { StateLayout } from "./StateLayout";
import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  description = "We couldn’t load the data. Please try again.",
  onRetry,
}) => {
  return (
    <StateLayout
      title={title}
      description={description}
      icon={<AlertTriangle className="h-6 w-6 text-red-600" />}
      action={
        onRetry && (
          <button
            onClick={onRetry}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Retry
          </button>
        )
      }
    />
  );
};
