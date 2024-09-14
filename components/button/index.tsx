import React from "react";

import styles from "./index.module.scss";

import Image from "next/image";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: any;
  className?: string;
  type?: "submit" | "reset";
  option?: "outline" | "filled" | "google";
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  className,
  onClick,
  option = "filled",
}) => {
  const optionClass =
    option === "outline"
      ? styles.outline
      : option === "google"
      ? styles.google
      : styles.filled;

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${styles.button} ${optionClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
