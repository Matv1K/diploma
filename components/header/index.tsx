"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";

import styles from "./index.module.scss";

import Link from "next/link";
import Image from "next/image";

import { Button, Catalog, Input, Dropdown } from "../../components";

import { Logo, Search, Close } from "@/public/icons";
import { FiShoppingCart, FiHeart, FiSettings } from "react-icons/fi";

import useCurrentUser from "@/hooks/useCurrentUser";

import { getCartItems } from "@/services/cartService.ts/cartService";

import { closeCatalog, openCatalog } from "@/features/catalog/catalogSlice";

import { ButtonOptions, InputTypes } from "@/types";

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
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState<any>([]);

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
            alt="Musify"
            width={40}
            height={40}
          />
        </Link>

        <ul className={styles.headerActionData}>
          <Button
            className={styles.buttonCatalog}
            onClick={isCatalogOpened ? handleCloseCatalog : handleOpenCatalog}
          >
            {isCatalogOpened ? (
              <Image src={Close} alt="Close" width={24} height={24} />
            ) : (
              <div>
                <div className={styles.menuLine}></div>
                <div className={styles.menuLine}></div>
                <div className={styles.menuLine}></div>
              </div>
            )}
          </Button>

          <div className={styles.searchContainer}>
            <Input
              className={styles.search}
              placeholder="Find on Musify"
              type={InputTypes.TEXT}
              icon={Search}
              onChange={handleSearch}
            />

            {query && (
              <div className={styles.searchList}>
                {filteredItems.map(({ name }: any) => {
                  return <div className={styles.searchListItem}>{name}</div>;
                })}
              </div>
            )}
          </div>

          <Link href="/shop" className={styles.linkShop}>
            Shop
          </Link>
        </ul>

        <div>
          {user ? (
            <div className={styles.icons}>
              <div className={styles.profileContainer}>
                <Link href="/profile" className={styles.icon}>
                  <FiSettings size={24} />
                </Link>

                <Dropdown className={styles.dropdown} />
              </div>

              <div>
                <Link href="/liked" className={styles.icon}>
                  <FiHeart size={24} />
                </Link>
              </div>

              <div className={styles.cartContainer}>
                <span className={styles.cartAmount}>{items.length}</span>

                <Link href="/cart" className={styles.icon}>
                  <FiShoppingCart size={24} />
                </Link>
              </div>
            </div>
          ) : (
            <Link href="/sign-in">
              <Button option={ButtonOptions.OUTILINE}>Sign in</Button>
            </Link>
          )}
        </div>
      </header>

      {isCatalogOpened && <Catalog closeCatalog={closeCatalog} />}
    </>
  );
};

export default Header;
