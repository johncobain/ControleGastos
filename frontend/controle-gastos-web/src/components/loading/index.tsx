import "./styles.css";

interface LoadingProps {
  message?: string;
}

const Loading = ({
  message = "Carregando..."
}: LoadingProps) => {
  return (
    <div className="flex-column align-center gap-md pd-lg">
      <div className="loading-spinner"/>
      <span>{message}</span>
    </div>
  );
}

export default Loading;