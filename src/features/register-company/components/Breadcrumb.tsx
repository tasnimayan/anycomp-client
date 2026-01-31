import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isHome?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-muted-foreground mx-2" aria-hidden="true" />
          )}
          {item.href ? (
            <a
              href={item.href}
              className="breadcrumb-link flex items-center gap-1"
            >
              {item.isHome && <Home className="w-4 h-4" />}
              {!item.isHome && item.label}
            </a>
          ) : (
            <span className="text-foreground text-sm font-medium">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};
