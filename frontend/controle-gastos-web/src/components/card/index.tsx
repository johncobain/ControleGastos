import type { PropsWithChildren } from "react";

import "./styles.css";

interface CardProps extends PropsWithChildren{
  className?: string;
}

const Card = ({
  children, 
  className = "" 
}: CardProps) => {
  return (
    <section className={`card ${className}`}>
      {children}
    </section>
  );
}

export default Card;