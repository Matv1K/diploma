import React from 'react';

import styles from './page.module.scss';

const NotFound: React.FC = () => (
  <main className={styles.mainNotFound}>
    <h1>404 - Page Not Found</h1>

    <p className={styles.textNotFound}>
      Sorry, the page you are looking for does not exist
    </p>
  </main>
);

export default NotFound;
