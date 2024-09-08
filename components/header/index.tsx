import React from "react";

import styles from "./index.module.scss";

import Link from "next/link";

import { Button } from "..";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <ul className={styles.list}>
        <Link className={styles.item} href="/">
          Home
        </Link>
        <Link className={styles.item} href="/shop">
          Shop
        </Link>
        <Link className={styles.item} href="/about">
          About
        </Link>
      </ul>

      <div>
        <Link href="/sign-in">
          <Button>Sign in</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
