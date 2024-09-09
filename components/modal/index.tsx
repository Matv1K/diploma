import React from "react";

import styles from "./index.module.scss";

import { useDispatch } from "react-redux";

import Image from "next/image";

import { Button } from "../../components";

import { Close } from "@/public/icons";

import { closeModal } from "@/features/modal/modalSlice";

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
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Image
          className={styles.close}
          src={Close}
          alt="close"
          width={24}
          height={24}
          onClick={handleCloseModal}
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
