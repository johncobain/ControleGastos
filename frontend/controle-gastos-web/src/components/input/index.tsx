import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import "./styles.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  options?: never;
  error?: string;
  id: string;
  className?: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  id: string;
  className?: string;
}

const Input = ({
  label,
  options,
  error,
  id,
  className = "",
  ...props
}: InputProps | SelectProps) => {
  return (
    <div className="flex-column gap-sm">
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      {options ? (
        <select
          id={id}
          className={`input ${error ? "input-error" : ""} ${className}`}
          {...(props as Omit<SelectProps, "id">)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input 
          id={id}
          className={`input ${error ? "input-error" : ""} ${className}`}
          {...(props as Omit<InputProps, "id">)}
        />
      )}
      {error && (
        <span className="input-error-message">
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;