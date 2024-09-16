"use client";

import React from "react";

import { useRouter } from "next/navigation";

import styles from "./index.module.scss";

import Link from "next/link";

import { Button } from "../../components";

import { logOut } from "@/services/users/userService";

interface DropdownProps {
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ className }) => {
  const { push } = useRouter();

  const handleLogOut = async () => {
    try {
      await logOut();

      push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${styles.dropdownMenu} ${className}`}>
      <div className={styles.dropdownLinks}>
        <Link href="/profile/orders" className={styles.dropdownLink}>
          Orders
        </Link>

        <Link href="/profile/settings" className={styles.dropdownLink}>
          Settings
        </Link>
      </div>

      <Button onClick={handleLogOut}>Sign out</Button>
    </div>
  );
};

export default Dropdown;
