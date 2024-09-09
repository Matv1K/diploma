import React from "react";

import styles from "./index.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: any;
  className?: string;
  type?: "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
