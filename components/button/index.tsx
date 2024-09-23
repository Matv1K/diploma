import React from 'react';

import styles from './index.module.scss';

import { ButtonOptions, ButtonTypes } from '@/types';

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: ButtonTypes;
  disabled?: boolean;
  option?: ButtonOptions;
  children: React.ReactNode;
}

const getButtonOptionClass = (option: string) => {
  if (option === ButtonOptions._OUTILINE) {
    return styles.outline;
  }

  if (option === ButtonOptions._GOOGLE) {
    return styles.google;
  }

  return styles.filled;
};

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  className,
  onClick,
  disabled,
  option = ButtonOptions._FILLED,
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    type={type}
    className={`${styles.button} ${getButtonOptionClass(option)} ${className}`}
  >
    {children}
  </button>
);

export default Button;
