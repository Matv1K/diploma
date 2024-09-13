import React from "react";

import styles from "./index.module.scss";

import Image from "next/image";

import { Button } from "../../components";

interface InputProps {
  placeholder?: string;
  className?: string;
  id?: string;
  name?: string;
  onChange?: any;
  type: "text" | "email" | "password" | "search";
  title?: string;
  icon?: any;
  handleIconClick?: () => void;
  buttonIcon?: any;
  buttonText?: string;
  value?: string;
  required?: boolean;
  autoComplete?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  onChange,
  type,
  className,
  id,
  name,
  title,
  icon,
  handleIconClick,
  buttonIcon,
  buttonText,
  value,
  required,
  autoComplete,
}) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={`${styles.input} ${className}`}
        name={name}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        title={title}
        value={value}
        required={required}
        autoComplete={autoComplete}
      />

      {icon && (
        <Image
          className={styles.search}
          src={icon}
          alt=""
          width={24}
          height={24}
          onClick={handleIconClick}
        />
      )}

      {buttonIcon && (
        <Button className={styles.buttonIcon} icon={buttonIcon}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default Input;
