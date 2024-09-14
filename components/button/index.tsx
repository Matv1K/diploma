import React from "react";

import styles from "./index.module.scss";

import Image from "next/image";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: any;
  className?: string;
  type?: "submit" | "reset";
  icon?: any;
  option?: "outline" | "filled" | "google";
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  className,
  onClick,
  icon,
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
      {icon && <Image width={24} height={24} src={icon} alt="icon" />}
      {children}
    </button>
  );
};

export default Button;
