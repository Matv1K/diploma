import React from 'react';

import styles from './index.module.scss';

import { InputTypes } from '@/types';

interface InputProps {
  placeholder?: string;
  className?: string;
  id?: string;
  name?: string;
  onChange?: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  type: InputTypes;
  title?: string;
  icon?: React.ReactNode;
  handleIconClick?: () => void;
  value?: string;
  required?: boolean;
  autoComplete?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
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
}, ref) => (
  <div className={styles.inputWrapper}>
    <input
      ref={ref}
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
      <span className={styles.icon} onClick={handleIconClick}>
        {icon}
      </span>
    )}
  </div>
));

Input.displayName = 'Input';

export default Input;
