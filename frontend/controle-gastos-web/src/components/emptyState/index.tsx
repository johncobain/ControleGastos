import "./styles.css";

interface EmptyStateProps {
  title: string;
  description?: string;
}

const EmptyState = ({
  title,
  description,
}: EmptyStateProps) => {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
};

export default EmptyState;