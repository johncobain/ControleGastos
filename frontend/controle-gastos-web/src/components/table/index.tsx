import type { PropsWithChildren } from "react";

import "./styles.css";

interface TableProps extends PropsWithChildren {
  className?: string;
}

export default function Table({
  children,
  className = "",
}: TableProps) {
  return (
    <div className="table-container">
      <table className={`table ${className}`}>
        {children}
      </table>
    </div>
  );
}