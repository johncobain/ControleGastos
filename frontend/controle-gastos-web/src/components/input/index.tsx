import type { InputHTMLAttributes } from "react";
import "./styles.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id: string;
  className?: string;
}

const Input = ({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) => {
  return (
    <div className="flex-column gap-sm">
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      <input 
        id={id}
        className={`input ${error ? "input-error" : ""} ${className}`}
        {...props}
      />

      {error && (
        <span className="input-error-message">
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;