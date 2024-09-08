import React from "react";

import styles from "./index.module.scss";

interface ButtonProps {
  children: any;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};

export default Button;
