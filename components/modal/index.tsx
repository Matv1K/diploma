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
  className?: string;
  setIsModalOpened?: any;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  heading,
  children,
  buttonName,
  onButtonClick,
  className,
  setIsModalOpened,
}) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
    setIsModalOpened(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${className}`}>
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
      </div>
    </div>
  );
};

export default Modal;
