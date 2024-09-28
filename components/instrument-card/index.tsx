'use client';

import React, { useState, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import 'react-toastify/dist/ReactToastify.css';
import styles from './index.module.scss';

import { toast } from 'react-toastify';

import Image from 'next/image';
import { Button } from '@/components';

import { FiHeart } from 'react-icons/fi';

import { getRatingString } from '@/utils';

import { addItemToCart } from '@/features/instruments/instrumentsSlice';
import { likeItem, unlikeItem } from '@/features/instruments/instrumentsSlice';

import { addCartItem } from '@/services/cart/cartService';
import { getLikedItem } from '@/services/liked/likedService';
import { getInstrumentRating } from '@/services/instruments/instrumentService';

import { AppDispatch } from '@/app/store';

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
  brandName?: string;
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
  brandName,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isLiked, setIsLiked] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const getAverageRating = async () => {
      const { averageRating } = await getInstrumentRating(id);

      setAverageRating(averageRating);
    };

    const checkLiked = async () => {
      const likedItem = await getLikedItem(id);
      setIsLiked(!!likedItem);
    };

    getAverageRating();
    checkLiked();
  }, [id]);

  const { push } = useRouter();

  const handleInstrumentNavigation = () => {
    push(`/shop/${section}/${instrumentType}/${id}`);
  };

  const handleLikeItem = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();

    try {
      if (isLiked) {
        await dispatch(unlikeItem(id));

        toast.success('You do not like the item anymore');
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

        toast.success('You like the item');
        setIsLiked(true);
      }
    } catch (error) {
      toast.error(`Something went wrong: ${error}`);
    }
  };

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      const newItem = await addCartItem({
        name,
        image,
        color: selectedColor,
        brandName: 'cort',
        instrumentId: id,
        section,
        amount: 1,
        instrumentType,
        price,
      });

      dispatch(addItemToCart(newItem));

      toast.success(`${name} has been added to the cart!`);
      push('/');
    } catch (error: any) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to add item to the cart. Try again later');
      }
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
          alt='guitar'
          width={200}
          height={200}
          priority
        />
      </div>

      <h3 className={styles.instrumentPrice}>{price}$</h3>

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

export default memo(InstrumentCard);
