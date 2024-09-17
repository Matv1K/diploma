"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";

import styles from "./index.module.scss";

import Link from "next/link";
import Image from "next/image";
import { Button, Catalog, Input, Dropdown } from "../../components";

import { Logo } from "@/public/icons";
import {
  FiShoppingCart,
  FiHeart,
  FiSettings,
  FiSearch,
  FiX,
} from "react-icons/fi";

import useCurrentUser from "@/hooks/useCurrentUser";

import { closeCatalog, openCatalog } from "@/features/catalog/catalogSlice";

import { getCartItems } from "@/services/cartService/cartService";
import { searchInstruments } from "@/services/instruments/instrumentService";

import { ButtonOptions, InputTypes } from "@/types";

const INSTRUMENTS = [
  { name: "Cort 1", id: 1 },
  { name: "we 2", id: 2 },
  { name: "qwe 3", id: 3 },
  { name: "asd 4", id: 4 },
  { name: "Cort 5", id: 5 },
  { name: "Cort 6", id: 6 },
  { name: "Cort 7", id: 7 },
];

const Header: React.FC = () => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState<any>([]);

  const { user, loading } = useCurrentUser();

  console.log(filteredItems);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems();
        setItems(items);
      } catch (error) {
        console.log(error);
      }
    };

    setTimeout(() => {
      fetchCartItems();
    }, 1000);
  }, []);

  const isCatalogOpened = useSelector(
    (state: any) => state.catalog.isCatalogOpen
  );

  const dispatch = useDispatch();
  const pathname = usePathname();

  const getActiveIcon = (href: string) => {
    if (pathname === href) {
      return styles.active;
    }

    return;
  };

  const handleOpenCatalog = () => {
    dispatch(openCatalog());
  };

  const handleCloseCatalog = () => {
    dispatch(closeCatalog());
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    if (!e.target.value) {
      setFilteredItems([]);
      return;
    }

    try {
      const result = await searchInstruments(e.target.value);
      setFilteredItems(result);
    } catch (error) {
      console.error("Search failed", error);
    }
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
              <FiX size={24} />
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
              icon={<FiSearch size={24} />}
              onChange={handleSearch}
            />

            {query && (
              <div className={styles.searchList}>
                {filteredItems.map(({ name, section, _id }: any) => {
                  return (
                    <div key={_id} className={styles.searchListItem}>
                      <Link
                        className={styles.searchItemLink}
                        href={`/shop/${section}/acoustic-guitars/${_id}`}
                      >
                        {name}
                      </Link>
                    </div>
                  );
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
                <Link
                  href="/profile"
                  className={`${styles.icon} ${getActiveIcon("/profile")}`}
                >
                  <FiSettings size={24} />
                </Link>

                <Dropdown className={styles.dropdown} />
              </div>

              <div>
                <Link
                  href="/liked"
                  className={`${styles.icon} ${getActiveIcon("/liked")}`}
                >
                  <FiHeart size={24} />
                </Link>
              </div>

              <div className={styles.cartContainer}>
                <span className={styles.cartAmount}>{items.length}</span>

                <Link
                  href="/cart"
                  className={`${styles.icon} ${getActiveIcon("/cart")}`}
                >
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
