import React from "react";

interface StateLayoutProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const StateLayout: React.FC<StateLayoutProps> = ({ title, description, icon, action }) => {
  return (
    <div
      role="status"
      className="flex min-h-[320px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center"
    >
      {icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-600">
          {icon}
        </div>
      )}

      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

      {description && <p className="mt-1 max-w-md text-sm text-gray-500">{description}</p>}

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
