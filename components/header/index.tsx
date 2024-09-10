"use client";

import React, { useState } from "react";

import { usePathname } from "next/navigation";

import styles from "./index.module.scss";

import Link from "next/link";
import Image from "next/image";

import { Button, Input } from "../../components";

import { Cart, Logo } from "@/public/icons";

import { HEADER_LINKS } from "@/constants";

const Header: React.FC = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  const pathname = usePathname();

  const handleOpenCatalog = () => {
    console.log("open catalog");
  };

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src={Logo} alt="Logo" width={40} height={40} />
      </Link>

      <ul className={styles.list}>
        <Button onClick={handleOpenCatalog} className={styles.buttonCatalog}>
          <div className={styles.lines}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>

          <span>Catalog</span>
        </Button>

        <Input
          className={styles.input}
          placeholder="Find on Musify"
          type="search"
        />

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
