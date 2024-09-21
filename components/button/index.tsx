import React from "react";

import styles from "./index.module.scss";

import { ButtonOptions, ButtonTypes } from "@/types";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: ButtonTypes;
  disabled?: boolean;
  option?: ButtonOptions;
  children: React.ReactNode;
}

const getButtonOptionClass = (option: string) => {
  const optionClass =
    option === "outline"
      ? styles.outline
      : option === "google"
      ? styles.google
      : styles.filled;

  return optionClass;
};

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  className,
  onClick,
  disabled,
  option = ButtonOptions.FILLED,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`${styles.button} ${getButtonOptionClass(
        option
      )} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
