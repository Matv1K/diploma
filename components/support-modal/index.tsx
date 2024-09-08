import React from "react";

import styles from "./index.module.scss";

import { Input } from "../../components";

const SupportModal: React.FC = () => {
  return (
    <div className={styles.supportModal}>
      <h3>support modal</h3>

      <Input type="text" placeholder="Ask your question" />
    </div>
  );
};

export default SupportModal;
