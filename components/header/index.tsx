"use client";

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { FiShoppingCart, FiHeart, FiSettings } from "react-icons/fi";

import { usePathname } from "next/navigation";

import styles from "./index.module.scss";

import Link from "next/link";
import Image from "next/image";

import { Button, Catalog, Input } from "../../components";

import { Cart, Heart, Logo, Search, Close, Settings } from "@/public/icons";

import { getCartItems } from "@/services/cartService.ts/cartService";

import useCurrentUser from "@/hooks/useCurrentUser";

import { closeCatalog, openCatalog } from "@/features/catalog/catalogSlice";

import { HEADER_LINKS } from "@/app/constants";

const INSTRUMENTS = [
  { name: "Cort 1" },
  { name: "we 2" },
  { name: "qwe 3" },
  { name: "asd 4" },
  { name: "Cort 5" },
  { name: "Cort 6" },
  { name: "Cort 7" },
];

const Header: React.FC = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<any>([]);

  if (query.length >= 2) {
  }

  const { user, loading } = useCurrentUser();

  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getCartItems();

      setItems(items);
    };

    setTimeout(() => {
      fetchCartItems();
    }, 1500);
  }, []);

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

  const handleSearch = (e: any) => {
    setQuery(e.target.value);

    const filtered = INSTRUMENTS.filter((instrument) =>
      instrument.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredItems(filtered);
  };

  return (
    <>
      <header className={styles.header}>
        <Link href="/" onClick={handleCloseCatalog}>
          <Image
            className={styles.logo}
            src={Logo}
            alt="Logo"
            width={40}
            height={40}
          />
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
              </>
            )}
          </Button>

          <div className={styles.inputContainer}>
            <Input
              className={styles.input}
              placeholder="Find on Musify"
              type="search"
              icon={Search}
              onChange={handleSearch}
            />
            {query ? (
              <div className={styles.helperList}>
                {filteredItems.map(({ name }: any) => {
                  return <div className={styles.helperListItem}>{name}</div>;
                })}
              </div>
            ) : (
              ""
            )}
          </div>

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
          {user ? (
            <div className={styles.icons}>
              <div>
                <Link href="/profile" className={styles.icon}>
                  <FiSettings size={24} />
                </Link>
              </div>

              <div>
                <Link href="/liked" className={styles.icon}>
                  <FiHeart size={24} />
                </Link>
              </div>

              <div className={styles.linkContainer}>
                <span className={styles.cartAmount}>{items.length}</span>
                <Link href="/cart" className={styles.icon}>
                  <FiShoppingCart size={24} />
                </Link>
              </div>
            </div>
          ) : (
            <Link href="/sign-in">
              <Button option="outline">Sign in</Button>
            </Link>
          )}
        </div>
      </header>

      {isCatalogOpened && <Catalog closeCatalog={closeCatalog} />}
    </>
  );
};

export default Header;
