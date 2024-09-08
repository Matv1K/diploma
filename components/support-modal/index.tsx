import React, { useState } from "react";

import styles from "./index.module.scss";

import { Input, Button } from "../../components";

const SupportModal: React.FC = () => {
  return (
    <div className={styles.supportModal}>
      <form className={styles.form}>
        <div className={styles.frame}>
          <span className={styles.exit}>&#10006;</span>
        </div>

        <div className={styles.fieldset}>
          <Input
            className={styles.input}
            type="text"
            placeholder="Ask your question"
          />

          <Button className={styles.button} type="submit">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SupportModal;
