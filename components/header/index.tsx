'use client';

import React, { useEffect, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

import styles from './index.module.scss';

import Link from 'next/link';
import Image from 'next/image';
import { Button, Catalog, Input, Dropdown, Loader } from '../../components';

import { FiShoppingCart, FiHeart, FiSettings, FiSearch, FiX } from 'react-icons/fi';
import { Logo } from '@/public/icons';

import { closeCatalog, openCatalog } from '@/features/catalog/catalogSlice';
import { fetchCartItems } from '@/features/instruments/instrumentsSlice';
import { fetchCurrentUser } from '@/features/user/userSlice';

import { searchInstruments } from '@/services/instruments/instrumentService';

import { ButtonOptions, InputTypes, InstrumentI } from '@/types';
import { RootState, AppDispatch } from '@/app/store';

const Header: React.FC = () => {
  const [query, setQuery] = React.useState('');
  const [filteredItems, setFilteredItems] = React.useState<InstrumentI[]>([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const { user, loading } = useSelector((state: RootState) => state.user);

  const pathname = usePathname();
  const dispatch: AppDispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.instruments.cartItems);
  const isCatalogOpened = useSelector((state: RootState) => state.catalog.isCatalogOpen);

  const isAuthorized = typeof window !== 'undefined' && !!localStorage.getItem('token');

  const getActiveIcon = (href: string) => (pathname === href ? styles.active : '');

  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchCurrentUser());
      dispatch(fetchCartItems());
    } else {
      const storedCartItems = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
      setCartItemsCount(storedCartItems.length);
    }
  }, [dispatch, isAuthorized]);

  useEffect(() => {
    const handleCartUpdated = () => {
      const updatedCartItems = JSON.parse(sessionStorage.getItem('cartItems') || '[]');
      setCartItemsCount(updatedCartItems.length);

      if (isAuthorized) {
        dispatch(fetchCartItems());
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdated);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdated);
    };
  }, [dispatch, isAuthorized]);

  useEffect(() => {
    if (isAuthorized) {
      setCartItemsCount(cartItems.length);
    }
  }, [cartItems, isAuthorized]);

  const handleOpenCatalog = () => dispatch(openCatalog());
  const handleCloseCatalog = () => dispatch(closeCatalog());

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
      console.error(`Search failed: ${error}`);
    }
  };

  const handleCloseSearchMenu = () => {
    setQuery('');
  };

  const displayedCartItemsCount = isAuthorized && cartItems ? cartItems.length : cartItemsCount;

  return (
    <>
      <header className={styles.header}>
        <Link href='/' onClick={handleCloseCatalog}>
          <Image className={styles.logo} src={Logo} alt='Musify' width={40} height={40} priority/>
        </Link>

        <ul className={styles.headerActionData}>
          <Button className={styles.buttonCatalog} onClick={isCatalogOpened ? handleCloseCatalog : handleOpenCatalog}>
            {isCatalogOpened ?
              <FiX size={24} /> : (
                <>
                  <div className={styles.menuLine} />
                  <div className={styles.menuLine} />
                  <div className={styles.menuLine} />
                </>
              )}
          </Button>

          <div className={styles.searchContainer}>
            <Input
              className={styles.search}
              placeholder='Find on Musify'
              type={InputTypes._TEXT}
              icon={<FiSearch size={24} />}
              onChange={handleSearch}
            />

            {query && (
              <div className={styles.searchList}>
                {filteredItems.length ? (
                  filteredItems.map(({ name, section, instrumentType, _id }) => (
                    <div key={_id} className={styles.searchListItem}>
                      <Link
                        className={styles.searchItemLink}
                        href={`/shop/${section}/${instrumentType}/${_id}`}
                        onClick={handleCloseSearchMenu}
                      >
                        {name}
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className={styles.searchListItem}>No items found</div>
                )}
              </div>
            )}
          </div>

          <Link href='/shop' className={styles.linkShop}>
            Shop
          </Link>
        </ul>

        {user && (
          <div className={styles.icons}>
            <div className={styles.profileContainer}>
              <Link href='/profile' className={`${styles.icon} ${getActiveIcon('/profile')}`}>
                <FiSettings size={24} />
              </Link>

              <Dropdown className={styles.dropdown} />
            </div>

            <Link href='/liked' className={`${styles.icon} ${getActiveIcon('/liked')}`}>
              <FiHeart size={24} />
            </Link>

            <div className={styles.cartContainer}>
              <span className={styles.cartAmount}>{displayedCartItemsCount}</span>

              <Link href='/cart' className={`${styles.icon} ${getActiveIcon('/cart')}`}>
                <FiShoppingCart size={24} />
              </Link>
            </div>
          </div>
        )}

        {!user && !loading && (
          <div className={styles.icons}>
            <Link href='/sign-in'>
              <Button option={ButtonOptions._OUTILINE}>Sign in</Button>
            </Link>

            <div className={styles.cartContainer}>
              <span className={styles.cartAmount}>{displayedCartItemsCount}</span>
              <Link href='/cart' className={`${styles.icon} ${getActiveIcon('/cart')}`}>
                <FiShoppingCart size={24} />
              </Link>
            </div>
          </div>
        )}

        {loading && <Loader />}
      </header>

      {isCatalogOpened && <Catalog />}
    </>
  );
};

export default memo(Header);
