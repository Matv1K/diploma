import React, { useState } from "react";

import styles from "./index.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <ul className={styles.list}>
        <li className={styles.item}>Page 1</li>
        <li className={styles.item}>Page 2</li>
        <li className={styles.item}>Page 3</li>
      </ul>

      <div>Logo</div>

      <div>
        <button>Sign in</button>
      </div>
    </header>
  );
};

export default Header;
