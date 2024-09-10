import React from "react";

import styles from "./page.module.scss";

const Liked: React.FC = () => {
  return (
    <main>
      <h2>Liked Items</h2>

      <h5 className={styles.empty}>You did not like anything yet</h5>
    </main>
  );
};

export default Liked;
