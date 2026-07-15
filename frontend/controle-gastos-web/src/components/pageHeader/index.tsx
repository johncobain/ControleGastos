import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

const PageHeader = ({ 
  title, 
  subtitle, 
  actions 
}: PageHeaderProps) => {
  return (
    <header className="flex justify-between align-center gap-lg">
      <div className="flex-column gap-xs">
        <h1>{title}</h1>
        {subtitle && <span className="text-secondary">{subtitle}</span>}
      </div>
      <div className="flex gap-md">
        {actions}
      </div>
    </header>
  );
}

export default PageHeader;