export function BreadCrumb({ breadcrumb }: { breadcrumb: string[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center text-xs text-muted-foreground">
        {breadcrumb.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-1">/</span>}
            <span
              className={index === breadcrumb.length - 1 ? " font-medium" : ""}
            >
              {item}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
