import type { ButtonHTMLAttributes } from "react";
import "./styles.css";

type ButtonVariant = "primary" | "success" | "warning" | "info" | "error";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  loading = false,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button className={`button button-${variant} ${className}`} {...props} disabled={loading || props.disabled}>
      {children}
    </button>
  );
}

export default Button;