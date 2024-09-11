import React from "react";

import styles from "./index.module.scss";

import { Input } from "../../components";

import Image from "next/image";

import { Close, Send } from "@/public/icons";

interface SupportModalProps {
  setIsModalOpened: any;
}

const SupportModal: React.FC<SupportModalProps> = ({ setIsModalOpened }) => {
  const handleCloseModal = () => {
    setIsModalOpened(false);
  };

  const handleIconClick = () => {
    console.log("message sent");
  };

  return (
    <div className={styles.supportModal}>
      <form className={styles.form}>
        <div className={styles.frame}>
          <Image
            onClick={handleCloseModal}
            src={Close}
            alt="close"
            width={24}
            height={24}
            className={styles.close}
          />
        </div>

        <div className={styles.fieldset}>
          <Input
            className={styles.input}
            type="text"
            placeholder="Ask your question"
            handleIconClick={handleIconClick}
            buttonIcon={Send}
          />
        </div>
      </form>
    </div>
  );
};

export default SupportModal;
