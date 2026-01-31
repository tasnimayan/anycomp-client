interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
        {title}
      </h1>
      <p className="text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
};
