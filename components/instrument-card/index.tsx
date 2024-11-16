'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import styles from './index.module.scss';

import Image from 'next/image';
import { Button } from '@/components';

import { FiHeart } from 'react-icons/fi';

import { getRatingString } from '@/utils';

import { addItemToCart, likeItem, unlikeItem } from '@/features/instruments/instrumentsSlice';

import { addCartItem } from '@/api/cart/cartService';
import { getInstrumentRating } from '@/api/instruments/instrumentService';
import { getLikedItem } from '@/api/liked/likedService';

import { TOAST_MESSAGES } from '@/app/constants';

import { AppDispatch, RootState } from '@/app/store';
import { ApiError, CartItemWithLocalIdI } from '@/types';

interface InstrumentCardProps {
  isNew?: boolean;
  name: string;
  price: number;
  instrumentType: string;
  section: string;
  image: string;
  id: string;
  colors: string[];
  withLikeIcon?: boolean;
  liked?: boolean;
  brandName: string;
  salePrice: number;
  onSale: boolean;
}

const InstrumentCard: React.FC<InstrumentCardProps> = ({
  isNew,
  name,
  price,
  section,
  instrumentType,
  image,
  id,
  colors,
  withLikeIcon,
  liked = false,
  brandName,
  salePrice,
  onSale,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isLiked, setIsLiked] = useState(liked);
  const [averageRating, setAverageRating] = useState(0);

  const { user } = useSelector((state: RootState) => state.user);

  const { push } = useRouter();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const getAverageRating = async () => {
      const { averageRating } = await getInstrumentRating(id);

      if (user) {
        const likedItem = await getLikedItem(id);

        setIsLiked(!!likedItem);
      }

      setAverageRating(averageRating);
    };

    getAverageRating();
  }, [id]);

  const handleInstrumentNavigation = () => {
    push(`/shop/${section}/${instrumentType}/${id}`);
  };

  const handleLikeItem = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();

    if (user) {
      try {
        if (isLiked) {
          await dispatch(unlikeItem(id));

          toast.success(TOAST_MESSAGES.UNLIKE_ITEM_SUCCESS);
          setIsLiked(false);
        } else {
          await dispatch(likeItem({
            price,
            name,
            image,
            colors,
            brandName,
            instrumentId: id,
            section,
            instrumentType,
          }));

          toast.success(TOAST_MESSAGES.LIKE_ITEM_SUCCES);
          setIsLiked(true);
        }
      } catch (error) {
        toast.error(`Something went wrong: ${error}`);
      }
    } else {
      push('/sign-in');
    }
  };
  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const cartItemId = uuidv4();

    const newItem = {
      cartItemId,
      name,
      image,
      color: selectedColor,
      brandName,
      instrumentId: id,
      section,
      amount: 1,
      instrumentType,
      price,
    };

    try {
      if (user) {
        const addedItem = await addCartItem(newItem);

        dispatch(addItemToCart(addedItem));

        toast.success(TOAST_MESSAGES.ADD_TO_CART_SUCCESS);
      } else {
        const cartItems = JSON.parse(sessionStorage.getItem('cartItems') || '[]');

        if (!newItem.color) {
          toast.error('You have to choose a color');
          return;
        }

        if (cartItems.some((cartItem: CartItemWithLocalIdI) =>
          cartItem.instrumentId === newItem.instrumentId && cartItem.color === newItem.color) === true) {
          toast.error('Item is already in the cart');
          return;
        }

        cartItems.push(newItem);

        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));

        window.dispatchEvent(new Event('cartUpdated'));

        toast.success(TOAST_MESSAGES.ADD_TO_CART_SUCCESS);
      }
    } catch(error) {
      const apiError = error as ApiError;

      toast.error(apiError.response.data.message);
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value);
  };

  return (
    <div className={styles.instrument} onClick={handleInstrumentNavigation}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.instrumentImage}
          src={image}
          alt='instrument'
          width={200}
          height={200}
          priority
        />
      </div>

      <h3 className={styles.infoPrice}>
        {onSale && (
          <>
            <span className={styles.priceOriginal}>{price}$</span>
            <span>{salePrice}$</span>
          </>
        )}

        {!onSale && (
          <span>{price}$</span>
        )}
      </h3>

      <p className={styles.rating}>{getRatingString(averageRating)}</p>

      <h4 className={styles.instrumentName}>
        {name} <span className={styles.instrumentType}>/ {brandName}</span>
      </h4>

      <div className={styles.radioButtons} onClick={e => {e.stopPropagation();}}>
        {colors?.map((color: string, index: number) => (
          <label key={index} className={styles.label}>
            <input
              name='color'
              className={`${styles.radio} ${selectedColor === color ? styles.selected : ''}`}
              type='radio'
              value={color}
              onChange={handleColorChange}
              style={{ color }}
            />
          </label>
        ))}
      </div>

      <Button className={styles.buttonAddToCart} onClick={handleAddToCart}>
        Add to cart
      </Button>

      {isNew && <div className={styles.newPin}>New</div>}

      {withLikeIcon && (
        <FiHeart
          size={24}
          onClick={handleLikeItem}
          className={`${styles.likeIcon} ${isLiked ? styles.likeIconFilled : ''}`}
        />
      )}
    </div>
  );
};

export default InstrumentCard;
