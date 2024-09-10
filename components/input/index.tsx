import React from "react";

import styles from "./index.module.scss";

import Image from "next/image";

import { Search } from "@/public/icons";

interface InputProps {
  placeholder?: string;
  className?: string;
  id?: string;
  name?: string;
  onChange?: () => void;
  type: "text" | "email" | "password" | "search";
  title?: string;
  withIcon?: boolean;
  icon?: any;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  onChange,
  type,
  className,
  id,
  name,
  title,
  withIcon,
  icon,
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
      />

      {withIcon && (
        <Image
          className={styles.search}
          src={icon}
          alt=""
          width={24}
          height={24}
        />
      )}
    </div>
  );
};

export default Input;
