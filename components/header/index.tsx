"use client";

import React, { use, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { usePathname } from "next/navigation";

import styles from "./index.module.scss";

import Link from "next/link";
import Image from "next/image";

import { Button, Catalog, Input } from "../../components";

import { Cart, Heart, Logo, Search, Close, Settings } from "@/public/icons";

import { closeCatalog, openCatalog } from "@/features/catalog/catalogSlice";

import { HEADER_LINKS } from "@/constants";

const Header: React.FC = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(true);

  const isCatalogOpened = useSelector(
    (state: any) => state.catalog.isCatalogOpen
  );

  const dispatch = useDispatch();
  const pathname = usePathname();

  const handleOpenCatalog = () => {
    dispatch(openCatalog());
  };

  const handleCloseCatalog = () => {
    dispatch(closeCatalog());
  };

  return (
    <>
      <header className={styles.header}>
        <Link href="/" onClick={handleCloseCatalog}>
          <Image src={Logo} alt="Logo" width={40} height={40} />
        </Link>

        <ul className={styles.list}>
          <Button
            className={styles.buttonCatalog}
            onClick={isCatalogOpened ? handleCloseCatalog : handleOpenCatalog}
          >
            {isCatalogOpened ? (
              <Image src={Close} alt="Close" width={24} height={24} />
            ) : (
              <>
                <div className={styles.lines}>
                  <div className={styles.line}></div>
                  <div className={styles.line}></div>
                  <div className={styles.line}></div>
                </div>

                {/* <span>Catalog</span> */}
              </>
            )}
          </Button>

          <Input
            className={styles.input}
            placeholder="Find on Musify"
            type="search"
            icon={Search}
          />

          <div className={styles.links}>
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
          </div>
        </ul>

        <div>
          {isUserSignedIn ? (
            <div className={styles.icons}>
              <div>
                <Link href="/profile">
                  <Image src={Settings} alt="profile" width={24} height={24} />
                </Link>
              </div>

              <div>
                <Link href="/liked">
                  <Image src={Heart} alt="liked" width={24} height={24} />
                </Link>
              </div>

              <div className={styles.linkContainer}>
                <span className={styles.cartAmount}>0</span>
                <Link href="/cart">
                  <Image
                    className={styles.cartImage}
                    src={Cart}
                    alt="cart"
                    width={24}
                    height={24}
                  />
                </Link>
              </div>
            </div>
          ) : (
            <Link href="/sign-in">
              <Button>Sign in</Button>
            </Link>
          )}
        </div>
      </header>

      {isCatalogOpened && <Catalog closeCatalog={closeCatalog} />}
    </>
  );
};

export default Header;
