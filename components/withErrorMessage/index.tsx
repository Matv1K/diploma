import React from 'react';

import styles from './index.module.scss';

interface WithErrorMessageProps {
    children: React.ReactNode;
    errorMessage: string;
}

const WithErrorMessage: React.FC<WithErrorMessageProps> = ({ children, errorMessage }) => (
  <div className={styles.container}>
    {children}
    <span>{errorMessage}</span>
  </div>
);

export default WithErrorMessage;
