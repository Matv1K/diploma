"use client";

import React from "react";

import { usePathname } from "next/navigation";

import styles from "./index.module.scss";

import Link from "next/link";

import { Button } from "../../components";

import { HEADER_LINKS } from "@/constants";

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <h5 color={styles.logo}>Music Zone</h5>

      <ul className={styles.list}>
        {HEADER_LINKS.map(({ name, href }) => {
          return (
            <Link
              key={name}
              className={`${styles.item} ${
                pathname === href && styles.itemActive
              }`}
              href={href}
            >
              {name}
            </Link>
          );
        })}
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
