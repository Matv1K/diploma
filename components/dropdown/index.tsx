"use client";

import React from "react";
import { useRouter } from "next/navigation";

import styles from "./index.module.scss";

import Link from "next/link";
import { Button } from "../../components";

import useCurrentUser from "@/hooks/useCurrentUser";

import { logOut } from "@/services/users/userService";

interface DropdownProps {
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ className }) => {
  const { user } = useCurrentUser();

  const { push } = useRouter();

  const handleLogOut = async () => {
    try {
      await logOut();

      push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${styles.dropdownMenu} ${className}`}>
      <div className={styles.dropdownHeader}>
        <h4>
          {user?.name} {user?.lastName}
        </h4>

        <p className={styles.dropdownNumber}>
          {user?.phoneNumber !== 0 && user?.phoneNumber}
        </p>
      </div>

      <div className={styles.dropdownLinks}>
        <Link href="/profile" className={styles.dropdownLink}>
          My profile
        </Link>

        <Link href="/profile/orders" className={styles.dropdownLink}>
          Order history
        </Link>
      </div>

      <Button onClick={handleLogOut}>Sign out</Button>
    </div>
  );
};

export default Dropdown;
