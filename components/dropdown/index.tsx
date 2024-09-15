import React from "react";

import styles from "./index.module.scss";

import Link from "next/link";

import { Button } from "../../components";

interface DropdownProps {
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ className }) => {
  const handleLogOut = () => {
    console.log("log out");
  };

  return (
    <div className={`${styles.dropdownMenu} ${className}`}>
      <div className={styles.dropdownLinks}>
        <Link href="/orders" className={styles.dropdownLink}>
          Orders
        </Link>

        <Link href="/profile" className={styles.dropdownLink}>
          Profile
        </Link>

        <Link href="/settings" className={styles.dropdownLink}>
          Settings
        </Link>
      </div>

      <Button onClick={handleLogOut}>Sign out</Button>
    </div>
  );
};

export default Dropdown;
