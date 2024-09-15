import React from "react";

import styles from "./index.module.scss";

import Image from "next/image";

import { StaticImageData } from "next/image";

import { InputTypes } from "@/types";

interface InputProps {
  placeholder?: string;
  className?: string;
  id?: string;
  name?: string;
  onChange?: any;
  type: InputTypes;
  title?: string;
  icon?: StaticImageData;
  handleIconClick?: () => void;
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
  value,
  required,
  autoComplete,
}) => {
  return (
    <div className={styles.inputWrapper}>
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
          className={styles.icon}
          src={icon}
          alt=""
          width={24}
          height={24}
          onClick={handleIconClick}
        />
      )}
    </div>
  );
};

export default Input;
