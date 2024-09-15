import React from "react";
import { useDispatch } from "react-redux";

import styles from "./index.module.scss";

import Image from "next/image";

import { Close } from "@/public/icons";

import { closeModal } from "@/features/modal/modalSlice";

interface ModalProps {
  heading?: string;
  buttonName?: string;
  onButtonClick?: () => void;
  className?: string;
  setIsModalOpened?: (isOpen: boolean) => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  heading,
  children,
  className,
  setIsModalOpened,
}) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());

    if (setIsModalOpened) {
      setIsModalOpened(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${className}`}>
        <Image
          className={styles.modalClose}
          src={Close}
          alt="close"
          width={24}
          height={24}
          onClick={handleCloseModal}
        />

        <h2 className={styles.modalHeading}>{heading}</h2>

        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
