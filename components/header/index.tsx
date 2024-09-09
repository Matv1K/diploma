"use client";

import React, { useState } from "react";

import { usePathname } from "next/navigation";

import styles from "./index.module.scss";

import Link from "next/link";
import Image from "next/image";

import { Button } from "../../components";

import { Cart } from "@/public/icons";

import { HEADER_LINKS } from "@/constants";

const Header: React.FC = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <h5 color={styles.logo}>Musify</h5>

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
        {isUserSignedIn ? (
          <Link href="/cart">
            <Image src={Cart} alt="cart" width={24} height={24} />
          </Link>
        ) : (
          <Link href="/sign-in">
            <Button>Sign in</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
