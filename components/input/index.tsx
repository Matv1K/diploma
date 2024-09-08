import React from "react";

import styles from "./index.module.scss";

interface InputProps {
  placeholder?: string;
  className?: string;
  id?: string;
  name?: string;
  onChange?: () => void;
  type: "text" | "email" | "password";
  title?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  onChange,
  type,
  className,
  id,
  name,
  title,
}) => {
  return (
    <input
      className={`${styles.input} ${className}`}
      name={name}
      id={id}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      title={title}
    />
  );
};

export default Input;
