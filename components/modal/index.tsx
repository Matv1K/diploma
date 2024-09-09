import React from "react";

import styles from "./index.module.scss";

import { Button } from "../../components";

import { Close } from "@/public/icons";

import Image from "next/image";

interface ModalProps {
  heading?: string;
  buttonName?: string;
  onButtonClick?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  heading,
  children,
  buttonName,
  onButtonClick,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Image
          className={styles.close}
          src={Close}
          alt="close"
          width={24}
          height={24}
        />

        <h2 className={styles.modalHeading}>{heading}</h2>

        <div className={styles.modalContent}>{children}</div>

        {buttonName && (
          <Button className={styles.button} onClick={onButtonClick}>
            {buttonName}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Modal;
